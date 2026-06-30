-- DropForeignKey
ALTER TABLE `pemesanans` DROP FOREIGN KEY `pemesanans_kamarID_fkey`;

-- DropIndex
DROP INDEX `pemesanans_kamarID_fkey` ON `pemesanans`;

-- AlterTable
ALTER TABLE `hotels` MODIFY `role` ENUM('USER', 'HOTEL') NOT NULL DEFAULT 'HOTEL';

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('USER', 'HOTEL') NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE `pemesanans` ADD CONSTRAINT `pemesanans_kamarID_fkey` FOREIGN KEY (`kamarID`) REFERENCES `kamars`(`id_kamar`) ON DELETE CASCADE ON UPDATE CASCADE;
