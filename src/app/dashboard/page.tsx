import styles from "./page.module.css";
import { getMembers } from "../actions/memberActions";
import Image from "next/image";
import Link from "next/link";

export default async function Dashboard() {
  const members = await getMembers();

  return (
    <div className={styles.page}>
      Dashboard
      <br />
      {members ? (
        <div className={styles.users}>
          {members.map((member) => (
            <Link key={member.id} href={`/user/${member.userId}`}>
              <div className={styles.usersList}>
                <h2>{member.name}</h2>
                {member.photos[0].url && (
                  <Image
                    alt={member.name}
                    src={member.photos[0].url}
                    width={100}
                    layout="responsive"
                    height={100}
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
