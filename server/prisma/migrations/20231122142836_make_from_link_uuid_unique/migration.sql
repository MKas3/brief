/*
  Warnings:

  - A unique constraint covering the columns `[fromLinkUUID]` on the table `Brief` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Brief_fromLinkUUID_key" ON "Brief"("fromLinkUUID");
