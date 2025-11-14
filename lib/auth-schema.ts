import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 8 characters" }),
});

export const signupSchema = z
  .object({
    first_name: z.string().min(2, { message: "First name is required" }),
    last_name: z.string().min(2, { message: "Last name is required" }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
