"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { type AnimalType } from "@prisma/client";
import { type HotelWithReviews } from "@/types";

import {
  hasUserAlreadyReviewed,
  addUserReviewFlagToReviews,
  hotelOwnersWithAvg,
} from "@/lib/services/reviewsService";

async function getHotelByIdFromDb(
  id: string
): Promise<HotelWithReviews | null> {
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

async function getHotelOwnersFromDb({
  minPrice,
  maxPrice,
  animalTypes,
  city,
  page = 1,
  limit = 10,
  reviews = false,
  searchQuery = "",
}: {
  animalTypes?: AnimalType[];
  minPrice: string;
  maxPrice: string;
  city?: string;
  page?: number;
  limit?: number;
  reviews?: boolean;
  searchQuery?: string;
}) {
  try {
    const selectedHotels = {
      where: {
        ...(searchQuery && {
          name: {
            contains: searchQuery,
            mode: Prisma.QueryMode.insensitive,
          },
        }),
        ...(animalTypes &&
          animalTypes.length > 0 && {
            acceptedAnimals: {
              hasSome: animalTypes,
            },
          }),
        minPricePerNight: {
          lte: parseInt(maxPrice),
        },
        maxPricePerNight: {
          gte: parseInt(minPrice),
        },
        ...(city
          ? {
              location: {
                is: {
                  city: {
                    equals: city,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              },
            }
          : {}),
      },
    };

    const totalCount = await prisma.hotelOwner.count(selectedHotels);
    const totalPages = Math.ceil(totalCount / limit);

    const hotels = await prisma.hotelOwner.findMany({
      take: limit,
      skip: (page - 1) * limit,
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
    const hotelOwnersWithReviews = reviews
      ? hotelOwnersWithAvg(hotels)
      : hotels;
    return {
      hotels: hotelOwnersWithReviews,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
    };
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}

export async function getHotelOwners({
  animalTypes = [],
  minPrice = "0",
  maxPrice = "1000",
  city = "",
  page = 1,
  limit = 10,
  reviews = false,
  searchQuery = "",
}: {
  animalTypes?: AnimalType[];
  minPrice?: string;
  maxPrice?: string;
  city?: string;
  page?: number;
  limit?: number;
  reviews?: boolean;
  searchQuery?: string;
}) {
  try {
    const hotelOwners = await getHotelOwnersFromDb({
      animalTypes,
      minPrice,
      maxPrice,
      city,
      page,
      limit,
      searchQuery,
      reviews,
    });

    return hotelOwners;
  } catch (error) {
    throw error;
  }
}
