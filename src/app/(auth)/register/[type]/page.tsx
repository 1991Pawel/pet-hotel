import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import clsx from "clsx";
import RegisterHotelOwnerForm from "@/app/components/forms/RegisterHotelOwnerForm";
import RegisterPetOwnerForm from "@/app/components/forms/RegisterPetOwnerForm";
import { USER_TYPES } from "@/lib/constans";
import { Button } from "@/app/components/Button";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  if (type !== USER_TYPES.PET_OWNER && type !== USER_TYPES.HOTEL_OWNER) {
    return notFound();
  }

  const TABS = [
    {
      key: USER_TYPES.PET_OWNER,
      label: "Właściciel zwierząt",
    },
    {
      key: USER_TYPES.HOTEL_OWNER,
      label: "Właściciel hotelu",
    },
  ];

  return (
    <div className="container mx-auto p-6 flex flex-col gap-4">
      <h1 className="text-center text-2xl font-semibold">Rejestracja</h1>
      <Button
        asChild
        variant="link"
        className="cursor-pointer  justify-start w-fit ml-[-14px]"
      >
        <Link href="/">
          <ChevronLeft />
          Wróć na stronę główną
        </Link>
      </Button>
      <div className="flex gap-2">
        {TABS.map(({ key, label }) => (
          <Link
            key={key}
            href={`/register/${key}`}
            className={clsx(
              "text-center  h-full w-full p-2 rounded-md cursor-pointer",
              key === type ? "bg-black text-white" : "bg-gray-200"
            )}
          >
            {label}
          </Link>
        ))}
      </div>
      <div>
        {USER_TYPES.PET_OWNER === type && <RegisterPetOwnerForm />}
        {USER_TYPES.HOTEL_OWNER === type && <RegisterHotelOwnerForm />}
      </div>
      <Link className=" text-center underline" href="/login">
        Masz już konto? Zaloguj się
      </Link>
    </div>
  );
}
