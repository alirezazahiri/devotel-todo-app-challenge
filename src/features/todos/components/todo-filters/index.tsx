"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setFilter, setSearchQuery } from "@/features/todos/store";
import { Button, Input, Card, CardContent } from "@/components/ui";
import { Search } from "lucide-react";
import { FILTERS } from "./constants";
import { TodoFilter } from "@/enums/todo-filter.enum";

export const TodoFilters = () => {
  const dispatch = useAppDispatch();
  const { filter, query } = useAppSelector((state) => state.todos);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const filterKey = e.currentTarget.dataset.filterKey;
    if (filterKey) {
      dispatch(setFilter(filterKey as TodoFilter));
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search todos..."
              value={query}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {FILTERS.map((filterOption) => (
              <Button
                key={filterOption.key}
                variant={filter === filterOption.key ? "default" : "outline"}
                data-filter-key={filterOption.key}
                size="sm"
                onClick={handleFilter}
              >
                {filterOption.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
