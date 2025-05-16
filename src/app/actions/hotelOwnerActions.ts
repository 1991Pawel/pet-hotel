"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { EditSchema, editSchema } from "@/lib/schemas/editSchema";
import { getAuthUserId} from "./authActions";
import { getUserRole } from "./authActions";
import { USER_TYPES } from "@/lib/constans";





export async function updateHotelOwnerProfile(data: EditSchema) {
    try {
        const userId = await getAuthUserId(
            { required: true }
        );
        if (!userId) {
            return { status: "error", error: "Unauthorized" };
        }
         const userRole = await getUserRole(userId);

        if(userRole.role !== USER_TYPES.HOTEL_OWNER) { 
        
            return { status: "error", error: "Unauthorized" };
        }



      const validate = editSchema.safeParse(data);
      if (!validate.success) {
        return { status: "error", error: validate.error.errors };
      }
  
      const { name, location, coordinates,descriptionHtml } = validate.data;
  
      const updatedHotel = await prisma.hotelOwner.update({
        where: { userId },
        data: {
          name,
          descriptionHtml,
          location: {
            update: {
              city: location,
              latitude: coordinates[0],
              longitude: coordinates[1],
            },
          },
        },
      });
  
      return { status: "success", data: updatedHotel };
 
    } catch (error) {
      console.error("Update hotel owner error:", error);
      return { status: "error", error: "Something went wrong" };
    }
  }

// import {hotelOwnersWithAvg} from "@/lib/services/reviewsService";


// async function getHotelOwnersFromDb() {
//   return   prisma.hotelOwner.findMany({
//     include: {
//       photos: true,
//       reviews: {
//         select: {
//           rating: true,
//         },
//       },
//       location: {
//         select: {
//           city: true,
//         },
//       },
//     },
//   });
// }


// export async function getHotelOwners() {
//   try {
//     const hotelOwners = await getHotelOwnersFromDb();
//     const hotelOwnersWithReviews = hotelOwnersWithAvg(hotelOwners);

//     return hotelOwnersWithReviews;
//   } catch (error) {
//     console.log("Error fetching hotel owners:", error);
//     throw error;
//   }
// }


// const getHotelOwnersWithReviews = async () => {
//   const hotelOwners = await getHotelOwnersFromDb();

//   const hotelOwnersWithReviews = hotelOwners.map((hotel) => {
//     const reviewsCount = hotel.reviews.length;
//     const ratingSum = hotel.reviews.reduce(
//       (sum, review) => sum + review.rating,
//       0
//     );
//     const averageRating = reviewsCount > 0 ? ratingSum / reviewsCount : 0;

//     return {
//       ...hotel,
//       reviewsCount,
//       averageRating,
//     };
//   });

//   return hotelOwnersWithReviews;
// }


