-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('PENDING', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "progress" "Progress" NOT NULL DEFAULT 'PENDING';
