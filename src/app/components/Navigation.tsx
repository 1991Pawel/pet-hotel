import Link from "next/link";
import style from "./Navigation.module.css";
import { auth } from "@/auth";

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
  return (
    <nav className={style.navigation}>
      {session ? (
        <LogoutButton />
      ) : (
        <ul className={style.list}>
          {links.map((link) => (
            <li key={link.href} className={style.listItem}>
              <Link className={style.link} href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
