/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Politician` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorId` to the `MarketingList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MarketingList" ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Politician" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Politician_email_key" ON "Politician"("email");

-- AddForeignKey
ALTER TABLE "MarketingList" ADD CONSTRAINT "MarketingList_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
