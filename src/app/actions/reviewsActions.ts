"use server";

import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";

export async function addReview(review: {
  content: string;
  rating: number;
  hotelOwnerId: string;
}) {
  try {
    const userId = await getAuthUserId();
    console.log("Authenticated user ID:", userId);

    if (!review.content || !review.rating || !review.hotelOwnerId) {
      throw new Error("Missing required fields.");
    }

    console.log("Review data:", review);

    const petOwner = await prisma.petOwner.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!petOwner) {
      throw new Error("User is not a valid PetOwner.");
    }

    console.log("Pet Owner found:", petOwner);

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

    console.log("Hotel Owner found:", hotelOwner);

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
