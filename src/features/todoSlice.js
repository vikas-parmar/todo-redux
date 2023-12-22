import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addToSlice: (state, action) => {
      const todos = [...action.payload];
      return todos;
    },
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
      const { id, todo } = action.payload;
      const todoIndex = state.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state[todoIndex].todo = todo;
      }
    },
  },
});

export const selectTodo = (state) => state.todos;
export const { addToSlice, add, remove, update, toggle, deleteAll } =
  todoSlice.actions;
export default todoSlice.reducer;
