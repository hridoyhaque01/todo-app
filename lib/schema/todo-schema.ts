import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  priority: z.enum(["extreme", "moderate", "low"], {
    message: "Priority is required",
  }),
  todo_date: z.string().min(1, { message: "Date is required" }),
});

export const updateTodoSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  priority: z.enum(["extreme", "moderate", "low"]).optional(),
  todo_date: z.string().optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema> & {
  profile_image?: string;
};
