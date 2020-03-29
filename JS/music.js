$(function () {
    $('.middler_left_music_list').niceScroll({
        cursorcolor: "#FFF",//#CC0071 光标颜色 
        cursoropacitymax: 0.5, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备 
        cursorwidth: "10px", //像素光标的宽度 
        cursorborder: "0", //     游标边框css定义 
        cursorborderradius: "5px",//以像素为光标边界半径 
        autohidemode: true //是否隐藏滚动条 
    });
    $('.lrc_content').niceScroll({
        cursorcolor: "#FFF",
        cursoropacitymax: 0.5, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0 
        touchbehavior: false, 
        cursorwidth: "10px", 
        cursorborder: "0", 
        cursorborderradius: "5px",
        autohidemode: false
    });

})