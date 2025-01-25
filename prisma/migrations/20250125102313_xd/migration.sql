-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "publicID" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';
