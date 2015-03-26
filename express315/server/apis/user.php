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
		
		$sql = "SELECT * FROM tbl_user WHERE id=$id";
		$sqlHelper = new SqlHelper();
		$sqlHelper->conn();
		
		
		$res['data'] = $sqlHelper->query($sql);
		
		
		if(0 == count($res['data']))
		{
			//初始化玩家数据
			$remain = $inviter == 0?5:6;
			$insertSql = "INSERT INTO tbl_user(id, remain, reward) VALUES($id,$remain,0);";
			$sqlHelper->modify($insertSql);
			
			if(0 != $inviter)
			{
				//给邀请人加1次
				$this->changeRemain($inviter, 1);
			}
		}
		
		$res['data'] = $sqlHelper->query($sql);
		
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
	 * 添加奖金
	 */
	public function addReward(&$params, &$res)
	{
		$params = json_decode($params);
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