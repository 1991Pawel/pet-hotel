import z from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().email("Wprowadź poprawny adres e-mail."),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
