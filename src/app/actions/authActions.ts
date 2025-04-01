"use server";
import { signIn, auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import bycrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function signInUser(data: LoginSchema) {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { status: "success", result };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };

        default:
          return { status: "error", error: "Something went wrong" };
      }
    } else {
      return { status: "error", error: "Error" };
    }
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
}

///54m-type
export async function registerUser(data: RegisterSchema, type: string) {
  try {
    const validated = registerSchema.safeParse(data);
    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }
    // Tylko w przypadku sukcesu możemy bezpiecznie odczytać dane
    const { email, password, city } = validated.data;
    const hashedPassword = await bycrypt.hash(password, 10);
    const existingUser = await getUserByEmail(data.email);

    if (existingUser) {
      return { status: "error", error: "User already exists" };
    }

    let roleFields = {};

    if (type === "PET_OWNER") {
      roleFields = {
        petOwner: {
          create: {
            name: "",
            location: {
              create: {
                city: city,
                street: "unknown",
                postalCode: "unknown",
                latitude: 0.0,
                longitude: 0.0,
              },
            },
          },
        },
      };
    } else if (type === "hotelOwner") {
      roleFields = {
        hotelOwner: {
          create: {
            name: "",
            location: {
              create: {
                city: city,
                street: "unknown",
                postalCode: "unknown",
                latitude: 0,
                longitude: 0,
              },
            },
          },
        },
      };
    } else {
      return { status: "error", error: "Invalid user type" };
    }

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        petOwner: {
          create: {
            name: "",
            location: {
              create: {
                city: city,
              },
            },
          },
        },
      },
    });
    return { status: "success", data, user };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getAuthUserId() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    return userId;
  } catch (error) {
    throw error;
  }
}
