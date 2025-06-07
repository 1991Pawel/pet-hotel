import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/app/components/Button";
import LogoutButton from "@/app/components/LogoutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/app/components/DropdownMenu";
import Image from "next/image";

const links = [
  {
    href: "/login",
    label: "Logowanie",
  },
  {
    href: "/register/pet-owner",
    label: "Rejestracja",
  },
];

export default async function Navigation() {
  const session = await auth();
  // const userId = session?.user?.id || "";
  // const member = await getMemberByUserId(userId);
  // const memberPhotos = member?.photos ?? [];
  // const memberMainPhoto = memberPhotos.find((photo) => photo.isMain);

  return (
    <nav className="w-full px-4 py-3 border-b bg-white shadow-sm flex items-center justify-between">
      {session ? (
        <div className="flex items-center justify-between w-full">
          <ul className="flex gap-2">
            <li>
              <Button asChild>
                <Link href="/">Strona główna</Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link href="/messages?container=inbox">Wiadomości</Link>
              </Button>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-300 cursor-pointer">
                  <Image
                    src={"/assets/trash/placeholder-avatar.webp"}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/edit-profil`}>Edytuj profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <ul className="flex gap-2 ml-auto">
          {links.map((link) => (
            <li key={link.href}>
              <Button asChild>
                <Link href={link.href}>{link.label}</Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
