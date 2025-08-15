"use client";

import { useQuery } from "@tanstack/react-query";
import { env } from "@/config/env";
import { Todo } from "@/types/todo";

const { API_BASE } = env;

export const fetchTodos = async (): Promise<{ todos: Todo[] }> => {
  const response = await fetch(`${API_BASE}/todos`);
  if (!response.ok) throw new Error("Failed to fetch todos");
  return response.json();
};

export const useListTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};
