import z from "zod";

export const editSchema = z.object({
  name: z.string().nonempty("Name is required"),

  location: z.string().min(1, "Wpisz adres."),
  coordinates: z.array(z.number()).length(2),
});

export type EditSchema = z.infer<typeof editSchema>;
