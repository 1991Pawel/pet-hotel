/*
  Warnings:

  - You are about to drop the column `address` on the `Location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[petOwnerId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hotelOwnerId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "address",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "street" TEXT,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Location_petOwnerId_key" ON "Location"("petOwnerId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_hotelOwnerId_key" ON "Location"("hotelOwnerId");
