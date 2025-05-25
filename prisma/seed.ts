import { PrismaClient } from "@prisma/client";
import { membersData, petOwnersData } from "./membersData";
import { hash } from "bcryptjs";
import { AnimalType } from "@prisma/client";

const prisma = new PrismaClient();

async function createFirstPetOwner() {
  const firstPetOwner = petOwnersData[0];

  const user = await prisma.user.create({
    data: {
      email: firstPetOwner.email,
      passwordHash: await hash("password", 10),
      petOwner: {
        create: {
          name: firstPetOwner.name,
        },
      },
    },
    include: { petOwner: true },
  });

  if (!user.petOwner) {
    throw new Error("PetOwner was not created");
  }

  return user.petOwner.id;
}

async function seedMembers({ petOwnerId }: { petOwnerId: string }) {
  for (const member of membersData) {
    const location = member.location?.[0];

    await prisma.user.create({
      data: {
        email: member.email,

        passwordHash: await hash("password", 10),
        hotelOwner: {
          create: {
            name: member.name,
            acceptedAnimals: member.AnimalType.map(
              (type) => type as AnimalType
            ),
            profileComplete: true,
            maxPricePerNight: member.maxPricePerNight,
            minPricePerNight: member.minPricePerNight,
            descriptionHtml: member.description,
            photos: {
              create: {
                url: member.image,
              },
            },
            location: location
              ? {
                  create: {
                    city: location.city,
                    postalCode: location.postalCode,
                    street: location.street,
                    latitude: location.latitude,
                    longitude: location.longitude,
                  },
                }
              : undefined,
            reviews: member.reviews
              ? {
                  create: member.reviews.map((review) => ({
                    content: review.content,
                    rating: review.rating,
                    petOwner: {
                      connect: { id: petOwnerId },
                    },
                  })),
                }
              : undefined,
          },
        },
      },
    });
  }
}

async function main() {
  const firstPetOwnerId = await createFirstPetOwner();
  await seedMembers({
    petOwnerId: firstPetOwnerId,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
