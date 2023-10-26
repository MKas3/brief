/*
  Warnings:

  - Added the required column `clientDescription` to the `Brief` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyClasses` to the `Brief` table without a default value. This is not possible if the table is not empty.
  - Added the required column `concurrents` to the `Brief` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emotions` to the `Brief` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endPeople` to the `Brief` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experiments` to the `Brief` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interactionChannels` to the `Brief` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Brief` table without a default value. This is not possible if the table is not empty.
  - Added the required column `styleExamples` to the `Brief` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brief" ADD COLUMN     "clientDescription" TEXT NOT NULL,
ADD COLUMN     "companyClasses" TEXT NOT NULL,
ADD COLUMN     "concurrents" TEXT NOT NULL,
ADD COLUMN     "emotions" TEXT NOT NULL,
ADD COLUMN     "endPeople" INTEGER NOT NULL,
ADD COLUMN     "experiments" INTEGER NOT NULL,
ADD COLUMN     "interactionChannels" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "styleExamples" TEXT NOT NULL;
