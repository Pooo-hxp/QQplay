<?php
	$username=$_POST['myUname'];
	$userpass=$_POST['myUpass'];
	$success=array('msg'=>'ok');
	$con=mysqli_connect('localhost','login','hengxipeng123','login');
	if($con){
		mysqli_query($con,'set names utf8');
		mysqli_query($con,'set character_set_client=utf8');
		mysqli_query($con,'set character_set_results=utf8');
		$sql="select * from login";	
		$success['txt']=$sql;	
		$result=$con->query($sql);		
		if($result->num_rows>0){			
			$info=[];
		 //解析查询结果
		 /*$result->fetch_assoc()每次只取出一条数据*/
			for($i=0;$row=$result->fetch_assoc();$i++){
				$info[$i]=$row;
			}
			//$success['infoCode']=$info;
			//print_r($success);/*测试用*/
			//--php中count()函数计算数组中的单元数目或对象中的属性个数。
			for($j=0;$j<count($info);$j++){
				if($info[$j]['UserName']==$username){
					//--若果账号存在就检验密码----
					if($info[$j]['PassWord']==$userpass){
						//---密码正确就返回状态码0且终止循环;
						$success['infoCode']=0;
                        $success['user']=$username;
                        $success['pass']=$userpass;
						break;
					}
					else{
					//--账号正确但密码不匹配，则返回状态码1且终止循环;
					$success['infoCode']=1;
						break;					
				    }					
				}else{
					//--如果连账号都匹配不上，则返回状态码2;
					$success['infoCode']=2;
				}
        }
	}
	}
	//--如果找不到数据库连接信息，则返回状态玛3;
	else{
		$success['infoCode']=3;
		//0登录成功
		//1密码错误
		//2账号不存在
		//3数据库连接失败;
	}
	//反回给前台
	echo json_encode($success);
?>