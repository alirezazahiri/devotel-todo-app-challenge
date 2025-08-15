import { TodosLayout } from "@/layouts/todos-layout";

export default function _TodosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TodosLayout>{children}</TodosLayout>;
}
