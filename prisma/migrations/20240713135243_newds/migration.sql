-- AlterTable
ALTER TABLE "ImageCountry" ADD COLUMN     "video" TEXT,
ALTER COLUMN "image" DROP NOT NULL;
