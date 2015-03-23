<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
    <body>
    <?php
    	include "configs/define.php";
		$id = $_REQUEST['id'];
		$sign = md5($id.SIGN_KEY);
	?>
	
	<form id="form" action="interface.php">
		MOD:<input name='mod' type=text /><br />
		ACTION:<input name='action' type=text /><br />
		<input id="params" name="params" type="hidden" /><br />
		<input type="button" onclick='onClick()' value="提交" />
	</form>
    </body>
    
    <script>
    	function onClick(){

			var params = {};
			params.id = "<?php echo $id?>";
			params.sign = "<?php echo $sign?>";	
			var jsonStr = JSON.stringify(params);
			document.getElementById("params").value = jsonStr;
        	
    		document.getElementById("form").submit();
        	
    	}
    </script>
</html>