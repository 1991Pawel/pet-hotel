"use client";
import {  useState} from "react";
import { generateResetPasswordEmail } from "@/app/actions/authActions";
import { useForm } from "react-hook-form";

export default function ForgotPasswordForm() {
  const [result, setResult] = useState<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit  = async(data: any) => {
    console.log("Form data:", data);
    const email = data.email;
    console.log("Email:", email);
    // await generateResetPasswordEmail(email)
    const result = await generateResetPasswordEmail(email);
    console.log("Result:", result);
    setResult(result);

    // Tu możesz dodać logikę wysyłki zapytania do API
  };

  return (
    <div className="container mx-auto p-6 flex flex-col gap-4">
      <h1 className="text-center text-2xl font-semibold">Zapomniałeś hasła?</h1>
      <p className="text-center">
        Wpisz swój adres e-mail, aby otrzymać link do resetowania hasła.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <div>
          <label className="mb-2 block" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email jest wymagany" })}
            className="border border-gray-300 rounded p-2 w-full"
          />
      
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Wyślij link do resetowania hasła
        </button>
      </form>
    </div>
  
  );
}

export { ForgotPasswordForm };
