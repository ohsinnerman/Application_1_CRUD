export interface User {
    id?: number;
    username: string;
    email: string;
    password?: string;
    role?: 'user' | 'admin';
    created_at?: Date;
}

export interface LoginCredentials {
    email: string;
    password: string;
}
