"use client";
import { createTodoAction } from "@/features/todos/actions";
import { TodoInput } from "@/features/todos/validation";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks";
import { addTodo } from "@/features/todos/store";
import { Todo } from "@/types/todo";
import {
  useActionMutation,
  UseActionMutationProps,
} from "@/hooks/use-action-mutation";

export const useCreateTodo = ({
  onSuccess,
  onError,
}: UseActionMutationProps<Todo>) => {
  const dispatch = useAppDispatch();
  const {
    mutate: createTodo,
    isPending,
    data,
  } = useActionMutation(createTodoAction, {
    initialState: null,
    onSuccess: (state) => {
      toast.success("Todo created successfully");
      dispatch(addTodo(state.response!));
      onSuccess?.(state);
    },
    onError: (state, error) => {
      toast.error(error);
      onError?.(state, error);
    },
  });

  const mutate = (data: TodoInput) => {
    const formData = new FormData();
    formData.append("todo", data.todo);
    createTodo(formData);
  };

  return {
    mutate,
    isPending,
    data,
  };
};
