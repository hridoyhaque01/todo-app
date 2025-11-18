import { ROUTES } from "@/constants";
import Link from "next/link";

function Home() {
  return (
    <section className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Welcome to the Todo App</h1>
      <Link
        href={ROUTES.login}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Login
      </Link>
    </section>
  );
}

export default Home;
