/*
  Warnings:

  - You are about to drop the `Metadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Metadata";

-- CreateTable
CREATE TABLE "Tracking" (
    "key" TEXT NOT NULL,
    "time_stamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tracking_pkey" PRIMARY KEY ("key")
);
