<?php
	$username=$_POST['myUname'];
	$userpass=$_POST['myUpass'];
	$success=array('msg'=>'ok');
	$con=mysqli_connect('localhost','login','hengxipeng123','login');
	if($con){
		//--兼容写法防止乱码----
		mysqli_query($con,'set names utf8');
		mysqli_query($con,'set character_set_client=utf8');
		mysqli_query($con,'set charcter_set_results=utf8');
		$sql='select UserName from login';
		$result=$con->query($sql);
		if($result->num_rows>0){
			   $info=[];
			   /*$result->fetch_assoc()每次只取出一条数据*/
			for($i=0;$row=$result->fetch_assoc();$i++){
				$info[$i]=$row;
			}
			//--php中count()函数计算数组中的单元数目或对象中的属性个数。
			for($j=0;$j<count($info);$j++){
				if($info[$j]['UserName']==$username){
					//如果注册的账号在数据库中可以查到
					$success['infoCode']=0;
					break;
				}
				else{
					//如果注册账号在数据库中查找不到,执行sql语句插入数据库;					
					$success['infoCode']=1;
				}
			}
			if($success['infoCode']==1){
				$insetsql='insert into login values("'.$username.'","'.$userpass.'")';
				$result=$con->query($insetsql);
			}
		}
		/*
		 0:注册账号在数据库中已存在;
		 1：注册账号在数据库中查找不到;
		 3：数据库连接出现问题;
		 */
	}
	else{
		$success['infoCode']=3;
	}
	//--json_encode()为php内置函数，把数组转化为json格式转存
	echo json_encode($success);
?>