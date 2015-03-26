/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : express415

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-03-27 01:50:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tbl_share_record`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_share_record`;
CREATE TABLE `tbl_share_record` (
  `index` bigint(10) NOT NULL AUTO_INCREMENT,
  `sender_id` char(64) NOT NULL,
  `sender_name` char(30) NOT NULL,
  `reciver_id` char(64) NOT NULL,
  `reciver_name` char(40) NOT NULL,
  `time_utc` int(10) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
INSERT INTO `tbl_user` VALUES ('1', 'Jing1', '3', '4000', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/46');
