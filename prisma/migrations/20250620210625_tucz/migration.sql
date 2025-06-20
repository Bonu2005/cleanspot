/*
  Warnings:

  - You are about to drop the column `address` on the `PickupPoint` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `SpecialOffer` table. All the data in the column will be lost.
  - You are about to drop the column `validTill` on the `SpecialOffer` table. All the data in the column will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `district` to the `PickupPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `PickupPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `SpecialOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validUntil` to the `SpecialOffer` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `SpecialOffer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assignedTo_fkey";

-- AlterTable
ALTER TABLE "PickupPoint" DROP COLUMN "address",
ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "data",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "status" SET DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "SpecialOffer" DROP COLUMN "desc",
DROP COLUMN "validTill",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "validUntil" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "image" SET NOT NULL;

-- DropTable
DROP TABLE "Task";
