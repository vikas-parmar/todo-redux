import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos?limit=3",
    }),
    addTodos: builder.mutation({
      query: (todo) => ({
        url: "/todos/add",
        method: "POST",
        body: todo,
      }),
    }),
    updateTodos: builder.mutation({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: "PUT",
        body: todo,
      }),
    }),
    deleteTodos: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useUpdateTodosMutation,
  useDeleteTodosMutation,
} = todosApi;
