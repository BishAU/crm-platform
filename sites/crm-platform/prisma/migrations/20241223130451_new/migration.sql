/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Facility` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Facility` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `IndigenousCommunity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `IndigenousCommunity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `LandCouncil` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `LandCouncil` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Outfall` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Politician` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `WaterAuthority` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `WaterAuthority` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Facility_name_key" ON "Facility"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Facility_email_key" ON "Facility"("email");

-- CreateIndex
CREATE UNIQUE INDEX "IndigenousCommunity_name_key" ON "IndigenousCommunity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "IndigenousCommunity_email_key" ON "IndigenousCommunity"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LandCouncil_name_key" ON "LandCouncil"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LandCouncil_email_key" ON "LandCouncil"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Outfall_name_key" ON "Outfall"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Politician_email_key" ON "Politician"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WaterAuthority_name_key" ON "WaterAuthority"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WaterAuthority_email_key" ON "WaterAuthority"("email");
