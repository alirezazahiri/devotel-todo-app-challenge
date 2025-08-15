import { TodoFilter } from "@/enums/todo-filter.enum";

export const FILTERS = [
  { key: TodoFilter.ALL, label: "All" },
  { key: TodoFilter.INCOMPLETE, label: "Active" },
  { key: TodoFilter.COMPLETED, label: "Completed" },
];
