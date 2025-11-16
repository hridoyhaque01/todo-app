"use server";

import { env } from "@/config";
import { ROUTES } from "@/constants";
import {
  LoginInput,
  loginSchema,
  SignupInput,
  signupSchema,
  UpdateInput,
  updateSchema,
} from "@/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// actions for authentication

// action to login user
export const login = async (prevState: any, formData: FormData) => {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const data: LoginInput = result?.data;

  const submitData = new FormData();
  submitData.append("email", data.email);
  submitData.append("password", data.password);

  // call api to register user
  const response = await fetch(`${env.apiUrl}/auth/login/`, {
    method: "POST",
    body: submitData,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Signup failed", errorData);
    return {
      success: false,
      errors: {
        ...loginErrors,
        apiError: [errorData.detail || "Login failed"],
      },
    };
  }

  const tokens = await response.json();

  const cookieStore = await cookies();

  // If user checks "remember me"
  const remember = data.remember;

  const accessExpiry = remember ? 60 * 60 * 24 * 7 : 60 * 60; // 7 days vs 1 hour
  const refreshExpiry = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7; // 30 days vs 7 days

  cookieStore.set("access", tokens.access, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
    maxAge: accessExpiry,
  });

  cookieStore.set("refresh", tokens.refresh, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
    maxAge: refreshExpiry,
  });

  return redirect(ROUTES.dashboard);
};

// action to signup user
export const signup = async (prevState: any, formData: FormData) => {
  const result = signupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }
  const data: SignupInput = result?.data;

  const submitData = new FormData();
  submitData.append("first_name", data.first_name);
  submitData.append("last_name", data.last_name);
  submitData.append("email", data.email);
  submitData.append("password", data.password);

  // call api to register user
  const response = await fetch(`${env.apiUrl}/users/signup/`, {
    method: "POST",
    body: submitData,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Signup failed", errorData);
    return {
      success: false,
      errors: {
        ...signupErrors,
        apiError: [errorData?.detail || "Signup failed"],
      },
    };
  }

  return redirect(ROUTES.login);
};

// action to update user profile
export const updateProfile = async (prevState: any, formData: FormData) => {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  if (!access) return null;

  const result = updateSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }
  const data: UpdateInput = result?.data;
  const submitData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      submitData.append(key, value);
    }
  });

  const file = formData.get("profile_image") as File;
  if (file && file.size > 0) {
    submitData.append("profile_image", file);
  }

  // call api to register user
  const response = await fetch(`${env.apiUrl}/users/me/`, {
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
        ...updateErrors,
        apiError: [errorData?.detail || "Signup failed"],
      },
    };
  }

  const updatedUser = await response.json();
  return { success: true, errors: updateErrors, user: updatedUser };
};

// action to get authenticated user
export async function getAuthUser() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) return null;

  const res = await fetch(`${env.apiUrl}/users/me/`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access}`,
    },
  });

  if (!res.ok) return null;

  const user = await res.json();
  return user;
}

// action to logout user
export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete({ name: "access", path: "/" });
  cookieStore.delete({ name: "refresh", path: "/" });
  return redirect(ROUTES.login);
};

const loginErrors = {
  email: undefined,
  password: undefined,
};

const signupErrors = {
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  password: undefined,
  confirm_password: undefined,
};

const updateErrors = {
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  address: undefined,
  contact_number: undefined,
  birthday: undefined,
  bio: undefined,
};
