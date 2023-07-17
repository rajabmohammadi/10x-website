/*
  Warnings:

  - You are about to alter the column `country` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `country` JSON NOT NULL;
