"use server";

import { prisma } from "@/lib/prisma";
import { AnimalType } from "@prisma/client";

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

async function getHotelOwnersFromDb({
  minPrice,
  maxPrice,
  animalTypes,
}: {
  animalTypes?: AnimalType[];
  minPrice: string;
  maxPrice: string;
}) {
  console.log(minPrice, maxPrice, "priceeeee");
  try {
    const selectedHotels = {
      where: {
        ...(animalTypes &&
          animalTypes.length > 0 && {
            acceptedAnimals: {
              hasSome: animalTypes,
            },
          }),
        AND: [
          {
            minPricePerNight: {
              lte: parseInt(maxPrice),
            },
          },
          {
            maxPricePerNight: {
              gte: parseInt(minPrice),
            },
          },
        ],
      },
    };

    return await prisma.hotelOwner.findMany({
      ...selectedHotels,
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
  } catch (error) {
    console.error("error", error);
    throw error;
  }
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

export async function getHotelOwners({
  animalTypes = [],
  minPrice = "0",
  maxPrice = "1000",
}: {
  animalTypes?: AnimalType[];
  minPrice?: string;
  maxPrice?: string;
}) {
  try {
    const hotelOwners = await getHotelOwnersFromDb({
      animalTypes,
      minPrice,
      maxPrice,
    });
    const hotelOwnersWithReviews = hotelOwnersWithAvg(hotelOwners);

    return hotelOwnersWithReviews;
  } catch (error) {
    throw error;
  }
}
