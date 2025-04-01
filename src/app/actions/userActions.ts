"use server";

import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";
import { EditSchema, editSchema } from "@/lib/schemas/editSchema";
import { getMemberByUserId } from "./memberActions";
import { cloudinary } from "@/lib/cloudinary";

// export async function createUser(data: RegisterSchema) {}

export async function updateMember(data: EditSchema) {
  try {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);

    if (member === null) {
      return { status: "error", error: "Member not found" };
    }

    const validate = editSchema.safeParse(data);
    if (!validate.success) {
      return { status: "error", error: validate.error.errors };
    }
    const { name, location, coordinates } = validate.data;

    const memberData = await prisma.member.update({
      where: { userId },
      data: {
        name,
        location: {
          updateMany: {
            where: { memberId: member.id },
            data: {
              address: location,
              latitude: coordinates[1],
              longitude: coordinates[0],
            },
          },
        },
      },
    });

    return { status: "success", data: memberData };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function addImage(url: string, publicId: string) {
  try {
    const userId = await getAuthUserId();

    const member = await prisma.member.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!member) {
      return { status: "error", error: "Member not found" };
    }
    const hasPhotos = await prisma.photo.findFirst({
      where: { memberId: member.id },
    });

    //check if user already has a  picture

    return prisma.member.update({
      where: {
        userId,
      },
      data: {
        photos: {
          create: {
            url,
            publicId,
            isMain: !hasPhotos,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function deleteImage(photoId: string) {
  try {
    const userId = await getAuthUserId();

    if (photoId) {
      await cloudinary.v2.uploader.destroy(photoId);
    }

    return prisma.member.update({
      where: {
        userId,
      },
      data: {
        photos: {
          delete: {
            id: photoId,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function setMainImage(photoId: string) {
  try {
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
      select: { memberId: true },
    });

    if (!photo) {
      throw new Error("Zdjęcie nie istnieje.");
    }

    await prisma.photo.updateMany({
      where: { memberId: photo.memberId },
      data: { isMain: false },
    });

    return await prisma.photo.update({
      where: { id: photoId },
      data: { isMain: true },
    });
  } catch (error) {
    throw error;
  }
}
