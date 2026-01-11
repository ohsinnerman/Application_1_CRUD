import { apiSlice } from '../../app/api';

export interface Chat {
    id: number;
    name?: string;
    type: 'private' | 'group';
    created_at: string;
    // helpers
    lastMessage?: string;
}

export const chatApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getChats: builder.query<Chat[], void>({
            query: () => '/chats',
            transformResponse: (response: { data: Chat[] }) => response.data,
            providesTags: ['Chats'],
        }),
        createChat: builder.mutation<Chat, { type: 'private' | 'group'; partnerId?: number; name?: string; memberIds?: number[] }>({
            query: (body) => ({
                url: '/chats',
                method: 'POST',
                body,
            }),
            transformResponse: (response: { data: Chat }) => response.data,
            invalidatesTags: ['Chats'],
        }),
        getChatDetails: builder.query<{ chat: Chat; members: any[] }, number>({
            query: (chatId) => `/chats/${chatId}`,
            transformResponse: (response: { data: { chat: Chat; members: any[] } }) => response.data,
        })
    }),
});

export const { useGetChatsQuery, useCreateChatMutation, useGetChatDetailsQuery } = chatApi;
