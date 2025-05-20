"use server";
import { prisma } from "@/lib/prisma";




export async function getHotelsLocation()  {
  try {
    const hotels = await prisma.hotelOwner.findMany({
      select: {
        location: {
          select: {
            city: true,
       
          },
        },
      },
    });

    return hotels.map((hotel) => hotel?.location?.city);
  } catch (error) {
    console.error("Error fetching hotels location:", error);
    throw new Error("Failed to fetch hotels location");
  }

}
 


