"use client";

import type { Todo } from "@/types/todo";
import { Trash2, GripVertical, Check, X, Edit2, Loader2 } from "lucide-react";
import { Card, CardContent, Button, Checkbox, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { DeleteConfirmationData } from "@/features/todos/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema, type TodoInput } from "@/features/todos/validation";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (todo: Todo) => void;
  onEdit: (todo: Todo) => Promise<Todo>;
  onDelete: (todo: DeleteConfirmationData) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  isDragging?: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onEdit,
  dragHandleProps,
  isDragging,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<TodoInput>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      todo: todo.todo,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setFocus,
  } = form;

  const handleCancelEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset({ todo: todo.todo });
    setIsEditing(false);
  };

  const handleStartEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(true);
    reset({ todo: todo.todo });
    setTimeout(() => setFocus("todo"), 0);
  };

  const onSubmit = async (data: TodoInput) => {
    await onEdit({ ...todo, todo: data.todo });
    setIsEditing(false);
  };

  return (
    <Card
      className={cn(
        "hover:shadow-md border-border transition-shadow duration-200",
        {
          "shadow-2xl border-primary/50 bg-background/95 backdrop-blur-sm":
            isDragging,
          "hover:shadow-md border-border": !isDragging,
        }
      )}
    >
      <CardContent className="p-4">
        <div
          className={cn("flex items-center gap-3", {
            "items-start": isEditing,
          })}
        >
          <div
            {...dragHandleProps}
            className={cn(
              "cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted/50",
              {
                "text-primary": isDragging,
                hidden: isEditing,
              }
            )}
          >
            <GripVertical className="h-4 w-4" />
          </div>

          {!isEditing && (
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => onToggleComplete(todo)}
              className="flex-shrink-0"
            />
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full items-center gap-3"
          >
            <div className="flex-1">
              {isEditing ? (
                <>
                  <Input
                    {...register("todo")}
                    className="h-8"
                    placeholder="Enter todo title..."
                    disabled={isSubmitting}
                  />
                  {errors.todo && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.todo.message}
                    </p>
                  )}
                </>
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => onToggleComplete(todo)}
                >
                  <p
                    className={cn("select-none", {
                      "line-through text-muted-foreground": todo.completed,
                      "text-foreground": !todo.completed,
                    })}
                  >
                    {todo.todo}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-1">
              {isEditing ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isSubmitting}
                    className="text-muted-foreground hover:text-green-600/70 hover:bg-green-50 dark:hover:bg-green-950 flex-shrink-0 h-8 w-8 p-0 disabled:opacity-50"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelEdit}
                    disabled={isSubmitting}
                    className="text-muted-foreground hover:text-red-600/70 hover:bg-red-50 dark:hover:bg-red-950 flex-shrink-0 size-8 p-0 disabled:opacity-50"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleStartEdit}
                    className="text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 flex-shrink-0 size-8 p-0"
                    type="button"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      onDelete({
                        todoId: todo.id,
                        todoTitle: todo.todo,
                      })
                    }
                    className="text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 flex-shrink-0 size-8 p-0"
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
