"use client";

import { Button } from "@/components/ui";
import { toast } from "sonner";

export default function TodosPage() {

  return (
    <div>
      <h1>TODO APP</h1>
      <Button onClick={() => toast.error("Hello")}>Click me</Button>
    </div>
  );

}
