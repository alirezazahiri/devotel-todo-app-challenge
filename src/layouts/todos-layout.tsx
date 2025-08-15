import { TodoHeader } from "@/components/layout/todos";

export const TodosLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <TodoHeader />
      <section>{children}</section>
    </main>
  );
};
