/*
  Warnings:

  - You are about to drop the column `likedById` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_likedById_fkey_likedBy";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likedById";

-- RenameForeignKey
ALTER TABLE "Post" RENAME CONSTRAINT "Post_userId_fkey_user" TO "Post_userId_fkey";
