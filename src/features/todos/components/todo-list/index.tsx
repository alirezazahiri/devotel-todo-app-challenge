"use client";

import { useAppSelector } from "@/hooks";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { TodoItem } from "@/features/todos/components/todo-item";
import { Card, CardContent } from "@/components/ui";
import { LoadingState, EmptyState } from "@/components/shared";
import { useUpdateTodoStatus } from "@/features/todos/api";
import type { Todo } from "@/types/todo";
import { TodoFilter } from "@/enums/todo-filter.enum";
import { useReorderTodos } from "@/features/todos/hooks";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface TodoListProps {
  isLoading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({ isLoading }) => {
  const { items, filter, query } = useAppSelector((state) => state.todos);
  const { mutate: updateTodoMutation } = useUpdateTodoStatus();

  const filteredTodos = useMemo(() => {
    let filtered = items;

    if (query.trim()) {
      filtered = filtered.filter((todo) =>
        todo.todo.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filter === TodoFilter.COMPLETED) {
      filtered = filtered.filter((todo) => todo.completed);
    } else if (filter === TodoFilter.INCOMPLETE) {
      filtered = filtered.filter((todo) => !todo.completed);
    }

    return filtered;
  }, [items, filter, query]);

  const { reorder } = useReorderTodos({
    allTodos: items,
    filteredTodos,
    filter,
    query,
  });

  const handleToggleComplete = async (todo: Todo) => {
    updateTodoMutation({
      id: todo.id,
      updates: { ...todo, completed: !todo.completed },
    });
  };

  const handleDelete = (todo: Todo) => {
    console.log("delete todo", todo);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    reorder(sourceIndex, destinationIndex);
  };

  if (isLoading) {
    return <LoadingState message="Loading todos..." />;
  }

  if (filteredTodos.length === 0) {
    return <EmptyState message="No todos available" />;
  }

  return (
    <Card>
      <CardContent className="p-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cn("space-y-2 min-h-[2rem]", {
                  "bg-muted/30 rounded-lg p-2": snapshot.isDraggingOver,
                })}
              >
                {filteredTodos.map((todo, index) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          transform: snapshot.isDragging
                            ? `${provided.draggableProps.style?.transform} rotate(2deg)`
                            : provided.draggableProps.style?.transform,
                        }}
                      >
                        <TodoItem
                          todo={todo}
                          onToggleComplete={handleToggleComplete}
                          onDelete={handleDelete}
                          dragHandleProps={provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
    </Card>
  );
};
