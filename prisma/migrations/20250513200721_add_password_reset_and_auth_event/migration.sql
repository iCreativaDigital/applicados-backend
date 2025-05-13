-- CreateTable
CREATE TABLE `PasswordReset` (
    `id` VARCHAR(191) NOT NULL,
    `app_user_id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `PasswordReset_app_user_id_key`(`app_user_id`),
    UNIQUE INDEX `PasswordReset_token_key`(`token`),
    INDEX `PasswordReset_token_idx`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuthEvent` (
    `id` VARCHAR(191) NOT NULL,
    `app_user_id` VARCHAR(191) NOT NULL,
    `event_type` VARCHAR(191) NOT NULL,
    `ip_address` VARCHAR(191) NULL,
    `user_agent` VARCHAR(191) NULL,
    `details` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AuthEvent_app_user_id_idx`(`app_user_id`),
    INDEX `AuthEvent_event_type_idx`(`event_type`),
    INDEX `AuthEvent_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PasswordReset` ADD CONSTRAINT `PasswordReset_app_user_id_fkey` FOREIGN KEY (`app_user_id`) REFERENCES `AppUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthEvent` ADD CONSTRAINT `AuthEvent_app_user_id_fkey` FOREIGN KEY (`app_user_id`) REFERENCES `AppUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
