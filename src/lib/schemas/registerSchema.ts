import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Wprowadź poprawny adres e-mail."),
    password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków."),
    confirmPassword: z.string().min(1, "Pole jest wymagane"),
    city: z.string().min(1, "Wpisz miasto."),
    coordinates: z.array(z.number()).length(2),
    privacyPolicy: z.boolean().refine((val) => val === true, {
      message: "Musisz zaakceptować politykę prywatności.",
    }),
    marketingConsent: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie są takie same.",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
