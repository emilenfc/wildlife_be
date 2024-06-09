/*
  Warnings:

  - Added the required column `content` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keyfact` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `population` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `security` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "keyfact" TEXT NOT NULL,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "population" INTEGER NOT NULL,
ADD COLUMN     "security" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ImageCountry" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "ImageCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentKeyPoint" (
    "id" SERIAL NOT NULL,
    "keyPoint" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "ContentKeyPoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageCountry" ADD CONSTRAINT "ImageCountry_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentKeyPoint" ADD CONSTRAINT "ContentKeyPoint_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
