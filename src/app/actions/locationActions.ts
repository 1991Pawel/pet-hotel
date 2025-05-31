"use server";
import { prisma } from "@/lib/prisma";




export async function getHotelsLocation(): Promise<string[]> {
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

    const cities = hotels
      .map(hotel => hotel.location?.city)
      .filter((city): city is string => Boolean(city));

    const uniqueCities = Array.from(new Set(cities));

    return uniqueCities;
  
  } catch (error) {
    console.error("Error fetching hotels location:", error);
    throw new Error("Failed to fetch hotels location");
  }

}
 


