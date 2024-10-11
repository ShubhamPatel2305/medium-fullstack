/*
  Warnings:

  - Added the required column `publishedDate` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "publishedDate" TEXT NOT NULL;
