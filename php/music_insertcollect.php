<?php
    $UserName='"'.$_POST['UserName'].'"'.',';
    $title='"'.$_POST['title'].'"'.',';
    $author='"'.$_POST['author'].'"'.',';
    $pic='"'.$_POST['pic'].'"'.',';
    $lrc='"'.$_POST['lrc'].'"'.',';
    $url='"'.$_POST['url'].'"';
    $con=mysqli_connect('localhost','login','hengxipeng123','login');
    if($con){
        mysqli_query($con,'set names utf8');
        mysqli_query($con,'set character_set_client=utf8');
        mysqli_query($con,'set character_set_results=utf8');
        $sql='insert into login values("zhanghao","mima")';
        $sql="insert into collect values(". $UserName.$title.$author.$pic.$lrc.$url.")";
      	$result=$con->query($sql);
       $success=array('msg'=>'歌曲收藏成功');
    }       
	//如果找不到数据库连接信息，则返回状态玛3;
	else{
		$success['infoCode']=1;
		//1数据库连接失败;
	}
	echo json_encode($success);
?>