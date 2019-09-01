$(function () {
        $("ol").remove(".middler_left_music_list_ol");
		fakeAjax({
            url: "https://api.apiopen.top/searchMusic?num=20&name=我",
            dataType: "json",
            type: "GET",
            async: true,
            success: function (data) {
                data=data.result;
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    var info=new Array(5);
                    info[0]=data[i].title;  /*歌名*/
                    info[1]=data[i].author; /*歌手*/
                    info[2]=data[i].pic;    /*歌曲图片地址*/
                    info[3]=data[i].lrc;    /*歌词地址*/
                    info[4]=data[i].url;    /*歌曲资源地址*/
					 $(".middler_left_music_list").append(`
					     <ol class="middler_left_music_list_ol ">
                            <li class="music_li music_check"><input class="checkbox" type="checkbox">
                            <li class="music_li music_sing">
                                <span> ${i + 1}
                                    <div class="end"></div>
                                </span>${data[i].title}
                                <div class="music_sing_div">
                                    <div class="music_ico1" title="${info}"></div> 
                                    <div class="music_ico2" title="收藏"></div>
                                    <div class="music_ico3" title="转发"></div>
                                </div>
                            </li>
                            <li class="music_li music_singer ">${data[i].author}
                            </li>
                        </ol>
						`);	
                }
            }
        })
    })
    //--如果在线搜索歌曲，调用此接口，清除本地数据----
    $(".query").click(function () {
        var txt = $(".text").val();
        $("ol").remove(".middler_left_music_list_ol");
       fakeAjax({
            url: "https://api.apiopen.top/searchMusic?name=" + txt,
            dataType: "json",
            type: "GET",
            async: true,
            success: function (data) {
                data=data.result;
                console.log(data[1].pic);
                for (var i = 0; i < data.length; i++) {
                    var info=new Array(5);
                    info[0]=data[i].title;  /*歌名*/
                    info[1]=data[i].author; /*歌手*/
                    info[2]=data[i].pic;    /*歌曲图片地址*/
                    info[3]=data[i].lrc;    /*歌词地址*/
                    info[4]=data[i].url;    /*歌曲资源地址*/
					 $(".middler_left_music_list").append(`
					     <ol class="middler_left_music_list_ol ">
                            <li class="music_li music_check"><input class="checkbox" type="checkbox">
                            <li class="music_li music_sing">
                                <span> ${i + 1}
                                    <div class="end"></div>
                                </span>${data[i].title}
                                <div class="music_sing_div">
                                    <div class="music_ico1" title="${info}"></div> 
                                    <div class="music_ico2" title="收藏"></div>
                                    <div class="music_ico3" title="转发"></div>
                                </div>
                            </li>
                            <li class="music_li music_singer ">${data[i].author}
                            </li>
                        </ol>
						`);	
                }
            }
        })
})
//-----歌曲收藏列表数据调用此接口----------------
        $(".list_collect").click(function(){
        	$("ol").remove(".middler_left_music_list_ol");
        	var obj = JSON.parse(localStorage.getItem('obj')); 
            console.log(obj.user);
        	$.ajax({
        		type:"post",
        		url:"php/music_collect.php",
        		data:{
        			user:obj.user
        		},
        		dataType:"json",
        		async:true,
        		success:function(data){                
                  data=data.music_collect;
                  console.log(data.length);
                  
                  for (var i = 0; i < data.length; i++) {
                    var info=new Array(5);
                    info[0]=data[i].title;  /*歌名*/
                    info[1]=data[i].author; /*歌手*/
                    info[2]=data[i].pic;    /*歌曲图片地址*/
                    info[3]=data[i].lrc;    /*歌词地址*/
                    info[4]=data[i].url;    /*歌曲资源地址*/
					 $(".middler_left_music_list").append(`
					     <ol class="middler_left_music_list_ol ">
                            <li class="music_li music_check"><input class="checkbox" type="checkbox">
                            <li class="music_li music_sing">
                                <span> ${i + 1}
                                    <div class="end"></div>
                                </span>${data[i].title}
                                <div class="music_sing_div">
                                    <div class="music_ico1" title="${info}"></div> 
                                    <div class="music_ico2" title="收藏"></div>
                                    <div class="music_ico3" title="转发"></div>
                                </div>
                            </li>
                            <li class="music_li music_singer ">${data[i].author}
                            </li>
                        </ol>
						`);	
                }
        		}
        	});
        })
//-----歌曲收藏操作------------------
$(".middler_left_music_list").delegate(".music_ico2","click",function(){
        $(this).toggleClass("music_ico21");
        var obj = JSON.parse(localStorage.getItem('obj')); 
            var info=$(this).prev().attr("title");
            info=info.split(",")//字符串转为数组
            /*查找到当前点击按钮的歌曲信息*/
               $.ajax({
                   type:"POST",
                   dataType:"json",
                   async:true,
                   url:'php/music_insertcollect.php',
                   data:{
                       UserName:obj.user,
                       title:info[0],
                       author:info[1],
                       pic:info[2],
                       lrc:info[3],
                       url:info[4]
                   },
                 success:function(data){
                   data.infoCode==1?console.log('数据库连接失败')
                   :console.log(data.msg);
                 }               
               })
})
//----底部控制喜欢按钮------------------
 function like(){
    var title=document.querySelector(".songname").text//歌曲名
    var author=document.querySelector(".artistname").text;//歌手
    var pic=document.querySelector(".singsong_photo img").src;//图片
    var lrc="";
    var url=document.getElementById("audio").src;
    var obj = JSON.parse(localStorage.getItem('obj'));
               $.ajax({
                   type:"POST",
                   dataType:"json",
                   async:true,
                   url:'php/music_insertcollect.php',
                   data:{
                       UserName:obj.user,
                       title:title,
                       author:author,
                       pic:pic,
                       lrc:lrc,
                       url:url
                   },
                  success:function(data){
                   data.infoCode==1?console.log('数据库连接失败')
                   :console.log(data.msg);
                 }  
               })

 }
    
