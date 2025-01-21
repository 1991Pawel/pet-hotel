import { getMemberByUserId } from "@/app/actions/memberActions";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function UsersId({
  params: { userId },
}: {
  params: {
    userId: string;
  };
}) {
  const member = await getMemberByUserId(userId);

  if (!member) {
    return notFound();
  }
  return (
    <div>
      <div className={styles.user}>
        <h2 className={styles.userName}>{member.name}</h2>

        {member.photos[0].url && (
          <Image
            className={styles.image}
            alt={member.name}
            src={member.photos[0].url}
            width={100}
            layout="responsive"
            height={100}
          />
        )}
      </div>
    </div>
  );
}
