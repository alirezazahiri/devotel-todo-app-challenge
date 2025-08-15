import { z } from "zod";

export const todoSchema = z.object({
  title: z
    .string()
    .min(1, "Todo title is required")
    .max(200, "Todo title must be less than 200 characters"),
});

export type TodoInput = z.infer<typeof todoSchema>;
