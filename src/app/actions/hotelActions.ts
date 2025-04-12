"use server";

import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";

export async function getHotelById(id: string) {
  try {
    const userId = await getAuthUserId();

    const hotel = await prisma.hotelOwner.findUnique({
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
                    id: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!hotel) {
      return { status: "error", error: "Hotel not found." };
    }

    let canAddReview = false;

    if (userId) {
      const hasReviewed = hotel.reviews.some(
        (review) => review.petOwner?.user?.id === userId
      );
      canAddReview = !hasReviewed;
    }

    return {
      status: "success",
      hotel,
      canAddReview,
    };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong." };
  }
}
