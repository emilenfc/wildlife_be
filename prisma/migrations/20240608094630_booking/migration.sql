-- CreateEnum
CREATE TYPE "ContactPreference" AS ENUM ('Email', 'Phone', 'Both');

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "secondName" TEXT NOT NULL,
    "midName" TEXT,
    "email" TEXT NOT NULL,
    "phone" INTEGER,
    "messsage" TEXT,
    "contactPrefered" "ContactPreference" NOT NULL,
    "placeChosen" TEXT[],
    "travelingWith" INTEGER,
    "timeToStart" TIMESTAMP(3),
    "timeToEnd" TIMESTAMP(3),
    "travelAnytime" BOOLEAN DEFAULT false,
    "contacted" BOOLEAN NOT NULL DEFAULT false,
    "BookedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
