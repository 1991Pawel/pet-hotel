import { prisma } from "@/lib/prisma";
import { TokenType } from "@prisma/client";
import { randomBytes } from "crypto";
function getTokenByEmail(email: string) {
  try {
    return prisma.token.findFirst({
      where: { email },
    });
  } catch (error) {
    console.error("Error retrieving token:", error);
    throw error;
  }
}

export async function getTokenByToken(token: string) {
  try {
    return prisma.token.findFirst({
      where: { token },
    });
  } catch (error) {
    console.error("Error retrieving token:", error);
    throw error;
  }
}

export async function generateToken(email: string, type: TokenType) {
  const token = randomBytes(48).toString("hex");
  const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
  const existingToken = await getTokenByEmail(email);
  if (existingToken) {
    await prisma.token.delete({
      where: { id: existingToken.id },
    });
  }
  return prisma.token.create({
    data: {
      email,
      token,
      type,
      expires,
    },
  });
}
