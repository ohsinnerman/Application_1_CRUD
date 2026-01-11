import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';
import { pgPool } from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'secret',
};

export default (passport: PassportStatic) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                const res = await pgPool.query('SELECT id, username, email, role FROM users WHERE id = $1', [jwt_payload.id]);
                if (res.rows.length > 0) {
                    return done(null, res.rows[0]);
                }
                return done(null, false);
            } catch (err) {
                console.error(err);
                return done(err, false);
            }
        })
    );
};
