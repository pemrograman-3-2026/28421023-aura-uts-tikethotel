-- DropForeignKey
ALTER TABLE `kamars` DROP FOREIGN KEY `kamars_id_hotel_fkey`;

-- DropIndex
DROP INDEX `kamars_id_hotel_fkey` ON `kamars`;

-- AlterTable
ALTER TABLE `hotels` MODIFY `role` ENUM('USER', 'HOTEL') NOT NULL DEFAULT 'HOTEL';

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('USER', 'HOTEL') NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE `kamars` ADD CONSTRAINT `kamars_id_hotel_fkey` FOREIGN KEY (`id_hotel`) REFERENCES `hotels`(`id_hotel`) ON DELETE CASCADE ON UPDATE CASCADE;
