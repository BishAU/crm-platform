/*
  Warnings:

  - You are about to drop the column `outfall` on the `Outfall` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Outfall" DROP COLUMN "outfall",
ADD COLUMN     "indigenousCommunityId" TEXT,
ADD COLUMN     "waterAuthorityId" TEXT;

-- AddForeignKey
ALTER TABLE "Outfall" ADD CONSTRAINT "Outfall_waterAuthorityId_fkey" FOREIGN KEY ("waterAuthorityId") REFERENCES "WaterAuthority"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outfall" ADD CONSTRAINT "Outfall_indigenousCommunityId_fkey" FOREIGN KEY ("indigenousCommunityId") REFERENCES "IndigenousCommunity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
