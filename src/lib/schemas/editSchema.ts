import z from "zod";
import { AnimalType } from "@prisma/client";
const animalTypes = Object.values(AnimalType) as [AnimalType, ...AnimalType[]];

export const editSchema = z.object({
  name: z.string().nonempty("Name is required"),
  location: z.string().min(1, "Wpisz adres."),
  coordinates: z.array(z.number()).length(2),
  acceptedAnimals: z.array(z.enum(animalTypes)).min(1, {
    message: "Wybierz przynajmniej jeden typ zwierzęcia",
  }),
  descriptionHtml: z.string().optional(),
  minPricePerNight: z
  .number({ invalid_type_error: "Podaj minimalną cenę" })
  .int()
  .min(0, "Cena nie może być ujemna"),
maxPricePerNight: z
  .number({ invalid_type_error: "Podaj maksymalną cenę" })
  .int()
  .min(0, "Cena nie może być ujemna"),
}).refine(
(data) => data.maxPricePerNight >= data.minPricePerNight,
{
  message: "Maksymalna cena musi być większa lub równa minimalnej",
  path: ["maxPricePerNight"],
}

);

export type EditSchema = z.infer<typeof editSchema>;
