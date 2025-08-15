"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector, useHydration } from "@/hooks";
import { setTodos } from "@/features/todos/store";
import { useListTodos } from "@/features/todos/api/use-list-todos";
import { TodoList, TodoFilters } from "@/features/todos/components";
import { Button, Card, CardContent } from "@/components/ui";

export const TodosFeature = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.todos);
  const isHydrated = useHydration();
  const { data: todosData, isLoading, error, refetch } = useListTodos();

  useEffect(() => {
    if (isHydrated && todosData?.todos && items.length === 0) {
      dispatch(setTodos(todosData.todos));
    }
  }, [todosData, dispatch, items.length, isHydrated]);

  if (!isHydrated) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="animate-pulse space-y-2 min-h-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-30 bg-muted rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-center">
        <p className="text-destructive">
          Failed to load todos. Please try again.
        </p>
        <Button onClick={() => refetch()}>Try again</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <TodoFilters />
      <TodoList isLoading={isLoading && items.length === 0} />
    </div>
  );
};
