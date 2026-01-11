import { apiSlice } from '../../app/api';

export interface User {
    id: number;
    username: string;
    email: string;
}

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchUsers: builder.query<User[], string>({
            query: (q) => `/users/search?q=${q}`,
            transformResponse: (response: { data: User[] }) => response.data,
        }),
    }),
});

export const { useLazySearchUsersQuery } = userApi;
