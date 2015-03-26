<?php
header("Access-Control-Allow-Origin:*");
//依赖的PHP
$dependents = array('configs/define','utils/sqltool','utils/sign');

foreach( $dependents as $v)
{
	$dependentFile = $v.'.php';
	include $dependentFile;
}

$res = array();
$res['error'] = 0;

do{
	//模块名称
	$mod = $_REQUEST['mod'];
	//动作名称
	$action = $_REQUEST['action'];
	
	if($mod == $action)
	{
		$res['error'] = 1;
		$res['msg'] = 'mod can not equal action';
	}
	
	//参数
	$params = $_REQUEST['params'];
	
	$apiFile = 'apis/'.$mod.'.php';
	
	
	include $apiFile;
	$mod = ucfirst($mod);
	$modObj = new $mod();
	$modObj->$action($params, $res);
	
}while(0);

echo json_encode($res);


