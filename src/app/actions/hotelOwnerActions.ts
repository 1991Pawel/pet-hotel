"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
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


