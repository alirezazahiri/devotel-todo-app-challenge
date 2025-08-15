import { configureStore } from "@reduxjs/toolkit";
import { todosStore } from "@/features/todos/store";

export const store = configureStore({
  reducer: {
    todos: todosStore.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
