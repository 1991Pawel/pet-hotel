import { auth, signOut } from "@/auth";
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
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button>Sign Out</button>
          </form>
        </div>
      ) : null}
      Home Page
    </div>
  );
}
