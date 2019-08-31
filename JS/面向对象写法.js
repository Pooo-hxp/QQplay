/**
 * create by Function in 2019/08/31
 * 作用： 面向对象思想示例
 * Zoo 构造函数
 *  init    :初始化方法
 *  IIFE    :函数写法（立即执行函数表达式）
 * ********************************* *
 * 使用示例：
 * <button onclick="request()">发送请求</button>
 * 
 **/
(function(){
    function Zoo(){
        return new Zoo.prototype.init();
/*它的作用是让实例化出的对象改为init函数实例出的对象*/
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
 * ↓   ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓ 
 */
    Zoo.prototype.init.prototype=Zoo.prototype;
/**
 * 这里dog是通过init函数实例出的
 * 因为init函数的原型init.prototype已经改为Zoo的原型
 * dog.__proto__===init.prototype返回true
 * 所以dog.say()就能访问它的原型init身上的属性或方法了
 * ↓   ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓ 
*/
var dog=new Zoo()
    dog.say();
/**
 * 根据jquery的方法思想而来
 */
})();