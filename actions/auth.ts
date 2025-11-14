"use server";

import { loginSchema } from "@/lib";

export const login = async (prevState: any, formData: FormData) => {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  console.log("Login data:", result.data);

  return { success: true };
};
