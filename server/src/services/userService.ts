import { pgPool } from '../config/database';
import { User } from '../types/User';

export class UserService {
    async findById(id: number): Promise<User | null> {
        const result = await pgPool.query('SELECT id, username, email, role, created_at FROM users WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async searchUsers(query: string): Promise<User[]> {
        const result = await pgPool.query(
            'SELECT id, username, email, role, created_at FROM users WHERE username ILIKE $1 LIMIT 20',
            [`%${query}%`]
        );
        return result.rows;
    }
}
