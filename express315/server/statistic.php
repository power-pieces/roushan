<?php
/**
 * Created by PhpStorm.
 * User: Jing
 * Date: 2015/4/8
 * Time: 23:21
 */

include 'configs/define.php';
include 'utils/sqltool.php';

$sqlHelper = new SqlHelper();
$sqlHelper->conn();
$result = $sqlHelper->query("SELECT * FROM tbl_statistic");
foreach($result as $v)
{
    echo $v["content"].':'.$v["count"]."<br/>";
}