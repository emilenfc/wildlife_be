-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_countryId_fkey";

-- DropForeignKey
ALTER TABLE "ContentKeyPoint" DROP CONSTRAINT "ContentKeyPoint_countryId_fkey";

-- DropForeignKey
ALTER TABLE "ImageCountry" DROP CONSTRAINT "ImageCountry_countryId_fkey";

-- AddForeignKey
ALTER TABLE "ImageCountry" ADD CONSTRAINT "ImageCountry_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentKeyPoint" ADD CONSTRAINT "ContentKeyPoint_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
