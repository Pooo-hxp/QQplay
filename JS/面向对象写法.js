(function(){
    function Zoo(){
        return new Zoo.prototype.init();
    }
    Zoo.prototype={
        constructor:Zoo,
        init:function(){
            this.from='china';
            this.sex='boy'
        },
        say:function(){
            console.log(this.from);
            console.log(this.sex);
        }
    }
/**
 * 我在构造函数Zoo的原型对象中创建一个init函数
 * 把这个函数自己的原型对象init.prototype
 * 改为Zoo的原型对象Zoo.prototype;
 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 */
    Zoo.prototype.init.prototype=Zoo.prototype;
/**
 * 这里dog相当于init函数实例出的对象
*/
var dog=new Zoo()
    dog.say();
    /***
     * dog.init();
     * dog.say();
     * 必须要先提前调用init方法
     * 然后调用say才能取得数据
     */

})();