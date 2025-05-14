"use client";
import {  useState} from "react";
import { generateResetPasswordEmail } from "@/app/actions/authActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {Button} from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { Label } from "@/app/components/Label";
import { ResetPasswordSchema,resetPasswordSchema } from "@/lib/schemas/resetPasswordSchema";
import { InputErrorMessage } from "@/app/components/InputErrorMessage";



export default function ForgotPasswordForm() {
  const [result, setResult] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    const email = data.email;
  
    try {
      const result = await generateResetPasswordEmail(email);
  
      if (result.status === "success") {
        setResult(result.data);
      } else {
        
        setResult("Wystąpił błąd podczas resetowania hasła.");
      }
    } catch (error) {
      console.error("Wyjątek podczas resetowania hasła:", error);
      setResult('Wystąpił błąd podczas resetowania hasła.');
  
    } finally {
      reset(); 
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col gap-4">
      {result && (
        <div>
          <p className="text-center">{result}</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <div>
        <Label className="mb-2" htmlFor="email">
         Email:
        </Label>
          <Input
            type="email"
            id="email"
            {...register("email", { required: "Email jest wymagany" })}
            className="border border-gray-300 rounded p-2 w-full"
          />
          {errors.email && (
            <InputErrorMessage errorMessage={errors.email.message} />
          )}
        </div>
        <Button
          type="submit"
         
        >
          Wyślij link do resetowania hasła
        </Button>
      </form>
    </div>
  
  );
}

export { ForgotPasswordForm };
