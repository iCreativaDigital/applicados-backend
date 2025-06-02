-- CreateTable
CREATE TABLE `Subject` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `slug_materia` VARCHAR(191) NOT NULL,
    `approximate_total_minutes` INTEGER NOT NULL,
    `total_questions` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `api_key_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Subject_slug_materia_key`(`slug_materia`),
    INDEX `Subject_api_key_id_idx`(`api_key_id`),
    UNIQUE INDEX `Subject_name_api_key_id_key`(`name`, `api_key_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubjectDetail` (
    `id` VARCHAR(191) NOT NULL,
    `background_image_url` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `title_color` VARCHAR(191) NULL,
    `subtitle` VARCHAR(191) NULL,
    `primary_color_hex` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `subject_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SubjectDetail_subject_id_key`(`subject_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubjectLevel` (
    `id` VARCHAR(191) NOT NULL,
    `reference_title` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `number_of_questions` INTEGER NOT NULL,
    `approximate_time_minutes` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `subject_id` VARCHAR(191) NOT NULL,

    INDEX `SubjectLevel_subject_id_idx`(`subject_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestSubject` (
    `test_type_id` VARCHAR(191) NOT NULL,
    `subject_id` VARCHAR(191) NOT NULL,
    `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `subject_order_in_test` INTEGER NULL,

    PRIMARY KEY (`test_type_id`, `subject_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_api_key_id_fkey` FOREIGN KEY (`api_key_id`) REFERENCES `ApiKey`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectDetail` ADD CONSTRAINT `SubjectDetail_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectLevel` ADD CONSTRAINT `SubjectLevel_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestSubject` ADD CONSTRAINT `TestSubject_test_type_id_fkey` FOREIGN KEY (`test_type_id`) REFERENCES `TestType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TestSubject` ADD CONSTRAINT `TestSubject_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
