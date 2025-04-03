-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: ecom
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alert_stock`
--

DROP TABLE IF EXISTS `alert_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alert_stock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastupdate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_A16CA18B4584665A` (`product_id`),
  CONSTRAINT `FK_A16CA18B4584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alert_stock`
--

LOCK TABLES `alert_stock` WRITE;
/*!40000 ALTER TABLE `alert_stock` DISABLE KEYS */;
INSERT INTO `alert_stock` VALUES (1,6,'alice@gmail.com','2024-08-06 11:47:12'),(2,6,'alice@gmail.com','2024-08-11 18:01:26'),(3,6,'camy@gmail.com','2024-08-21 09:14:29');
/*!40000 ALTER TABLE `alert_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_BA388B7A76ED395` (`user_id`),
  CONSTRAINT `FK_BA388B7A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (3,1),(6,10),(7,12);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `item_qty` int NOT NULL,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_F0FE25271AD5CDBF` (`cart_id`),
  KEY `IDX_F0FE25274584665A` (`product_id`),
  CONSTRAINT `FK_F0FE25271AD5CDBF` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `FK_F0FE25274584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES (39,6,2,1,'49','2024-08-26 20:19:40'),(41,7,19,1,'no size','2024-08-27 02:21:07'),(51,3,2,3,'M','2024-09-07 18:09:37'),(52,3,1,2,'M','2024-09-07 18:09:55'),(53,3,12,1,'no size','2024-09-07 18:16:12');
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_updated` datetime NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_en` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,'Colliers','https://static.eproshopping.fr/media/f6a7b53d126a218bca2ba73a3305ef3060e4f58b/produit/3f91ae4f21de59af5f0239d16f93984d594db0c0.png','2024-07-26 14:25:43','Un collier est un type de bijou ou de vêtement porté autour du cou.','Necklaces','A necklace is a type of jewelry or item of clothing worn around the neck.'),(3,'Bagues','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1O8p-NDXPcW_tAffab0CaRBiMIfKFKmjB3A&s','2024-07-26 14:26:38','Une bague est un bijou qui se porte généralement au doigt en forme d\'anneau, plus ou moins large, serti ou non de pierres et quelquefois gravé.','Rings','A ring is a piece of jewelry that is generally worn on the finger in the shape of a ring, more or less wide, set or not with stones and sometimes engraved.'),(4,'Alliances','https://png.pngtree.com/png-clipart/20210704/original/pngtree-beautiful-gold-wedding-rings-png-ring-png-image_6499014.jpg','2024-07-26 14:27:33','Une alliance désigne, par métonymie, une bague de platine, d\'or ou d\'argent, symbole de l\'union contractée par le mariage de deux personnes (leur alliance).','Wedding Rings','A wedding ring designates, by metonymy, a platinum, gold or silver ring, symbol of the union contracted by the marriage of two people (their wedding ring).'),(5,'Bracelets','https://e7.pngegg.com/pngimages/59/468/png-clipart-bangle-bracelet-product-design-silver-jewellery-silver-ring-bracelet-thumbnail.png','2024-07-26 14:28:03','Un bracelet est un article de vêtement ou de joaillerie qui est porté autour du poignet.','Bracelets','A bracelet is an item of clothing or jewelry that is worn around the wrist.'),(6,'Pendentifs','https://www.collier-coeur-doux.fr/wp-content/uploads/2024/02/pendentif-quartz-rose-coeur-quartz-rose-50cm.png','2024-07-26 14:28:52','Un pendentif est un article de joaillerie qui se porte autour du cou ou au poignet.','Pendants','A pendant is an item of jewelry that is worn around the neck or wrist.'),(7,'Boucles d\'oreilles','https://e7.pngegg.com/pngimages/738/417/png-clipart-earring-body-jewellery-silver-product-design-big-stud-earrings-for-men-gemstone-diamond.png','2024-07-26 14:29:34','Une boucle d\'oreille est un bijou ornant le pavillon de l\'oreille, le plus souvent au niveau du lobe. ','Earrings','An earring is a piece of jewelry adorning the ear, most often at the lobe.');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20240805184327','2024-08-05 18:43:33',143),('DoctrineMigrations\\Version20240806104609','2024-08-06 10:46:15',146),('DoctrineMigrations\\Version20240806113218','2024-08-06 11:32:23',67),('DoctrineMigrations\\Version20240806224039','2024-08-06 22:40:50',296),('DoctrineMigrations\\Version20240809134419','2024-08-09 13:44:46',98),('DoctrineMigrations\\Version20240819094855','2024-08-19 09:48:58',132),('DoctrineMigrations\\Version20240821142542','2024-08-21 14:25:48',175),('DoctrineMigrations\\Version20240828152327','2024-08-28 15:23:38',189);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gift_wrapping`
--

DROP TABLE IF EXISTS `gift_wrapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gift_wrapping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gift_wrapping`
--

LOCK TABLES `gift_wrapping` WRITE;
/*!40000 ALTER TABLE `gift_wrapping` DISABLE KEYS */;
INSERT INTO `gift_wrapping` VALUES (1,'https://m.media-amazon.com/images/I/51zD8iPDnxL._AC_.jpg','2024-11-24 00:00:00','2024-12-30 00:00:00'),(2,'https://m.media-amazon.com/images/I/81lsNXI6clL.jpg','2024-01-01 00:00:00','2024-12-30 00:00:00');
/*!40000 ALTER TABLE `gift_wrapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_updated` datetime NOT NULL,
  `name_en` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'Or Jaune','https://img.freepik.com/photos-gratuite/vide-vide-texture-lumiere-piece_1258-175.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721174400&semt=ais_user','2024-07-26 14:25:43','Yellow gold'),(2,'Or Blanc','data:image/jpeg;base64,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','2024-07-26 14:26:43','White gold'),(3,'Or Rose','data:image/jpeg;base64,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','2024-07-26 14:27:43','Rose Gold'),(4,'Platine','https://www.google.com/imgres?q=platine%20color%20background&imgurl=https%3A%2F%2Ft4.ftcdn.net%2Fjpg%2F01%2F34%2F21%2F31%2F360_F_134213180_vgs3IB9fq6f41PVKDSZYHnFRQEuIVjqG.jpg&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Ffr%2Fsearch%3Fk%3Dplatinum%2520background&docid=rE-HsIJtx6lvOM&tbnid=fbktRktQ8ArqpM&vet=12ahUKEwi8183ng7GHAxVdBfsDHQWoDvEQM3oECBgQAA..i&w=360&h=360&hcb=2&ved=2ahUKEwi8183ng7GHAxVdBfsDHQWoDvEQM3oECBgQAA','2024-07-26 14:28:43','Platinum'),(5,'Rhodium','data:image/jpeg;base64,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','2024-07-26 14:29:43','Rhodium'),(6,'Palladium','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWxsbEiXrUeAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=','2024-07-26 14:30:43','Palladium');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messenger_messages`
--

DROP TABLE IF EXISTS `messenger_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messenger_messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `body` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `headers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue_name` varchar(190) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  KEY `IDX_75EA56E016BA31DB` (`delivered_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messenger_messages`
--

LOCK TABLES `messenger_messages` WRITE;
/*!40000 ALTER TABLE `messenger_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messenger_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `promotion_id` int NOT NULL,
  `category_id` int NOT NULL,
  `stone_id` int DEFAULT NULL,
  `material_id` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_en` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` json NOT NULL,
  `weight` double NOT NULL,
  `price` double NOT NULL,
  `stock_qty` int NOT NULL,
  `last_updated` datetime NOT NULL,
  `key_stripe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_D34A04AD139DF194` (`promotion_id`),
  KEY `IDX_D34A04AD12469DE2` (`category_id`),
  KEY `IDX_D34A04AD1582D292` (`stone_id`),
  KEY `IDX_D34A04ADE308AC6F` (`material_id`),
  CONSTRAINT `FK_D34A04AD12469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FK_D34A04AD139DF194` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`),
  CONSTRAINT `FK_D34A04AD1582D292` FOREIGN KEY (`stone_id`) REFERENCES `stone` (`id`),
  CONSTRAINT `FK_D34A04ADE308AC6F` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,3,3,11,1,'Bague Manon Or Jaune Oxyde De Zirconium','Manon Yellow Gold Zirconium Oxide Ring','Bague Or Jaune 375/1000 Oxyde De Zirconium Central Accompagne D\'oxydes De Zirconium','375/1000 Yellow Gold Ring with Central Zirconium Oxide Accompanied by Zirconium Oxides','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dwed995558/images/B3DFJZW160-master.jpg?sw=1024&sh=1024\"]',1.24,179,300,'2024-07-30 19:49:12','price_1PjMbxGrTRGUcbUFMKaWTFhz'),(2,1,3,5,2,'Bague Manon Or Blanc Amethyste','Manon White Gold Amethyst Ring','375/1000 White Gold Ring Central Amethyst Accompanied By Amethysts','Bague Or Blanc 375/1000 Amethyste Centrale Accompagnee D\'amethystes','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw595f7c46/images/B3DFBYI016-master.jpg?sw=1024&sh=1024\", \"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dwd4cd99eb/images/B3DFBYI016-view1.jpg?sw=1024&sh=1024\"]',1.1,169,300,'2024-07-30 19:56:38','price_1PjMceGrTRGUcbUFMrD9zUBO'),(3,1,3,2,2,'Bague Manon Or Blanc Saphir Et Diamant','Manon White Gold Sapphire and Diamond Ring','Bague Or Blanc 375/1000 Saphir Central Accompagne De Diamants','375/1000 White Gold Ring with Central Sapphire and Diamonds','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw504a4e4e/images/B3DFBSB787-master.jpg?sw=1024&sh=1024\"]',1.18,570,340,'2024-07-30 19:58:27','price_1PjMeTGrTRGUcbUF6YRy1q3G'),(4,2,3,11,3,'Bague Solitaire Manon Or Rose Oxyde De Zirconium','Manon Solitaire Ring Rose Gold Zirconium Oxide','Solitaire Or Rose 375/1000 Oxyde De Zirconium Rond 4 Griffes Accompagne Oxydes De Zirconium','Solitaire Rose Gold 375/1000 Zirconium Oxide Round 4 Claws Accompanies Zirconium Oxides','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw5ba245e5/images/B3DFRZW01U-master.jpg?sw=1024&sh=1024\", [\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw3f33d6db/images/B3DFRZW01U-view1.jpg?sw=1024&sh=1024\"]]',1.24,179,436,'2024-07-30 20:13:41','price_1PjMhpGrTRGUcbUFTPYxuXpT'),(6,2,2,11,1,'Collier Ponama Or Jaune Oxyde De Zirconium','Ponama Yellow Gold Zirconium Oxide Necklace','Collier Or Jaune 375/1000 Maille Forçat Oxyde De Zirconium 4mm Pm 42cm','375/1000 Yellow Gold Necklace Forçat Mesh Zirconium Oxide 4mm Pm 42cm\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw098ae5e8/images/B3CFJZW134-master.jpg?sw=1024&sh=1024\"]',1.08,99,2,'2024-08-21 09:15:03','price_1PjMibGrTRGUcbUFeznPWjY8'),(7,1,2,11,2,'Collier Ponama Or Blanc Oxyde De Zirconium','Ponama White Gold Zirconium Oxide Necklace','Collier Or Blanc 375/1000 Maille Forçat Oxyde De Zirconium 4mm 42cm\n','375/1000 White Gold Necklace Zirconium Oxide Forçat Mesh 4mm 42cm\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw73af259b/images/B3CFBZW015-master.jpg?sw=1024&sh=1024\"]',1.09,99,5,'2024-07-31 18:57:05','price_1PjMjbGrTRGUcbUFrjVkeDud'),(8,1,2,11,3,'Collier Colby Or Rose Oxyde De Zirconium','Ponama Rose Gold Zirconium Oxide Necklace','Collier Or Rose 375/1000 Solitaire Oxyde De Zirconium 4griffes 0.451cts Maille Forcat 42cm\n','375/1000 Rose Gold Necklace Solitaire Zirconium Oxide 4 claws 0.451cts Forcat Mesh 42cm\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw0b368dc1/images/B3CFRZW059-master.jpg?sw=1024&sh=1024\"]',0.77,99,355,'2024-07-30 21:09:18','price_1PjMkHGrTRGUcbUFjlEP99MU'),(9,3,4,NULL,2,'Alliance Caroline Sablee Ruban Plat Or Blanc','Caroline Sablee Flat Ribbon White Gold Wedding Ring','Alliance Or Blanc Rhodie 375/1000 Collection Caroline Fantaisie Intérieur Sable 3mm\n','White Gold Rhodium Wedding Band 375/1000 Caroline Fantaisie Collection Sand Interior 3mm\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dwf4e51d16/images/B3AFBW0403-master.jpg?sw=1024&sh=1024\", \"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw1b0efc54/images/B3AFBW0403-view1.jpg?sw=1024&sh=1024\"]',1.4,239,564,'2024-07-30 22:00:27','price_1PjMlEGrTRGUcbUFYYmkpsbI'),(10,1,4,NULL,1,'Alliance Caroline Sablee Ruban Plat Or Bicolore','Caroline Sablee Band Flat Ribbon Two-Tone Gold Wedding Ring','Alliance Or Bicolore Jaune Et Blanc Rhodie 375/1000 Fantaisie Sable 3mm\n','Two-Tone Yellow and White Rhodium Gold Wedding Band 375/1000 Fancy Sand 3mm\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dwc5636811/images/B3AF2W0405-master.jpg?sw=1024&sh=1024\", \"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dwe00d67c3/images/B3AF2W0405-view1.jpg?sw=1024&sh=1024\"]',1.14,229,432,'2024-07-30 22:10:04','price_1PjMlpGrTRGUcbUFWn0qkSxz'),(11,1,5,NULL,1,'Bracelet Aliz Or Jaune','Aliz Yellow Gold Bracelet','Bracelet Or Jaune 375/1000 Vague Argente Glitter Maille Jaseron 16+2cm\n','375/1000 Yellow Gold Bracelet Silver Wave Glitter Jaseron Mesh 16+2cm\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw774c3c79/images/B3BFJW00CP-master.jpg?sw=1024&sh=1024\", \"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw2b23accd/images/B3BFJW00CP-view1.jpg?sw=1024&sh=1024\"]',0.65,99,345,'2024-07-30 22:11:47','price_1PjMmOGrTRGUcbUFLpYL9aSu'),(12,1,5,5,1,'Bracelet Arenale Or Jaune Amethyste','Arenale Bracelet Yellow Gold Amethyst Bracelet','Bracelet Or Jaune 375/1000 Améthyste Serti Clos Maille Forçat 18cm\n','375/1000 Yellow Gold Amethyst Bracelet Closed Setting Convict Mesh 18cm\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw7c720818/images/B3BFJYI020-master.jpg?sw=1024&sh=1024\", \"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw60e0d279/images/B3BFJYI020-view1.jpg?sw=1024&sh=1024\"]',0.63,99,353,'2024-07-30 22:23:43','price_1PjMnBGrTRGUcbUFiDtpadMI'),(13,1,5,NULL,1,'Bracelet Arenale Or Jaune Quartz','Arenale Yellow Gold Quartz Bracelet','Bracelet Or Jaune 375/1000 Quartz Fume Serti Clos Maille Forçat 18cm\n','375/1000 Yellow Gold Bracelet Smoky Quartz Closed Setting Convict Mesh 18cm\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw45e603e7/images/B3BFJQM018-master.jpg?sw=1024&sh=1024\"]',0.64,99,355,'2024-07-30 22:20:09','price_1PjMoFGrTRGUcbUFAS1NN20y'),(14,1,5,NULL,1,'Bracelet Or Jaune Arenale Topaze','Arenale Topaz Yellow Gold Bracelet','Bracelet Or Jaune 375/1000 Topaze Azur 0.5 Cts Serti Clos Maille Forçat 18cm\n','375/1000 Yellow Gold Bracelet Azure Topaz 0.5 Cts Closed Setting Forçat Mesh 18cm\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dwbc10c207/images/B3BFJTB016-master.jpg?sw=1024&sh=1024\"]',0.75,98.99,356,'2024-07-30 22:23:00','price_1PjMopGrTRGUcbUFUsdR4KFV'),(15,1,6,NULL,1,'Pendentif Alyssa Or Jaune Croix ','Alyssa Yellow Gold Cross Pendant','Pendentif Or Jaune 375/1000 Motif Croix Relief\n','375/1000 Yellow Gold Pendant with Relief Cross Motif\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw241990bd/images/B3PMJW0591-view2.jpg?sw=1024&sh=1024\"]',0.6,89,343,'2024-08-11 18:48:13','price_1PjMpFGrTRGUcbUFdQRSgdnU'),(16,1,7,11,1,'Créoles Andgelina Rondes Or Jaune Oxyde De Zirconium','Andgelina Round Yellow Gold Zirconium Oxide Creoles','Creoles Or Jaune 375/1000 Serti 4 Griffes Oxydes De Zirconium Blancs\n','375/1000 Yellow Gold Creoles Set with 4 Claws and White Zirconium Oxides\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw20feb8dc/images/B3OFJZW814-master.jpg?sw=1024&sh=1024\"]',0.84,109,354,'2024-07-30 22:30:28','price_1PjMphGrTRGUcbUFHjHXA4AK'),(17,1,7,11,2,'Créoles Andgelina Rondes Or Blanc Oxyde De Zirconium','Andgelina Round White Gold Zirconium Oxide Creoles ','Créoles Or Blanc 375/1000 Oxydes De Zirconium Diamètre 7.3mm Largeur 2mm\n','Creoles White Gold 375/1000 Zirconium Oxides Diameter 7.3mm Width 2mm\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dwb027e861/images/B3OFBZW583-master.jpg?sw=1024&sh=1024\"]',0.91,109,346,'2024-07-30 22:32:04','price_1PjMq7GrTRGUcbUFGIwTaCca'),(18,1,7,11,1,'Créoles Andgelina Rondes Or Jaune Oxyde De Zirconium','Andgelina Round Yellow Gold Zirconium Oxide Creoles','Creoles Or Jaune 375/1000 Serti 4 Griffes Oxydes De Zirconium Bleus\n','375/1000 Yellow Gold Creoles Set with 4 Claws and Blue Zirconium Oxides\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dwc8a1ba40/images/B3OFJZB116-master.jpg?sw=1024&sh=1024\"]',0.7,109,356,'2024-07-30 22:33:24','price_1PjMqTGrTRGUcbUFxGWq8OqI'),(19,1,7,11,3,'Créoles Or Rose Andgelina Oxyde','Andgelina Round Oxide Rose Gold Creoles','Créoles Or Rose 375/1000 Oxydes De Zirconium Serti Griffes 7.3mm\n','375/1000 Rose Gold Hoop Earrings Zirconium Oxides Claw Setting 7.3mm\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw36670795/images/B3OFRZW057-master.jpg?sw=1024&sh=1024\"]',0.82,109,432,'2024-07-30 22:35:03','price_1PjMr5GrTRGUcbUFYFO6lbld'),(20,1,6,NULL,2,'Pendentif Alyssa Argent Blanc Croix','Alyssa Silver White Cross Pendant','Collier Argent Blanc 925/1000 Croix Maille Spiga 55cm','925/1000 White Silver Necklace Cross Mesh Spiga 55cm','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dw2ca1c131/images/FACHBW01EH-view1.jpg?sw=1024&sh=1024\"]',5.2,79,200,'2024-08-11 18:48:10',NULL),(22,1,5,NULL,1,'Bracelet Eleno Or Jaune','Eleno Yellow Gold Bracelet','Bracelet Or Jaune 375/1000 Double Cœurs Ajoures Entrelaces Maille Jaseron 18cm\n','375/1000 Yellow Gold Bracelet Double Openwork Hearts Interlaced Jaseron Mesh 18cm\n','[\"https://www.histoiredor.com/dw/image/v2/BCQS_PRD/on/demandware.static/-/Sites-THOM_CATALOG/default/dwa0210f8f/images/B3BFJW00A9-master.jpg?sw=1024&sh=1024\"]',0.59,79,340,'2024-08-28 16:32:08',NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pourcentage` int NOT NULL,
  `last_updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
INSERT INTO `promotion` VALUES (1,0,'2024-07-30 21:28:34'),(2,20,'2024-07-30 21:30:34'),(3,30,'2024-07-30 22:28:34'),(4,40,'2024-07-30 22:30:34');
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotional_code`
--

DROP TABLE IF EXISTS `promotional_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotional_code` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` int NOT NULL,
  `begin` datetime NOT NULL,
  `end` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotional_code`
--

LOCK TABLES `promotional_code` WRITE;
/*!40000 ALTER TABLE `promotional_code` DISABLE KEYS */;
INSERT INTO `promotional_code` VALUES (2,' 25c6cWynAt8BusY',5,'2024-08-06 15:15:37','2024-09-15 15:15:37'),(4,' WxJdyNV5zJxqkUE',5,'2024-08-06 15:47:26','2024-09-15 15:47:26'),(5,' pLgZp5N189hZeIt',5,'2024-08-06 15:48:55','2024-09-15 15:48:55'),(6,' XvCFCNJP9ZCaCxJ',5,'2024-08-11 18:28:23','2024-09-20 18:28:23'),(7,' InYB3cAuID8f53O',5,'2024-08-21 09:13:00','2024-09-30 09:13:00'),(8,'guillaume_the_best',20,'2024-08-21 09:13:00','2024-09-30 09:13:00');
/*!40000 ALTER TABLE `promotional_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `publication` datetime NOT NULL,
  `stars` int NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_794381C6A76ED395` (`user_id`),
  KEY `IDX_794381C64584665A` (`product_id`),
  CONSTRAINT `FK_794381C64584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_794381C6A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,'2024-08-11 18:26:45',5,'Perfect',20),(2,1,'2024-08-21 09:02:03',5,'perfect ! ',15),(3,1,'2024-08-21 09:02:25',3,'moyen',15),(4,1,'2024-09-08 16:26:55',5,'SUPER',1),(5,1,'2024-09-08 16:27:18',5,'SUPER',1),(6,1,'2024-09-08 16:27:18',5,'SUPER',1);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_country`
--

DROP TABLE IF EXISTS `shipping_country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `blacklist` tinyint(1) NOT NULL,
  `country_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_country`
--

LOCK TABLES `shipping_country` WRITE;
/*!40000 ALTER TABLE `shipping_country` DISABLE KEYS */;
INSERT INTO `shipping_country` VALUES (1,'Afghanistan',1,'AF'),(2,'Albania',1,'AL'),(3,'Algeria',1,'DZ'),(4,'Andorra',1,'AD'),(5,'Angola',0,'AO'),(6,'Antigua and Barbuda',0,'AG'),(7,'Argentina',0,'AR'),(8,'Armenia',0,'AM'),(9,'Australia',0,'AU'),(10,'Austria',0,'AT'),(11,'Azerbaijan',0,'AZ'),(12,'The Bahamas',0,'BS'),(13,'Bahrain',0,'BH'),(14,'Bangladesh',0,'BD'),(15,'Barbados',0,'BB'),(16,'Belarus',1,'BY'),(17,'Belgium',0,'BE'),(18,'Belize',0,'BZ'),(19,'Benin',0,'BJ'),(20,'Bhutan',0,'BT'),(21,'Bolivia',0,'BO'),(22,'Bosnia and Herzegovina',0,'BA'),(23,'Botswana',0,'BW'),(24,'Brazil',0,'BR'),(25,'Brunei',0,'BN'),(26,'Bulgaria',0,'BG'),(27,'Burkina Faso',0,'BF'),(28,'Burundi',0,'BI'),(29,'Cabo Verde',0,'CV'),(30,'Cambodia',0,'KH'),(31,'Cameroon',0,'CM'),(32,'Canada',0,'CA'),(33,'Central African Republic',0,'CF'),(34,'Chad',0,'TD'),(35,'Chile',0,'CL'),(36,'China',0,'CN'),(37,'Colombia',0,'CO'),(38,'Comoros',0,'KM'),(39,'Democratic Republic of the Congo',0,'CD'),(40,'Republic of the Congo',0,'CG'),(41,'Costa Rica',0,'CR'),(42,'Côte d’Ivoire',0,'CI'),(43,'Croatia',0,'HR'),(44,'Cuba',0,'CU'),(45,'Cyprus',0,'CY'),(46,'Czech Republic',0,'CZ'),(47,'Denmark',0,'DK'),(48,'Djibouti',0,'DJ'),(49,'Dominica',0,'DM'),(50,'Dominican Republic',0,'DO'),(51,'East Timor (Timor-Leste)',0,'TL'),(52,'Ecuador',0,'EC'),(53,'Egypt',0,'EG'),(54,'El Salvador',0,'SV'),(55,'Equatorial Guinea',0,'GQ'),(56,'Eritrea',1,'ER'),(57,'Estonia',0,'EE'),(58,'Eswatini',0,'SZ'),(59,'Ethiopia',0,'ET'),(60,'Fiji',0,'FJ'),(61,'Finland',0,'FI'),(62,'France',0,'FR'),(63,'Gabon',0,'GA'),(64,'The Gambia',0,'GM'),(65,'Georgia',0,'GE'),(66,'Germany',0,'DE'),(67,'Ghana',0,'GH'),(68,'Greece',0,'GR'),(69,'Grenada',0,'GD'),(70,'Guatemala',0,'GT'),(71,'Guinea',0,'GN'),(72,'Guinea-Bissau',0,'GW'),(73,'Guyana',0,'GY'),(74,'Haiti',1,'HT'),(75,'Honduras',0,'HN'),(76,'Hungary',0,'HU'),(77,'Iceland',0,'IS'),(78,'India',0,'IN'),(79,'Indonesia',0,'ID'),(80,'Iran',0,'IR'),(81,'Iraq',1,'IQ'),(82,'Ireland',0,'IE'),(83,'Israel',0,'IL'),(84,'Italy',0,'IT'),(85,'Jamaica',0,'JM'),(86,'Japan',0,'JP'),(87,'Jordan',0,'JO'),(88,'Kazakhstan',0,'KZ'),(89,'Kenya',0,'KE'),(90,'Kiribati',0,'KI'),(91,'North Korea',1,'KP'),(92,'South Korea',0,'KR'),(93,'Kosovo',0,'XK'),(94,'Kuwait',0,'KW'),(95,'Kyrgyzstan',0,'KG'),(96,'Laos',0,'LA'),(97,'Latvia',0,'LV'),(98,'Lebanon',0,'LB'),(99,'Lesotho',0,'LS'),(100,'Liberia',0,'LR'),(101,'Libya',1,'LY'),(102,'Liechtenstein',0,'LI'),(103,'Lithuania',0,'LT'),(104,'Luxembourg',0,'LU'),(105,'Madagascar',0,'MG'),(106,'Malawi',0,'MW'),(107,'Malaysia',0,'MY'),(108,'Maldives',0,'MV'),(109,'Mali',1,'ML'),(110,'Malta',0,'MT'),(111,'Marshall Islands',0,'MH'),(112,'Mauritania',0,'MR'),(113,'Mauritius',0,'MU'),(114,'Mexico',0,'MX'),(115,'Federated States of Micronesia',0,'FM'),(116,'Moldova',0,'MD'),(117,'Monaco',0,'MC'),(118,'Mongolia',0,'MN'),(119,'Montenegro',0,'ME'),(120,'Morocco',0,'MA'),(121,'Mozambique',0,'MZ'),(122,'Myanmar (Burma)',0,'MM'),(123,'Namibia',0,'NA'),(124,'Nauru',0,'NR'),(125,'Nepal',0,'NP'),(126,'Netherlands',0,'NL'),(127,'New Zealand',0,'NZ'),(128,'Nicaragua',0,'NI'),(129,'Niger',0,'NE'),(130,'Nigeria',0,'NG'),(131,'North Macedonia',0,'MK'),(132,'Norway',0,'NO'),(133,'Oman',0,'OM'),(134,'Pakistan',0,'PK'),(135,'Palau',0,'PW'),(136,'Panama',0,'PA'),(137,'Papua New Guinea',0,'PG'),(138,'Paraguay',0,'PY'),(139,'Peru',0,'PE'),(140,'Philippines',0,'PH'),(141,'Poland',0,'PL'),(142,'Portugal',0,'PT'),(143,'Qatar',0,'QA'),(144,'Romania',0,'RO'),(145,'Russia',0,'RU'),(146,'Rwanda',0,'RW'),(147,'Saint Kitts and Nevis',0,'KN'),(148,'Saint Lucia',0,'LC'),(149,'Saint Vincent and the Grenadines',0,'VC'),(150,'Samoa',0,'WS'),(151,'San Marino',0,'SM'),(152,'Sao Tome and Principe',0,'ST'),(153,'Saudi Arabia',0,'SA'),(154,'Senegal',0,'SN'),(155,'Serbia',0,'RS'),(156,'Seychelles',0,'SC'),(157,'Sierra Leone',0,'SL'),(158,'Singapore',0,'SG'),(159,'Slovakia',0,'SK'),(160,'Slovenia',0,'SI'),(161,'Solomon Islands',0,'SB'),(162,'Somalia',0,'SO'),(163,'South Africa',0,'ZA'),(164,'Spain',0,'ES'),(165,'Sri Lanka',0,'LK'),(166,'Sudan',0,'SD'),(167,'South Sudan',0,'SS'),(168,'Suriname',0,'SR'),(169,'Sweden',0,'SE'),(170,'Switzerland',0,'CH'),(171,'Syria',0,'SY'),(172,'Taiwan',0,'TW'),(173,'Tajikistan',0,'TJ'),(174,'Tanzania',0,'TZ'),(175,'Thailand',0,'TH'),(176,'Togo',0,'TG'),(177,'Tonga',0,'TO'),(178,'Trinidad and Tobago',0,'TT'),(179,'Tunisia',0,'TN'),(180,'Turkey',0,'TR'),(181,'Turkmenistan',0,'TM'),(182,'Tuvalu',0,'TV'),(183,'Uganda',0,'UG'),(184,'Ukraine',0,'UA'),(185,'United Arab Emirates',0,'AE'),(186,'United Kingdom',0,'GB'),(187,'United States',0,'US'),(188,'Uruguay',0,'UY'),(189,'Uzbekistan',0,'UZ'),(190,'Vanuatu',0,'VU'),(191,'Vatican City',0,'VA'),(192,'Venezuela',0,'VE'),(193,'Vietnam',0,'VN'),(194,'Yemen',0,'YE'),(195,'Zambia',0,'ZM'),(196,'Zimbabwe',0,'ZW');
/*!40000 ALTER TABLE `shipping_country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_insurance`
--

DROP TABLE IF EXISTS `shipping_insurance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_insurance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_insurance`
--

LOCK TABLES `shipping_insurance` WRITE;
/*!40000 ALTER TABLE `shipping_insurance` DISABLE KEYS */;
INSERT INTO `shipping_insurance` VALUES (1,'Standard','Livraison gratuite et non assurée partout dans le monde',0),(2,'Rapide','Livraison rapide sans assurance',5),(3,'Assurance','Livraison standard et assurée par notre boutique',10),(4,'VIP','Livraison rapide et assurée par notre boutique',20);
/*!40000 ALTER TABLE `shipping_insurance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_threshold`
--

DROP TABLE IF EXISTS `shipping_threshold`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_threshold` (
  `id` int NOT NULL AUTO_INCREMENT,
  `continent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `threshold` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_threshold`
--

LOCK TABLES `shipping_threshold` WRITE;
/*!40000 ALTER TABLE `shipping_threshold` DISABLE KEYS */;
INSERT INTO `shipping_threshold` VALUES (1,'Asia-Pacific',500),(2,'Africa',300),(3,'Europe',300),(4,'Middle East',500),(5,'North America',400),(6,'South America',450);
/*!40000 ALTER TABLE `shipping_threshold` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size_bracelets`
--

DROP TABLE IF EXISTS `size_bracelets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size_bracelets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size_bracelets`
--

LOCK TABLES `size_bracelets` WRITE;
/*!40000 ALTER TABLE `size_bracelets` DISABLE KEYS */;
INSERT INTO `size_bracelets` VALUES (1,'XS','13-16cm','2024-07-31 00:40:10'),(2,'S','16-19cm','2024-07-31 00:40:11'),(3,'M','19-22cm','2024-07-31 00:40:12'),(4,'L','22-25cm','2024-07-31 00:40:14');
/*!40000 ALTER TABLE `size_bracelets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size_necklaces`
--

DROP TABLE IF EXISTS `size_necklaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size_necklaces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size_necklaces`
--

LOCK TABLES `size_necklaces` WRITE;
/*!40000 ALTER TABLE `size_necklaces` DISABLE KEYS */;
INSERT INTO `size_necklaces` VALUES (1,'XS','38cm','2024-07-31 00:40:10'),(2,'S','42cm','2024-07-31 00:40:11'),(3,'M','45','2024-07-31 00:40:12'),(4,'L','50cm','2024-07-31 00:40:14'),(5,'XL','55cm','2024-07-31 00:40:14'),(6,'XXL','60cm','2024-07-31 00:40:14');
/*!40000 ALTER TABLE `size_necklaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size_rings`
--

DROP TABLE IF EXISTS `size_rings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size_rings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `circumference` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `diameter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size_rings`
--

LOCK TABLES `size_rings` WRITE;
/*!40000 ALTER TABLE `size_rings` DISABLE KEYS */;
INSERT INTO `size_rings` VALUES (1,'48','48mm','15.21mm','2024-07-31 00:40:10'),(2,'49','49mm','15.7mm','2024-07-31 00:40:11'),(3,'51','51mm','16.1mm','2024-07-31 00:40:12'),(4,'52','52mm','16.51mm','2024-07-31 00:40:14'),(5,'53','53mm','16.92mm','2024-07-31 00:40:20'),(6,'55','55mm','17.35mm','2024-07-31 00:40:45'),(7,'56','56mm','17.75mm','2024-07-31 00:41:24'),(8,'57','57mm','18.19mm','2024-07-31 00:45:10'),(9,'58','58mm','18.53mm','2024-07-31 00:46:10'),(10,'59','59mm','18.89mm','2024-07-31 00:50:10'),(11,'61','61mm','19.41mm','2024-07-31 00:55:10'),(12,'62','62mm','19.84mm','2024-07-31 00:56:10'),(13,'63','63mm','20.2mm','2024-07-31 00:57:10'),(14,'65','65mm','20.68mm','2024-07-31 00:59:10');
/*!40000 ALTER TABLE `size_rings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats_cart`
--

DROP TABLE IF EXISTS `stats_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stats_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `count` int NOT NULL,
  `last_updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_4ACFE0F71AD5CDBF` (`cart_id`),
  CONSTRAINT `FK_4ACFE0F71AD5CDBF` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats_cart`
--

LOCK TABLES `stats_cart` WRITE;
/*!40000 ALTER TABLE `stats_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `stats_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats_product`
--

DROP TABLE IF EXISTS `stats_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stats_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `count` int NOT NULL,
  `last_updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_4AF045F04584665A` (`product_id`),
  CONSTRAINT `FK_4AF045F04584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats_product`
--

LOCK TABLES `stats_product` WRITE;
/*!40000 ALTER TABLE `stats_product` DISABLE KEYS */;
INSERT INTO `stats_product` VALUES (1,6,57,'2024-07-30 21:12:04'),(3,7,41,'2024-07-30 21:12:07'),(5,8,20,'2024-07-30 21:12:09'),(7,1,167,'2024-07-30 21:12:13'),(9,2,148,'2024-07-30 21:12:15'),(11,3,18,'2024-07-30 21:12:17'),(13,4,139,'2024-07-30 21:12:20'),(15,9,63,'2024-07-30 22:00:31'),(17,11,34,'2024-07-30 22:11:55'),(19,10,75,'2024-07-30 22:16:31'),(22,12,58,'2024-07-30 22:23:48'),(23,13,12,'2024-07-30 22:23:59'),(26,14,14,'2024-07-30 22:24:02'),(27,15,71,'2024-07-30 22:29:08'),(29,16,131,'2024-07-30 22:35:13'),(31,17,50,'2024-07-30 22:35:16'),(34,18,31,'2024-07-30 22:35:18'),(35,19,58,'2024-07-30 22:35:20'),(37,20,164,'2024-08-11 17:49:53'),(39,22,17,'2024-08-28 16:41:24');
/*!40000 ALTER TABLE `stats_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stone`
--

DROP TABLE IF EXISTS `stone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stone` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_updated` datetime NOT NULL,
  `name_en` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stone`
--

LOCK TABLES `stone` WRITE;
/*!40000 ALTER TABLE `stone` DISABLE KEYS */;
INSERT INTO `stone` VALUES (1,'Rubis','https://upload.wikimedia.org/wikipedia/commons/1/17/Corundum-215330.jpg','2024-07-26 14:30:43','Ruby'),(2,'Saphir','https://upload.wikimedia.org/wikipedia/commons/b/b9/Geschliffener_blauer_Saphir.jpg','2024-07-26 14:31:43','Sapphire'),(3,'Emerald','data:image/jpeg;base64,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','2024-07-26 14:32:00','emerald'),(4,'Diamant','data:image/jpeg;base64,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','2024-07-26 14:35:43','Diamond'),(5,'Améthyste','https://upload.wikimedia.org/wikipedia/commons/e/e2/Amethyst._Magaliesburg%2C_South_Africa.jpg','2024-07-26 14:47:43','Amethyst'),(6,'Jade','https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/5_Emeralds_from_Colombia.JPG/983px-5_Emeralds_from_Colombia.JPG','2024-07-26 14:49:43','Jade'),(7,'Perle d\'eau douce','https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTWmJKHUS3W9yhAjaLjv2eV4FNfdrZ12OA6pNf6eskICjFEbzHaU25eP1zB4iN6FoDDk8opTKbVTU7YUnsGAq5cBcfB0XTH-x9EzIu0b7J69QyBV9ocb48EwI1OmGGnu3ew7zhWNWjrqA&usqp=CAc','2024-07-26 14:50:43','Freshwater Pearl'),(9,'Perle de Tahiti','https://www.boutiqueperlenoire.com/cdn/shop/files/pendentif-perle-de-tahiti-10k-white-gold-china-11-12mm-48886362931544_1800x1800.jpg?v=1682437147','2024-07-26 14:51:43','Tahitian pearl'),(10,'Grenat','data:image/jpeg;base64,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','2024-07-26 14:55:43','Garnet'),(11,'Oxyde de Zirconium','https://www.gems-plus.com/photos-pierres-precieuses/pierre-synthetique/oxyde-de-zirconium-cubique-1.jpg','2024-07-30 21:47:59','Zirconium Oxide');
/*!40000 ALTER TABLE `stone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracking`
--

DROP TABLE IF EXISTS `tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_update` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_A87C621CA76ED395` (`user_id`),
  CONSTRAINT `FK_A87C621CA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracking`
--

LOCK TABLES `tracking` WRITE;
/*!40000 ALTER TABLE `tracking` DISABLE KEYS */;
INSERT INTO `tracking` VALUES (23,1,'829c5090a0ee44f08ee169b9b1e8a847','DELIVERED','2024-08-28 15:17:09'),(24,1,'48de5b193a9848f08780360abe3d22e8','DELIVERED','2024-08-28 15:17:12'),(25,1,'e24b3b54224f4f1cbc873011ccb03529','DELIVERED','2024-08-28 15:21:00'),(26,1,'c920d5046bb64fe99386b4ee64f4fd14','DELIVERED','2024-08-28 15:31:20'),(27,1,'244d9aa43ab84b73bd6d2af2480bf01f','DELIVERED','2024-08-28 16:33:40'),(28,1,'cbffa9cd1a354f85b039bdd53a6fb5b2','DELIVERED','2024-08-28 16:39:33'),(29,1,'3053e08b4df746beba4028904fc5ecc6','DELIVERED','2024-08-28 16:40:02'),(30,1,'b9d950dec1994b869b367bdc9ab2f20c','DELIVERED','2024-08-28 16:40:51'),(31,1,'531744b1d583441aad77d972ba8ae83e','DELIVERED','2024-08-28 16:41:38'),(32,1,'73d0ffbf8afa4103a2cbdf01353a32df','DELIVERED','2024-08-28 16:44:08'),(33,1,'b662455c9a514c14926c0658bfa37382','DELIVERED','2024-08-28 16:45:25'),(34,1,'4ab0aacc681f42cbb93399c7f2de077a','DELIVERED','2024-08-28 16:50:14'),(35,1,'a168d0e912534dc1910cd1fd988c23e4','DELIVERED','2024-08-28 16:51:43');
/*!40000 ALTER TABLE `tracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(180) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip_code` int DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  `adress_id` int DEFAULT NULL,
  `region` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'guillaume@gmail.com','[\"ROLE_ADMIN\"]','$2y$13$kq9NLEiLKPEXgqh590LNKOiFwXQ3MGKvyeWIhOdSDb4Xl7HCdK.f2',0,NULL,'guillaume','Broadway 1',10007,'New York','',NULL,'2024-08-28 16:51:21',NULL,'NY'),(10,'alice@gmail.com','[]','$2y$13$2wD4joIiRxovCLYoi7yfhuzOvCsYuAhFFERb6qgz7eMg/A4RdPfNC',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'guillaume.@gmail.com','[]','$2y$13$fDwAXmcHkddulH8EUS.IMu7BEWTDwxXzf3cBUBTR471RAHz1zhFYW',0,NULL,'Guillaume','',10007,'New York','US',NULL,'2024-08-28 10:46:34',NULL,'NY');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wish_list`
--

DROP TABLE IF EXISTS `wish_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wish_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_5B8739BDA76ED395` (`user_id`),
  CONSTRAINT `FK_5B8739BDA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wish_list`
--

LOCK TABLES `wish_list` WRITE;
/*!40000 ALTER TABLE `wish_list` DISABLE KEYS */;
INSERT INTO `wish_list` VALUES (3,1);
/*!40000 ALTER TABLE `wish_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist_item`
--

DROP TABLE IF EXISTS `wishlist_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wish_list_id` int NOT NULL,
  `product_id` int NOT NULL,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_updated` datetime NOT NULL,
  `item_qty` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_6424F4E8D69F3311` (`wish_list_id`),
  KEY `IDX_6424F4E84584665A` (`product_id`),
  CONSTRAINT `FK_6424F4E84584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_6424F4E8D69F3311` FOREIGN KEY (`wish_list_id`) REFERENCES `wish_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist_item`
--

LOCK TABLES `wishlist_item` WRITE;
/*!40000 ALTER TABLE `wishlist_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-08 20:05:32
