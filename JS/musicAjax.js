$(function () {
        $("ol").remove(".middler_left_music_list_ol");
        $.ajax({
            url: "http://www.xiaoxina.cn/api.php?num=15&s=恋爱",
            dataType: "json",
            type: "GET",
            async: true,
            success: function (data) {
                var songnames = new Array();//歌曲名
                var singers = new Array();//歌手名
                // console.log(data);
                for (var i = 0; i < data.length; i++) {
                    songnames.push(data[i].name);
                    singers.push(data[i].singer);
                    var ol = document.createElement("ol")
                    ol.className = "middler_left_music_list_ol ";
                    var li = document.createElement("li");
                    li.className = "music_li music_check";
                    var input = document.createElement("input");
                    input.type = "checkbox";
                    input.className='checkbox';
                    li.appendChild(input);
                    ol.appendChild(li);

                    var li2 = document.createElement("li");
                    li2.className = "music_li music_sing";
                    var span = document.createElement("span");
                    var spandiv = document.createElement("div");
                    spandiv.className = "end";
                    span.appendChild(spandiv);
                    span.innerHTML += i + 1;
                    li2.appendChild(span);
                    li2.innerHTML += data[i].name;
                    var div = document.createElement("div");
                    div.className = "music_sing_div";
                    var odiv0 = document.createElement("div");
                    odiv0.className = "music_ico1";
                    div.appendChild(odiv0);
                    var odiv = document.createElement("div");
                    odiv.className = "music_ico2";
                    odiv.title = "添加";

                    div.appendChild(odiv);
                    var odiv2 = document.createElement("div");
                    odiv2.className = "music_ico3";
                    odiv2.title = "转发";
                    div.appendChild(odiv2);
                    li2.appendChild(div);
                    ol.appendChild(li2);

                    var li3 = document.createElement("li");
                    li3.className = "music_li music_singer";
                    li3.innerHTML = data[i].singer;
                    ol.appendChild(li3);

                    $(".middler_left_music_list").append(ol);
                }
                //console.log(songids);
                //console.log(lyrics); 
                // console.log(songnames);
                // console.log(picLinks);
                // console.log(singers);
            }
        })
    })
    //--如果在线搜索歌曲，调用此接口，清除本地数据----
    $(".query").click(function () {

        var txt = $(".text").val();
        $("ol").remove(".middler_left_music_list_ol");
        $.ajax({
            url: "http://www.xiaoxina.cn/api.php?s=" + txt,
            dataType: "json",
            type: "GET",
            async: true,
            success: function (data) {
                var songnames = new Array();//歌曲名
                var singers = new Array();//歌手名
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    songnames.push(data[i].name);
                    singers.push(data[i].singer);
                    //var Min = parseInt(data[i].duration / 1000 / 60);//歌曲时间分钟数
                    // var sec = (data[i].duration % 6000); //歌曲时间秒数
                    // sec = String(sec);
                    //  sec = sec.substring(0, 2); //秒数只要前两位
                    //  if (sec == 0) {
                    //      sec = "00";
                    //  }
                    //var weight = Min + ":" + sec;
                    var ol = document.createElement("ol")
                    ol.className = "middler_left_music_list_ol";
                    var li = document.createElement("li");
                    li.className = "music_li music_check";
                    var input = document.createElement("input");
                    input.type = "checkbox";
                    input.className='checkbox';
                    li.appendChild(input);
                    ol.appendChild(li);

                    var li2 = document.createElement("li");
                    li2.className = "music_li music_sing";
                    var span = document.createElement("span");
                    var spandiv = document.createElement("div");
                    spandiv.className = "end";
                    span.appendChild(spandiv);
                    span.innerHTML += i + 1;
                    li2.appendChild(span);
                    li2.innerHTML += data[i].name;
                    var div = document.createElement("div");
                    div.className = "music_sing_div";
                    var odiv0 = document.createElement("div");
                    odiv0.className = "music_ico1 ";
                    div.appendChild(odiv0);
                    var odiv = document.createElement("div");
                    odiv.className = "music_ico2";
                    odiv.title = "添加";

                    div.appendChild(odiv);
                    var odiv2 = document.createElement("div");
                    odiv2.className = "music_ico3";
                    odiv2.title = "转发";
                    div.appendChild(odiv2);
                    li2.appendChild(div);
                    ol.appendChild(li2);

                    var li3 = document.createElement("li");
                    li3.className = "music_li music_singer";
                    li3.innerHTML = data[i].singer;
                    ol.appendChild(li3);

                    $(".middler_left_music_list").append(ol);
                }
                //console.log(songids);
                //console.log(lyrics); 
                // console.log(songnames);
                // console.log(picLinks);
                // console.log(singers);
            }
        })
})
