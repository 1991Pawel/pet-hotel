import ChatForm from "@/app/components/ChatForm";
import { mapMessageToMessageDto } from "@/lib/mapping";
import MessageList from "@/app/components/MessageList";

import styles from "./page.module.css";
import { getMessages } from "@/app/actions/messageActions";
import { createChatId } from "@/lib/utils";
import { getAuthUserId } from "@/app/actions/authActions";

export default async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  // const recipientId = userId;
  const userId = await getAuthUserId();
  const chatId = createChatId(userId, params.userId);

  const messagesData = await getMessages(params.userId);
  const messages = messagesData?.data?.map(mapMessageToMessageDto);

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageContainer}>
        <MessageList
          chatId={chatId}
          recipientId={params.userId}
          initialMessages={messages}
        />
      </div>
      <ChatForm />
    </div>
  );
}
