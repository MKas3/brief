/*
  Warnings:

  - The primary key for the `Brief` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fromLinkUUID` on the `Brief` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Brief` table. All the data in the column will be lost.
  - The primary key for the `BriefImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `link` on the `BriefImage` table. All the data in the column will be lost.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `link` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `link` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Brief" DROP CONSTRAINT "Brief_userId_fkey";

-- DropForeignKey
ALTER TABLE "BriefImage" DROP CONSTRAINT "BriefImage_briefId_fkey";

-- DropForeignKey
ALTER TABLE "BriefImage" DROP CONSTRAINT "selectedImages";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_briefId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropIndex
DROP INDEX "Brief_fromLinkUUID_key";

-- AlterTable
ALTER TABLE "Brief" DROP CONSTRAINT "Brief_pkey",
DROP COLUMN "fromLinkUUID",
DROP COLUMN "link",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Brief_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BriefImage" DROP CONSTRAINT "BriefImage_pkey",
DROP COLUMN "link",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BriefImage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "link",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "link",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Brief" ADD CONSTRAINT "Brief_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_briefId_fkey" FOREIGN KEY ("briefId") REFERENCES "Brief"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BriefImage" ADD CONSTRAINT "BriefImage_briefId_fkey" FOREIGN KEY ("briefId") REFERENCES "Brief"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BriefImage" ADD CONSTRAINT "selectedImages" FOREIGN KEY ("briefSelectedId") REFERENCES "Brief"("id") ON DELETE SET NULL ON UPDATE CASCADE;
