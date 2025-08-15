"use client";

import { env } from "@/config/env";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/hooks";
import { deleteTodo } from "@/features/todos/store";
import { Todo } from "@/types/todo";
import { queryClient } from "@/lib/react-query";

const { API_BASE } = env;

export const deleteTodoApi = async (todoId: number) => {
  const response = await fetch(`${API_BASE}/todos/${todoId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete todo");
  return response.json() as Promise<Todo>;
};

export const useDeleteTodo = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (todoId: number) => {
      return deleteTodoApi(todoId);
    },
    onSuccess: (_, todoId) => {
      dispatch(deleteTodo(todoId));
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
