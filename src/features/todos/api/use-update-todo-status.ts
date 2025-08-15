import { useMutation } from "@tanstack/react-query";
import type { Todo } from "@/types/todo";
import { env } from "@/config/env";
import { useAppDispatch } from "@/hooks";
import { updateTodo } from "@/features/todos/store";

const { API_BASE } = env;

type UpdateTodoInput = {
  id: number;
  updates: Partial<Todo>;
};

export const updateTodoStatus = async ({
  id,
  updates,
}: UpdateTodoInput): Promise<Todo> => {
  const response = await fetch(`${API_BASE}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update todo");
  return response.json();
};

export const useUpdateTodoStatus = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: ({ id, updates }: UpdateTodoInput) => {
      dispatch(updateTodo({ id, updates })); // optimistic update
      return updateTodoStatus({ id, updates });
    },
    onError: (_, variables) => {
      const { id, updates } = variables;
      // rollback on error
      dispatch(updateTodo({ id, updates: { completed: !updates.completed } }));
    },
  });
};
