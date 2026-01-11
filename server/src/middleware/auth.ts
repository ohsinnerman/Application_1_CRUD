import { Request, Response, NextFunction } from 'express';
import { User } from '../types/User';

export const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as User;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!roles.includes(user.role || '')) {
            return res.status(403).json({ message: 'Forbidden: Insufficient rights' });
        }
        next();
    };
};
