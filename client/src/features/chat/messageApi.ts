import { apiSlice } from '../../app/api';

export interface Message {
    _id: string;
    chatId: number;
    senderId: number;
    content: string;
    type: 'text' | 'image' | 'system';
    createdAt: string;
}

export const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query<Message[], { chatId: number }>({
            query: ({ chatId }) => `/messages/${chatId}`,
            transformResponse: (response: { data: Message[] }) => response.data,
            providesTags: (result, error, { chatId }) => [{ type: 'Messages', id: chatId }],
        }),
        // Helper to optimistically add message or clear cache
    }),
});

export const { useGetMessagesQuery } = messageApi;
