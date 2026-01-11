import { pgPool } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, LoginCredentials } from '../types/User';
import logger from '../utils/logger';

export class AuthService {
    async register(user: User): Promise<User | null> {
        const { username, email, password } = user;

        if (!password) {
            throw new Error('Password is required');
        }

        // Check if user exists
        const existing = await pgPool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
        if (existing.rows.length > 0) {
            throw new Error('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user
        const result = await pgPool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, role, created_at',
            [username, email, hashedPassword]
        );

        return result.rows[0];
    }

    async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
        const { email, password } = credentials;

        const result = await pgPool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            throw new Error('Invalid credentials');
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        if (!user.id || !user.role) {
            throw new Error('User data incomplete');
        }

        const payload = { id: user.id, username: user.username, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: (process.env.JWT_EXPIRE || '1h') as jwt.SignOptions['expiresIn'] });

        // Remove password from response
        delete user.password;

        return { token, user };
    }
}
