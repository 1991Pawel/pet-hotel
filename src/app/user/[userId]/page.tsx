import { getMemberByUserId } from "@/app/actions/memberActions";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function UsersId({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const { userId } = await params;
  if (!userId) {
    return notFound();
  }
  const member = await getMemberByUserId(userId);

  if (!member) {
    return notFound();
  }
  return (
    <div>
      <div className={style.user}>
        <h2 className={style.userName}>{member.name}</h2>
        <li>
          <Link className={style.link} href={`/user/${userId}/chat`}>
            Czat
          </Link>
        </li>
        {member.photos[0].url && (
          <Image
            className={style.image}
            alt={member.name}
            src={member.photos[0].url}
            width={100}
            height={100}
          />
        )}
      </div>
    </div>
  );
}
