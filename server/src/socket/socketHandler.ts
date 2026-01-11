import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { MessageService } from '../services/messageService';
import logger from '../utils/logger';
import { redisClient } from '../config/database';

const messageService = new MessageService();

export const socketHandler = (io: Server) => {
    // Middleware for auth
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error('Authentication error'));

        jwt.verify(token, process.env.JWT_SECRET || 'secret', (err: any, decoded: any) => {
            if (err) return next(new Error('Authentication error'));
            socket.data.user = decoded;
            next();
        });
    });

    io.on('connection', async (socket: Socket) => {
        const userId = socket.data.user.id;
        logger.info(`User connected: ${userId}`);

        // Update presence
        await redisClient.set(`presence:${userId}`, 'online');
        socket.broadcast.emit('presence_update', { userId, status: 'online' });

        socket.on('join_room', (chatId: string) => {
            socket.join(chatId);
            logger.info(`User ${userId} joined room ${chatId}`);
        });

        socket.on('send_message', async (data: { chatId: number, content: string, type?: 'text' | 'image' }) => {
            try {
                const message = await messageService.saveMessage(data.chatId, userId, data.content, data.type);
                io.to(data.chatId.toString()).emit('message_received', message);
            } catch (err) {
                logger.error('Error sending message via socket:', err);
                socket.emit('error', 'Message could not be sent');
            }
        });

        socket.on('typing_start', (chatId) => {
            socket.to(chatId).emit('typing_indicator', { chatId, userId, isTyping: true });
        });

        socket.on('typing_stop', (chatId) => {
            socket.to(chatId).emit('typing_indicator', { chatId, userId, isTyping: false });
        });

        socket.on('disconnect', async () => {
            logger.info(`User disconnected: ${userId}`);
            await redisClient.del(`presence:${userId}`);
            socket.broadcast.emit('presence_update', { userId, status: 'offline' });
        });
    });
};
