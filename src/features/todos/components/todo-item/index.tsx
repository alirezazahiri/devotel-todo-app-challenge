"use client";

import type { Todo } from "@/types/todo";
import { Trash2, GripVertical } from "lucide-react";
import { Card, CardContent, Button, Checkbox } from "@/components/ui";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
}) => {
  return (
    <Card className="hover:shadow-md border-border transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted/50">
            <GripVertical className="h-4 w-4" />
          </div>

          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggleComplete(todo)}
            className="flex-shrink-0"
          />

          <div
            className="flex-1 cursor-pointer"
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

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(todo)}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
