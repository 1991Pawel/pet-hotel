import Link from "next/link";
import style from "./Navigation.module.css";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getMemberByUserId } from "@/app/actions/memberActions";

import LogoutButton from "./LogoutButton";

const links = [
  {
    href: "/login",
    label: "Logowanie",
  },
  {
    href: "/register",
    label: "Rejestracja",
  },
];

export default async function Navigation() {
  const session = await auth();
  const userId = session?.user?.id || "";
  const member = await getMemberByUserId(userId);
  if (!member) {
    return notFound();
  }
  return (
    <nav className={style.navigation}>
      {session ? (
        <>
          <ul className={style.list}>
            <li>
              <Link className={style.link} href={`/`}>
                strona główna
              </Link>
            </li>
            <li>
              <Link className={style.link} href={`/user/${userId}/edit-profil`}>
                edit
              </Link>
            </li>

            <li>
              <LogoutButton />
            </li>
          </ul>
        </>
      ) : (
        <ul className={style.list}>
          {links.map((link) => (
            <li key={link.href} className={style.listItem}>
              <Link className={style.link} href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href={`/user/${userId}/edit-profil`}>edit</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
