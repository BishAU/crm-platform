/*
  Warnings:

  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `facilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `indigenous_communities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `land_councils` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `outfall_observations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `outfall_postcodes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `outfall_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `outfalls` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `people` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `politicians` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `support_tickets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `water_authorities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "outfall_postcodes" DROP CONSTRAINT "outfall_postcodes_outfallId_fkey";

-- DropForeignKey
ALTER TABLE "support_tickets" DROP CONSTRAINT "support_tickets_assignedToId_fkey";

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "facilities";

-- DropTable
DROP TABLE "indigenous_communities";

-- DropTable
DROP TABLE "land_councils";

-- DropTable
DROP TABLE "outfall_observations";

-- DropTable
DROP TABLE "outfall_postcodes";

-- DropTable
DROP TABLE "outfall_types";

-- DropTable
DROP TABLE "outfalls";

-- DropTable
DROP TABLE "people";

-- DropTable
DROP TABLE "politicians";

-- DropTable
DROP TABLE "support_tickets";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "water_authorities";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Outfall" (
    "id" TEXT NOT NULL,
    "authority" TEXT,
    "contact" TEXT,
    "contact_email" TEXT,
    "contact_name" TEXT,
    "indigenousNation" TEXT,
    "landCouncil" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "state" TEXT,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "outfallName" TEXT,

    CONSTRAINT "Outfall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutfallPostcode" (
    "id" TEXT NOT NULL,
    "outfallId" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "radius" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutfallPostcode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Politician" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "party" TEXT,
    "position" TEXT,
    "state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Politician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingListEntity" (
    "id" TEXT NOT NULL,
    "marketingListId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketingListEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingListFilter" (
    "id" TEXT NOT NULL,
    "marketingListEntityId" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketingListFilter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutfallPostcode" ADD CONSTRAINT "OutfallPostcode_outfallId_fkey" FOREIGN KEY ("outfallId") REFERENCES "Outfall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingListEntity" ADD CONSTRAINT "MarketingListEntity_marketingListId_fkey" FOREIGN KEY ("marketingListId") REFERENCES "MarketingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingListFilter" ADD CONSTRAINT "MarketingListFilter_marketingListEntityId_fkey" FOREIGN KEY ("marketingListEntityId") REFERENCES "MarketingListEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
