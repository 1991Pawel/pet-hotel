/*
  Warnings:

  - You are about to drop the column `publicID` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "publicID",
ADD COLUMN     "publicId" TEXT;
