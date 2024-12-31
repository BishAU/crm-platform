/*
  Warnings:

  - You are about to drop the `Facility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IndigenousCommunity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LandCouncil` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Outfall` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OutfallObservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OutfallPostcode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Politician` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WaterAuthority` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OutfallPostcode" DROP CONSTRAINT "OutfallPostcode_outfallId_fkey";

-- DropTable
DROP TABLE "Facility";

-- DropTable
DROP TABLE "IndigenousCommunity";

-- DropTable
DROP TABLE "LandCouncil";

-- DropTable
DROP TABLE "Outfall";

-- DropTable
DROP TABLE "OutfallObservation";

-- DropTable
DROP TABLE "OutfallPostcode";

-- DropTable
DROP TABLE "Person";

-- DropTable
DROP TABLE "Politician";

-- DropTable
DROP TABLE "WaterAuthority";

-- CreateTable
CREATE TABLE "outfalls" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "outfallName" TEXT NOT NULL,
    "authority" TEXT,
    "contact" TEXT,
    "contact_email" TEXT,
    "contact_name" TEXT,
    "indigenousNation" TEXT,
    "landCouncil" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "state" TEXT,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "outfalls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outfall_postcodes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "outfallId" UUID NOT NULL,
    "postcode" TEXT NOT NULL,
    "radius" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "outfall_postcodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outfall_observations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "outfallId" UUID NOT NULL,
    "observedBy" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "outfall_observations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "people" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "abn" TEXT,
    "address1" TEXT,
    "annualReportPreparedAndTabled" TEXT,
    "annualReports" TEXT,
    "auditor" TEXT,
    "budgetDocumentation" TEXT,
    "city" TEXT,
    "classification" TEXT,
    "company" TEXT,
    "country" TEXT,
    "createAt" TEXT,
    "creationDate" TEXT,
    "dob" TEXT,
    "description" TEXT,
    "email" TEXT,
    "establishedByUnder" TEXT,
    "establishedByUnderMoreInfo" TEXT,
    "firstName" TEXT,
    "fullName" TEXT,
    "gfsFunctionSectorReported" TEXT,
    "gfsSectorClassification" TEXT,
    "headOfficeCountry" TEXT,
    "headOfficePostcode" TEXT,
    "headOfficeState" TEXT,
    "headOfficeStreetAddress" TEXT,
    "headOfficeSuburb" TEXT,
    "lastName" TEXT,
    "materiality" TEXT,
    "newsletter" TEXT,
    "optInStatus" TEXT,
    "organisation" TEXT,
    "organistion" TEXT,
    "psActBody" TEXT,
    "phone" TEXT,
    "phoneNumber" TEXT,
    "physicalAddress" TEXT,
    "physicalAddressState" TEXT,
    "portfolio" TEXT,
    "portfolioDept" TEXT,
    "postcode" TEXT,
    "relationship" TEXT,
    "state" TEXT,
    "strategicCorporateOrganisationalPlan" TEXT,
    "surname" TEXT,
    "title" TEXT,
    "typeOfBody" TEXT,
    "websiteAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "politicians" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "address" TEXT,
    "city" TEXT,
    "eoAddress" TEXT,
    "electorate" TEXT,
    "email" TEXT,
    "fax" TEXT,
    "firstName" TEXT,
    "gender" TEXT,
    "house" TEXT,
    "lastName" TEXT,
    "lastUpdated" TEXT,
    "minAddress" TEXT,
    "minPhone" TEXT,
    "minister" TEXT,
    "poAddress" TEXT,
    "poStcode" TEXT,
    "party" TEXT,
    "partyAbb" TEXT,
    "phone" TEXT,
    "photo" TEXT,
    "politicalParty" TEXT,
    "politicianName" TEXT,
    "position" TEXT,
    "preferredName" TEXT,
    "salutation" TEXT,
    "state" TEXT,
    "surname" TEXT,
    "title" TEXT,
    "web" TEXT,
    "images" TEXT,
    "fullName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "politicians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_authorities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "authorityName" TEXT NOT NULL,
    "associatedIndigenousCommunities" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "water_authorities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indigenous_communities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "authorityName" TEXT NOT NULL,
    "associatedIndigenousCommunities" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "indigenous_communities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "land_councils" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "landCouncilName" TEXT NOT NULL,
    "email" TEXT,
    "lgas" TEXT,
    "numberOfOutfalls" TEXT,
    "outfalls" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "land_councils_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facilities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "facilityName" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longtitude" DOUBLE PRECISION,
    "postcode" TEXT,
    "regionType" TEXT,
    "sector" TEXT,
    "surburb" TEXT,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "facilities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "outfalls_outfallName_key" ON "outfalls"("outfallName");

-- CreateIndex
CREATE UNIQUE INDEX "outfall_postcodes_outfallId_postcode_radius_key" ON "outfall_postcodes"("outfallId", "postcode", "radius");

-- CreateIndex
CREATE UNIQUE INDEX "people_email_key" ON "people"("email");

-- CreateIndex
CREATE UNIQUE INDEX "politicians_email_key" ON "politicians"("email");

-- CreateIndex
CREATE UNIQUE INDEX "water_authorities_authorityName_key" ON "water_authorities"("authorityName");

-- CreateIndex
CREATE UNIQUE INDEX "indigenous_communities_authorityName_key" ON "indigenous_communities"("authorityName");

-- CreateIndex
CREATE UNIQUE INDEX "land_councils_landCouncilName_key" ON "land_councils"("landCouncilName");

-- CreateIndex
CREATE UNIQUE INDEX "facilities_facilityName_key" ON "facilities"("facilityName");

-- AddForeignKey
ALTER TABLE "outfall_postcodes" ADD CONSTRAINT "outfall_postcodes_outfallId_fkey" FOREIGN KEY ("outfallId") REFERENCES "outfalls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
