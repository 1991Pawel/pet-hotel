"use server";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import bycrypt from "bcrypt";

export async function signInUser(data: LoginSchema) {
  await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
}

///54m-type
export async function registerUser(data: RegisterSchema) {
  try {
    const validated = registerSchema.safeParse(data);
    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }
    // Tylko w przypadku sukcesu możemy bezpiecznie odczytać dane
    const { email, password } = validated.data;
    const hashedPassword = await bycrypt.hash(password, 10);
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      return { status: "error", error: "User already exists" };
    }
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
      },
    });
    return { status: "success", data, user };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}
