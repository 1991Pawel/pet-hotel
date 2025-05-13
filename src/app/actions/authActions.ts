"use server";
import { signIn, auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import bycrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { USER_TYPES } from "@/lib/constans";
import { generateToken } from "@/lib/token";
import { TokenType } from "@prisma/client";
import { getTokenByToken } from "@/lib/token";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/mail";
import { ActionResult } from "@/types";
export async function signInUser(data: LoginSchema) {
  try {
    const existingUser = await getUserByEmail(data.email);

    if (!existingUser || !existingUser.email) {
      return { status: "error", error: "Invalid credentials" };
    }
    if (!existingUser.emailVerified) {
      ///todo send email
      return { status: "error", error: "Email not verified" };
    }

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

    const { email, password, city } = validated.data;
    const hashedPassword = await bycrypt.hash(password, 10);
    const existingUser = await getUserByEmail(data.email);

    if (existingUser) {
      return { status: "error", error: "User already exists" };
    }

    let roleFields = {};

    if (USER_TYPES.PET_OWNER === type) {
      roleFields = {
        petOwner: {
          create: {
            location: {
              create: {
                city: city,
              },
            },
          },
        },
      };
    } else if (USER_TYPES.HOTEL_OWNER === type) {
      roleFields = {
        hotelOwner: {
          create: {
            location: {
              create: {
                city: city,
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
        ...roleFields,
      },
    });

    const verificationToken = await generateToken(
      email,
      TokenType.EMAIL_VERIFICATION
    );
    //todo send email
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { status: "success", user };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getAuthUserId({
  required = true,
}: {
  required?: boolean;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId && required) {
      throw new Error("Unauthorized");
    }

    return userId;
  } catch (error) {
    throw error;
  }
}

export async function getUserRole(userId: string) {
  try {
    if (!userId) {
      return { status: "error", error: "Unauthorized" };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        petOwner: true,
        hotelOwner: true,
      },
    });

    if (!user) {
      return { status: "error", error: "User not found" };
    }

    if (user.petOwner) {
      return { status: "success", role: USER_TYPES.PET_OWNER };
    }

    if (user.hotelOwner) {
      return { status: "success", role: USER_TYPES.HOTEL_OWNER };
    }

    return { status: "error", error: "User role not assigned" };
  } catch (error) {
    console.error("Error fetching user role:", error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function generateResetPasswordEmail(email: string) {
  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { status: "error", error: "User not found" };
    }

    const token = await generateToken(email, TokenType.PASSWORD_RESET);
    await sendPasswordResetEmail(token.email, token.token);

    return { status: "success", data: "Email sent" };
  } catch (error) {
    console.error("Error generating reset password email:", error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function verifyEmail(token: string) {
  try {
    //
    const existingToken = await getTokenByToken(token);
    if (!existingToken) {
      return { status: "error", error: "User not found" };
    }

    const hasExpired = new Date() > existingToken.expires;

    if (hasExpired) {
      return { status: "error", error: "Token expired" };
    }
    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { status: "error", error: "User not found" };
    }
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date() },
    });
    await prisma.token.delete({
      where: { id: existingToken.id },
    });
    return { status: "success", data: "Email verified" };
  } catch (error) {
    console.error("Error verifying email:", error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function resetPassword(password:string,token:string | null):Promise<ActionResult<string>> {
  try {
    
    if(!token) {
      return { status: "error", error: "Token not provided" };
    }
    const existingToken = await getTokenByToken(token);
    if (!existingToken) {
      return { status: "error", error: "User not found" };
    }
    const hasExpired = new Date() > existingToken.expires;
    if (hasExpired) {
      return { status: "error", error: "Token expired" };
    }
    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { status: "error", error: "User not found" };
    }

    const hashedPassword = await bycrypt.hash(password, 10);
    
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { passwordHash:hashedPassword},
    });

    await prisma.token.delete({
      where: { id: existingToken.id },
    });
    return { status: "success", data: "Password reset successfully" };
  
    
  
  } catch (error) {
    console.error("Error resetting password:", error);
    return { status: "error", error: "Something went wrong" };
  }
}