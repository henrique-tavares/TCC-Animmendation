-- CreateTable
CREATE TABLE "Recommendation" (
    "baseAnimeId" INTEGER NOT NULL,
    "recommendedAnimeId" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("baseAnimeId","recommendedAnimeId")
);

-- CreateTable
CREATE TABLE "Metadata" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("key")
);
