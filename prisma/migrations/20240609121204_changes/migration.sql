/*
  Warnings:

  - You are about to drop the column `keyPoint` on the `ContentKeyPoint` table. All the data in the column will be lost.
  - Added the required column `keypoint` to the `ContentKeyPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContentKeyPoint" DROP COLUMN "keyPoint",
ADD COLUMN     "keypoint" TEXT NOT NULL;
