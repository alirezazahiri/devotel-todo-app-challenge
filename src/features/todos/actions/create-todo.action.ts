"use server";

import { env } from "@/config/env";
import {
  type ServerActionState,
  serverActionWrapper,
} from "@/lib/server-action-wrapper";
import { generateId } from "@/lib/utils";
import { Todo } from "@/types/todo";

const { API_BASE } = env;

export const createTodoAction = async (
  _model: ServerActionState<Todo> | null,
  formData: FormData
) => {
  const todo = formData.get("todo") as string;

  return await serverActionWrapper(async () => {
    const response = await fetch(`${API_BASE}/todos/add`, {
      method: "POST",
      body: JSON.stringify({
        todo,
        completed: false,
        userId: 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create todo");
    }

    const data = (await response.json()) as Promise<Todo>;
    return {
      ...data,
      //   !FIXME: this is a workaround to handle the case where the todo is created by us
      //   ! (because dummyjson doesn't support adding our own todos)
      id: generateId(),
    };
  });
};
