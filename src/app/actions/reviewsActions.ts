"use server";

import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";


export async function addReview(review: {
  content: string;
  rating: number;
  hotelOwnerId: string;
}) {
  try {
    const userId = await getAuthUserId({ required: true });

    if (!review.content || !review.rating || !review.hotelOwnerId) {
      throw new Error("Missing required fields.");
    }

    const petOwner = await prisma.petOwner.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!petOwner) {
      throw new Error("User is not a valid PetOwner.");
    }



    const hotelOwner = await prisma.hotelOwner.findUnique({
      where: {
        userId: review.hotelOwnerId,
      },
    });

    if (!hotelOwner) {
      throw new Error(
        `HotelOwner with userId ${review.hotelOwnerId} does not exist.`
      );
    }


    const existingReview = await prisma.review.findFirst({
      where: {
        petOwnerId: petOwner.id,
        hotelOwnerId: hotelOwner.id,
      },
    });

    if (existingReview) {
      throw new Error("You have already reviewed this hotel.");
    }


    const createdReview = await prisma.review.create({
      data: {
        content: review.content,
        rating: review.rating,
        hotelOwnerId: hotelOwner.id,
        petOwnerId: petOwner.id,
      },
    });

    console.log("Created review:", createdReview);

    return { status: "success", data: createdReview };
  } catch (error) {
    console.error(
      "Error adding review:",
      error instanceof Error ? error.message : error
    );
    return { status: "error", error: "Something went wrong" };
  }
}

export async function updateReview(review: {
  content: string;
  rating: number;

  reviewId: string;
}) {
  try {
    const userId = await getAuthUserId();

    if (!review.content || !review.rating || !review.reviewId) {
      throw new Error("Missing required fields.");
    }

    // Sprawdzenie, czy użytkownik jest właścicielem zwierzęcia (PetOwner)
    const petOwner = await prisma.petOwner.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!petOwner) {
      throw new Error("User is not a valid PetOwner.");
    }

    const reviewToUpdate = await prisma.review.findUnique({
      where: {
        id: review.reviewId,
      },
    });
    if (!reviewToUpdate) {
      throw new Error("Review not found.");
    }

    // Aktualizacja recenzji
    const updatedReview = await prisma.review.update({
      where: {
        id: review.reviewId,
      },
      data: {
        content: review.content,
        rating: review.rating,
      },
    });

    return { status: "success", data: updatedReview };
  } catch (error) {
    console.error(
      "Error updating review:",
      error instanceof Error ? error.message : error
    );
    return { status: "error", error: "Something went wrong" };
  }
}
