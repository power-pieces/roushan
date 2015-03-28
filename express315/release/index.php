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
$backurl = "http://www.g6game.com/h5game/express/index.php?share=".$shareid;
//如果sessio失效，并且是第一次点击链接，则向微信发送网页授权许可请求
if(!isset($_SESSION["openid"]) && !isset($_GET['code'])){
	//die("发送网页授权许可请求");
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
//var_dump($p);
//die();
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

  
  var sharesuccessfunc;
  var sharefuncobj;
  
	var obj = {};
	obj.inviter = "<?php echo $shareid;?>";
	obj.id = "<?php echo $p->openid;?>";
	obj.name = "<?php echo $p->username;?>";
	obj.sign = "<?php echo md5($p->openid.'express_315');?>";
	obj.headUrl = "<?php echo $p->avatar;?>";
	if("0" == obj.inviter)
	{
		obj.inviter = null;
	}
  	alert(JSON.stringify(obj));


  //分享的具体信息，请自行添加修改。
  function setTimeLine(shareid)
  {
	  wx.onMenuShareTimeline({
		    title: '疯狂打山寨', // 分享标题
			 desc: '"Duang~！" + DataCenter.inviterName + "击倒了"', // 分享描述
		    link: 'http://www.g6game.com/h5game/express/index.php?share='+shareid, // 分享链接
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


  

  //获取游戏需要的信息
  function getInfo()
  {
	  return obj;
  }
  
  function setAppMessage(shareid)
  {
	  wx.onMenuShareAppMessage({
		    title: '疯狂打山寨', // 分享标题
		    desc: '测试', // 分享描述
		    link: 'http://www.g6game.com/h5game/express/index.php?share='+shareid, // 分享链接
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

  //准备分享
  function readyShare(){
	  //alert("分享者ID：" + obj.id + "   名称：" + obj.name);
	 setTimeLine(obj.id);
	 setAppMessage(obj.id);  
  }
  	
   

    wx.ready(function () {
	  readyShare(); 
	  
	 
  });
</script>

<head>
    <meta charset="utf-8">
    <title>疯狂打山寨</title>
    <meta name="viewport"
          content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no,target-densitydpi=device-dpi"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>

    <meta name="full-screen" content="true"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>

    <style>
        body {
            text-align: center;
            background: #FFFAF4;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
        html {
            -ms-touch-action: none; /* Direct all pointer events to JavaScript code. */
            overflow: hidden;
        }
        div, canvas {
            display:block;
            position:absolute;
            margin: 0 auto;
            padding: 0;
            border: 0;
        }
    </style>
</head>
<body>
<div style="position:relative;" id="gameDiv"></div>
<script>var document_class = "Main";</script><!--这部分内容在编译时会被替换，要修改文档类，请到工程目录下的egretProperties.json内编辑。-->
<!--This part will be replaced during compiling, and to modify the document class, please go to the project directory and edit in the file of egretProperties. Jsonr-->
<script src="launcher/egret_require.js"></script>
<script src="launcher/egret_loader.js"></script>
<script src="launcher/game-min.js"></script>
<script>
    var support = [].map && document.createElement("canvas").getContext;
    if (support) {
        egret_h5.startGame();
    }
    else {
        alert("Egret 不支持您当前的浏览器")
    }
</script>
</body>
</html>