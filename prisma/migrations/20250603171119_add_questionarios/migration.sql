-- CreateTable
CREATE TABLE `Questionnaire` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `order` INTEGER NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `subject_level_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Questionnaire_subject_level_id_idx`(`subject_level_id`),
    INDEX `Questionnaire_published_idx`(`published`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `question_type` ENUM('MULTIPLE_CHOICE_SINGLE', 'MULTIPLE_CHOICE_MULTIPLE', 'TRUE_FALSE') NOT NULL,
    `explanation` VARCHAR(191) NULL,
    `points` INTEGER NOT NULL DEFAULT 1,
    `order` INTEGER NULL,
    `difficulty` INTEGER NULL DEFAULT 1,
    `tags` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `questionnaire_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Question_questionnaire_id_idx`(`questionnaire_id`),
    INDEX `Question_active_idx`(`active`),
    INDEX `Question_difficulty_idx`(`difficulty`),
    INDEX `Question_question_type_idx`(`question_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnswerOption` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `is_correct` BOOLEAN NOT NULL,
    `order` INTEGER NULL,
    `question_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `AnswerOption_question_id_idx`(`question_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserQuestionnaireAttempt` (
    `id` VARCHAR(191) NOT NULL,
    `score` DOUBLE NULL,
    `status` ENUM('IN_PROGRESS', 'COMPLETED', 'PASSED', 'FAILED') NOT NULL,
    `started_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completed_at` DATETIME(3) NULL,
    `time_spent_seconds` INTEGER NULL,
    `correct_answers_count` INTEGER NULL,
    `total_questions_count` INTEGER NULL,
    `attempt_number` INTEGER NOT NULL DEFAULT 1,
    `user_id` VARCHAR(191) NOT NULL,
    `questionnaire_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `UserQuestionnaireAttempt_user_id_idx`(`user_id`),
    INDEX `UserQuestionnaireAttempt_questionnaire_id_idx`(`questionnaire_id`),
    INDEX `UserQuestionnaireAttempt_user_id_questionnaire_id_idx`(`user_id`, `questionnaire_id`),
    INDEX `UserQuestionnaireAttempt_status_idx`(`status`),
    INDEX `UserQuestionnaireAttempt_completed_at_idx`(`completed_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserQuestionAnswer` (
    `id` VARCHAR(191) NOT NULL,
    `is_correct` BOOLEAN NULL,
    `answered_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `time_to_answer_seconds` INTEGER NULL,
    `points_earned` DOUBLE NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `question_id` VARCHAR(191) NOT NULL,
    `selected_answer_option_id` VARCHAR(191) NULL,
    `answered_text` VARCHAR(191) NULL,
    `user_questionnaire_attempt_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `UserQuestionAnswer_user_id_idx`(`user_id`),
    INDEX `UserQuestionAnswer_question_id_idx`(`question_id`),
    INDEX `UserQuestionAnswer_selected_answer_option_id_idx`(`selected_answer_option_id`),
    INDEX `UserQuestionAnswer_user_questionnaire_attempt_id_idx`(`user_questionnaire_attempt_id`),
    UNIQUE INDEX `UserQuestionAnswer_user_questionnaire_attempt_id_question_id_key`(`user_questionnaire_attempt_id`, `question_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTestSelection` (
    `id` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `selected_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` VARCHAR(191) NOT NULL,
    `test_type_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `UserTestSelection_user_id_idx`(`user_id`),
    INDEX `UserTestSelection_test_type_id_idx`(`test_type_id`),
    INDEX `UserTestSelection_is_active_idx`(`is_active`),
    UNIQUE INDEX `UserTestSelection_user_id_test_type_id_key`(`user_id`, `test_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Questionnaire` ADD CONSTRAINT `Questionnaire_subject_level_id_fkey` FOREIGN KEY (`subject_level_id`) REFERENCES `SubjectLevel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_questionnaire_id_fkey` FOREIGN KEY (`questionnaire_id`) REFERENCES `Questionnaire`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnswerOption` ADD CONSTRAINT `AnswerOption_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuestionnaireAttempt` ADD CONSTRAINT `UserQuestionnaireAttempt_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuestionnaireAttempt` ADD CONSTRAINT `UserQuestionnaireAttempt_questionnaire_id_fkey` FOREIGN KEY (`questionnaire_id`) REFERENCES `Questionnaire`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuestionAnswer` ADD CONSTRAINT `UserQuestionAnswer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuestionAnswer` ADD CONSTRAINT `UserQuestionAnswer_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuestionAnswer` ADD CONSTRAINT `UserQuestionAnswer_selected_answer_option_id_fkey` FOREIGN KEY (`selected_answer_option_id`) REFERENCES `AnswerOption`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuestionAnswer` ADD CONSTRAINT `UserQuestionAnswer_user_questionnaire_attempt_id_fkey` FOREIGN KEY (`user_questionnaire_attempt_id`) REFERENCES `UserQuestionnaireAttempt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTestSelection` ADD CONSTRAINT `UserTestSelection_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTestSelection` ADD CONSTRAINT `UserTestSelection_test_type_id_fkey` FOREIGN KEY (`test_type_id`) REFERENCES `TestType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
