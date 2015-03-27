/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : express415

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-03-28 01:05:26
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
INSERT INTO `tbl_share_record` VALUES ('10', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', '1427472600', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('11', 'b', '刘德华', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', '1427473366', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('12', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', '', '0', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('13', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', '', '0', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('14', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', '', '0', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('15', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', '', '0', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('16', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', '', '0', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('17', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', '', '0', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('18', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', '', '0', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('19', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', '', '0', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('20', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', '', '0', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('21', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', '', '0', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('22', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', '', '0', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('23', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', '', '0', '2015-03-28');
INSERT INTO `tbl_share_record` VALUES ('24', 'a', 'Jing', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64', 'b', 'bb', '', '0', '2015-03-28');

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
INSERT INTO `tbl_user` VALUES ('a', 'Jing', '3', '502', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64');
INSERT INTO `tbl_user` VALUES ('b', '刘德华', '37', '1', 'http://wx.qlogo.cn/mmopen/lPfTxuh1YrlzBAx7GhM7icSAdj39hcjINuqSTOtSfIiaGS5iabYicaPXaOj2QRibltymiaHOreuTLjEsRrpS6jSfDzYQstZiaJBmvUA/64');
