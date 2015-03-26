<?php
//首先申请公众号，获得appid等信息，并且在公众平台上设置js安全域名。
require_once 'share.php';
require_once 'Player.php';
$file = "C:/wamp/www/token.txt";
$appid = "wx2c9e2b3c3e0cc058";
$appsecrect = "cf67d528c6aab80cebbfcd0ac20c8aee";
$noncestr = "dajiagame";

if (!is_weixin())
{
	//调试的时候可注释掉
	//exit("请使用手机微信登录");
}
function is_weixin()
{
	if ( strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false )
	{
		return true;
	}
	return false;
}
//开启session,用于保存用户的openid
session_start();
//此游戏需要用到分享者的ID
if (isset($_GET["share"]))
	$shareid = $_GET["share"];
else
	$shareid = 0;
//微信接受用户许可后的回调地址，可携带开发者自定义的参数
//此游戏只需要加上分享者的ID即可
$backurl = "http://www.g6game.com/h5game/dajia/index.php?"."share=".$shareid;
//如果sessio失效，并且是第一次点击链接，则向微信发送网页授权许可请求
if(!isset($_SESSION["openid"]) && !isset($_GET['code'])){
	//发送网页授权许可请求
	header("Location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$appid."&redirect_uri=".urlencode($backurl)."&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect");
	exit;
}
//得到玩家许可后，系统自动重新进入此页面，并携带自定义参数和code值。
$code = "";
//如果session存在
if(isset($_SESSION["openid"])) {

	$p = new Player($backurl);
	$p->openid = $_SESSION["openid"];
	//把openid存到session里面
	$p->saveToSession();
	$openid = $_SESSION["openid"];
}else if (isset($_GET['code'])){
	//没有session,根据code获取用户的信息
	$code = $_GET['code'];
	if($code != "") {
		$p = new Player($backurl);
		$p->getInfoFrom($code, $appid, $appsecrect);
		$p->saveToSession();
		//在此处可以保存用户的昵称头像等信息到数据库，已获取的信息查看Player.php
		$openid = $p->openid;
	}
}else{
	exit("error");
}

//到此步，已经拿到用户的openid了，可根据游戏需求，自定义其他逻辑

//获取分享的ticket
getShareToken($appid,$appsecrect,$noncestr,$file,time());


?>

<!DOCTYPE HTML>
<html>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
  wx.config({
    debug: false,
    appId: '<?php echo $appid;?>',
    //在share.php里面有储值
    timestamp: '<?php echo $GLOBALS["timestamp"];?>',
    nonceStr: '<?php echo $GLOBALS["noncestr"];?>',
    signature: '<?php echo getsignature();?>',
    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
  });
  wx.ready(function () {
	  setTimeLine(0);
	  setAppMessage(0);
    // 在这里调用 API
	  
	 
  });
  
  var sharesuccessfunc;
  var sharefuncobj;

  //分享的具体信息，请自行添加修改。
  function setTimeLine($shareid)
  {
	  wx.onMenuShareTimeline({
		    title: 'MYNY香水，为女人而生', // 分享标题
			 desc: 'DKNY 推出全新「MYNY 我的纽约」淡香水', // 分享描述
		    link: 'http://www.g6game.com/h5game/dajia/index.php'+shareid, // 分享链接
		    imgUrl: '', // 分享图标
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		    	if (sharesuccessfunc != null)
		    		sharesuccessfunc.apply(sharefuncobj,[]);
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    	
		    }
		});
  }
  
  function setAppMessage(shareid)
  {
	  wx.onMenuShareAppMessage({
		    title: 'MYNY香水，为女人而生', // 分享标题
		    desc: 'DKNY 推出全新「MYNY 我的纽约」淡香水', // 分享描述
		    link: 'http://www.g6game.com/h5game/dajia/index.php'+shareid, // 分享链接
		    imgUrl: '', // 分享图标
		    type: '', // 分享类型,music、video或link，不填默认为link
		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		    success: function () {
			if (sharesuccessfunc != null)
		    	sharesuccessfunc.apply(sharefuncobj,[]);				
		    },
		    cancel: function () { 
		    }
		});
  }
  
</script>


</html>