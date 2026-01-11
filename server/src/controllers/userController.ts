import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import logger from '../utils/logger';
import { User } from '../types/User';

const userService = new UserService();

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as User).id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const user = await userService.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ success: true, data: user });
    } catch (err: any) {
        logger.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const searchUsers = async (req: Request, res: Response) => {
    try {
        const query = req.query.q as string;
        if (!query) return res.status(400).json({ message: 'Query parameter q is required' });

        const users = await userService.searchUsers(query);
        res.json({ success: true, count: users.length, data: users });
    } catch (err: any) {
        logger.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
