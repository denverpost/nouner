-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Oct 06, 2015 at 01:17 AM
-- Server version: 5.5.34
-- PHP Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `nouner`
--

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `noun_id` int(11) NOT NULL,
  `url` varchar(100) COLLATE utf16_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `noun_id` (`noun_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `nouns`
--

CREATE TABLE `nouns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `noun` varchar(100) COLLATE utf16_bin NOT NULL,
  `section` varchar(100) COLLATE utf16_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `noun` (`noun`,`section`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin AUTO_INCREMENT=1 ;

