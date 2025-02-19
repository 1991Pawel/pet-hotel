"use client";
import { useForm } from "react-hook-form";
import { messageSchema, MessageSchema } from "@/lib/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ChatForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: MessageSchema) => {
    console.log(data.text, "fdad");
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
