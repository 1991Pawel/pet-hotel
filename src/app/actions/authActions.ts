"use server";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/schemas/registerSchema";
import { LoginSchema } from "@/lib/schemas/loginSchema";

export async function signInUser(data: LoginSchema) {
  console.log(data, "informacje z z backendu");
  await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });
}

export async function registerUser(data: RegisterSchema) {
  try {
    // const validated = registerSchema.safeParse(data);
    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        name: "x1", // Maps to the 'name' field in your schema
        email: "y1", // Maps to the 'email' field in your schema
      },
    });

    return { status: "success", data, user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { status: "error", data, user: null };
  }
}
