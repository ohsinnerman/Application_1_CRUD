import { pgPool } from '../config/database';
import { Chat, ChatMember } from '../types/Chat';

export class ChatService {
    async createPrivateChat(user1Id: number, user2Id: number): Promise<Chat> {
        // Check if chat already exists
        const existing = await pgPool.query(
            `SELECT c.* FROM chats c
       JOIN chat_members cm1 ON c.id = cm1.chat_id
       JOIN chat_members cm2 ON c.id = cm2.chat_id
       WHERE c.type = 'private' AND cm1.user_id = $1 AND cm2.user_id = $2`,
            [user1Id, user2Id]
        );

        if (existing.rows.length > 0) {
            return existing.rows[0];
        }

        // Create new chat
        const client = await pgPool.connect();
        try {
            await client.query('BEGIN');

            const chatRes = await client.query(
                "INSERT INTO chats (type) VALUES ('private') RETURNING *"
            );
            const chatId = chatRes.rows[0].id;

            await client.query(
                "INSERT INTO chat_members (chat_id, user_id, role) VALUES ($1, $2, 'member'), ($3, $4, 'member')",
                [chatId, user1Id, chatId, user2Id]
            );

            await client.query('COMMIT');
            return chatRes.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    async createGroupChat(name: string, creatorId: number, memberIds: number[]): Promise<Chat> {
        const client = await pgPool.connect();
        try {
            await client.query('BEGIN');

            const chatRes = await client.query(
                "INSERT INTO chats (name, type) VALUES ($1, 'group') RETURNING *",
                [name]
            );
            const chatId = chatRes.rows[0].id;

            // Add creator
            await client.query(
                "INSERT INTO chat_members (chat_id, user_id, role) VALUES ($1, $2, 'admin')",
                [chatId, creatorId]
            );

            // Add members
            for (const memberId of memberIds) {
                // Avoid duplicate insertion for creator if they are in memberIds
                if (memberId !== creatorId) {
                    await client.query(
                        "INSERT INTO chat_members (chat_id, user_id, role) VALUES ($1, $2, 'member')",
                        [chatId, memberId]
                    );
                }
            }

            await client.query('COMMIT');
            return chatRes.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    async getUserChats(userId: number): Promise<Chat[]> {
        const result = await pgPool.query(
            `SELECT c.* FROM chats c
       JOIN chat_members cm ON c.id = cm.chat_id
       WHERE cm.user_id = $1
       ORDER BY c.created_at DESC`,
            // Note: updated_at not strictly in schema but good practice. Using ID or created_at for now if updated_at missing.
            // Correcting to use created_at based on schematic.
            // "ORDER BY c.created_at DESC"
            [userId]
        );
        // Adjusted query to match schema
        const resultFixed = await pgPool.query(
            `SELECT c.* FROM chats c
       JOIN chat_members cm ON c.id = cm.chat_id
       WHERE cm.user_id = $1
       ORDER BY c.created_at DESC`,
            [userId]
        );
        return resultFixed.rows;
    }

    async getChatDetails(chatId: number): Promise<{ chat: Chat; members: ChatMember[] } | null> {
        const chatRes = await pgPool.query('SELECT * FROM chats WHERE id = $1', [chatId]);
        if (chatRes.rows.length === 0) return null;

        const membersRes = await pgPool.query(
            `SELECT cm.*, u.username, u.email 
           FROM chat_members cm 
           JOIN users u ON cm.user_id = u.id 
           WHERE cm.chat_id = $1`,
            [chatId]
        );

        return { chat: chatRes.rows[0], members: membersRes.rows };
    }
}
