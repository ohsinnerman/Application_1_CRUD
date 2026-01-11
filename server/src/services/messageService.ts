import { Message, IMessage } from '../models/Message';

export class MessageService {
    async saveMessage(chatId: number, senderId: number, content: string, type: 'text' | 'image' | 'system' = 'text'): Promise<IMessage> {
        const message = new Message({
            chatId,
            senderId,
            content,
            type,
            readBy: [senderId]
        });
        return await message.save();
    }

    async getMessages(chatId: number, limit = 50, before?: Date): Promise<IMessage[]> {
        const query: any = { chatId };
        if (before) {
            query.createdAt = { $lt: before };
        }

        return await Message.find(query)
            .sort({ createdAt: -1 })
            .limit(limit);
    }
}
