"use client";

import { useAppSelector } from "@/hooks";
import { TodoItem } from "@/features/todos/components/todo-item";
import { Loader2 } from "lucide-react";
import type { Todo } from "@/types/todo";
import { Card, CardContent } from "@/components/ui";
import { useUpdateTodoStatus } from "@/features/todos/api";

interface TodoListProps {
  isLoading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({ isLoading }) => {
  const { items } = useAppSelector((state) => state.todos);
  const { mutate: updateTodoMutation } = useUpdateTodoStatus();

  const handleToggleComplete = async (todo: Todo) => {
    updateTodoMutation({
      id: todo.id,
      updates: { completed: !todo.completed },
    });
  };

  const handleDelete = (todo: Todo) => {
    console.log("delete todo", todo);
  };

  if (isLoading || items.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          {isLoading && (
            <>
              <Loader2 className="size-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading todos...</p>
            </>
          )}
          {items.length === 0 && (
            <>
              <p className="text-muted-foreground">No todos available</p>
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2 min-h-8">
          {items.map((todo) => (
            <TodoItem
              key={todo.id.toString()}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
