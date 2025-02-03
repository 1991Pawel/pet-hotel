"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions/authActions";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
// import Map from "@/app/components/Map";
import Geocoder from "@/app/components/Geocoder";

export default function RegisterPage() {
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
    // const result = await registerUser(data);
    console.log(data, "data");
    // if (result.status === "error") {
    //   alert(result.error);
    // }
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
    <div>
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input {...register("email")} type="email" id="email" />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input {...register("password")} type="password" id="password" />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Geocoder {...field} onLocationSelect={handleLocationSelect} />
          )}
        />
        {errors.location && <p>{errors.location.message}</p>}
        <br />
        <button type="submit">Log In</button>
      </form>
      {/* <Map /> */}
    </div>
  );
}
