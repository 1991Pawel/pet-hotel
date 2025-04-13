"use server";

import { prisma } from "@/lib/prisma";

export async function getHotelById(id: string, loggedUserId?: string) {
  try {
    const hotel = await prisma.hotelOwner.findUnique({
      where: { userId: id },
      include: {
        photos: true,
        location: true,
        reviews: {
          select: {
            rating: true,
            content: true,
            createdAt: true,
            id: true,
            petOwner: {
              select: { user: { select: { id: true, email: true } } },
            },
          },
        },
      },
    });

    if (!hotel) return { status: "error", error: "Hotel not found." };

    if (loggedUserId) {
      const reviewsWithFlag = hotel.reviews.map((review) => ({
        ...review,
        isUserReview: review.petOwner?.user?.id === loggedUserId,
      }));
      const canAddReview =
        !loggedUserId || !reviewsWithFlag.some((review) => review.isUserReview);

      return {
        status: "success",
        hotel: { ...hotel, reviews: reviewsWithFlag },
        canAddReview,
      };
    }
    return {
      status: "success",
      hotel: { ...hotel, reviews: hotel.reviews },
      canAddReview: false,
    };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong." };
  }
}
