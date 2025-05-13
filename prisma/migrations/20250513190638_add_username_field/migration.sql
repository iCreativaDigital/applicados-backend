/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `AppUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username,api_key_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `AppUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `AppUser` ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AppUser_username_key` ON `AppUser`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `User_username_api_key_id_key` ON `User`(`username`, `api_key_id`);
