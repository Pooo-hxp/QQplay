//----------面向对象写法----Progressbar为js原生写法------
(function(window){
    function Progress($progressBar,$progressLine, $progressDot){
        return new Progress.prototype.init($progressBar,$progressLine, $progressDot);
    }
    Progress.prototype={
        constructor:Progress,
        init:function($progressBar,$progressLine, $progressDot){
            this.$progressBar=$progressBar;
            this.$progressLine=$progressLine;
            this.$progressDot=$progressDot;
        },
        //播放器进度条点击效果
        progressClick:function(){
            var $this=this;//this指向Progress;
            //背景点击监听
            this.$progressBar.click(function(event){
                //获取播放背景距离窗口的默认位置
                var normalLeft=$(this).offset().left;//这里this指向$progressBar;
                console.log(normalLeft);
                //获取点击的位置距离窗口的位置；
                var eventLeft=event.pageX;
                console.log(eventLeft);
                var diff=eventLeft-normalLeft;
                $this.$progressLine.css("width",diff);
                $this.$progressDot.css("left",diff);
            });
        },
        //音乐播放器进度条拖拽效果
        progressMove:function(){
            var $this=this;
            //1、监听鼠标按下
            this.$progressBar.mousedown(function(){
            var normalLeft=$(this).offset().left;

            //2、监听鼠标移动
            $(document).mousemove(function(){
                var eventLeft=event.pageX;
                var diff=eventLeft-normalLeft;
                $this.$progressLine.css("width",diff);
                $this.$progressDot.css("left",diff);
            })
            })
            //3、监听鼠标抬起
            $(document).mouseup(function(){
                $(document).off("mousemove")
                //off()方法移除on()方法添加的事件处理程序。
            })
        }
    }
    Progress.prototype.init.prototype=Progress.prototype;
    window.Progress=Progress;
})(window);