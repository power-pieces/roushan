/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : express415

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-03-29 01:04:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tbl_share_record`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_share_record`;
CREATE TABLE `tbl_share_record` (
  `i` bigint(10) NOT NULL AUTO_INCREMENT,
  `sender_id` char(64) NOT NULL,
  `sender_name` char(30) NOT NULL,
  `sender_url` text NOT NULL,
  `reciver_id` char(64) NOT NULL,
  `reciver_name` char(30) NOT NULL,
  `reciver_url` text NOT NULL,
  `time_utc` int(10) NOT NULL,
  `time` date NOT NULL,
  PRIMARY KEY (`i`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_share_record
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_user`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
  `id` char(64) NOT NULL,
  `name` char(30) NOT NULL,
  `remain` smallint(4) NOT NULL COMMENT '剩余游戏次数',
  `reward` int(10) NOT NULL COMMENT '赏金',
  `head_url` text NOT NULL,
  `kill_count` int(10) NOT NULL DEFAULT '0' COMMENT '击倒山寨数',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
