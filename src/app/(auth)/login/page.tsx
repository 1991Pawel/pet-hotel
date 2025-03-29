import LoginForm from "@/app/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="container mx-auto p-6 flex flex-col gap-4">
      <h2 className="text-center text-2xl font-semibold">Witaj ponownie!</h2>
      <LoginForm />
    </div>
  );
}
