"use client";
import { ROUTES } from "@/constants";
import { useAuth } from "@/contexts";
import { signup } from "@/lib";
import Link from "next/link";
import { useActionState } from "react";
import ApiErrorText from "../shared/ErrorText";
import Input from "../shared/Input";
import Password from "../shared/Password";

function SignupForm() {
  const [actionState, signupAction, isPending] = useActionState(
    signup,
    undefined
  );
  const { signupState: state, signupDispatch: dispatch } = useAuth();
  return (
    <form action={signupAction} className="mt-9 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="first_name"
          placeholder="Enter your email"
          value={state.first_name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "SET_FIRST_NAME", payload: e.target.value })
          }
          errorMessage={actionState?.errors.first_name?.[0]}
        />
        <Input
          label="Last Name"
          name="last_name"
          placeholder="Enter your email"
          value={state.last_name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "SET_LAST_NAME", payload: e.target.value })
          }
          errorMessage={actionState?.errors?.last_name?.[0]}
        />
      </div>
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={state.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "SET_EMAIL", payload: e.target.value })
        }
        errorMessage={actionState?.errors?.email?.[0]}
      />
      <Password
        id="password"
        label="Password"
        name="password"
        placeholder="Enter your email"
        value={state.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "SET_PASSWORD", payload: e.target.value })
        }
        errorMessage={actionState?.errors?.password?.[0]}
      />
      <Password
        id="confirmPassword"
        label="Password"
        name="confirm_password"
        placeholder="Enter your email"
        value={state.confirm_password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "SET_CONFIRM_PASSWORD", payload: e.target.value })
        }
        errorMessage={actionState?.errors?.confirm_password?.[0]}
      />
      <button type="submit" className="btn btn_primary" disabled={isPending}>
        {isPending ? "Signing up..." : "Signup"}
      </button>
      <ApiErrorText className="-mt-3" errors={actionState?.errors} />
      <p className="text-base leading-[100%] text-black-800">
        Already have an account?{" "}
        <Link className="font-medium text-blue-500" href={ROUTES.login}>
          Log in
        </Link>
      </p>
    </form>
  );
}

export default SignupForm;
