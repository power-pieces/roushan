<?php
date_default_timezone_set("PRC");
class User
{
	/**
	 * 获取用户信息
	 */
	public function login(&$params, &$res)
	{
		$params = json_decode($params);
		//安全验证代码
		if(false == $this->checkSigh($params->id, $params->sign))
		{
			$res['error'] = 1;
			$res['msg'] = 'wrong sign';
			return;
		}
		
		$id = @mysql_escape_string($params->id);
		if(isset($params->inviter))
		{
			$inviter = @mysql_escape_string($params->inviter);
		}
		else
		{
			$inviter = null;
		}	
		$name = @mysql_escape_string($params->name);
		$headUrl = @mysql_escape_string($params->headUrl);
		$sql = "SELECT * FROM tbl_user WHERE id='$id'";
		$sqlHelper = new SqlHelper();
		$sqlHelper->conn();
		
		
		$res['data'] = $sqlHelper->query($sql);
		
		
		if(0 == count($res['data']))
		{
			//初始化玩家数据
			$insertSql = "INSERT INTO tbl_user(id, name, remain, reward, head_url) VALUES('$id','$name', 3,0, '$headUrl');";			
			$result = $sqlHelper->modify($insertSql);
			//die($result."     ".$insertSql);
			
		}
		else if("" != $params->headUrl)
		{
			$updateSql = "UPDATE tbl_user SET name='$name',head_url='$headUrl' WHERE id='$id';";
			$sqlHelper->modify($updateSql);
		}
		
		$rec = array();
		$result = $sqlHelper->query($sql);
		$rec["user"] = $result[0];
		if(null != $inviter)
		{
			//给邀请人加1次			
			$sql = "SELECT * FROM tbl_user WHERE id='$inviter'";
			$result = $sqlHelper->query($sql);
			$rec['inviter'] = $result[0];
		}
		
		$sqlHelper->close();
		
		
		$res['data'] = $rec;
	}
	
	/**
	 * 总送体力(只能送给目标一次)
	 */
	public function present(&$params, &$res)
	{
		$params = json_decode($params);
		
			
		
		//安全验证代码
		if(false == $this->checkSigh($params->id, $params->sign))
		{
			$res['error'] = 1;
			$res['msg'] = 'wrong sign';
			return;
		}
		
		$id = @mysql_escape_string($params->id);		
		$senderName = @mysql_escape_string($params->userName);
		$senderUrl = @mysql_escape_string($params->headUrl);
		$targetId = @mysql_escape_string($params->targetId);
		$reciverName = @mysql_escape_string($params->inviterName);
		$reciverUrl = @mysql_escape_string($params->inviterHeadUrl);
		

		//检查是不是送过
		$sql = "SELECT i FROM tbl_share_record WHERE sender_id='$id' AND reciver_id='$targetId';";
		
		$sqlHelper = new SqlHelper();
		$sqlHelper->conn();	
		$result = $sqlHelper->query($sql);
		if(count($result) > 0)
		{
			//只能送1次
			$res['data'] = 0;
			return;
		}
		
		
		$res['data'] = $this->changeRemain($targetId, 1);
		
		$time = time();
		$dataTime = date("Y-m-d",time());
		//记录这次赠送
		$sql = "INSERT INTO tbl_share_record(sender_id,sender_name,sender_url,reciver_id,reciver_name,reciver_url,time_utc,time) VALUES('$id','$senderName','$senderUrl','$targetId','$reciverName','$reciverUrl',$time,'$dataTime');";
		//die($sql);
		$sqlHelper->conn();
		$sqlHelper->modify($sql);		
		$sqlHelper->close();		
	}
	
	/**
	 * 兑换奖品
	 */
	public function exchange(&$params, &$res)
	{
		
		$params = json_decode($params);
		
		//安全验证代码
		if(false == $this->checkSigh($params->id, $params->sign))
		{
			$res['error'] = 1;
			$res['msg'] = 'wrong sign';
			return;
		}
		
		$id = @mysql_escape_string($params->id);
		
		//物品ID
		$goodId = $params->goodId;
		$costDic = array(
		1 => 8000,
		2 => 5000,
		3 => 2000,
		4 => 1000,
		5 => 500,
		6 => 100,
		);
		
		$need = $costDic[$goodId];
		
		//获取玩家的数据
		$user = $this->getUserInfo($id);		
		if(intval($user["reward"]) < $need)
		{
			$res['error'] = 1;
			$res['msg'] = 'wrong reward';
			return;			
		}
		
		
		$vars = array();
		$vars['id'] = $id;
		$vars['type'] = $goodId;
		$vars['sign'] = md5($id.$goodId.SIGN_KEY);
		$url = NetUtil::createUrl("http://paopao.163.com/activity/prizeExchange",$vars);
		$exJson = file_get_contents($url);
		$exResult = json_decode($exJson);
		
		//调用API，请求成功后
		if($exResult->code && 0 == $exResult->code)
		{
			$sql = "UPDATE tbl_user SET reward = reward - $need WHERE id = '$id';";	
			$sqlHelper = new SqlHelper();
			$sqlHelper->conn();		
			$res['data'] = $sqlHelper->modify($sql);
			$sqlHelper->close();
		}
		else
		{
			//兑换完了
			$res['data'] = 0; 
		}		
	}
	
	/**
	 * 获取分享列表信息
	 */
	public function getShareList(&$params, &$res)
	{
		$params = json_decode($params);
		
		//安全验证代码
		if(false == $this->checkSigh($params->id, $params->sign))
		{
			$res['error'] = 1;
			$res['msg'] = 'wrong sign';
			return;
		}
		
		$reciverId = @mysql_escape_string($params->reciverId);
		
		$sql = "SELECT * FROM tbl_share_record WHERE reciver_id = '$reciverId'";
		$sqlHelper = new SqlHelper();
		$sqlHelper->conn();
		$res['data'] = $sqlHelper->query($sql);		
	}
	
	/**
	 * 添加奖金
	 */
	public function addReward(&$params, &$res)
	{
		$params = json_decode($params);
		
		//安全验证代码
		if(false == $this->checkSigh($params->id, $params->sign))
		{
			$res['error'] = 1;
			$res['msg'] = 'wrong sign';
			return;
		}
		
		$id = $params->id;		
		//是否是游戏的结算奖励	
		$isResult = $params->isResult;
		$amount = $params->amount;
		$killCount = intval($params->killCount);
		//var_dump($params);
		//die();
		$sql = null;
		if(1 == $isResult)
		{
			$sql = "UPDATE tbl_user SET reward = reward + $amount,remain = remain - 1,kill_count = kill_count + $killCount WHERE id = '$id';";
			//die($sql);
		}
		else
		{
			$sql = "UPDATE tbl_user SET reward = reward + $amount WHERE id = '$id';";
		}
		
		$sqlHelper = new SqlHelper();
		$sqlHelper->conn();
		$res['data'] = $sqlHelper->modify($sql);
		$sqlHelper->close();
	}
	
	private function getUserInfo($id)
	{
		$sql = "SELECT remain,reward FROM tbl_user WHERE id='$id'";
		$sqlHelper = new SqlHelper();
		$sqlHelper->conn();		
		$result = $sqlHelper->query($sql);
		if($result)
		{
			return $result[0];
		}
		return null;	
	}
	
	private function changeRemain($id, $changeValue, &$sqlHelper = null)
	{
		//给分享的人增加一次游戏机会
		$sql = "UPDATE tbl_user SET remain = remain + $changeValue WHERE id = '$id';";
		if(null == $sqlHelper)
		{
			$sqlHelper = new SqlHelper();
		}
		$sqlHelper->conn();
		$result = $sqlHelper->modify($sql);
		$sqlHelper->close();		
		return $result;
	}
	
	private function checkSigh($id, $sign)
	{
		return Sign::check(array($id, SIGN_KEY), $sign);
	}
}