/*
  Warnings:

  - You are about to drop the column `userId` on the `Location` table. All the data in the column will be lost.
  - Added the required column `memberId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_userId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "userId",
ADD COLUMN     "memberId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
