import { TodoFilter } from "@/enums/todo-filter.enum";
import { Todo } from "@/types/todo";
import { useAppDispatch } from "@/hooks";
import { setTodos } from "@/features/todos/store";

type UseReorderTodosProps = {
  allTodos: Todo[];
  filteredTodos: Todo[];
  filter: TodoFilter;
  query: string;
};

export const useReorderTodos = ({
  allTodos,
  filteredTodos,
  filter,
  query,
}: UseReorderTodosProps) => {
  const dispatch = useAppDispatch();

  const reorder = (sourceIndex: number, destinationIndex: number) => {
    if (filter === TodoFilter.ALL && !query.trim()) {
      const reorderedItems = Array.from(allTodos);
      const [movedTodo] = reorderedItems.splice(sourceIndex, 1);
      reorderedItems.splice(destinationIndex, 0, movedTodo);
      dispatch(setTodos(reorderedItems));
    } else {
      const sourceItem = filteredTodos[sourceIndex];
      const destinationItem = filteredTodos[destinationIndex];

      const sourceItemIndex = allTodos.findIndex(
        (item) => item.id === sourceItem.id
      );
      const destinationItemIndex = allTodos.findIndex(
        (item) => item.id === destinationItem.id
      );

      if (sourceItemIndex === -1 || destinationItemIndex === -1) return;

      const reorderedItems = Array.from(allTodos);
      const [movedTodo] = reorderedItems.splice(sourceItemIndex, 1);
      reorderedItems.splice(destinationItemIndex, 0, movedTodo);
      dispatch(setTodos(reorderedItems));
    }
  };

  return { reorder };
};
