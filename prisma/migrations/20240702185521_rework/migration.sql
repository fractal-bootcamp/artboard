/*
  Warnings:

  - You are about to drop the column `color` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Post` table. All the data in the column will be lost.
  - Added the required column `pitch` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voice` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volume` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "color",
DROP COLUMN "size",
ADD COLUMN     "pitch" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "voice" TEXT NOT NULL,
ADD COLUMN     "volume" DOUBLE PRECISION NOT NULL;
