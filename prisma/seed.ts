import { PrismaClient } from "@prisma/client";
import { membersData } from "./membersData";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seedMembers() {
  return membersData.map(async (member) =>
    prisma.user.create({
      data: {
        email: member.email,
        passwordHash: await hash("password", 10),
        member: {
          create: {
            name: member.name,
            photos: {
              create: {
                url: member.image,
              },
            },
          },
        },
      },
    })
  );
}
async function main() {
  await seedMembers();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
