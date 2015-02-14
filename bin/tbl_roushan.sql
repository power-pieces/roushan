/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-02-15 02:14:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tbl_roushan`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_roushan`;
CREATE TABLE `tbl_roushan` (
  `id` char(64) NOT NULL,
  `block` int(10) NOT NULL DEFAULT '999',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_roushan
-- ----------------------------
INSERT INTO `tbl_roushan` VALUES ('a', '1');
INSERT INTO `tbl_roushan` VALUES ('asdf', '13');
INSERT INTO `tbl_roushan` VALUES ('b', '2');
INSERT INTO `tbl_roushan` VALUES ('c', '3');
INSERT INTO `tbl_roushan` VALUES ('d', '7');
INSERT INTO `tbl_roushan` VALUES ('e', '4');
INSERT INTO `tbl_roushan` VALUES ('test', '0');
