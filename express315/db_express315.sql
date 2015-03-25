/*
Navicat MySQL Data Transfer

Source Server         : CentOs虚拟机
Source Server Version : 50173
Source Host           : 192.168.136.128:3306
Source Database       : db_express315

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2015-03-25 23:22:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tbl_user`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
  `id` char(64) NOT NULL,
  `remain` smallint(4) NOT NULL COMMENT '剩余游戏次数',
  `reward` int(10) NOT NULL COMMENT '赏金',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
