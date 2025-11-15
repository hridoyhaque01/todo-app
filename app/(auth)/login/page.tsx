import LoginForm from "@/components/auth/LoginForm";

function Login() {
  return (
    <div className="w-full max-w-md mx-auto text-center p-6">
      <h2 className="text-3xl font-bold text-blue-900 leading-[30px]">
        Log in to your account
      </h2>
      <p className="text-base text-black-800 mt-2 leading-4">
        Start managing your tasks efficiently
      </p>
      <LoginForm />
    </div>
  );
}

export default Login;
