-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: fusion
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

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
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Categories` (
  `internalId` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` time DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `CreationUser` varchar(255) DEFAULT NULL,
  `Code` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`internalId`),
  UNIQUE KEY `Code` (`Code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,NULL,'2020-09-06',NULL,'CATEGORIA 1','PELICULAS','Todo tipo de Peliculas.','theaters'),(3,NULL,'2020-09-06',NULL,'CATEGORIA 2','SERIES','Todo tipo de Series.','tv');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Coupon`
--

DROP TABLE IF EXISTS `Coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Coupon` (
  `internalId` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` time DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `CreationUser` varchar(255) DEFAULT NULL,
  `Code` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Value` double DEFAULT NULL,
  PRIMARY KEY (`internalId`),
  UNIQUE KEY `Code` (`Code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Coupon`
--

LOCK TABLES `Coupon` WRITE;
/*!40000 ALTER TABLE `Coupon` DISABLE KEYS */;
INSERT INTO `Coupon` VALUES (1,NULL,'2020-09-07',NULL,'COUPON','COUPON','COUPON',111.5);
/*!40000 ALTER TABLE `Coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EditableComponents`
--

DROP TABLE IF EXISTS `EditableComponents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EditableComponents` (
  `internalId` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` time DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `CreationUser` varchar(255) DEFAULT NULL,
  `ProductCard` text,
  `FavoriteCard` text,
  `CategoryItem` text,
  `MainItems` text,
  `ItemCard` text,
  PRIMARY KEY (`internalId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EditableComponents`
--

LOCK TABLES `EditableComponents` WRITE;
/*!40000 ALTER TABLE `EditableComponents` DISABLE KEYS */;
INSERT INTO `EditableComponents` VALUES (1,NULL,'2020-09-07',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `EditableComponents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Home`
--

DROP TABLE IF EXISTS `Home`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Home` (
  `internalId` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` time DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `CreationUser` varchar(255) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `HeaderImage` varchar(255) DEFAULT NULL,
  `ShowFooter` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`internalId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Home`
--

LOCK TABLES `Home` WRITE;
/*!40000 ALTER TABLE `Home` DISABLE KEYS */;
INSERT INTO `Home` VALUES (1,NULL,'2020-09-05',NULL,'Pelis.','https://cdn-3.expansion.mx/dims4/default/606d4df/2147483647/strip/true/crop/1310x680+0+0/resize/800x415!/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F0f%2F5d%2F36ac3e724d3f9dca4e2ee8ff6fd4%2Ftienda.JPG',1);
/*!40000 ALTER TABLE `Home` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Item`
--

DROP TABLE IF EXISTS `Item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Item` (
  `internalId` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` time DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `CreationUser` varchar(255) DEFAULT NULL,
  `Code` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `HomePage` tinyint(1) DEFAULT NULL,
  `Categories` varchar(255) DEFAULT NULL,
  `SubCategories` varchar(255) DEFAULT NULL,
  `Description` text,
  `Price` double DEFAULT NULL,
  PRIMARY KEY (`internalId`),
  UNIQUE KEY `Code` (`Code`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Item`
--

LOCK TABLES `Item` WRITE;
/*!40000 ALTER TABLE `Item` DISABLE KEYS */;
INSERT INTO `Item` VALUES (1,NULL,'2020-09-06',NULL,'HP1','Harry Potter y la Piedra Filosofal.','https://www.utrera.org/wp-content/uploads/2019/07/harry-potter-y-la-piedra-filosofal-cine-verano-utrera-2019.jpg',1,'CATEGORIA 1,CATEGORIA 2','Accion','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\'',11),(2,NULL,'2020-09-06',NULL,'HP2','Harry Potter y la Camara Secreta.','https://i.pinimg.com/originals/d7/0d/a3/d70da35b21568e25b27e1756ae0b6c17.jpg',1,'CATEGORIA 1','Accion','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',11),(3,NULL,'2020-09-06',NULL,'HP3','Harry Potter y el Prisionero de Azkaban.','https://www.mexicoescultura.com/galerias/actividades/principal/harry_potter_y_el_prisionero_de_azkaban.jpg',1,'CATEGORIA 1','Accion','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\'',NULL),(4,NULL,'2020-09-06',NULL,'HP4','Harry Potter y el Caliz de Fuego.','https://i.ytimg.com/vi/h1Xm9ynJKDM/maxresdefault.jpg',1,'CATEGORIA 1','Accion','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\'',11),(5,NULL,'2020-09-06',NULL,'HP5','Harry Potter y la Orden del Fenix.','https://i.pinimg.com/originals/2b/e3/75/2be37591a4488b31a8d13aaae5f6dbf9.jpg',1,'CATEGORIA 1','Accion,Aventura','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\'',NULL),(6,NULL,'2020-09-06',NULL,'HP6','Harry Potter y el Misterio del Principe.','https://i.pinimg.com/originals/70/ed/7a/70ed7ab8e8bbb87833fd802f1c75fc55.jpg',1,'CATEGORIA 1','Accion','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\'',11),(7,NULL,'2020-09-06',NULL,'HP7-1','Harry Potter las Reliquias de la Muerte - P1.','https://i.pinimg.com/originals/f2/4c/b6/f24cb60c5f04dca098b83729334aca58.jpg',1,'CATEGORIA 1','Accion','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\'',11),(8,NULL,'2020-09-06',NULL,'HP7-2','Harry Potter las Reliquias de la Muerte - P2.	','https://i.pinimg.com/originals/1f/53/c0/1f53c09b197e978eeaccb55621d46e20.jpg',1,'CATEGORIA 1','Accion','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\'',11);
/*!40000 ALTER TABLE `Item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MailSettings`
--

DROP TABLE IF EXISTS `MailSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MailSettings` (
  `internalId` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` time DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `CreationUser` varchar(255) DEFAULT NULL,
  `Host` varchar(255) DEFAULT NULL,
  `Port` int(11) DEFAULT NULL,
  `Secure` varchar(255) DEFAULT NULL,
  `User` varchar(255) DEFAULT NULL,
  `Pass` varchar(255) DEFAULT NULL,
  `MailFrom` varchar(255) DEFAULT NULL,
  `MailTemplate` text,
  PRIMARY KEY (`internalId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MailSettings`
--

LOCK TABLES `MailSettings` WRITE;
/*!40000 ALTER TABLE `MailSettings` DISABLE KEYS */;
INSERT INTO `MailSettings` VALUES (1,NULL,'2020-09-09',NULL,'mail50173.mymailcheap.com',587,'0','franco@oppen.io','kkVCDl8c','franco@oppen.io',NULL);
/*!40000 ALTER TABLE `MailSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PayMethod`
--

DROP TABLE IF EXISTS `PayMethod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PayMethod` (
  `internalId` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` time DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `CreationUser` varchar(255) DEFAULT NULL,
  `Code` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `Instantly` tinyint(1) DEFAULT NULL,
  `FreeShip` tinyint(1) DEFAULT NULL,
  `Online` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`internalId`),
  UNIQUE KEY `Code` (`Code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PayMethod`
--

LOCK TABLES `PayMethod` WRITE;
/*!40000 ALTER TABLE `PayMethod` DISABLE KEYS */;
INSERT INTO `PayMethod` VALUES (1,NULL,'2020-09-07',NULL,'EFT','EFECTIVO','Pagos en Efectivo','https://eis-automation.com/wp-content/uploads/2019/11/cash-payment-icon-5.png',0,0,0),(2,NULL,'2020-09-07',NULL,'MASTER','MASTER CARD','Tarjeta Master Card','https://w7.pngwing.com/pngs/305/373/png-transparent-logo-mastercard-font-solar-home-text-orange-logo.png',1,0,1),(3,NULL,'2020-09-07',NULL,'VISA','Tarjeta Visa','Tarjeta Visa','https://seranoticia.com/wp-content/uploads/2019/01/visa.jpg',1,0,1);
/*!40000 ALTER TABLE `PayMethod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShipMethod`
--

DROP TABLE IF EXISTS `ShipMethod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ShipMethod` (
  `internalId` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` time DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `CreationUser` varchar(255) DEFAULT NULL,
  `Code` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `Total` double DEFAULT NULL,
  `FreeShip` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`internalId`),
  UNIQUE KEY `Code` (`Code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShipMethod`
--

LOCK TABLES `ShipMethod` WRITE;
/*!40000 ALTER TABLE `ShipMethod` DISABLE KEYS */;
INSERT INTO `ShipMethod` VALUES (1,NULL,'2020-09-07',NULL,'RETIROENPERSONA','RETIRO EN PERSONA','RETIRO EN PERSONA POR NUESTRA SUCURSAL','IMAGE',0,1),(2,NULL,'2020-09-07',NULL,'ANDREANI','ANDREANI','ENVIO POR ANDREANI','ANDREANI',300,0),(3,NULL,'2020-09-07',NULL,'FLETE','FLETE','ENVIO POR FLETE (2,3 DIAS)','FLETE',500,0);
/*!40000 ALTER TABLE `ShipMethod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SubCategories`
--

DROP TABLE IF EXISTS `SubCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SubCategories` (
  `internalId` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` time DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `CreationUser` varchar(255) DEFAULT NULL,
  `Code` varchar(255) DEFAULT NULL,
  `Parent` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`internalId`),
  UNIQUE KEY `Code` (`Code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubCategories`
--

LOCK TABLES `SubCategories` WRITE;
/*!40000 ALTER TABLE `SubCategories` DISABLE KEYS */;
INSERT INTO `SubCategories` VALUES (1,NULL,'2020-09-06',NULL,'Accion','CATEGORIA 1','Accion','Peliculas de Accion.','theaters'),(2,NULL,'2020-09-08',NULL,'Comedia','CATEGORIA 1','Comedia','Peliculas de Comedia.','theaters'),(4,NULL,'2020-09-09',NULL,'Aventura','CATEGORIA 1','Aventura','Aventura','theaters');
/*!40000 ALTER TABLE `SubCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `internalId` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` time DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `CreationUser` varchar(255) DEFAULT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Admin` tinyint(1) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `ID` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `ZipCode` int(11) DEFAULT NULL,
  `Locality` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `Country` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`internalId`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,NULL,NULL,NULL,'a','FRANCO ADMIN','a',1,'f.galuzzi@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL),(3,NULL,'2020-09-07',NULL,'b','Franco Galuzzi','b',1,'f.galuzzi@gmail.com2','123123','Zeballos 6367',41875,'123','Chivilcoy','Argentina'),(9,NULL,'2020-09-07',NULL,'c','b','c',1,'f.galuzzi@gmail.com22',NULL,NULL,NULL,NULL,NULL,NULL),(11,NULL,'2020-09-07',NULL,'j','j','j',1,'j',NULL,NULL,NULL,NULL,NULL,NULL),(12,NULL,'2020-09-07',NULL,'m','m','m',1,'m','sad','sad',NULL,'asd','sad','sd'),(13,NULL,'2020-09-07',NULL,'cc','cc','cc',1,'cc',NULL,NULL,NULL,NULL,NULL,NULL),(14,NULL,'2020-09-07',NULL,'ccc','ccc','ccc',1,'ccc',NULL,NULL,NULL,NULL,NULL,NULL),(15,NULL,'2020-09-07',NULL,'bb','Franco Galuzziiii','bb',0,'bb','38522241','Zeballos 6367',1875,'buenos aires','Chivilcoy','Argentinasssss'),(16,NULL,'2020-09-07',NULL,'nn','nn','nn',1,'nn',NULL,NULL,NULL,NULL,NULL,NULL),(17,NULL,'2020-09-07',NULL,'aa','aa','aa',0,'aa',NULL,NULL,NULL,NULL,NULL,NULL),(18,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL),(19,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL),(20,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL),(21,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL),(22,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL),(23,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,NULL,'2020-09-09',NULL,'fran','fran','fran',0,'fran',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserConfig`
--

DROP TABLE IF EXISTS `UserConfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserConfig` (
  `internalId` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` time DEFAULT NULL,
  `CreationDate` date DEFAULT NULL,
  `CreationUser` varchar(255) DEFAULT NULL,
  `Model` varchar(255) DEFAULT NULL,
  `Columns` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`internalId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserConfig`
--

LOCK TABLES `UserConfig` WRITE;
/*!40000 ALTER TABLE `UserConfig` DISABLE KEYS */;
INSERT INTO `UserConfig` VALUES (1,NULL,'2020-09-05',NULL,'a','a'),(2,NULL,'2020-09-05',NULL,'a','a'),(3,NULL,'2020-09-05',NULL,'a','a');
/*!40000 ALTER TABLE `UserConfig` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-09 15:21:20
