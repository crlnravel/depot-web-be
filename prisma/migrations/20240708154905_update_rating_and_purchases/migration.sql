/*
  Warnings:

  - You are about to drop the column `rating` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `totalRatings` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "rating",
DROP COLUMN "totalRatings",
ADD COLUMN     "totalPurchases" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalRating" INTEGER NOT NULL DEFAULT 0;
