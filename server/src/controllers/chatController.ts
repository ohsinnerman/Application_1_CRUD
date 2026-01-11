import { Request, Response } from 'express';
import { ChatService } from '../services/chatService';
import logger from '../utils/logger';
import { User } from '../types/User';

const chatService = new ChatService();

export const createChat = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as User).id!;
        const { type, partnerId, name, memberIds } = req.body;

        if (type === 'private') {
            if (!partnerId) return res.status(400).json({ message: 'Partner ID required for private chat' });
            const chat = await chatService.createPrivateChat(userId, partnerId);
            return res.status(201).json({ success: true, data: chat });
        } else if (type === 'group') {
            if (!name || !memberIds) return res.status(400).json({ message: 'Name and Member IDs required for group chat' });
            const chat = await chatService.createGroupChat(name, userId, memberIds);
            return res.status(201).json({ success: true, data: chat });
        } else {
            return res.status(400).json({ message: 'Invalid chat type' });
        }
    } catch (err: any) {
        logger.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getMyChats = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as User).id!;
        const chats = await chatService.getUserChats(userId);
        res.json({ success: true, data: chats });
    } catch (err: any) {
        logger.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getChatDetails = async (req: Request, res: Response) => {
    try {
        const chatId = parseInt(req.params.id as string);
        if (isNaN(chatId)) return res.status(400).json({ message: 'Invalid Chat ID' });
        const details = await chatService.getChatDetails(chatId);
        if (!details) return res.status(404).json({ message: 'Chat not found' });
        res.json({ success: true, data: details });
    } catch (err: any) {
        logger.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
