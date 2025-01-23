import z from "zod";

export const editSchema = z.object({
  name: z.string().nonempty("Name is required"),
});

export type EditSchema = z.infer<typeof editSchema>;
