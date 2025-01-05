/*
  Warnings:

  - You are about to drop the column `facilityName` on the `facilities` table. All the data in the column will be lost.
  - You are about to drop the column `authorityName` on the `indigenous_communities` table. All the data in the column will be lost.
  - You are about to drop the column `landCouncilName` on the `land_councils` table. All the data in the column will be lost.
  - You are about to drop the column `outfallName` on the `outfalls` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `people` table. All the data in the column will be lost.
  - You are about to drop the column `politicianName` on the `politicians` table. All the data in the column will be lost.
  - You are about to drop the column `authorityName` on the `water_authorities` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `facilities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `indigenous_communities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `land_councils` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `outfalls` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `water_authorities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `facilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `indigenous_communities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `land_councils` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `outfalls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `water_authorities` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "facilities_facilityName_key";

-- DropIndex
DROP INDEX "indigenous_communities_authorityName_key";

-- DropIndex
DROP INDEX "land_councils_landCouncilName_key";

-- DropIndex
DROP INDEX "outfalls_outfallName_key";

-- DropIndex
DROP INDEX "water_authorities_authorityName_key";

-- AlterTable
ALTER TABLE "facilities" DROP COLUMN "facilityName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "indigenous_communities" DROP COLUMN "authorityName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "land_councils" DROP COLUMN "landCouncilName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "outfalls" DROP COLUMN "outfallName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "people" DROP COLUMN "fullName",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "politicians" DROP COLUMN "politicianName",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "water_authorities" DROP COLUMN "authorityName",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "facilities_name_key" ON "facilities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "indigenous_communities_name_key" ON "indigenous_communities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "land_councils_name_key" ON "land_councils"("name");

-- CreateIndex
CREATE UNIQUE INDEX "outfalls_name_key" ON "outfalls"("name");

-- CreateIndex
CREATE UNIQUE INDEX "water_authorities_name_key" ON "water_authorities"("name");
