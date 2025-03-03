"use client";
import styles from "./MessageTable.module.css";
import { deleteMessage } from "@/app/actions/messageActions";
import { useRouter } from "next/navigation";
export const MessagesTable = ({ messages, isOutbox }) => {
  const router = useRouter();
  const handleDeleteMessage = async (messageId) => {
    console.log("Deleting message with id: ", messageId);
    await deleteMessage(messageId, isOutbox);
    router.refresh();
  };

  return (
    <div className={styles.mailContainer}>
      <table className={styles.mailTable}>
        <thead>
          <tr>
            <th>Nadawca</th>
            <th>Wiadomość</th>
            <th>Data</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {messages?.map((msg, index) => (
            <tr key={index} className={styles.mailRow}>
              <td>{msg.senderName}</td>
              <td>{msg.text}</td>
              <td>{msg.created}</td>
              <td>
                <button onClick={() => handleDeleteMessage(msg.id)}>
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
