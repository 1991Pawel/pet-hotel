"use server";

import { prisma } from "@/lib/prisma";

import {
  hasUserAlreadyReviewed,
  addUserReviewFlagToReviews,
  hotelOwnersWithAvg,
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

async function getHotelOwnersFromDb() {
  return prisma.hotelOwner.findMany({
    include: {
      photos: true,
      reviews: {
        select: {
          rating: true,
        },
      },
      location: {
        select: {
          city: true,
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

    const [hotelOwnerWithReviews] = hotelOwnersWithAvg([hotel]);

    const flagUserReviews = loggedUserId
      ? addUserReviewFlagToReviews(hotel.reviews, loggedUserId)
      : hotel.reviews;

    const canAddReview = loggedUserId
      ? hasUserAlreadyReviewed(hotel.reviews, loggedUserId)
      : false;

    return {
      status: "success",
      hotel: {
        reviews: flagUserReviews,
        canAddReview,
        ...hotelOwnerWithReviews,
      },
    };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong." };
  }
}

export async function getHotelOwners() {
  try {
    const hotelOwners = await getHotelOwnersFromDb();
    const hotelOwnersWithReviews = hotelOwnersWithAvg(hotelOwners);

    return hotelOwnersWithReviews;
  } catch (error) {
    throw error;
  }
}
