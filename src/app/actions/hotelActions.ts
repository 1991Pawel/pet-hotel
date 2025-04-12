"use server";

import { prisma } from "@/lib/prisma";

export async function getHotelById(id: string) {
  try {
    return prisma.hotelOwner.findUnique({
      where: {
        userId: id,
      },
      include: {
        photos: true,
        location: true,
        reviews: {
          select: {
            rating: true,
            content: true,
            petOwner: {
              select: {
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
