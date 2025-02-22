import ChatForm from "@/app/components/ChatForm";
import { mapMessageToMessageDto } from "@/lib/mapping";

import styles from "./page.module.css";
import { getMessages } from "@/app/actions/messageActions";
export default async function ChatPage({
  params: { userId },
}: {
  params: {
    userId: string;
  };
}) {
  const recipmentId = userId;

  const messagesData = await getMessages(recipmentId);
  const messages = messagesData?.data?.map(mapMessageToMessageDto);

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageContainer}>
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={
              msg.senderId === recipmentId
                ? styles.sentMessage
                : styles.receivedMessage
            }
          >
            <p className={styles.name}>{msg.senderName}</p>
            <p className={styles.message}>{msg.text}</p>
            <p className={styles.time}>{msg.created}</p>
          </div>
        ))}
      </div>
      <ChatForm />
    </div>
  );
}
