/*
  Warnings:

  - You are about to drop the column `price` on the `Brief` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Brief" DROP COLUMN "price",
ADD COLUMN     "worth" TEXT;
