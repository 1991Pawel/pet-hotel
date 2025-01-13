"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema";
import { signInUser } from "@/app/actions/authActions";
export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    const result = signInUser(data);
    console.log(result, "result");
  };

  return (
    <div>
      <h2>Login</h2>
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
    </div>
  );
}
