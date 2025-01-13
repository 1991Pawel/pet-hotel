import { auth } from "@/auth";
import styles from "./page.module.css";

export default async function Home() {
  const session = await auth();
  return (
    <div className={styles.page}>
      <br />
      {session ? (
        <div>
          <h1>Logged In</h1>
          <p>Session: {JSON.stringify(session, null, 2)}</p>
        </div>
      ) : null}
      Home Page
    </div>
  );
}
