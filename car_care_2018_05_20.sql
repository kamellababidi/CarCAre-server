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
  `status` enum('open','accepted','done','canceled') NOT NULL DEFAULT 'open',
  `driverId` int(11) DEFAULT NULL,
  `latitude` int(11) NOT NULL,
  `longitude` int(11) NOT NULL,
  `locationName` varchar(256) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `books_fk0` (`memberId`),
  KEY `books_fk1` (`driverId`),
  CONSTRAINT `books_fk0` FOREIGN KEY (`memberId`) REFERENCES `members` (`id`),
  CONSTRAINT `books_fk1` FOREIGN KEY (`driverId`) REFERENCES `drivers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (111,5,'2018-05-08 21:55:12','done',NULL,37,-122,'1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA','2018-05-08 21:55:12'),(112,5,'2018-05-13 18:48:23','open',NULL,37,-122,'1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA','2018-05-13 18:48:23'),(113,5,'2018-05-13 18:51:29','open',NULL,37,-122,'1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA','2018-05-13 18:51:29'),(114,5,'2018-05-13 19:18:12','open',NULL,37,-122,'1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA','2018-05-13 19:18:12'),(115,5,'2018-05-13 19:19:28','open',NULL,37,-122,'1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA','2018-05-13 19:19:28'),(116,5,'2018-05-13 19:26:54','open',NULL,37,-122,'1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA','2018-05-13 19:26:54'),(117,5,'2018-05-13 19:33:42','open',NULL,37,-122,'1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA','2018-05-13 19:33:42'),(118,5,'2018-05-20 20:14:37','open',NULL,37,-122,'1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA','2018-05-20 20:14:37'),(119,5,'2018-05-20 20:18:54','open',NULL,37,-122,'1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA','2018-05-20 20:18:54');
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
  CONSTRAINT `books_services_fk0` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`),
  CONSTRAINT `books_services_fk1` FOREIGN KEY (`companiesServiceId`) REFERENCES `companies_services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books_services`
--

LOCK TABLES `books_services` WRITE;
/*!40000 ALTER TABLE `books_services` DISABLE KEYS */;
INSERT INTO `books_services` VALUES (115,112,35,'2018-05-13 18:48:23','2018-05-13 18:48:23'),(116,113,35,'2018-05-13 18:51:29','2018-05-13 18:51:29'),(118,115,36,'2018-05-13 19:19:28','2018-05-13 19:19:28'),(119,116,36,'2018-05-13 19:26:54','2018-05-13 19:26:54'),(120,117,36,'2018-05-13 19:33:42','2018-05-13 19:33:42'),(121,118,36,'2018-05-20 20:14:37','2018-05-20 20:14:37'),(122,119,32,'2018-05-20 20:18:54','2018-05-20 20:18:54');
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
  CONSTRAINT `city_fk0` FOREIGN KEY (`addedBy`) REFERENCES `admins` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Riyadh','الرياض','active',1,'2018-04-16 18:21:26','2018-05-15 19:18:50'),(2,'Jeddah','جدة','active',1,'2018-04-16 18:21:26','2018-05-15 19:19:01'),(3,'Meccah','مكة','active',1,'2018-04-16 18:22:00','2018-05-15 19:19:02'),(4,'Almadinah','المدينة المنورة','active',1,'2018-04-17 17:51:21','2018-05-15 19:19:02'),(6,'Ajjouf','الجوف','active',1,'2018-04-17 17:59:19','2018-05-15 19:19:03');
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
  `city` int(11) NOT NULL,
  `picture` varchar(128) NOT NULL,
  `description` text NOT NULL,
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
  KEY `companies_fk1` (`city`),
  CONSTRAINT `companies_fk0` FOREIGN KEY (`added_by`) REFERENCES `admins` (`id`),
  CONSTRAINT `companies_fk1` FOREIGN KEY (`city`) REFERENCES `city` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (67,'Adidassss','أديداس','065486654687','Adidassss',1,'Adidas.png','A car services company with high quality services provided for customers','شركة عناية بالسيارات بخدمات عالية الجودة',NULL,1,'2018-04-10 17:16:50','2018-05-15 19:35:44','1'),(69,'any company','أي شركة','345643747665','anyComapny@asds.com',1,'any company.png','some description','بعض الوصف',NULL,1,'2018-04-10 17:31:32','2018-05-15 19:35:56','1'),(78,'Car washing Company','سشيلبسيلسيبل','87984654987','ghaseel@as.com',2,'Car washing Company.png','amzing company in car washing','سيبسنلبتشبلشيسن بشسيب شسيب \n',NULL,1,'2018-04-17 17:27:25','2018-04-17 17:27:25','1');
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
  `description_arabic` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` enum('0','1') NOT NULL DEFAULT '1',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `companies_services_fk0` (`companyId`),
  KEY `companies_services_fk1` (`serviceId`),
  CONSTRAINT `companies_services_fk0` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`),
  CONSTRAINT `companies_services_fk1` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies_services`
--

LOCK TABLES `companies_services` WRITE;
/*!40000 ALTER TABLE `companies_services` DISABLE KEYS */;
INSERT INTO `companies_services` VALUES (32,67,1,40,'Body washing and glasssadf','غسيل لجسم السيارة مع تلميعasdfas','2018-04-10 17:16:50','1','2018-05-15 19:38:46'),(33,67,2,5034,'full body waxingdsf','تشميع كامل جسدds','2018-04-10 17:16:50','0','2018-05-15 18:39:56'),(35,69,1,45,'car washing','غسيل سيارة','2018-04-10 17:31:32','1','2018-04-17 17:13:07'),(36,78,1,20,'car washing','غسيل سيارات','2018-04-17 17:27:25','1','2018-04-17 17:27:25'),(46,67,3,2134,'fafsd','23sadfasdf','2018-04-27 16:00:25','0','2018-05-15 18:39:53'),(47,67,7,234,'dfgdsgsd','sdffgsdfgsdf','2018-04-27 16:01:05','0','2018-05-15 18:39:54');
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
  `name` varchar(64) NOT NULL,
  `phone` varchar(64) NOT NULL,
  `car` varchar(64) NOT NULL,
  `companyId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `phone` (`phone`),
  KEY `drivers_fk0` (`companyId`),
  CONSTRAINT `drivers_fk0` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
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
  `facebookId` varchar(64) NOT NULL,
  `username` varchar(64) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `verified` enum('0','1') NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'0','firfaffafsdsdfsghanem','078945621','0','2018-03-23 13:01:15','2018-03-23 13:01:15'),(4,'0','firtras','07839545621','0','2018-03-23 13:33:42','2018-03-23 13:33:42'),(5,'1853603108007552','Kamel Al-lababidi','962775388455','1','2018-05-08 20:31:30','2018-05-08 21:46:26');
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
  CONSTRAINT `rating_fk0` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`),
  CONSTRAINT `rating_fk1` FOREIGN KEY (`memberId`) REFERENCES `members` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (1,67,4,3.16584,'ليست جيدة\r\n','2018-05-14 16:40:09','2018-05-14 18:05:42'),(2,67,1,5.8789,'ممتازة','2018-05-14 16:40:43','2018-05-14 18:05:45'),(3,67,5,4.4864,'ماشي حالها','2018-05-14 16:40:43','2018-05-14 18:05:49');
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

-- Dump completed on 2018-05-20 23:54:40
