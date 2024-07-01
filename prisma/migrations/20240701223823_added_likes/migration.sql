/*
  Warnings:

  - Added the required column `likedById` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likedById" INTEGER NOT NULL;

-- RenameForeignKey
ALTER TABLE "Post" RENAME CONSTRAINT "Post_userId_fkey" TO "Post_userId_fkey_user";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_likedById_fkey_likedBy" FOREIGN KEY ("likedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
