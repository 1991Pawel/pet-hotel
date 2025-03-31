import LoginForm from "@/app/components/forms/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container mx-auto p-6 flex flex-col gap-4">
      <h1 className="text-center text-2xl font-semibold">Witaj ponownie!</h1>
      <LoginForm />
      <Link className=" text-center underline" href="/register/pet-owner">
        Chcesz dołączyć? Załóż konto
      </Link>
    </div>
  );
}
