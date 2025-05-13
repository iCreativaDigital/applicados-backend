-- AlterTable
ALTER TABLE `Session` MODIFY `token` VARCHAR(1000) NOT NULL,
    MODIFY `refresh_token` VARCHAR(1000) NULL;
