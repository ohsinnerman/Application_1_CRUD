import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    chatId: number; // References PostgreSQL chat ID
    senderId: number; // References PostgreSQL user ID
    content: string; // Encrypted content
    type: 'text' | 'image' | 'system';
    createdAt: Date;
    readBy: number[];
}

const MessageSchema: Schema = new Schema({
    chatId: { type: Number, required: true, index: true },
    senderId: { type: Number, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['text', 'image', 'system'], default: 'text' },
    readBy: [{ type: Number }], // Array of user IDs who read the message
}, { timestamps: true });

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
