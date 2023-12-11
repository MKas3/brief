/*
  Warnings:

  - The `incorrect` column on the `Brief` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Brief" DROP COLUMN "incorrect",
ADD COLUMN     "incorrect" BOOLEAN[];
