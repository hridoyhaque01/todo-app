"use server";

import { env } from "@/config";
import {
  CreateTodoInput,
  createTodoSchema,
  getQuery,
  UpdateTodoInput,
  updateTodoSchema,
} from "@/lib";
import { cookies } from "next/headers";

// actions for authentication

export const createTodo = async (formData: FormData) => {
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
    const errorData =
      response?.status === 500
        ? { detail: "Something went wrong" }
        : await response.json();
    return {
      success: false,
      errors: {
        ...todoErrors,
        apiError: [errorData?.detail || "Failed to add todo"],
      },
    };
  }
  const todo = await response.json();
  return { success: true, todo, errors: todoErrors };
};

// action to update user profile
export const updateTodo = async (formData: FormData, id: number) => {
  if (!id) return null;
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
  const response = await fetch(`${env.apiUrl}/todos/${id}/`, {
    method: "PATCH",
    body: submitData,
    headers: { Accept: "application/json", Authorization: `Bearer ${access}` },
  });

  if (!response.ok) {
    const errorData =
      response?.status === 500
        ? { detail: "Something went wrong" }
        : await response.json();
    return {
      success: false,
      errors: {
        ...todoErrors,
        apiError: [errorData?.detail || "Failed to update todo"],
      },
    };
  }

  const updatedTodo = await response.json();
  return { success: true, errors: todoErrors, todo: updatedTodo };
};

// action to update todo position
export const updateTodoPosition = async (id: number, position: number) => {
  if (!id) return null;

  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  if (!access) return null;

  try {
    const submitData = new FormData();
    submitData.append("position", position.toString());

    // call api to update todo position
    const response = await fetch(`${env.apiUrl}/todos/${id}/`, {
      method: "PATCH",
      body: submitData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

    if (!response.ok) {
      const errorData =
        response?.status === 500
          ? { detail: "Something went wrong" }
          : await response.json();
      return {
        success: false,
        errors: {
          apiError: [errorData?.detail || "Failed to update todo position"],
        },
      };
    }

    const updatedTodo = await response.json();

    return { success: true, errors: {}, todo: updatedTodo };
  } catch (err) {
    console.error("Error updating todo position:", err);
    return {
      success: false,
      errors: {
        apiError: ["Network error while updating position"],
      },
    };
  }
};

// action to delete todo
export const deleteTodo = async (id: number) => {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  if (!access) return null;
  const response = await fetch(`${env.apiUrl}/todos/${id}/`, {
    method: "DELETE",
    headers: { Accept: "application/json", Authorization: `Bearer ${access}` },
  });

  if (!response?.ok) {
    const errorData = await response.json();
    return {
      success: false,
      errors: {
        apiError: [errorData?.detail || "Failed to delete todo"],
      },
    };
  }
  return {
    success: true,
    errors: { apiError: undefined },
  };
};

// action to get todos
export const getTodos = async (search?: string, filterBy?: string) => {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) return null;

  const queries = {
    search: search || "",
    todo_date: filterBy || "",
  };
  const query = getQuery(queries);
  const res = await fetch(`${env.apiUrl}/todos/${query}`, {
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
  return todos;
};

const todoErrors = {
  title: undefined,
  description: undefined,
  priority: undefined,
  todo_date: undefined,
  apiError: undefined,
};
