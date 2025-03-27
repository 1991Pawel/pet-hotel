"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema";
import { signInUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);
    if (result.status === "success") {
      router.push("/dashboard");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input {...register("email")} type="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input {...register("password")} type="password" id="password" />
      </div>

      <button onClick={handleSubmit(onSubmit)} type="submit">
        Log In
      </button>
    </form>
  );
}

export { LoginForm };
