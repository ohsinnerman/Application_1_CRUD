export interface Chat {
    id: number;
    name?: string;
    type: 'private' | 'group';
    created_at?: Date;
}

export interface ChatMember {
    chat_id: number;
    user_id: number;
    role: 'member' | 'admin';
    joined_at?: Date;
    username?: string; // For joining with users table
    email?: string;
}
