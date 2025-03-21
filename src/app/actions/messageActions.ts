"use server";
import { messageSchema, MessageSchema } from "@/lib/schemas/messageSchema";
import { mapMessageToMessageDto } from "@/lib/mapping";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { createChatId } from "@/lib/utils";

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

    const messageDto = mapMessageToMessageDto(message);
    const chatId = createChatId(userId, recipientId);

    await pusherServer.trigger(chatId, "message:new", messageDto);

    return { status: "success", data: messageDto };
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
          {
            senderId: userId,
            recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: messageSelect,
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
      },
      orderBy: { created: "desc" },
      select: messageSelect,
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
        senderDeleted: false,
      },
      orderBy: { created: "desc" },
      select: messageSelect,
    });

    return { status: "success", data: messages };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}
export async function deleteMessage(messageId: string, isOutbox: boolean) {
  const selector = isOutbox ? "senderDeleted" : "recipientDeleted";

  console.log(selector, "selector");

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

const messageSelect = {
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
};
