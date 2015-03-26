<?php
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
		
		$id = $params->id;
		if(isset($params->inviter))
		{
			$inviter = $params->inviter;
		}
		else
		{
			$inviter = 0;
		}	
		$name = $params->name;
		$headUrl = $params->headUrl;
		
		$sql = "SELECT remain,reward FROM tbl_user WHERE id=$id";
		$sqlHelper = new SqlHelper();
		$sqlHelper->conn();
		
		
		$res['data'] = $sqlHelper->query($sql);
		
		
		if(0 == count($res['data']))
		{
			//初始化玩家数据
			$remain = $inviter == 0?5:6;
			$insertSql = "INSERT INTO tbl_user(id, name, remain, reward, head_url) VALUES('$id','$name', $remain,0, '$headUrl');";
			$sqlHelper->modify($insertSql);
			
//			if(0 != $inviter)
//			{
//				//给邀请人加1次
//				$this->changeRemain($inviter, 1);
//			}
		}
		else 
		{
			$updateSql = "UPDATE tbl_user SET name='$name',head_url='$headUrl' WHERE id='$id';";
			$sqlHelper->modify($updateSql);
		}
		
		$res['data'] = $sqlHelper->query($sql)[0];
		
		$sqlHelper->close();
	}
	
	/**
	 * 分享
	 */
	public function share(&$params, &$res)
	{
		$params = json_decode($params);
		$id = $params->id;
		$res['data'] = $this->changeRemain($id, 1);
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
		
		$id = $params->id;
		
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
		
		//调用API，请求成功后
		if(true)
		{
			$sql = "UPDATE tbl_user SET reward = reward - $need WHERE id = $id;";	
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
		
		$sql = null;
		if(1 == $isResult)
		{
			$sql = "UPDATE tbl_user SET reward = reward + $amount,remain = remain - 1  WHERE id = $id;";
		}
		else
		{
			$sql = "UPDATE tbl_user SET reward = reward + $amount WHERE id = $id;";
		}
		
		$sqlHelper = new SqlHelper();
		$sqlHelper->conn();
		$res['data'] = $sqlHelper->modify($sql);
		$sqlHelper->close();
	}
	
	private function getUserInfo($id)
	{
		$sql = "SELECT remain,reward FROM tbl_user WHERE id=$id";
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
		$sql = "UPDATE tbl_user SET remain = remain + $changeValue WHERE id = $id;";
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