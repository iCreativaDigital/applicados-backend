/*
  Warnings:

  - You are about to drop the column `details` on the `AuthEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AuthEvent` DROP COLUMN `details`,
    ADD COLUMN `additional_info` JSON NULL;

-- CreateTable
CREATE TABLE `GlossaryCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `GlossaryCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GlossaryTerm` (
    `id` VARCHAR(191) NOT NULL,
    `word` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `category_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `GlossaryTerm_word_key`(`word`),
    INDEX `GlossaryTerm_category_id_idx`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GlossaryTerm` ADD CONSTRAINT `GlossaryTerm_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `GlossaryCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
