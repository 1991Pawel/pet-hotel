"use client";

import { Tabs, TabsList, TabsTrigger } from "@/app/components/Tabs";
import { LoginForm } from "@/app/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <h2>Register</h2>
      <Tabs defaultValue="account" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Właściciel pupila</TabsTrigger>
          <TabsTrigger value="password">Właściciel hotelu</TabsTrigger>
        </TabsList>
        <LoginForm />
      </Tabs>
    </div>
  );
}
