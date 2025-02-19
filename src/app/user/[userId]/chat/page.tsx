import ChatForm from "@/app/components/ChatForm";
import { useForm } from "react-hook-form";

export default async function ChatPage({
  params: { userId },
}: {
  params: {
    userId: string;
  };
}) {
  return (
    <div>
      {userId}
      <ChatForm />
    </div>
  );
}
