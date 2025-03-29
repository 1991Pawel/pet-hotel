"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/app/components/Button";

export default function LogoutButton() {
  const handleSignOut = async () => {
    await signOut();
  };
  return <Button onClick={handleSignOut}>Wyloguj</Button>;
}
