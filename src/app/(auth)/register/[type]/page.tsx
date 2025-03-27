// /app/register/[type]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsContent } from "@/app/components/Tabs";
import clsx from "clsx"; // jeśli używasz clsx (polecane)
import RegisterHotelOwnerForm from "@/app/components/forms/RegisterHotelOwnerForm";
import RegisterPetOwnerForm from "@/app/components/forms/RegisterPetOwnerForm";
import { USER_TYPES } from "@/lib/constans";

export default async function RegisterPage({
  params,
}: {
  params: { type: string };
}) {
  const { type } = await params;

  if (type !== USER_TYPES.PET_OWNER && type !== USER_TYPES.HOTEL_OWNER) {
    return notFound();
  }

  const TABS = [
    {
      key: USER_TYPES.PET_OWNER,
      label: "Właściciel zwierząt",
      Component: RegisterPetOwnerForm,
    },
    {
      key: USER_TYPES.HOTEL_OWNER,
      label: "Właściciel hotelu",
      Component: RegisterHotelOwnerForm,
    },
  ];

  return (
    <div>
      <Tabs value={type}>
        <TabsList className="grid w-full grid-cols-2">
          {TABS.map(({ key, label }) => (
            <Link
              key={key}
              href={`/register/${key}`}
              className={clsx(
                "px-4 py-2 text-center rounded-md border transition",
                key === type
                  ? "bg-primary text-white border-primary"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              )}
            >
              {label}
            </Link>
          ))}
        </TabsList>

        {TABS.map(({ key, Component }) => (
          <TabsContent key={key} value={key}>
            <Component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
