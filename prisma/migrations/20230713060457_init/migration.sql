-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `privateCustomer` BOOLEAN NULL DEFAULT false,
    `isCompany` BOOLEAN NULL DEFAULT false,
    `workshopName` VARCHAR(191) NULL,
    `salesTaxNumber` VARCHAR(191) NULL,
    `country` VARCHAR(191) NOT NULL,
    `invoiceEmail` VARCHAR(191) NULL,
    `requisitionNumber` VARCHAR(191) NULL,
    `newsLetter` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `Users_id_key`(`id`),
    UNIQUE INDEX `Users_email_key`(`email`),
    UNIQUE INDEX `Users_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
