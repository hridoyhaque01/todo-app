import Input from "@/components/shared/Input";
import Password from "@/components/shared/Password";
import { ROUTES } from "@/constants";
import Link from "next/link";

function Signup() {
  return (
    <div className="w-full max-w-md mx-auto text-center p-6">
      <h2 className="text-3xl font-bold text-blue-900 leading-[30px]">
        Create your account
      </h2>
      <p className="text-base text-black-800 mt-2 leading-4">
        Start managing your tasks efficiently
      </p>
      <form className="mt-9 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" placeholder="Enter your email" required />
          <Input label="Last Name" placeholder="Enter your email" required />
        </div>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Password
          id="password"
          label="Password"
          placeholder="Enter your email"
          required
        />
        <Password
          id="confirmPassword"
          label="Password"
          placeholder="Enter your email"
          required
        />
        <button type="submit" className="btn btn_primary">
          Login
        </button>
        <p className="text-base leading-[100%] text-black-800">
          Already have an account?{" "}
          <Link className="font-medium text-blue-500" href={ROUTES.login}>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
