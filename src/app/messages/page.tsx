import styles from "./page.module.css";
import { getInboxMessages } from "@/app/actions/messageActions";
import { getSentMessages } from "@/app/actions/messageActions";
import Link from "next/link";
import { mapMessageToMessageDto } from "@/lib/mapping";
import { MessagesTable } from "@/app/components/MessageTable";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: { container: string };
}) {
  const container = searchParams?.container ?? "inbox";

  const messagesData =
    container === "inbox" ? await getInboxMessages() : await getSentMessages();

  const messages = messagesData?.data?.map(mapMessageToMessageDto);

  return (
    <div className={styles.page}>
      {JSON.stringify(container)}
      {JSON.stringify(messages)}
      <nav className={styles.navbar}>
        <Link href="/messages?container=inbox" className={styles.link}>
          Odebrane
        </Link>
        <Link href="/messages?container=sent" className={styles.link}>
          Wysłane
        </Link>
      </nav>
      <MessagesTable messages={messages} isOutbox={container === "sent"} />
    </div>
  );
}
