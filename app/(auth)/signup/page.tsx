import SignupForm from "@/components/auth/SignupForm";

function Signup() {
  return (
    <div className="w-full max-w-md mx-auto text-center p-6">
      <h2 className="text-3xl font-bold text-blue-900 leading-[30px]">
        Create your account
      </h2>
      <p className="text-base text-black-800 mt-2 leading-4">
        Start managing your tasks efficiently
      </p>
      <SignupForm />
    </div>
  );
}

export default Signup;
