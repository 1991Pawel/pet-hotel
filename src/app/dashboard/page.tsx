import styles from "./page.module.css";
import { getMembers } from "../actions/memberActions";
import Image from "next/image";

export default async function Dashboard() {
  const members = await getMembers();
  return (
    <div className={styles.page}>
      Dashboard
      <br />
      {members ? (
        <div className={styles.users}>
          {members.map((member) => (
            <div className={styles.usersList} key={member.id}>
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
          ))}
        </div>
      ) : null}
    </div>
  );
}
