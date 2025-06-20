-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "StatusUser" NOT NULL DEFAULT 'INACTIVE';
