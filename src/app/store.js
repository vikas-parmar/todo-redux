import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todo/todoSlice";
import { todosApi } from "../features/todo/todoApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(todosApi.middleware),
});

setupListeners(store.dispatch);