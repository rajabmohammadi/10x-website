-- CreateTable
CREATE TABLE `used_carparts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CustomLabel` INTEGER NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Hersteller` VARCHAR(191) NOT NULL,
    `Modell` VARCHAR(191) NOT NULL,
    `PicURL` VARCHAR(191) NOT NULL,
    `Price` DECIMAL(65, 30) NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `generic_attributes` VARCHAR(191) NOT NULL,
    `OEMR` VARCHAR(191) NOT NULL,
    `OER` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `used_carparts_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
