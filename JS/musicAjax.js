$(function () {
        $("ol").remove(".middler_left_music_list_ol");
		fakeAjax({
            url: "https://api.apiopen.top/searchMusic?name=我",
            dataType: "json",
            type: "GET",
            async: true,
            success: function (data) {
                data=data.result;
                console.log(data[1].pic);
                for (var i = 0; i < data.length; i++) {
                    var info=new Array(5);
                    info[0]=data[i].title;
                    info[1]=data[i].author;
                    info[2]=data[i].pic;
                    info[3]=data[i].lrc;
                    info[4]=data[i].url;
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
                    info[0]=data[i].title;
                    info[1]=data[i].author;
                    info[2]=data[i].pic;
                    info[3]=data[i].lrc;
                    info[4]=data[i].url;
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
