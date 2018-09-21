-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: car_care
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'firas','ghanem','firasghanem','gdfg@g.com','wqrqr','2018-03-23 10:17:42','0000-00-00 00:00:00'),(2,'admin','admin','admin','admin@carcare.com','$2a$10$G.5srx6dxFRdNd4HZ2ZhVecIXLHwcdDNf/pgmFadJj6GJKqpUeFXu','2018-03-30 08:35:51','2018-03-30 08:35:51');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `memberId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('open','accepted','driver sent','done','canceled') NOT NULL DEFAULT 'open',
  `url` text,
  `driverId` int(11) DEFAULT NULL,
  `latitude` varchar(64) NOT NULL,
  `longitude` varchar(64) NOT NULL,
  `locationName` varchar(256) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `books_fk0` (`memberId`),
  KEY `books_fk1` (`driverId`),
  CONSTRAINT `books_fk0` FOREIGN KEY (`memberId`) REFERENCES `members` (`id`) ON DELETE CASCADE,
  CONSTRAINT `books_fk1` FOREIGN KEY (`driverId`) REFERENCES `drivers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books_services`
--

DROP TABLE IF EXISTS `books_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bookId` int(11) NOT NULL,
  `companiesServiceId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `books_services_fk0` (`bookId`),
  KEY `books_services_fk1` (`companiesServiceId`),
  CONSTRAINT `books_services_fk0` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `books_services_fk1` FOREIGN KEY (`companiesServiceId`) REFERENCES `companies_services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books_services`
--

LOCK TABLES `books_services` WRITE;
/*!40000 ALTER TABLE `books_services` DISABLE KEYS */;
/*!40000 ALTER TABLE `books_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `name_arabic` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `active` enum('active','disabled') NOT NULL DEFAULT 'active',
  `addedBy` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_arabic` (`name_arabic`),
  KEY `city_fk0` (`addedBy`),
  CONSTRAINT `city_fk0` FOREIGN KEY (`addedBy`) REFERENCES `admins` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Riyadh','الرياض','active',1,'2018-04-16 18:21:26','2018-05-15 19:18:50'),(2,'Jeddah','جدة','active',1,'2018-04-16 18:21:26','2018-05-15 19:19:01'),(3,'Meccah','مكة','active',1,'2018-04-16 18:22:00','2018-05-15 19:19:02'),(4,'Almadinah','المدينة المنورة','active',1,'2018-04-17 17:51:21','2018-05-15 19:19:02'),(6,'Ajjouf','الجوف','active',1,'2018-04-17 17:59:19','2018-05-15 19:19:03'),(7,'Amman','عمان','active',1,'2018-05-23 22:52:41','2018-05-23 22:52:41');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `name_arabic` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(128) NOT NULL,
  `cityId` int(11) NOT NULL,
  `picture` varchar(128) NOT NULL,
  `description` text,
  `description_arabic` text CHARACTER SET utf8 COLLATE utf8_bin,
  `averageRating` int(11) DEFAULT NULL,
  `added_by` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `companies` (`name`,`email`,`phone`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `name_arabic` (`name_arabic`),
  KEY `companies_fk0` (`added_by`),
  KEY `companies_fk1` (`cityId`),
  CONSTRAINT `companies_fk0` FOREIGN KEY (`added_by`) REFERENCES `admins` (`id`) ON DELETE CASCADE,
  CONSTRAINT `companies_fk1` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (69,'any company','أي شركة','345643747665','anyComapny@asds.com',1,'any company.png','some description','بعض الوصف',NULL,1,'2018-04-10 17:31:32','2018-05-15 19:35:56','1'),(78,'Car washing Company','سشيلبسيلسيبل','87984654987','ghaseel@as.com',2,'Car washing Company.png','amzing company in car washing','سيبسنلبتشبلشيسن بشسيب شسيب \n',NULL,1,'2018-04-17 17:27:25','2018-04-17 17:27:25','1'),(79,'heka','هيكا','53424532452345','heka@gmail.com',1,'heka.png',NULL,NULL,NULL,1,'2018-05-21 23:24:49','2018-05-21 23:24:49','1'),(80,'amman','عمانfdsf','962796956305','amman',3,'amman.png','','',NULL,1,'2018-05-23 22:56:54','2018-06-05 20:07:36','1');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies_services`
--

DROP TABLE IF EXISTS `companies_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyId` int(11) NOT NULL,
  `serviceId` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text,
  `description_arabic` text CHARACTER SET utf8 COLLATE utf8_bin,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` enum('0','1') NOT NULL DEFAULT '1',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `companies_services_fk0` (`companyId`),
  KEY `companies_services_fk1` (`serviceId`),
  CONSTRAINT `companies_services_fk0` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `companies_services_fk1` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies_services`
--

LOCK TABLES `companies_services` WRITE;
/*!40000 ALTER TABLE `companies_services` DISABLE KEYS */;
INSERT INTO `companies_services` VALUES (35,69,1,45,'car washing','غسيل سيارة','2018-04-10 17:31:32','1','2018-04-17 17:13:07'),(36,78,1,20,'car washing','غسيل سيارات','2018-04-17 17:27:25','1','2018-04-17 17:27:25'),(48,79,1,25,'','','2018-05-21 23:24:49','1','2018-05-21 23:24:49'),(49,80,2,312312,'','','2018-05-23 22:56:54','1','2018-05-23 22:56:54');
/*!40000 ALTER TABLE `companies_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drivers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phone` varchar(64) NOT NULL,
  `car` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `companyId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `phone` (`phone`),
  KEY `drivers_fk0` (`companyId`),
  CONSTRAINT `drivers_fk0` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
INSERT INTO `drivers` VALUES (2,'fsdgdsfgdsfg','fdgdsgsdf','tegdfgsdffgsdf',78,'2018-05-21 23:09:44','2018-05-21 23:09:44'),(4,'تابتنداتنن','5678','ناللتنت',78,'2018-05-23 23:31:52','2018-05-23 23:31:52'),(5,'Hhhjj','Gvhhh','Mirsubishi',78,'2018-05-23 23:35:40','2018-05-23 23:35:40'),(6,'dsgsdfgdsf','3532453245','gsdgsdg',69,'2018-06-05 23:18:47','2018-06-05 23:18:47');
/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `facebookId` text NOT NULL,
  `username` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `verified` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (25,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJ1c2VybmFtZSI6InNhcmEiLCJwYXNzd29yZCI6IjEyMzQifSwiaWF0IjoxNTI3MDE3MTEwLCJleHAiOjE1Mjc2MjE5MTB9.hHLhpkPxvEaL3y6y7L5E6vUVB19fpALdBnQJjvKr1hw','firassasas','2342341234234','1','2018-05-23 21:06:13','2018-05-23 21:06:13'),(34,'1853603108007552','Kamel Al-lababidi','962796956305123','1','2018-05-23 23:28:26','2018-05-23 23:34:32'),(35,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJ1c2VybmFtZSI6ImthbWVsIiwicGFzc3dvcmQiOiIxMjM0NTYifSwiaWF0IjoxNTI3MTE4NDU0LCJleHAiOjE1Mjc3MjMyNTR9.Fty7z-k16_7WN9BpEt77_NL4Bzlczha_Wt-5CcQbZg4','kamel','962796956305','1','2018-05-23 23:34:14','2018-05-23 23:35:09');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyId` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  `rating` float NOT NULL,
  `comment` text CHARACTER SET utf8 COLLATE utf8_bin,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `rating_fk0` (`companyId`),
  KEY `rating_fk1` (`memberId`),
  CONSTRAINT `rating_fk0` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rating_fk1` FOREIGN KEY (`memberId`) REFERENCES `members` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (5,78,34,2.5,'dadasd','2018-05-23 23:32:11','2018-05-23 23:32:11'),(6,78,35,2.5,'jjl;l','2018-05-23 23:36:13','2018-05-23 23:36:13');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `name_arabic` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `active` enum('0','1') NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_arabic` (`name_arabic`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'car washing','غسيل السيارة','1','2018-03-23 19:15:50','2018-04-17 16:17:55'),(2,'waxing','تشميع','1','2018-03-30 10:17:44','2018-04-17 16:18:04'),(3,'fine Waxing','تشميع ممتاز','1','2018-03-30 17:09:53','2018-04-17 16:18:13'),(7,'inflating tires','نفخ الإطارات','1','2018-03-31 16:01:57','2018-04-17 16:18:20'),(8,'engine cleaning ','تنظيف المحرك','1','2018-04-17 17:51:03','2018-04-17 17:51:03');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-06  3:56:16
