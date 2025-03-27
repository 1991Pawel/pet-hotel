"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions/authActions";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { Input } from "@/app/components/Input";
import { Label } from "@/app/components/Label";
import { Button } from "@/app/components/Button";
import { Checkbox } from "@/app/components/Checkbox";
import Geocoder from "@/app/components/Geocoder";

export default function RegisterPetOwnerForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      email: "",
      password: "",
      location: "",
      coordinates: [0, 0],
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);

    if (result.status === "error") {
      alert(result.error);
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
    <form noValidate className="form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">Email:</Label>
        <Input {...register("email")} type="email" id="email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password:</Label>
        <Input {...register("password")} type="password" id="password" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Geocoder {...field} onLocationSelect={handleLocationSelect} />
          )}
        />
        {errors.location && <p>{errors.location.message}</p>}
      </div>

      <br />
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
      <br />
      <Button type="submit">Log In</Button>
    </form>
  );
}
