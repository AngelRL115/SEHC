-- CreateTable
CREATE TABLE `service` (
    `idService` INTEGER NOT NULL AUTO_INCREMENT,
    `Vehicle_idVehicle` INTEGER NOT NULL,
    `User_idUser` INTEGER NOT NULL,
    `service_status_idservice_status` INTEGER NOT NULL,
    `service_type_idservice_type` INTEGER NOT NULL,
    `priority_idpriority` INTEGER NOT NULL,
    `diagnostic` VARCHAR(2000) NULL,
    `gasLevel` VARCHAR(45) NULL,
    `km` VARCHAR(45) NULL,
    `serviceDetails` JSON NULL,
    `totalCost` VARCHAR(45) NULL,
    `serviceNotes` VARCHAR(1000) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `idService_UNIQUE`(`idService`),
    INDEX `fk_Service_User1_idx`(`User_idUser`),
    INDEX `fk_Service_Vehicle1_idx`(`Vehicle_idVehicle`),
    INDEX `fk_service_priority1_idx`(`priority_idpriority`),
    INDEX `fk_service_service_status1_idx`(`service_status_idservice_status`),
    INDEX `fk_service_service_type1_idx`(`service_type_idservice_type`),
    PRIMARY KEY (`idService`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(255) NULL,
    `name` VARCHAR(45) NOT NULL,
    `lastName` VARCHAR(45) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `idUser_UNIQUE`(`idUser`),
    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle` (
    `idVehicle` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_idcliente` INTEGER NOT NULL,
    `brand` VARCHAR(45) NOT NULL,
    `model` VARCHAR(45) NOT NULL,
    `year` VARCHAR(45) NOT NULL,
    `color` VARCHAR(45) NULL,
    `plate` VARCHAR(45) NOT NULL,
    `doors` INTEGER NOT NULL,
    `motor` VARCHAR(45) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `idVehicle_UNIQUE`(`idVehicle`),
    INDEX `fk_vehicle_cliente1_idx`(`cliente_idcliente`),
    PRIMARY KEY (`idVehicle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `idclient` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `lastName` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `invoice` BOOLEAN NOT NULL,
    `socialReason` VARCHAR(255) NULL,
    `zipcode` VARCHAR(10) NULL,
    `fiscalRegimen` VARCHAR(45) NULL,
    `email` VARCHAR(45) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `idcliente_UNIQUE`(`idclient`),
    PRIMARY KEY (`idclient`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `priority` (
    `idpriority` INTEGER NOT NULL AUTO_INCREMENT,
    `priority` VARCHAR(45) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `idpriority_UNIQUE`(`idpriority`),
    PRIMARY KEY (`idpriority`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_status` (
    `idservice_status` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(45) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `idservice_status_UNIQUE`(`idservice_status`),
    PRIMARY KEY (`idservice_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_type` (
    `idservice_type` INTEGER NOT NULL AUTO_INCREMENT,
    `service` VARCHAR(45) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `idservice_type_UNIQUE`(`idservice_type`),
    PRIMARY KEY (`idservice_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vehicle` ADD CONSTRAINT `vehicle_cliente_idcliente_fkey` FOREIGN KEY (`cliente_idcliente`) REFERENCES `client`(`idclient`) ON DELETE RESTRICT ON UPDATE CASCADE;
