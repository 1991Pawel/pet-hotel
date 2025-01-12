import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Wprowadź poprawny adres e-mail."),
  password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków."),
});

export type LoginSchema = z.infer<typeof loginSchema>;
