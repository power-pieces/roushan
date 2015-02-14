<?php
class SqlHelper
{
	public $conn = null;
	/**
	 * 连接数据库
	 * @param @ip 数据库地址
	 */
	function connect($adr,$user,$pwd,$db)
	{	
		$conn = @mysql_connect($adr,$user,$pwd);
		
		if($conn && mysql_select_db($db,$conn))
		{
			$this->conn = $conn;
			return $conn;
		}		
		return false;
	}
	
	function query($sql)
	{
		mysql_ping($this->conn);
		$result = mysql_query($sql, $this->conn);
		return $result;
	}
	
	/**
	 * 将SQL查询结果转换为数据进行返回
	 * @param $result
	 */
	function transformSqlResult2Array($result)
	{
		$arr = array();
		while($row = mysql_fetch_assoc($result))
		{
			//responseDebug($row, true);
			array_push($arr,$row);
		}
		return $arr;
	}
}