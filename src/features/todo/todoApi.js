import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosApi = createApi({
    reducerPath: "todosApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com/"
    }),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => `todos`,
        }),
        addTodos: builder.mutation({
            query: (todo) => ({
                url: "todos",
                method: "POST",
                body: todo
            })
        }),
        updateTodos: builder.mutation({
            query: (todo) => ({
                url: `todos/${todo.id}`,
                method: "PATCH",
                body: todo
            })
        }),
        deleteTodos: builder.mutation({
            query: ({ id }) => ({
                url: `todos/${id}`,
                method: "DELETE",
                body: id
            })
        })
    })
})

export const {
    useGetTodosQuery,
    useAddTodosMutation,
    useUpdateTodosMutation,
    useDeleteTodosMutation,
} = todosApi;