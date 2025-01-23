"use server";

import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";
import { EditSchema, editSchema } from "@/lib/schemas/editSchema";

export async function updateMember(data: EditSchema) {
  console.log(data, "data");
  try {
    const userId = await getAuthUserId();

    const validate = editSchema.safeParse(data);
    if (!validate.success) {
      return { status: "error", error: validate.error.errors };
    }
    const { name } = validate.data;

    const member = await prisma.member.update({
      where: {
        userId,
      },
      data: {
        name,
      },
    });
    return { status: "success", data: member };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}
