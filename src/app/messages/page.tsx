import styles from "./page.module.css";
import { getInboxMessages } from "@/app/actions/messageActions";
import { getSentMessages } from "@/app/actions/messageActions";
import Link from "next/link";
import { mapMessageToMessageDto } from "@/lib/mapping";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: { container: string };
}) {
  const container = searchParams?.container || "inbox";

  const messagesData =
    container === "inbox" ? await getInboxMessages() : await getSentMessages();

  const messages = messagesData?.data?.map(mapMessageToMessageDto);

  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <Link href="/messages?container=inbox" className={styles.link}>
          Odebrane
        </Link>
        <Link href="/messages?container=sent" className={styles.link}>
          Wysłane
        </Link>
      </nav>

      <div className={styles.mailContainer}>
        <table className={styles.mailTable}>
          <thead>
            <tr>
              <th>Nadawca</th>
              <th>Wiadomość</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((msg, index) => (
              <tr key={index} className={styles.mailRow}>
                <td>{msg.senderName}</td>
                <td>{msg.text}</td>
                <td>{msg.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
