-- AlterTable
ALTER TABLE "BriefImage" ADD COLUMN     "briefSelectedId" INTEGER;

-- AddForeignKey
ALTER TABLE "BriefImage" ADD CONSTRAINT "selectedImages" FOREIGN KEY ("briefSelectedId") REFERENCES "Brief"("link") ON DELETE SET NULL ON UPDATE CASCADE;
