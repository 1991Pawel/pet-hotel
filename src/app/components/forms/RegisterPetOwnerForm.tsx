"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions/authActions";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { Input } from "@/app/components/Input";
import { Label } from "@/app/components/Label";
import { Button } from "@/app/components/Button";
import { Checkbox } from "@/app/components/Checkbox";
import Geocoder from "@/app/components/Geocoder";
import { InputErrorMessage } from "@/app/components/InputErrorMessage";
import Link from "next/link";
import { getCheckboxGroupStatus } from "@/lib/utils";

export default function RegisterPetOwnerForm() {
  const [, setAcceptAllTerms] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
      privacyPolicy: false,
      marketingConsent: false,
      coordinates: [0, 0],
    },
  });

  const privacyPolicy = watch("privacyPolicy");
  const marketingConsent = watch("marketingConsent");

  const acceptAllStatus = getCheckboxGroupStatus(
    privacyPolicy,
    marketingConsent
  );

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);
    if (result.status === "error") {
      alert(result.error);
    }
  };

  const handleAcceptAllTerms = (checked: boolean) => {
    setAcceptAllTerms(checked);
    setValue("privacyPolicy", checked, { shouldValidate: true });
    setValue("marketingConsent", checked);
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

  console.log(errors, "errors");

  return (
    <form
      className="flex flex-col gap-4"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label className="mb-2" htmlFor="email">
          E-mail:
        </Label>
        <Input {...register("email")} type="email" id="email" />

        {errors.email && (
          <InputErrorMessage errorMessage={errors.email.message} />
        )}
      </div>

      <div>
        <Label className="mb-2" htmlFor="password">
          Hasło:
        </Label>
        <Input {...register("password")} type="password" id="password" />

        {errors.password && (
          <InputErrorMessage errorMessage={errors.password.message} />
        )}
      </div>
      <div>
        <Label className="mb-2" htmlFor="password">
          Powtórz hasło:
        </Label>
        <Input
          {...register("confirmPassword")}
          type="password"
          id="confirmPassword"
        />

        {errors.confirmPassword && (
          <InputErrorMessage errorMessage={errors.confirmPassword.message} />
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

        {errors.location && (
          <InputErrorMessage errorMessage={errors.location.message} />
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          checked={acceptAllStatus}
          onCheckedChange={handleAcceptAllTerms}
          id="acceptAll"
        />

        <label
          htmlFor="acceptAll"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Zaakceptuj wszystkie zgody
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Controller
          name="marketingConsent"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketingConsent"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label
                htmlFor="marketingConsent"
                className="text-sm font-medium leading-none"
              >
                Wyrażam zgodę na otrzymywanie informacji marketingowych
              </label>
            </div>
          )}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="privacyPolicy"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacyPolicy"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label
                htmlFor="privacyPolicy"
                className="text-sm font-medium leading-none"
              >
                Zapoznałem(-am) się i akceptuję Politykę prywatności oraz
                Regulamin
              </label>
            </div>
          )}
        />
      </div>
      {errors.privacyPolicy && (
        <InputErrorMessage errorMessage={errors.privacyPolicy.message} />
      )}
      <Button type="submit">Log In</Button>
      <Link className=" text-center underline" href="/login">
        Masz już konto? Zaloguj się
      </Link>
    </form>
  );
}
