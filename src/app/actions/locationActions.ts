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

    const uniqueCities = [... new Set(hotels.map((hotel) => hotel?.location?.city))];
    return uniqueCities

  
  } catch (error) {
    console.error("Error fetching hotels location:", error);
    throw new Error("Failed to fetch hotels location");
  }

}
 


