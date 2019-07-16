$(function () {
   //--歌曲进度条从封装好的函数中调用---
    var $progressBar=$(".music_bofang_info_wai")
    var $progressLine=$(".music_bofang_info_zhong")
    var $progressDot=$(".music_bofang_info_radio")
    var progress=Progress($progressBar,$progressLine, $progressDot)
    progress.progressClick();
    progress.progressMove();

   //--音量条从封装好的函数中调用----
    var $voiceBar=$(".music_voice_ico_wai")
    var $voiceLine=$(".music_voice_ico_zhong")
    var $voiceDot=$(".music_voice_ico_radio")
    var voiceProgress=Progress($voiceBar,$voiceLine, $voiceDot)
    voiceProgress.progressClick(function(){});
    progress.progressMove(function(){});
    document.getElementsByClassName("music_voice_ico_wai")[0].addEventListener('click',fu);
    function fu(){
        let lang=$(".music_voice_ico_zhong").width();
        document.getElementById("audio").volume=lang/70;
    }
    
    //--------底端模式调整-------------------------------
    $(".list_all").click(function () {
        $("ol").remove(".middler_left_music_list_ol");//清空歌曲列表
    })
    $(".music_like").click(function () {
        $(this).toggleClass("music_like2");//切换喜欢
    });
    $(".music_only").click(function () {
        $(this).toggleClass("music_only2");//纯净模式
        if($(this).attr("class").indexOf("music_only2")!=-1){
          musiconlystar();
        }
        else{
            musiconlyend();
        }
    }) 
    $(".music_voice_ico").click(function () {
        //图标切换
        $(this).toggleClass("music_voice_ico2");//声音模式切换
        //声音切换
        if ($(this).attr("class").indexOf("music_voice_ico2") != -1) {
            //变为没有声音  volume表当前播放歌曲音量大小范围为0~1；
        document.getElementById("audio").volume=0;
        $(".music_voice_ico_zhong").css('width','0px');
        $(".music_voice_ico_radio").css('left','0px');
        }
        else{
            //变为有声音   
        document.getElementById("audio").volume=1;
        $(".music_voice_ico_zhong").css('width','70px');
        $(".music_voice_ico_radio").css('left','70px');
        }
    })
    $(".music_for").click(function () {
        if ($(".music_for").attr("class").indexOf("music_for1") != -1) {
            $(".music_for").addClass("music_for2").removeClass("music_for1");
        }
        else if ($(".music_for").attr("class").indexOf("music_for2") != -1) {
            $(".music_for").addClass("music_for3").removeClass("music_for2");
        }
        else if ($(".music_for").attr("class").indexOf("music_for3") != -1) {
            $(".music_for").addClass("music_for4").removeClass("music_for3");
        }
        else {
            $(".music_for").addClass("music_for1").removeClass("music_for4");
        }
    })
    //----音乐纯净模式方法-------------
    /*开启*/ function musiconlystar(){
        $('.middler').css('display','none');
        $('.middler2').css('display','block');
    }
    /*关闭*/ function musiconlyend(){
        $('.middler').css('display','block');
        $('.middler2').css('display','none');
    }
    //---歌曲倒计时方法-----------------------
    function time(newtime) {
        console.log("这是倒计时的时长"+newtime);
        var minutes = Math.floor(newtime / 60);
        var seconds = Math.floor(newtime % 60);
        function star(){
        var hid = document.getElementById("music_bofang_info_time");
        hid.innerHTML = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        seconds--;
        if (seconds ==-1) { 
            seconds = 59;
            minutes--; 
            if (minutes < 0) {
                minutes=0;
                seconds = 0; 
            }
        }
    }
   // setInterval(star, 1000);
    }
     //-------------定义动态进度条方法-----------------------------
    function probar() {
        var audio = document.getElementById("audio");
        var newtime=audio.duration; //当前播放歌曲时长
        console.log("这是进度条的时长"+newtime);
        var tm=parseInt(newtime)*1000;
        $('.music_bofang_info_zhong').animate({
            width: $(".music_bofang_info_wai").width(),
        }, tm);
        $('.music_bofang_info_radio').animate({
            left: $(".music_bofang_info_wai").width(),
        }, tm);
    }

    function check() {
        var audio = document.getElementById("audio");     
        if ($(".music_stop").attr("class").indexOf("music_stop2") != -1) {
            $('.music_bofang_info_zhong').stop();   //----暂停时停止进度条-------
            $('.music_bofang_info_radio').stop();
            $(".music_ico1").removeClass('music_ico11');
            $(".music_stop").removeClass("music_stop2");
            audio.pause();// 暂停播放
        } else {
            $(".tran").find(".music_ico1").addClass(".music_ico11");
            $(".music_stop").addClass("music_stop2");
            audio.play();// 这个就是播放            
            probar(); //--播放的时候调用进度条方法----------
            //time(newtime);  //---播放的时候调用倒计时方法-----------
            } 
        }
    $(".music_stop").click(check);//---底部按钮调用检查函数-----

    //--------------利用事件委托，解决JS在新生节点中不生效------------
    $(".middler_left_music_list").delegate(".music_ico1", "click", function () {
       
        var $item = $(this).parents().parents().parents().siblings();
        //--this指向播放按钮,它的父亲是div,它的爷爷是li，他的曾祖父是ol；
        if ($(this).attr("class").indexOf("music_ico11") != -1) {//点击的时候是播放状态
            var audio=document.getElementById("audio");
            $('.music_bofang_info_zhong').stop();   //----暂停时停止进度条-------
            $('.music_bofang_info_radio').stop();
            $(".music_stop").removeClass("music_stop2");
            audio.pause();// 暂停播放

            console.log("暂停播放");
            $(this).removeClass("music_ico11");//去除播放图标 
            $(".end").removeClass("str");//去除所有歌曲播放动态图标
            $(this).parents().parents(".music_sing").find("span").toggleClass("tran"); //隐藏当前播放歌曲前的序号，且让之前播放的歌曲序号显示
            $item.find("span").removeClass("tran");//此样式隐藏序号
        }
        else {//点击的时候是暂停状态
            check();
            console.log("开始")
            $(".music_stop").addClass("music_stop2");
            var info=$(this).attr("title")
            info = info.split(",") //分割字符串为数组
            console.log(info[2])
            var audio=document.getElementById("audio");
            
            document.getElementById("lrc_content").innerHTML = "";
            $(".lrc_content").remove(".songwriter");//清空之前播放的歌词信息
            $(".songname").html(info[0]);
            $(".artistname").html(info[1]);
            $(".middler_right_top img").attr('src', info[2]);
            $(".maskingimg").css("background-image", "url("+info[2]+")");
            var text = info[3]; //当前播放歌曲的歌词  
            document.getElementById("audio").src =info[4];
                    probar(newtime); //--播放的时候调用进度条方法----------
                    createLrc(text);
                    audio.play();// 这个就是播放 
                    var newtime=audio.duration; //当前播放歌曲时长
                    var info=$(this).attr("title")
                    info = info.split(",") //分割字符串为数组
                    $(".music_ico1").removeClass("music_ico11");//去除所有歌曲的播放图标
                    $(this).addClass("music_ico11");//给当前播放歌曲增加播放图标
                    $(this).parents().parents().find(".end").toggleClass("str");//展示动态播放图标
                    $item.find(".end").removeClass("str");//---关闭同类动态播放图标-------
                    $(this).parents().parents(".music_sing").find("span").toggleClass("tran"); //---------切换歌曲时，隐藏当前播放歌曲前的序号，且让之前播放的歌曲序号显示
                    $item.find("span").removeClass("tran");
                    $(".music_bofang_info_name").html(info[0] + "-" + info[1]);//歌曲+歌手拼接，在底端展示
                }
               
              })
         
    function createLrc(text) {
        var medisArray = new Array(); //存放当前播放歌曲的拆分歌词;
          console.log("歌词解析：")
        if(text!=undefined){
          var text = text.split("\n");  // 根据换行符拆分获取到的歌词,非常重要
          for (var j = 0; j < text.length; j++) {
            var t = text[j].substring(1, text[j].indexOf("]") - 3);
            var c = text[j].substring(text[j].indexOf("]") + 1, text[j].length)
            medisArray.push({ t, c }); //动态填充二维数组,用以歌词同步；
          }
          
          console.log(medisArray);
          for (var k = 0; k < medisArray.length; k++) {
            var p = document.createElement("p");
            p.className = "songwriter";
            p.innerHTML = medisArray[k].c;
            $(".lrc_content").append(p);
          }
        }
        else{
            var p = document.createElement("p");
            p.innerHTML="暂无可用歌词资源";
            $(".lrc_content").append(p);
        }
        };

    $(".middler_left_music_list").delegate(".middler_left_music_list_ol", "mouseover", function () {
        $(".music_sing_div").eq($(this).index()).css("display", "block");
    })


    $(".middler_left_music_list").delegate(".middler_left_music_list_ol", "mouseleave", function () {
        $(".music_sing_div").css("display", "none");
    })
      $(".middler_left_music_list").delegate(".checkbox", "click", function () {
        $(this).parent().parent().toggleClass("action");//选中的歌曲增加底色
      })
      $(".Allcheckbox").click(function(){
          $("ol").toggleClass("action");
      })
    })