"use server";
// import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getHotelOwners() {
  try {
    const hotelOwners = await prisma.hotelOwner.findMany({
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

    // Calculate average rating for each hotel owner
    const hotelOwnersWithAvg = hotelOwners.map((hotel) => {
      const ratings = hotel.reviews.map((review) => review.rating);
      const avgRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : null;

      return {
        ...hotel,
        avgRating,
      };
    });

    return hotelOwnersWithAvg;
  } catch (error) {
    console.log("Error fetching hotel owners:", error);
    throw error;
  }
}

export async function getMemberByUserId(id: string) {
  try {
    return prisma.member.findUnique({
      where: {
        userId: id,
      },
      include: {
        photos: true,
        location: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
