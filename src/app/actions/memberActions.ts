"use server";
// import { auth } from "@/auth";
// import { prisma } from "@/lib/prisma";

// export async function getMembers() {
//   const session = await auth();
//   if (!session?.user) return null;

//   try {
//     return prisma.member.findMany({
//       where: {
//         NOT: {
//           userId: session.user.id,
//         },
//       },
//       include: {
//         photos: true,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// export async function getMemberByUserId(id: string) {
//   try {
//     return prisma.member.findUnique({
//       where: {
//         userId: id,
//       },
//       include: {
//         photos: true,
//         location: true,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
