import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: "todo-0", content: "Buy Grocery", completed: true },
    { id: "todo-1", content: "Write Letter", completed: false },
    { id: "todo-2", content: "Plan Holiday", completed: false },
  ],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggle: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index >= 0) {
        state[index].completed = !state[index].completed;
      }
    },
    deleteAll: (state, action) => {
      return [];
    },
    update: (state, action) => {
      const { id, content } = action.payload;
      const todoIndex = state.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state[todoIndex].content = content;
      }
    },
  },
});

export const selectTodo = (state) => state.todos;
export const { add, remove, update, toggle, deleteAll } = todoSlice.actions;
export default todoSlice.reducer;