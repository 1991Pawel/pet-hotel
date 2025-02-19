import Link from "next/link";
import style from "./Navigation.module.css";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getMemberByUserId } from "@/app/actions/memberActions";
import Image from "next/image";

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
  const memberPhotos = member?.photos ?? [];
  const memberMainPhoto = memberPhotos.find((photo) => photo.isMain);

  return (
    <nav className={style.navigation}>
      {session ? (
        <div className={style.auth}>
          <ul className={style.list}>
            <li>
              <Link className={style.link} href={`/`}>
                strona główna
              </Link>
            </li>
            <li>
              <Link className={style.link} href={`/user/${userId}/chat`}>
                Czat
              </Link>
            </li>
          </ul>

          <div className={style.user}>
            <LogoutButton />
            <Link href={`/user/${userId}/edit-profil`}>
              <div className={style.avatar}>
                <Image
                  src={
                    memberMainPhoto?.url || "/assets/placeholder-avatar.webp"
                  }
                  height={32}
                  width={32}
                  alt="avatar"
                />
              </div>
            </Link>
          </div>
        </div>
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
