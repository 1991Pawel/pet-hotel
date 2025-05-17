-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('DOG', 'CAT', 'OTHER');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- AlterTable
ALTER TABLE "HotelOwner" ADD COLUMN     "acceptedAnimals" "AnimalType"[],
ADD COLUMN     "descriptionHtml" TEXT,
ADD COLUMN     "maxPricePerNight" INTEGER,
ADD COLUMN     "minPricePerNight" INTEGER,
ADD COLUMN     "profileComplete" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "PetOwner" ADD COLUMN     "profileComplete" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "type" "TokenType" NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_email_token_key" ON "Token"("email", "token");
