import { z } from "zod";

export const forgotPasswordSchema = z.object({
  password:z.string().min(6, "Hasło musi mieć co najmniej 6 znaków."),
  confirmPassword: z.string().min(1, "Pole jest wymagane"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Hasła nie są takie same.",
  path: ["confirmPassword"],

})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
