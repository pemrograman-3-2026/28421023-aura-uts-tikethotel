-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `no_hp` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'HOTEL') NOT NULL DEFAULT 'USER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_name_key`(`name`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotels` (
    `id_hotel` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_hotel` VARCHAR(191) NOT NULL,
    `kota` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'HOTEL') NOT NULL DEFAULT 'HOTEL',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_hotel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kamars` (
    `id_kamar` INTEGER NOT NULL AUTO_INCREMENT,
    `no_kamar` VARCHAR(191) NOT NULL,
    `harga` VARCHAR(191) NOT NULL,
    `id_hotel` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_kamar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pemesanans` (
    `id_pemesanan` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_checkin` DATETIME(3) NOT NULL,
    `tanggal_checkout` DATETIME(3) NOT NULL,
    `total_harga` VARCHAR(191) NOT NULL,
    `userID` INTEGER NOT NULL,
    `kamarID` INTEGER NOT NULL,

    PRIMARY KEY (`id_pemesanan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembayarans` (
    `id_pembayaran` INTEGER NOT NULL AUTO_INCREMENT,
    `metode` VARCHAR(191) NOT NULL,
    `tanggal_bayar` DATETIME(3) NOT NULL,
    `jumlah_bayar` VARCHAR(191) NOT NULL,
    `pemesananID` INTEGER NOT NULL,

    PRIMARY KEY (`id_pembayaran`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kamars` ADD CONSTRAINT `kamars_id_hotel_fkey` FOREIGN KEY (`id_hotel`) REFERENCES `hotels`(`id_hotel`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pemesanans` ADD CONSTRAINT `pemesanans_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pemesanans` ADD CONSTRAINT `pemesanans_kamarID_fkey` FOREIGN KEY (`kamarID`) REFERENCES `kamars`(`id_kamar`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembayarans` ADD CONSTRAINT `pembayarans_pemesananID_fkey` FOREIGN KEY (`pemesananID`) REFERENCES `pemesanans`(`id_pemesanan`) ON DELETE RESTRICT ON UPDATE CASCADE;
