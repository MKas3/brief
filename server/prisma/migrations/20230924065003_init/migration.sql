-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "link" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("link")
);

-- CreateTable
CREATE TABLE "Brief" (
    "link" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Brief_pkey" PRIMARY KEY ("link")
);

-- CreateTable
CREATE TABLE "BriefImage" (
    "link" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "briefId" INTEGER,

    CONSTRAINT "BriefImage_pkey" PRIMARY KEY ("link")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Brief" ADD CONSTRAINT "Brief_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("link") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BriefImage" ADD CONSTRAINT "BriefImage_briefId_fkey" FOREIGN KEY ("briefId") REFERENCES "Brief"("link") ON DELETE SET NULL ON UPDATE CASCADE;
