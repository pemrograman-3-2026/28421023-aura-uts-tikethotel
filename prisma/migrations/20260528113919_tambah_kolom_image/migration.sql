/*
  Warnings:

  - Added the required column `image` to the `pemesanans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hotels` MODIFY `role` ENUM('USER', 'HOTEL') NOT NULL DEFAULT 'HOTEL';

-- AlterTable
ALTER TABLE `pemesanans` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('USER', 'HOTEL') NOT NULL DEFAULT 'USER';
