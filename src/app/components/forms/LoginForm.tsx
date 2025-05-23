"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema";
import { signInUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/Input";
import { Label } from "@/app/components/Label";
import { Button } from "@/app/components/Button";
import { toast } from "sonner";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);
    if (result.status === "success") {
      router.push("/dashboard");
    } else if (result.status === "error") {
      toast.error("Coś poszło nie tak. ", {
        description: result.error,
      });
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label className="mb-2" htmlFor="email">
          Email:
        </Label>
        <Input {...register("email")} type="email" id="email" />
      </div>

      <div>
        <Label className="mb-2" htmlFor="password">
          Password:
        </Label>
        <Input {...register("password")} type="password" id="password" />
      </div>

      <Button onClick={handleSubmit(onSubmit)} type="submit">
        Zaloguj się
      </Button>
    </form>
  );
}

export { LoginForm };
