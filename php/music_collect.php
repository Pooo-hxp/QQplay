<?php
	$username=$_POST['user'];
	$success=array('msg'=>'ok');
	$con=mysqli_connect('localhost','login','hengxipeng123','login');
	if($con){
		mysqli_query($con,'set names utf8');
		mysqli_query($con,'set character_set_client=utf8');
		mysqli_query($con,'set character_set_results=utf8');
		$sql="select * from collect where UserName='".$username."'";
      /*查询当前登录账号对应的收藏歌曲数据库信息*/
		$success['txt']=$sql;
      /*检查数据库查询语句是否正确*/
		$result=$con->query($sql);		
		if($result->num_rows>0){			
			$info=[];
		 //解析查询结果
		 /*$result->fetch_assoc()每次只取出一条数据*/
			for($i=0;$row=$result->fetch_assoc();$i++){
				$info[$i]=$row;
			}
			$success['music_collect']=$info;
	}
	}
	//--如果找不到数据库连接信息，则返回状态玛3;
	else{
		$success['infoCode']=1;
		//0数据库连接失败;
	}
	//数据返回给前台
	echo json_encode($success);
?>