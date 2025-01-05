/*
  Warnings:

  - You are about to drop the column `value` on the `MarketingListFilter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `IndigenousCommunity` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "MarketingList" DROP CONSTRAINT "MarketingList_creatorId_fkey";

-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "IndigenousCommunity" ADD COLUMN     "waterAuthorities" TEXT;

-- AlterTable
ALTER TABLE "MarketingList" ALTER COLUMN "creatorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MarketingListFilter" DROP COLUMN "value";

-- AlterTable
ALTER TABLE "Outfall" ADD COLUMN     "outfall" TEXT;

-- AlterTable
ALTER TABLE "Politician" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "electorate" TEXT,
ADD COLUMN     "eoAddress" TEXT,
ADD COLUMN     "fax" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "house" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "lastUpdated" TIMESTAMP(3),
ADD COLUMN     "minAddress" TEXT,
ADD COLUMN     "minPhone" TEXT,
ADD COLUMN     "minister" BOOLEAN DEFAULT false,
ADD COLUMN     "partyAbb" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "poAddress" TEXT,
ADD COLUMN     "poPostcode" TEXT,
ADD COLUMN     "politicalParty" TEXT,
ADD COLUMN     "preferredName" TEXT,
ADD COLUMN     "salutation" TEXT,
ADD COLUMN     "surname" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "web" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "abn" TEXT,
ADD COLUMN     "address1" TEXT,
ADD COLUMN     "annualReportPrepared" BOOLEAN DEFAULT false,
ADD COLUMN     "annualReports" TEXT,
ADD COLUMN     "auditor" TEXT,
ADD COLUMN     "budgetDocumentation" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "classification" TEXT,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "creationDate" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "establishedBy" TEXT,
ADD COLUMN     "establishedByInfo" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "gfsFunction" TEXT,
ADD COLUMN     "gfsSector" TEXT,
ADD COLUMN     "headOfficeAddress" TEXT,
ADD COLUMN     "headOfficeCountry" TEXT,
ADD COLUMN     "headOfficePostcode" TEXT,
ADD COLUMN     "headOfficeState" TEXT,
ADD COLUMN     "headOfficeSuburb" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "materiality" TEXT,
ADD COLUMN     "newsletter" BOOLEAN DEFAULT false,
ADD COLUMN     "optInStatus" TEXT,
ADD COLUMN     "organisation" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "physicalAddress" TEXT,
ADD COLUMN     "physicalAddressState" TEXT,
ADD COLUMN     "portfolio" TEXT,
ADD COLUMN     "portfolioDept" TEXT,
ADD COLUMN     "postcode" TEXT,
ADD COLUMN     "psActBody" TEXT,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "relationship" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "strategicPlan" TEXT,
ADD COLUMN     "surname" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "typeOfBody" TEXT,
ADD COLUMN     "websiteAddress" TEXT;

-- CreateTable
CREATE TABLE "OutfallObservation" (
    "id" TEXT NOT NULL,
    "outfallId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flow" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutfallObservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportTicket" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT,
    "assignedToId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandCouncil" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "lgas" TEXT,
    "outfallCount" INTEGER,
    "outfalls" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandCouncil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterAuthority" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "indigenousCommunities" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterAuthority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "budget" DECIMAL(10,2),
    "targetAudience" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LandCouncil_name_key" ON "LandCouncil"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WaterAuthority_name_key" ON "WaterAuthority"("name");

-- CreateIndex
CREATE UNIQUE INDEX "IndigenousCommunity_name_key" ON "IndigenousCommunity"("name");

-- AddForeignKey
ALTER TABLE "MarketingList" ADD CONSTRAINT "MarketingList_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfallObservation" ADD CONSTRAINT "OutfallObservation_outfallId_fkey" FOREIGN KEY ("outfallId") REFERENCES "Outfall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
