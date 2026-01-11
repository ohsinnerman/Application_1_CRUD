import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import logger from '../utils/logger';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (err: any) {
        logger.error(err.message);
        res.status(400).json({ success: false, message: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { token, user } = await authService.login(req.body);
        res.status(200).json({ success: true, token, user });
    } catch (err: any) {
        logger.error(err.message);
        res.status(401).json({ success: false, message: err.message });
    }
};
