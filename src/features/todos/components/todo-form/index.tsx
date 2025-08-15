"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema, type TodoInput } from "@/features/todos/validation";
import { Button, Input, Card, CardContent } from "@/components/ui";
import { Plus, Loader2 } from "lucide-react";
import { useCreateTodo } from "@/features/todos/api";

export const TodoForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TodoInput>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      todo: "",
    },
    mode: "onChange",
  });

  const { mutate: onSubmit, isPending } = useCreateTodo({
    onSuccess: () => {
      setValue("todo", "");
    },
  });

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
          <div className="flex-1">
            <Input
              {...register("todo")}
              placeholder="Add a new todo..."
              className={errors.todo ? "border-destructive" : ""}
              disabled={isPending}
            />
            {errors.todo && (
              <p className="text-sm text-destructive mt-1">
                {errors.todo.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isPending} className="px-6">
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Todo
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
