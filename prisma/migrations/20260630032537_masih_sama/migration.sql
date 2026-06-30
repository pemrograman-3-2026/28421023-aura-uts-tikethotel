-- DropForeignKey
ALTER TABLE `pembayarans` DROP FOREIGN KEY `pembayarans_pemesananID_fkey`;

-- DropIndex
DROP INDEX `pembayarans_pemesananID_fkey` ON `pembayarans`;

-- AlterTable
ALTER TABLE `hotels` MODIFY `role` ENUM('USER', 'HOTEL') NOT NULL DEFAULT 'HOTEL';

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('USER', 'HOTEL') NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE `pembayarans` ADD CONSTRAINT `pembayarans_pemesananID_fkey` FOREIGN KEY (`pemesananID`) REFERENCES `pemesanans`(`id_pemesanan`) ON DELETE CASCADE ON UPDATE CASCADE;
