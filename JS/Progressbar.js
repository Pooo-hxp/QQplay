$(function () {

    audio.addEventListener( 'timeupdate', function() {
        console.log("播放时间正在变化");
        //audio.volume; //默认为1，也就是最大音量，通过他我们可以设置播放器的音量大小
    } ); //播放时间变化就会触发

    // var newtime = "03:42";
    // newtime = newtime.replace(/[^1-9]/ig, "");
    // //正则过滤歌曲时长，去掉非数字。3：15为315；
    // newtime = newtime.substring(0, 1) * 60 + newtime.substring(1, 5) * 1;
    // function CountDown() {
    //     if (newtime >= 0) {
    //         minutes = Math.floor(newtime / 60);
    //         seconds = Math.floor(newtime % 60);
    //         msg = minutes + "：" + seconds;
    //         document.getElementById("music_bofang_info_time").innerHTML = msg;
    //         newtime--;
    //     }
    // }
    //var t = setInterval(CountDown(), 1000);


    //--------底端模式调整，功能未写-------------------------------
    $(".list_all").click(function () {
        $("ol").remove(".middler_left_music_list_ol");//清空歌曲列表
    })
    $(".music_like").click(function () {
        $(this).toggleClass("music_like2");//切换喜欢
    });
    $(".music_only").click(function () {
        $(this).toggleClass("music_only2");//纯净模式
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
    function probar(newtime) {
        console.log("这是进度条的时长"+newtime);
        $('.music_bofang_info_zhong').animate({
            width: $(".music_bofang_info_wai").width(),
        }, 180000);
        $('.music_bofang_info_radio').animate({
            left: $(".music_bofang_info_wai").width(),
        }, 180000);
    }

    function check() {
        var audio = document.getElementById("audio");
        var newtime=audio.duration; //当前播放歌曲时长
        if ($(".music_stop").attr("class").indexOf("music_stop2") != -1) {
            $('.music_bofang_info_zhong').stop();   //----暂停时停止进度条-------
            $('.music_bofang_info_radio').stop();
            $(".music_stop").removeClass("music_stop2");
            audio.pause();// 暂停播放
        } else {
            $(".music_stop").addClass("music_stop2");
            audio.play();// 这个就是播放 
                probar(newtime); //--播放的时候调用进度条方法----------
               // time(newtime);  //---播放的时候调用倒计时方法-----------
            } 
        }
    $(".music_stop").click(check);//---底部按钮调用检查函数-----

    //--------------利用事件委托，解决JS在新生节点中不生效------------
    $(".middler_left_music_list").delegate(".music_ico1", "click", function () {
       
        var picLinks = new Array();//存放封面图地址
        var lyrics = new Array(); //存放歌词信息    
        var plays = new Array();//存放播放地址
        var songnames = new Array();//存放歌曲名
        var singers = new Array();//存放歌手名
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
            $(".music_stop").addClass("music_stop2");

            var audio=document.getElementById("audio");
            audio.play();// 这个就是播放 
            var newtime=audio.duration; //当前播放歌曲时长
             probar(newtime); //--播放的时候调用进度条方法----------
            console.log("开始播放");
            document.getElementById("lrc_content").innerHTML = "";
            $(".lrc_content").remove(".songwriter");//清空之前播放的歌词信息
            var select = $(".text").val();//当前搜索的歌曲关键字
            var flag = $(this).parents().parents().parents().index();//当前点击播放的歌曲序号
            requestinfo(select,flag);
        
            function requestinfo(select,flag) {
              $.ajax({
                url: "http://www.xiaoxina.cn/api.php?num=10&s=" + select, //num指期望搜寻返回歌曲数；
                dataType: "json",
                type: "GET",
                async: true,
                success: function (data) {
                  for (var i = 0; i < data.length; i++) {
                    var picLink = data[i].picLink;//图片地址
                    var lyric = data[i].lyric;//歌词信息
                    var play = data[i].url;//播放地址
                    var songname = data[i].name;//歌曲名
                    var singer = data[i].singer;//歌手名
                    picLinks.push(picLink);
                    lyrics.push(lyric);
                    plays.push(play);
                    songnames.push(songname);
                    singers.push(singer);
                  }
                  // console.log("图片地址:"+picLinks);
                  // console.log("歌词地址:"+lyrics);
                  // console.log("播放地址:"+plays); 
                  // console.log("歌曲名:"+songnames);
                   console.log("歌手名:"+singers);
          
                  $(".songname").html(songnames[flag]);
                  $(".artistname").html(singers[flag]);
                  document.getElementById("audio").src = plays[flag];
                  if (picLinks[flag] == undefined) {
                    $(".middler_right_top img").attr('src', '../音乐播放器/img/foo.jpg');
                  } else {
                    $(".middler_right_top img").attr('src', picLinks[flag]);
                    　$(".maskingimg").css("background-image", "url("+picLinks[flag]+")");
                  }
                    var text = lyrics[flag]; //当前播放歌曲的歌词
                    createLrc(text);
                }
              })
            }
            $item.find(".music_ico1").removeClass("music_ico11");//去除所有歌曲的播放图标
            $(this).toggleClass("music_ico11");//给当前播放歌曲增加播放图标
            $(this).parents().parents().find(".end").toggleClass("str");//展示动态播放图标
            $item.find(".end").removeClass("str");//---关闭同类动态播放图标-------
            $(this).parents().parents(".music_sing").find("span").toggleClass("tran"); //---------切换歌曲时，隐藏当前播放歌曲前的序号，且让之前播放的歌曲序号显示
            $item.find("span").removeClass("tran");
            $(".music_stop").addClass("music_stop2");//给底端按钮增加播放图标
            var newsongname = $(this).parent().parent().parent().find(".music_sing").text();//获得当前播放的歌曲名
            newsongname = newsongname.replace(/[0-9]/ig, "");//---正则表达，去除歌曲前的序号--
            var newsingername = $(this).parent().parent().parent().find(".music_singer").text()//获得当前播放歌曲的歌手名
            $(".music_bofang_info_name").html(newsongname + "-" + newsingername);//歌曲+歌手拼接，在底端展示
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