"use client";
import { useForm } from "react-hook-form";
import style from "./UserEditForm.module.css";
import { Member } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditSchema, editSchema } from "@/lib/schemas/editSchema";
import { updateMember } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";

type Props = {
  member: Member;
};

export default function UserEditForm({ member }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
  } = useForm<EditSchema>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: member.name,
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

  console.log("errors", errors);
  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} type="text" />
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
