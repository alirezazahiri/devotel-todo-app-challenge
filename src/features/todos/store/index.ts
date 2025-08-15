import { TodoFilter } from "@/enums/todo-filter.enum";
import { Todo } from "@/types/todo";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TodosState = {
  items: Todo[];
  filter: TodoFilter;
  // query: string; // TODO: add search query, its not the priority yet
};

const initialState: TodosState = {
  items: [],
  filter: TodoFilter.ALL,
  // query: "",
};

export const todosStore = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.unshift(action.payload);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<Todo> }>
    ) => {
      const index = state.items.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updates,
        };
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const { setTodos, addTodo, updateTodo, deleteTodo } = todosStore.actions;
