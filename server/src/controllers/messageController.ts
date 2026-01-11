import { Request, Response } from 'express';
import { MessageService } from '../services/messageService';
import logger from '../utils/logger';

const messageService = new MessageService();

export const getChatMessages = async (req: Request, res: Response) => {
    try {
        const chatId = parseInt(req.params.chatId as string);
        if (isNaN(chatId)) {
            return res.status(400).json({ success: false, message: 'Invalid Chat ID' });
        }
        const limit = parseInt(req.query.limit as string) || 50;
        const before = req.query.before ? new Date(req.query.before as string) : undefined;

        const messages = await messageService.getMessages(chatId, limit, before);
        res.json({ success: true, data: messages });
    } catch (err: any) {
        logger.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
