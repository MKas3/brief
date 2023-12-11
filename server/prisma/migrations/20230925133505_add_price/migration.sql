/*
  Warnings:

  - You are about to drop the `_OrderToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Price" AS ENUM ('DEFAULT', 'PRO', 'PREMIUM');

-- DropForeignKey
ALTER TABLE "_OrderToUser" DROP CONSTRAINT "_OrderToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToUser" DROP CONSTRAINT "_OrderToUser_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userId" INTEGER,
DROP COLUMN "price",
ADD COLUMN     "price" "Price" NOT NULL;

-- DropTable
DROP TABLE "_OrderToUser";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("link") ON DELETE SET NULL ON UPDATE CASCADE;
