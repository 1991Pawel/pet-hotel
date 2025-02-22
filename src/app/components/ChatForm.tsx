"use client";
import { useForm } from "react-hook-form";
import { messageSchema, MessageSchema } from "@/lib/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMessage } from "@/app/actions/messageActions";
import { useRouter, useParams } from "next/navigation";

export default function ChatForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isValid },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  });

  const router = useRouter();
  const params = useParams<{ userId: string }>();

  const onSubmit = async (data: MessageSchema) => {
    const result = await createMessage(params.userId, data);
    if (result.status === "error") {
      alert(result.error);
    } else {
      reset();
      router.refresh();
    }
  };

  return (
    <div>
      <h1>ChatForm</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("text")} type="text" />
        <button type="submit">Send</button>
        {errors.text && <p>{errors.text.message}</p>}
      </form>
    </div>
  );
}
