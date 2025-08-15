import { configureStore } from "@reduxjs/toolkit";
import { todosSlice } from "@/features/todos/store";
import { loadPersistedState, saveStateToStorage } from "./persistence";
import { debounce } from "./utils";

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
  preloadedState: loadPersistedState({ todos: todosSlice.getInitialState() }),
});

const debouncedSave = debounce(saveStateToStorage, 300);

store.subscribe(() => {
  const state = store.getState();
  debouncedSave(state);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
