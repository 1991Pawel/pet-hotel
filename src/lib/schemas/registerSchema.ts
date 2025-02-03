import z from "zod";

export const registerSchema = z.object({
  email: z.string().email("Wprowadź poprawny adres e-mail."),
  password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków."),
  location: z.string().min(1, "Wpisz adres."),
  coordinates: z.array(z.number()).length(2),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
