"use client";
import { login } from "@/actions";
import { ROUTES } from "@/constants";
import { ILoginState } from "@/types";
import Link from "next/link";
import { useActionState, useReducer } from "react";
import ApiErrorText from "../shared/ErrorText";
import Input from "../shared/Input";
import Password from "../shared/Password";

const initialState: ILoginState = {
  email: "",
  password: "",
  remember: false,
};

const reducer = (state: ILoginState, action: any) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_REMEMBER":
      return { ...state, remember: action.payload };
    default:
      return state;
  }
};

function LoginForm() {
  const [actionState, loginAction, isPending] = useActionState(
    login,
    undefined
  );
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <form action={loginAction} className="mt-9 flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        name="email"
        value={state.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "SET_EMAIL", payload: e.target.value })
        }
        errorMessage={actionState?.errors?.email?.[0]}
      />

      <Password
        label="Password"
        placeholder="Enter your email"
        name="password"
        value={state.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "SET_PASSWORD", payload: e.target.value })
        }
        errorMessage={actionState?.errors?.password?.[0]}
      />

      <div className="flex items-center justify-between">
        <label
          htmlFor="remember"
          className="flex items-center gap-2 select-none"
        >
          <input
            type="checkbox"
            name="remember"
            id="remember"
            defaultChecked={state.remember}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: "SET_REMEMBER", payload: e.target.checked })
            }
          />
          <span className="text-sm text-blue-800 leading-[100%]">
            Remember me
          </span>
        </label>
        <Link href={ROUTES.login} className="text-sm text-blue-500 leading-3.5">
          Forgot your password?
        </Link>
      </div>
      <button type="submit" className="btn btn_primary" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
      <ApiErrorText className="-mt-3" errors={actionState?.errors} />
      <p className="text-base leading-[100%] text-black-800">
        Don’t have an account?{" "}
        <Link className="font-medium text-blue-500" href={ROUTES.signup}>
          Register now
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
