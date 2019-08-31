(function(){
    function Zoo(){
    }
    Zoo.prototype={
        constructor:Zoo,
        init:function(){
            this.form='china';
            this.sex='boy'
        },
        say:function(){
            console.log(this.form);
            console.log(this.sex);
        }
    }
    var dog=new Zoo()
    /***
     * 必须要先提前调用init方法
     * 然后调用say才能取得数据
     */
    dog.init();
    dog.say();
})();