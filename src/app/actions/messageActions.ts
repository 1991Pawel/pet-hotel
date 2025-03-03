"use server";
import { messageSchema, MessageSchema } from "@/lib/schemas/messageSchema";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";

export async function createMessage(recipientId: string, data: MessageSchema) {
  try {
    const userId = await getAuthUserId();

    console.log(userId, "userId");
    const validated = messageSchema.safeParse(data);
    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }
    const { text } = validated.data;

    const message = await prisma.message.create({
      data: {
        text,
        senderId: userId,
        recipientId,
      },
    });

    return { status: "success", data: message };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getMessages(recipientId: string) {
  try {
    const userId = await getAuthUserId();

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: recipientId, recipientId: userId, senderDeleted: false },
          {
            senderId: userId,
            recipientId: recipientId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: { created: "asc" },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
          },
        },
      },
    });

    return { status: "success", data: messages };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getInboxMessages() {
  try {
    const userId = await getAuthUserId();

    const messages = await prisma.message.findMany({
      where: {
        recipientId: userId,
        recipientDeleted: false,
        senderDeleted: false,
      },
      orderBy: { created: "desc" },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
          },
        },
      },
    });

    return { status: "success", data: messages };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getSentMessages() {
  try {
    const userId = await getAuthUserId();

    const messages = await prisma.message.findMany({
      where: {
        senderId: userId,
        recipientDeleted: false,
        senderDeleted: false,
      },
      orderBy: { created: "desc" },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
          },
        },
      },
    });

    return { status: "success", data: messages };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function deleteMessage(messageId: string, isOutbox: boolean) {
  const selector = isOutbox ? "senderDeleted" : "recipientDeleted";

  try {
    const userId = await getAuthUserId();

    await prisma.message.update({
      where: { id: messageId },
      data: {
        [selector]: true,
      },
    });

    const messagesToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });

    if (messagesToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: {
          OR: messagesToDelete.map((m) => ({ id: m.id })),
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
