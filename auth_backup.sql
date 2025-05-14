/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.6.2-MariaDB, for osx10.20 (arm64)
--
-- Host: localhost    Database: auth
-- ------------------------------------------------------
-- Server version	11.6.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `Account`
--

DROP TABLE IF EXISTS `Account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Account` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `api_key` varchar(191) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_api_key_key` (`api_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Account`
--

LOCK TABLES `Account` WRITE;
/*!40000 ALTER TABLE `Account` DISABLE KEYS */;
/*!40000 ALTER TABLE `Account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ApiKey`
--

DROP TABLE IF EXISTS `ApiKey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ApiKey` (
  `id` varchar(191) NOT NULL,
  `app_user_id` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `last_used_at` datetime(3) DEFAULT NULL,
  `expires_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ApiKey_key_key` (`key`),
  KEY `ApiKey_app_user_id_idx` (`app_user_id`),
  CONSTRAINT `ApiKey_app_user_id_fkey` FOREIGN KEY (`app_user_id`) REFERENCES `AppUser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ApiKey`
--

LOCK TABLES `ApiKey` WRITE;
/*!40000 ALTER TABLE `ApiKey` DISABLE KEYS */;
INSERT INTO `ApiKey` VALUES
('dbda1eee-e28a-4ced-9900-008cfd4e5d66','a511ed64-d5f1-44cb-a597-0274c5f82c84','dfba75d1-530c-4a5d-9191-fa5ce49ce005','Primera prueba',1,'2025-05-13 20:26:35.717','2025-05-13 22:32:44.673','2025-05-13 22:32:44.672',NULL);
/*!40000 ALTER TABLE `ApiKey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AppSession`
--

DROP TABLE IF EXISTS `AppSession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AppSession` (
  `id` varchar(191) NOT NULL,
  `app_user_id` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `refresh_token` varchar(191) DEFAULT NULL,
  `ip_address` varchar(191) DEFAULT NULL,
  `user_agent` varchar(191) DEFAULT NULL,
  `expires_at` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `revoked` tinyint(1) NOT NULL DEFAULT 0,
  `revoked_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AppSession_token_key` (`token`),
  UNIQUE KEY `AppSession_refresh_token_key` (`refresh_token`),
  KEY `AppSession_app_user_id_idx` (`app_user_id`),
  CONSTRAINT `AppSession_app_user_id_fkey` FOREIGN KEY (`app_user_id`) REFERENCES `AppUser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AppSession`
--

LOCK TABLES `AppSession` WRITE;
/*!40000 ALTER TABLE `AppSession` DISABLE KEYS */;
/*!40000 ALTER TABLE `AppSession` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AppUser`
--

DROP TABLE IF EXISTS `AppUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AppUser` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password_hash` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `company_name` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `email_verified` tinyint(1) NOT NULL DEFAULT 0,
  `email_verified_at` datetime(3) DEFAULT NULL,
  `reset_token` varchar(191) DEFAULT NULL,
  `reset_token_expires` datetime(3) DEFAULT NULL,
  `username` varchar(191) NOT NULL,
  `website` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AppUser_email_key` (`email`),
  UNIQUE KEY `AppUser_username_key` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AppUser`
--

LOCK TABLES `AppUser` WRITE;
/*!40000 ALTER TABLE `AppUser` DISABLE KEYS */;
INSERT INTO `AppUser` VALUES
('a511ed64-d5f1-44cb-a597-0274c5f82c84','pcontramaestre@gmail.com','$2b$10$Po2FziJFNb7FHwRqr7PC1u/5jpjOk/5uylPlU5SKVjgQIiHUWLZ5W','Pablo Contramaestre','Quintero','3232907169',1,'2025-05-13 20:19:46.032','2025-05-13 21:25:57.289',0,NULL,NULL,NULL,'pcontramaestre','https://www.quinteroandassociates.com');
/*!40000 ALTER TABLE `AppUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AuthEvent`
--

DROP TABLE IF EXISTS `AuthEvent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AuthEvent` (
  `id` varchar(191) NOT NULL,
  `app_user_id` varchar(191) NOT NULL,
  `event_type` varchar(191) NOT NULL,
  `ip_address` varchar(191) DEFAULT NULL,
  `user_agent` varchar(191) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `AuthEvent_app_user_id_idx` (`app_user_id`),
  KEY `AuthEvent_event_type_idx` (`event_type`),
  KEY `AuthEvent_created_at_idx` (`created_at`),
  CONSTRAINT `AuthEvent_app_user_id_fkey` FOREIGN KEY (`app_user_id`) REFERENCES `AppUser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuthEvent`
--

LOCK TABLES `AuthEvent` WRITE;
/*!40000 ALTER TABLE `AuthEvent` DISABLE KEYS */;
INSERT INTO `AuthEvent` VALUES
('2ddec479-f1d6-4f81-b5de-7f1e84d07d65','a511ed64-d5f1-44cb-a597-0274c5f82c84','PROFILE_UPDATED','0.0.0.0','Unknown',NULL,'2025-05-13 20:31:40.641'),
('b590ac88-88c3-43f5-9044-d3fa443bb0c3','a511ed64-d5f1-44cb-a597-0274c5f82c84','PROFILE_UPDATED','0.0.0.0','Unknown',NULL,'2025-05-13 21:25:58.440');
/*!40000 ALTER TABLE `AuthEvent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AuthLog`
--

DROP TABLE IF EXISTS `AuthLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AuthLog` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(191) DEFAULT NULL,
  `event_type` enum('REGISTER','LOGIN','LOGOUT','PASSWORD_RESET_REQUEST','PASSWORD_RESET','EMAIL_VERIFICATION','TOKEN_REFRESH','ACCOUNT_LOCK','ACCOUNT_UNLOCK') NOT NULL,
  `status` enum('SUCCESS','FAILURE') NOT NULL,
  `ip_address` varchar(191) DEFAULT NULL,
  `user_agent` varchar(191) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `AuthLog_user_id_idx` (`user_id`),
  KEY `AuthLog_event_type_idx` (`event_type`),
  KEY `AuthLog_status_idx` (`status`),
  KEY `AuthLog_created_at_idx` (`created_at`),
  CONSTRAINT `AuthLog_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuthLog`
--

LOCK TABLES `AuthLog` WRITE;
/*!40000 ALTER TABLE `AuthLog` DISABLE KEYS */;
INSERT INTO `AuthLog` VALUES
('35bdb7ca-c0fb-4294-86c1-34dff389ab67','24db2150-b798-4a7e-84c6-2c3dda8391bd','LOGIN','SUCCESS','::1','curl/8.7.1','{\"session_id\":\"7d48c73c-1bfa-4edb-89c4-aa4603a8833f\",\"api_key_id\":\"dbda1eee-e28a-4ced-9900-008cfd4e5d66\"}','2025-05-13 22:17:03.746'),
('e87c4978-6691-4f1c-bca5-8a346c41af13','24db2150-b798-4a7e-84c6-2c3dda8391bd','REGISTER','SUCCESS','::1','curl/8.7.1','{\"api_key_id\":\"dbda1eee-e28a-4ced-9900-008cfd4e5d66\",\"app_user_id\":\"a511ed64-d5f1-44cb-a597-0274c5f82c84\"}','2025-05-13 21:32:12.240');
/*!40000 ALTER TABLE `AuthLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EmailVerification`
--

DROP TABLE IF EXISTS `EmailVerification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EmailVerification` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expires_at` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `EmailVerification_token_key` (`token`),
  KEY `EmailVerification_email_idx` (`email`),
  KEY `EmailVerification_token_idx` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EmailVerification`
--

LOCK TABLES `EmailVerification` WRITE;
/*!40000 ALTER TABLE `EmailVerification` DISABLE KEYS */;
INSERT INTO `EmailVerification` VALUES
('77c7f962-a100-4def-b0e3-dce4cc5f0e97','pcontramaestre2@gmail.com','b296b4eae630a7e8e7d102ebed7c36912e4e4292a85173896b2308fbc6574876','2025-05-14 21:32:12.218','2025-05-13 21:32:12.235');
/*!40000 ALTER TABLE `EmailVerification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PasswordReset`
--

DROP TABLE IF EXISTS `PasswordReset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PasswordReset` (
  `id` varchar(191) NOT NULL,
  `app_user_id` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expires_at` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PasswordReset_app_user_id_key` (`app_user_id`),
  UNIQUE KEY `PasswordReset_token_key` (`token`),
  KEY `PasswordReset_token_idx` (`token`),
  CONSTRAINT `PasswordReset_app_user_id_fkey` FOREIGN KEY (`app_user_id`) REFERENCES `AppUser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PasswordReset`
--

LOCK TABLES `PasswordReset` WRITE;
/*!40000 ALTER TABLE `PasswordReset` DISABLE KEYS */;
/*!40000 ALTER TABLE `PasswordReset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Session` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `token` varchar(1000) NOT NULL,
  `refresh_token` varchar(1000) DEFAULT NULL,
  `ip_address` varchar(191) DEFAULT NULL,
  `user_agent` varchar(191) DEFAULT NULL,
  `expires_at` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `revoked` tinyint(1) NOT NULL DEFAULT 0,
  `revoked_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_token_key` (`token`) USING HASH,
  UNIQUE KEY `Session_refresh_token_key` (`refresh_token`) USING HASH,
  KEY `Session_user_id_idx` (`user_id`),
  CONSTRAINT `Session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
INSERT INTO `Session` VALUES
('7d48c73c-1bfa-4edb-89c4-aa4603a8833f','24db2150-b798-4a7e-84c6-2c3dda8391bd','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNGRiMjE1MC1iNzk4LTRhN2UtODRjNi0yYzNkZGE4MzkxYmQiLCJhcGlfa2V5X2lkIjoiZGJkYTFlZWUtZTI4YS00Y2VkLTk5MDAtMDA4Y2ZkNGU1ZDY2IiwidHlwZSI6ImFjY2Vzc190b2tlbiIsImlhdCI6MTc0NzE3NDYyMywiZXhwIjoxNzQ3MTc4MjIzfQ.0sKJ9WH9kXHvUTe52mf3fxmKyFeGikygp4OHMqLFfjo','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNGRiMjE1MC1iNzk4LTRhN2UtODRjNi0yYzNkZGE4MzkxYmQiLCJhcGlfa2V5X2lkIjoiZGJkYTFlZWUtZTI4YS00Y2VkLTk5MDAtMDA4Y2ZkNGU1ZDY2IiwidHlwZSI6InJlZnJlc2hfdG9rZW4iLCJqdGkiOiJiMWI0NjBhM2MyYjAxMTdiY2U1NDM5ZTZlOTdhZWUzZCIsImlhdCI6MTc0NzE3NDYyMywiZXhwIjoxNzQ3Nzc5NDIzfQ.5blZFmIzCzYxBdo_otEv_-Jme8BDtBNNJxqr3gqQKr0','::1','curl/8.7.1','2025-05-13 22:32:44.693','2025-05-13 22:17:03.734','2025-05-13 22:32:44.693',1,'2025-05-13 22:32:44.693');
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` varchar(191) NOT NULL,
  `api_key_id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password_hash` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL,
  `email_verified` tinyint(1) NOT NULL DEFAULT 0,
  `email_verified_at` datetime(3) DEFAULT NULL,
  `reset_token` varchar(191) DEFAULT NULL,
  `reset_token_expires` datetime(3) DEFAULT NULL,
  `username` varchar(191) NOT NULL,
  `ip_address` varchar(191) DEFAULT NULL,
  `user_agent` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_api_key_id_key` (`email`,`api_key_id`),
  UNIQUE KEY `User_username_api_key_id_key` (`username`,`api_key_id`),
  KEY `User_api_key_id_idx` (`api_key_id`),
  CONSTRAINT `User_api_key_id_fkey` FOREIGN KEY (`api_key_id`) REFERENCES `ApiKey` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES
('24db2150-b798-4a7e-84c6-2c3dda8391bd','dbda1eee-e28a-4ced-9900-008cfd4e5d66','pcontramaestre2@gmail.com','$2b$10$1CanCPZkf/iX5pZxv8bTbeU0ES0RZUIHcLRaBLUt2dJ0ZY53.NFxS','Pablo Contramaestre',1,'2025-05-13 21:32:12.219','2025-05-13 21:32:12.219',0,NULL,NULL,NULL,'pcontramaestre2','::1','curl/8.7.1');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAccount`
--

DROP TABLE IF EXISTS `UserAccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserAccount` (
  `id` varchar(191) NOT NULL,
  `user_id` varchar(191) NOT NULL,
  `account_id` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `created_by` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserAccount_user_id_account_id_key` (`user_id`,`account_id`),
  KEY `UserAccount_user_id_idx` (`user_id`),
  KEY `UserAccount_account_id_idx` (`account_id`),
  CONSTRAINT `UserAccount_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserAccount_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAccount`
--

LOCK TABLES `UserAccount` WRITE;
/*!40000 ALTER TABLE `UserAccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES
('0e94144d-4c36-4a3d-8097-ae00c3582330','e9225c3e2e6eccb2a5f67fadcc2c39c94bf89914032e3b06c3d89a8afd619eeb','2025-05-13 19:06:39.702','20250513190638_add_username_field',NULL,NULL,'2025-05-13 19:06:39.471',1),
('214e95d9-87a7-4782-ae6a-344e21cf67f5','055813b29667c443836a5e8d70308d25bd4e1a342ffd8c4af000233c36ad77cc','2025-05-13 21:09:21.708','20250513210920_add_ip_user_agent',NULL,NULL,'2025-05-13 21:09:21.541',1),
('83fd1eb7-96f9-4689-b3a9-a049318b62f1','aafcfbfcc7572f20e627e4c5fad6d009557b23bfe385085c18a9bd5800255739','2025-05-13 19:01:30.672','20250513190130_add_app_users_and_api_keys',NULL,NULL,'2025-05-13 19:01:30.044',1),
('9152b12a-afe8-445f-a9b8-2ad60426610e','05667ee54226dcbd4eba4ae2c556ec8836401ec31ee694f8c49e290d1f93c5bf','2025-05-13 20:07:22.381','20250513200721_add_password_reset_and_auth_event',NULL,NULL,'2025-05-13 20:07:22.228',1),
('95d844e9-339d-422a-a923-b1a1aea740fa','3cdcdea713bc1e24c1ea59e7db2fdfcc50bfb1fac5b8b20139fb4943a570a8bb','2025-05-13 20:43:56.166','20250513204354_add_website_field',NULL,NULL,'2025-05-13 20:43:56.022',1),
('bcccd78b-bf02-4965-8098-f1c13108ebe7','54f4b4585bb01f9d387335b02800c320d1d9bae3594c3a88d243b57b107c3ce0','2025-05-13 22:16:38.352','20250513221636_increase_token_length',NULL,NULL,'2025-05-13 22:16:38.061',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-05-13 18:47:19
