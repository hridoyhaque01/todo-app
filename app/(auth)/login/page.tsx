import Input from "@/components/shared/Input";
import Password from "@/components/shared/Password";
import { ROUTES } from "@/constants";
import Link from "next/link";

function Login() {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <h2 className="text-3xl font-bold text-blue-900 leading-[30px]">
        Log in to your account
      </h2>
      <p className="text-base text-black-800 mt-2 leading-4">
        Start managing your tasks efficiently
      </p>
      <form className="mt-9 flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Password label="Password" placeholder="Enter your email" required />
        <div className="flex items-center justify-between">
          <label
            htmlFor="remember"
            className="flex items-center gap-2 select-none"
          >
            <input type="checkbox" name="remember" id="remember" />
            <span className="text-sm text-blue-800 leading-[100%]">
              Remember me
            </span>
          </label>
          <Link
            href={ROUTES.LOGIN}
            className="text-sm text-blue-500 leading-3.5"
          >
            Forgot your password?
          </Link>
        </div>
        <button type="submit" className="btn btn_primary">
          Login
        </button>
        <p className="text-base leading-[100%] text-black-800">
          Don’t have an account?{" "}
          <Link className="font-medium text-blue-500" href={ROUTES.SIGNUP}>
            Register now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
