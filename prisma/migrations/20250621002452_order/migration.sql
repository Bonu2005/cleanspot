-- CreateEnum
CREATE TYPE "DriverOfferStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REGECTED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentLat" DOUBLE PRECISION,
ADD COLUMN     "currentLong" DOUBLE PRECISION,
ADD COLUMN     "fcmToken" TEXT;

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courierId" TEXT,
    "locationName" TEXT NOT NULL,
    "locationLat" DOUBLE PRECISION NOT NULL,
    "locationLong" DOUBLE PRECISION NOT NULL,
    "assistantCount" INTEGER NOT NULL,
    "comment" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverOffer" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "status" "DriverOfferStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DriverOffer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverOffer" ADD CONSTRAINT "DriverOffer_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverOffer" ADD CONSTRAINT "DriverOffer_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
