-- CreateTable
CREATE TABLE "Observation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contact_name" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_phone" TEXT,
    "media_images" TEXT[],
    "media_video" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "source" TEXT NOT NULL DEFAULT 'external',
    "observedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Observation_observedAt_idx" ON "Observation"("observedAt");