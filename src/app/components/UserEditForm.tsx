"use client";
import { useForm, Controller } from "react-hook-form";
import style from "./UserEditForm.module.css";
import { Member } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditSchema, editSchema } from "@/lib/schemas/editSchema";
import { updateMember } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";
import Geocoder from "./Geocoder";

type Props = {
  member: Member;
};

export default function UserEditForm({ member }: Props) {
  const { latitude, longitude } = member.location[0];
  const address = member.location[0].address;

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
      name: member.name,
      location: address,
      coordinates: [latitude, longitude],
    },
  });

  const router = useRouter();

  const onSubmit = async (data: EditSchema) => {
    const result = await updateMember(data);
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
    <div className={style.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} type="text" />
        <br />
        <br />
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Geocoder {...field} onLocationSelect={handleLocationSelect} />
          )}
        />
        <input type="hidden" {...register("coordinates")} />
        {errors.name && (
          <span>
            <br />
            {errors.name.message}
          </span>
        )}

        <br />
        <button disabled={!isValid || !isDirty || isSubmitting}>
          Update profile
        </button>
      </form>
    </div>
  );
}
