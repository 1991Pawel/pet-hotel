"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {forgotPasswordSchema,ForgotPasswordSchema} from "@/lib/schemas/forgotPasswordSchema";
import { Input } from "@/app/components/Input";
import { Label } from "@/app/components/Label";
import { Button } from "@/app/components/Button";
import { InputErrorMessage } from "@/app/components/InputErrorMessage";
import { resetPassword } from "@/app/actions/authActions";
import {useSearchParams} from "next/navigation";


export default function RegisterPetOwnerForm() {
  const [result, setResult] = useState<string | null>(null);
  const searchParams = useSearchParams();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });



  const onSubmit = async (data: ForgotPasswordSchema) => {
    const password = data.password;
    const token = searchParams.get("token");
  
    if (!token) {
      setResult("Brak tokenu w adresie URL.");
      return;
   
    }
  
    try {
      const response = await resetPassword(password, token);
  
      if (response.status === "success") {
        setResult(response.data);
      } else {
    
        setResult("Wystąpił błąd podczas resetowania hasła.");
   
      }
    } catch (error) {
      setResult("Wystąpił błąd podczas resetowania hasła.");
      console.error("Wyjątek podczas resetowania hasła:", error);
    } finally {
      reset();
    }
  };


 

  return (
    <form
      className="flex flex-col gap-4"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >  {result && (
      <div className="mt-4">
        {result}
      </div>
    )}
    
      <div>
        <Label className="mb-2" htmlFor="password">
          Hasło:
        </Label>
        <Input {...register("password")} type="password" id="password" />

        {errors.password && (
          <InputErrorMessage errorMessage={errors.password.message} />
        )}
      </div>
      <div>
        <Label className="mb-2" htmlFor="password">
          Powtórz hasło:
        </Label>
        <Input
          {...register("confirmPassword")}
          type="password"
          id="confirmPassword"
        />

        {errors.confirmPassword && (
          <InputErrorMessage errorMessage={errors.confirmPassword.message} />
        )}
      </div>

   

      <Button type="submit">Resetuj Hasło</Button>
    
    </form>
  );
}
