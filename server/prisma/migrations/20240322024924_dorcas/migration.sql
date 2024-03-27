/*
  Warnings:

  - Added the required column `userId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Taskstatus" ADD VALUE 'IMPORTANT';

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "imageId" INTEGER,
ALTER COLUMN "status" SET DEFAULT 'INCOMPLETE';

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
