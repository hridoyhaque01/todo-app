"use server";

import { env } from "@/config";
import {
  CreateTodoInput,
  createTodoSchema,
  UpdateTodoInput,
  updateTodoSchema,
} from "@/lib";
import { cookies } from "next/headers";

// actions for authentication

export const createTodo = async (prevState: any, formData: FormData) => {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) return null;

  const result = createTodoSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }
  const data: CreateTodoInput = result?.data;

  const submitData = new FormData();
  submitData.append("title", data.title);
  submitData.append("description", data.description);
  submitData.append("priority", data.priority);
  submitData.append("todo_date", data.todo_date);

  // call api to register user
  const response = await fetch(`${env.apiUrl}/todos/`, {
    method: "POST",
    body: submitData,
    headers: { Accept: "application/json", Authorization: `Bearer ${access}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Signup failed", errorData);
    return {
      success: false,
      errors: {
        ...todoErrors,
        apiError: [errorData?.detail || "Signup failed"],
      },
    };
  }
  const todo = await response.json();
  return { success: true, todo, errors: todoErrors };
};

// action to update user profile
export const updateTodo = async (prevState: any, formData: FormData) => {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  if (!access) return null;

  const result = updateTodoSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }
  const data: UpdateTodoInput = result?.data;
  const submitData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      submitData.append(key, value);
    }
  });

  // call api to register user
  const response = await fetch(`${env.apiUrl}/todos/3/`, {
    method: "PATCH",
    body: submitData,
    headers: { Accept: "application/json", Authorization: `Bearer ${access}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Signup failed", errorData);
    return {
      success: false,
      errors: {
        ...todoErrors,
        apiError: [errorData?.detail || "Signup failed"],
      },
    };
  }

  const updatedTodo = await response.json();
  return { success: true, errors: todoErrors, user: updatedTodo };
};

export async function getTodos() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) return null;

  const res = await fetch(`${env.apiUrl}/todos/`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Get Todos failed", errorData);
    return null;
  }

  const todos = await res.json();
  console.log("TODOS ACTION:", todos);
  return todos;
}

const todoErrors = {
  title: undefined,
  description: undefined,
  priority: undefined,
  todo_date: undefined,
  apiError: undefined,
};
