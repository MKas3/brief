-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('EXECUTOR', 'CLIENT');

-- AlterTable
ALTER TABLE "Brief" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "clientDescription" DROP NOT NULL,
ALTER COLUMN "companyClasses" DROP NOT NULL,
ALTER COLUMN "concurrents" DROP NOT NULL,
ALTER COLUMN "emotions" DROP NOT NULL,
ALTER COLUMN "endPeople" DROP NOT NULL,
ALTER COLUMN "experiments" DROP NOT NULL,
ALTER COLUMN "interactionChannels" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "styleExamples" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "tags" "Tag"[] DEFAULT ARRAY['CLIENT']::"Tag"[];

-- CreateTable
CREATE TABLE "Order" (
    "link" SERIAL NOT NULL,
    "price" TEXT,
    "deadline" TIMESTAMP(3),
    "briefId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("link")
);

-- CreateTable
CREATE TABLE "_OrderToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToUser_AB_unique" ON "_OrderToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToUser_B_index" ON "_OrderToUser"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_briefId_fkey" FOREIGN KEY ("briefId") REFERENCES "Brief"("link") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToUser" ADD CONSTRAINT "_OrderToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("link") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToUser" ADD CONSTRAINT "_OrderToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("link") ON DELETE CASCADE ON UPDATE CASCADE;
