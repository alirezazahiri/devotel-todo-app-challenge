import type { TodosState } from "@/features/todos/store";

const STORAGE_KEY = "todo-app-state";

type PersistedState = {
  todos: TodosState;
};

export const loadPersistedState = (
  fallbackState: PersistedState
): PersistedState => {
  try {
    if (typeof window === "undefined") return fallbackState;

    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) return fallbackState;

    return JSON.parse(serializedState);
  } catch (err) {
    console.warn({ REDUX_PERSISTENCE_LOAD_ERROR: err });
    return fallbackState;
  }
};

export const saveStateToStorage = (state: PersistedState) => {
  try {
    if (typeof window === "undefined") return;

    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.warn({ REDUX_PERSISTENCE_SAVE_ERROR: err });
  }
};
