import { ThemeToggle } from "@/components/shared";

export const TodoHeader = () => {
  return (
    <div className="relative mb-8">
      <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Devotel - Todo App Challenge
        </h1>
        <p className="text-muted-foreground">
          Manage your tasks efficiently ✨
        </p>
      </div>
    </div>
  );
};
