"use server";

import { prisma } from "@/lib/prisma";
import {
  hasUserAlreadyReviewed,
  addUserReviewFlagToReviews,
} from "@/lib/services/reviewsService";
async function getHotelByIdFromDb(id: string) {
  return prisma.hotelOwner.findUnique({
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
            select: {
              user: {
                select: { id: true, email: true },
              },
            },
          },
        },
      },
    },
  });
}

export async function getHotelById(hotelId: string, loggedUserId?: string) {
  try {
    const hotel = await getHotelByIdFromDb(hotelId);

    if (!hotel) {
      return { status: "error", error: "Hotel not found." };
    }

    const flagUserReviews = loggedUserId
      ? addUserReviewFlagToReviews(hotel.reviews, loggedUserId)
      : hotel.reviews;

    const canAddReview = loggedUserId
      ? hasUserAlreadyReviewed(hotel.reviews, loggedUserId)
      : false;

    return {
      status: "success",
      hotel: { ...hotel, reviews: flagUserReviews, canAddReview },
    };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong." };
  }
}
