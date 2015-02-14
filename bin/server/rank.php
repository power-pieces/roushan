<?php
header( 'Access-Control-Allow-Origin:*' );
include 'common.php';

$outArr = array();

if(!isset($_REQUEST['id']) || !isset($_REQUEST['block']))
{
	$outArr['code'] = 1;
	$outArr['des'] = "数据错误";
	echo json_encode($outArr);
	die();
}

$id = $_REQUEST['id'];
$block = $_REQUEST['block'];

$sqlHelper = new SqlHelper();
$conn = $sqlHelper->connect('localhost', 'root', '123456', 'test');
if($conn)
{
	$sql = "REPLACE INTO tbl_roushan(id,block) VALUES('%s',%d);";
	$sql = sprintf($sql, $id, $block);	
	$result = $sqlHelper->query($sql);
	if($result)
	{
		$sql = "SELECT ((((SELECT COUNT(*) as total FROM `tbl_roushan` WHERE block > %d) + 1) / (SELECT COUNT(*) as total FROM `tbl_roushan`) * 100) >> 0) as percent;";
		$sql = sprintf($sql, $block);
		
		$result = $sqlHelper->query($sql);
		$result = $sqlHelper->transformSqlResult2Array($result);		
		$outArr['code'] = 0;
		$outArr['percent'] = $result[0]['percent'];
		echo json_encode($outArr);
		die();	
	}
	else
	{
		$outArr['code'] = 1;
		$outArr['des'] = $sql;
		echo json_encode($outArr);
		die();		
	}
}
else
{
	$outArr['code'] = 1;
	$outArr['des'] = "连接错误";
	echo json_encode($outArr);
	die();
}

