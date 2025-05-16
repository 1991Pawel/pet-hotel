"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditSchema, editSchema } from "@/lib/schemas/editSchema";
import { updateHotelOwnerProfile } from "../actions/hotelOwnerActions";
import { useRouter } from "next/navigation";
import { AnimalType } from "@prisma/client";
import Geocoder from "./Geocoder";


import { Input } from "@/app/components/Input";
import { Label } from "@/app/components/Label";
import { Button } from "@/app/components/Button";

type Props = {
  hotel: {
    id: string;
    name: string | null;
    location: {
      city: string;
      latitude: number | null;
      longitude: number | null;
    } | null;
    descriptionHtml: string | null;
    minPricePerNight: number | null;
    maxPricePerNight: number | null;
    acceptedAnimals: AnimalType[];
  };
};
const animalTypes = Object.values(AnimalType) as [AnimalType, ...AnimalType[]];

export default function EditHotelProfilForm({ hotel }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    control,
  } = useForm<EditSchema>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: hotel?.name ?? "",
      acceptedAnimals: hotel?.acceptedAnimals ?? [],
      location: hotel?.location?.city ?? "",
      coordinates: hotel?.location?.latitude && hotel?.location?.longitude
        ? [hotel.location.latitude, hotel.location.longitude]
        : [0, 0],
        descriptionHtml: hotel?.descriptionHtml ?? "",
        minPricePerNight: hotel?.minPricePerNight ?? 0,
        maxPricePerNight: hotel?.maxPricePerNight ?? 0
        
        
    },
  });

  const onSubmit = async (data: EditSchema) => {
    const result = await updateHotelOwnerProfile(data);
    if (result.status === "success") {
      reset(data);
      router.refresh();
    }
  };

  const handleLocationSelect = ({
    address,
    coordinates,
  }: {
    address: string;
    coordinates: [number, number];
  }) => {
    setValue("location", address);
    setValue("coordinates", coordinates);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded-md">
      {/* {JSON.stringify(hotel)} */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Nazwa hotelu</Label>
          <Input id="name" {...register("name")} placeholder="Nazwa hotelu" />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>

          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Geocoder {...field} onLocationSelect={handleLocationSelect} />
            )}
          />
          <input type="hidden" {...register("coordinates")} />
          {errors.location && (
            <p className="text-sm text-red-500 mt-1">
              {errors.location.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="descriptionHtml">Opis hotelu (HTML)</Label>
          <textarea
            id="descriptionHtml"
            rows={5}
            className="w-full border rounded-md p-2 text-sm"
            placeholder="<p>Witaj w naszym hotelu dla psów!</p>"
            {...register("descriptionHtml")}
          />
          {errors.descriptionHtml && (
            <p className="text-sm text-red-500 mt-1">
              {errors.descriptionHtml.message}
            </p>
          )}
        </div>

<div>
  <Label>Akceptowane zwierzęta</Label>
  <div className="space-y-2">
    {animalTypes.map((type) => (
      <div key={type} className="flex items-center gap-2">
        <input
          type="checkbox"
          id={`animal-${type}`}
          value={type}
          {...register("acceptedAnimals")}
          className="h-4 w-4"
        />
        <label htmlFor={`animal-${type}`} className="text-sm">
          {type === "DOG" ? "Psy" : type === "CAT" ? "Koty" : "Inne"}
        </label>
      </div>
    ))}
  </div>
  {errors.acceptedAnimals && (
    <p className="text-sm text-red-500 mt-1">
      {errors.acceptedAnimals.message}
    </p>
  )}
</div>


<div className="flex gap-4">
  <div className="w-1/2">
    <Label htmlFor="minPricePerNight">Cena minimalna (PLN)</Label>
    <Input
      id="minPricePerNight"
      type="number"
      {...register("minPricePerNight", { valueAsNumber: true })}
      placeholder="np. 100"
    />
    {errors.minPricePerNight && (
      <p className="text-sm text-red-500 mt-1">
        {errors.minPricePerNight.message}
      </p>
    )}
  </div>

  <div className="w-1/2">
    <Label htmlFor="maxPricePerNight">Cena maksymalna (PLN)</Label>
    <Input
      id="maxPricePerNight"
      type="number"
      {...register("maxPricePerNight", { valueAsNumber: true })}
      placeholder="np. 300"
    />
    {errors.maxPricePerNight && (
      <p className="text-sm text-red-500 mt-1">
        {errors.maxPricePerNight.message}
      </p>
    )}
  </div>
</div>

        <Button
          type="submit"
          disabled={!isValid || !isDirty || isSubmitting}
          className="w-full"
        >
          Zaktualizuj profil
        </Button>
      </form>
    </div>
  );
}
