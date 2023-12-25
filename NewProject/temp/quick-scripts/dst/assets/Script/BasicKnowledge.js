
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/BasicKnowledge.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9235aUC079MaJI/C77KUUEI', 'BasicKnowledge');
// Script/BasicKnowledge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bignumber_js_1 = require("bignumber.js");
var BasicKnowwledge = /** @class */ (function () {
    function BasicKnowwledge() {
    }
    BasicKnowwledge.prototype.testStart = function () {
        this.testDataType();
        this.testPrint();
        this.testNumber();
    };
    /**
     * 简单数据类型
     * let 声明块级作用域的变量
     * var 声明全局作用域或函数作用域的变量，存在变量提升现象
     * const 声明常量，声明时必须赋值，一旦赋值同一作用域不能在再重新赋值，但定义的引用类型，可以改变内部数据
     */
    BasicKnowwledge.prototype.testDataType = function () {
        // 指定类型
        var str = 'Home page string';
        var num = 1; // ts不具体区分 int float double
        var isRequesting = false;
        var result = undefined;
        var variable = null;
        console.log(str + " 类型是：" + typeof str);
        console.log(num + " 类型是：" + typeof num);
        console.log(isRequesting + " 类型是：" + typeof isRequesting);
        console.log(result + " 类型是：" + typeof result);
        console.log(variable + " 类型是：" + typeof variable);
        // let/const 不允许先用后声明，这种现象称为：暂时性死区，英文为：temporal dead zone，简称 TDZ。
        // var允许声明前使用（变量提升）
        // console.log(name); // Block-scoped variable 'name' used before its declaration
        console.log("age " + age + " 类型是：" + typeof age); // age undefined 类型是：undefined
        // console.log("id " + id + " 类型是：" + typeof id);
        // 自动推断类型(类型推导)
        var name = 'First page string';
        // let 变量不能重复声明，var变量可以重复声明，只得到最后一次声明的变量
        var age = 18;
        var age = 18.8; // 覆盖上次的声明
        var id = '12580';
        console.log("name: " + name + " 类型是：" + typeof name);
        console.log("age " + age + " 类型是：" + typeof age); // age 18.8 类型是：number
        console.log("id " + id + " 类型是：" + typeof id);
        {
            var firstName_1 = 'Wang';
            var lastName = 'Ming';
            var grade = 6;
            console.log("firstName " + firstName_1 + " 类型是：" + typeof firstName_1);
            console.log("lastName " + lastName + " 类型是：" + typeof lastName);
            console.log("grade " + grade + " 类型是：" + typeof grade);
        }
        var firstName = 'Li';
        console.log("firstName " + firstName + " 类型是：" + typeof firstName);
        // let 作用域为代码块，var 作用域为函数或全局
        // console.log("lastName " + lastName + " 类型是：" + typeof lastName);
        console.log("grade " + grade + " 类型是：" + typeof grade);
    };
    /**
     * console.log(a) 打印a的值
     * typeof a 获取a的类型
     */
    BasicKnowwledge.prototype.testPrint = function () {
        // 存在变量提升
        for (var i = 0; i <= 2; i++) {
            console.log("print3:" + i);
            setTimeout(function () {
                console.log("print4:" + i);
            });
        }
        var _loop_1 = function (i_1) {
            console.log("print5:" + i_1);
            setTimeout(function () {
                console.log("print6:" + i_1);
            });
        };
        for (var i_1 = 0; i_1 <= 2; i_1++) {
            _loop_1(i_1);
        }
        for (var i = 0; i <= 2; i++) {
            console.log("print1:" + i);
        }
        for (var i_2 = 0; i_2 <= 2; i_2++) {
            console.log("print2:" + i_2);
        }
        // 顺序是 print3:[0 1 2]  print5:[0 1 2] print1:[0 1 2] print2:[0 1 2]  print4:[3 3 3] print6:[0 1 2] 
        // print4 为何输出了大于2的值3,且值都相同？ 
        // 大于3：ts/js是单线程，异步的setTimeout()会等同步代码执行完之后才开始计时，此时i为跳出循环的值:3
        // 都相同：print6 let修饰异步setTimeout()捕获当前创建的变量，print4 var修饰，作用域为函数，被捕获的是同一个变量。
        // var变量提升hoisting，将变量和函数声明移动到所在作用域的顶部，分两个阶段
        // 声明阶段：变量名被提升到作用域顶部，但不会赋值。如果函数声明，函数整个定义也会被提升
        // 初始化阶段：代码执行到变量声明位置时，会被实际赋值，如果代码中没有显示的赋值操作，那么变量被初始化为 undefined
    };
    /**
     * testNumber
     * Number.MAX_SAFE_INTEGER 精度范围内能表示的整数最大值 2^53 - 1 = 9007199254740991，超过该值发生精度问题
     * Number.MIN_SAFE_INTEGER 精度范围内能表示的整数最大值 -2^53 + 1 = -9007199254740991
     * Number.MAX_VALUE 精度范围内最大值 1.7976931348623157e+308
     * Number.MIN_VALUE 精度范围内最小值 5e-324
     * Infinity 无穷大 (-Infinity 负无穷大)
     * 想表示更大数，可以用 bigint等 如 decimal.js bignumber.js big.js
     * 精度问题：浮点数时，某些十进制小数可能无法用精确的二进制表示，如 0.1 + 0.2 可能产生一个 0.30000000000000004
     */
    BasicKnowwledge.prototype.testNumber = function () {
        var value = 0.1 + 0.2; // 不会精确等于 0.3
        console.log(value); // 输出可能是 0.30000000000000004
        var safeInt1 = Number.MAX_SAFE_INTEGER + 1; // 超出安全整数范围
        var safeInt2 = Number.MAX_SAFE_INTEGER + 2; // 超出安全整数范围
        console.log(safeInt1 === safeInt2); // 输出可能是 true，因为精度丢失
        // npm install big.js
        var bigNumber = new bignumber_js_1.default('999998888877777444445555566666333332222211111');
        console.log(bigNumber.plus(new bignumber_js_1.default(10)).toString());
    };
    BasicKnowwledge.sharedInstance = new BasicKnowwledge();
    return BasicKnowwledge;
}());
exports.default = BasicKnowwledge;
// https://blog.csdn.net/qq_44749491/article/details/127439175

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQmFzaWNLbm93bGVkZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBaUM7QUFFakM7SUFBQTtJQStHQSxDQUFDO0lBM0dVLG1DQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksc0NBQVksR0FBbkI7UUFDSSxPQUFPO1FBQ1AsSUFBTSxHQUFHLEdBQVksa0JBQWtCLENBQUM7UUFDeEMsSUFBTSxHQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUMsMkJBQTJCO1FBQ2xELElBQU0sWUFBWSxHQUFZLEtBQUssQ0FBQztRQUNwQyxJQUFJLE1BQU0sR0FBYyxTQUFTLENBQUM7UUFDbEMsSUFBSSxRQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE9BQU8sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE9BQU8sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLE9BQU8sR0FBRyxPQUFPLFlBQVksQ0FBQyxDQUFDO1FBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxPQUFPLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxPQUFPLFFBQVEsQ0FBQyxDQUFDO1FBRWxELGlFQUFpRTtRQUNqRSxtQkFBbUI7UUFDbkIsaUZBQWlGO1FBQ2pGLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFHLENB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N0MsK0RBQStEO0lBQ25FLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSxvQ0FBVSxHQUFqQjtRQUNJLElBQUksS0FBSyxHQUFXLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxhQUFhO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyw0QkFBNEI7UUFFaEQsSUFBSSxRQUFRLEdBQVcsTUFBTSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVc7UUFDL0QsSUFBSSxRQUFRLEdBQVcsTUFBTSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVc7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7UUFFeEQscUJBQXFCO1FBQ3JCLElBQU0sU0FBUyxHQUFTLElBQUksc0JBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBQ25GLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLHNCQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUE1R2UsOEJBQWMsR0FBb0IsSUFBSSxlQUFlLEVBQUUsQ0FBQztJQTZHNUUsc0JBQUM7Q0EvR0QsQUErR0MsSUFBQTtrQkEvR29CLGVBQWU7QUFpSHBDLDhEQUE4RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKU0JpZyBmcm9tIFwiYmlnbnVtYmVyLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2ljS25vd3dsZWRnZSB7XG5cbiAgICBzdGF0aWMgcmVhZG9ubHkgc2hhcmVkSW5zdGFuY2U6IEJhc2ljS25vd3dsZWRnZSA9IG5ldyBCYXNpY0tub3d3bGVkZ2UoKTtcblxuICAgIHB1YmxpYyB0ZXN0U3RhcnQoKSB7XG4gICAgICAgIHRoaXMudGVzdERhdGFUeXBlKCk7XG4gICAgICAgIHRoaXMudGVzdFByaW50KCk7XG4gICAgICAgIHRoaXMudGVzdE51bWJlcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDnroDljZXmlbDmja7nsbvlnotcbiAgICAgKiBsZXQg5aOw5piO5Z2X57qn5L2c55So5Z+f55qE5Y+Y6YePXG4gICAgICogdmFyIOWjsOaYjuWFqOWxgOS9nOeUqOWfn+aIluWHveaVsOS9nOeUqOWfn+eahOWPmOmHj++8jOWtmOWcqOWPmOmHj+aPkOWNh+eOsOixoVxuICAgICAqIGNvbnN0IOWjsOaYjuW4uOmHj++8jOWjsOaYjuaXtuW/hemhu+i1i+WAvO+8jOS4gOaXpui1i+WAvOWQjOS4gOS9nOeUqOWfn+S4jeiDveWcqOWGjemHjeaWsOi1i+WAvO+8jOS9huWumuS5ieeahOW8leeUqOexu+Wei++8jOWPr+S7peaUueWPmOWGhemDqOaVsOaNrlxuICAgICAqL1xuICAgIHB1YmxpYyB0ZXN0RGF0YVR5cGUoKSB7XG4gICAgICAgIC8vIOaMh+Wumuexu+Wei1xuICAgICAgICBjb25zdCBzdHI6IHN0cmluZyA9ICAnSG9tZSBwYWdlIHN0cmluZyc7XG4gICAgICAgIGNvbnN0IG51bTogbnVtYmVyID0gMTsgLy8gdHPkuI3lhbfkvZPljLrliIYgaW50IGZsb2F0IGRvdWJsZVxuICAgICAgICBjb25zdCBpc1JlcXVlc3Rpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgbGV0IHJlc3VsdDogdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgdmFyaWFibGU6bnVsbCA9IG51bGw7XG4gICAgICAgIGNvbnNvbGUubG9nKHN0ciArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIHN0cik7XG4gICAgICAgIGNvbnNvbGUubG9nKG51bSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIG51bSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGlzUmVxdWVzdGluZyArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGlzUmVxdWVzdGluZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIHJlc3VsdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHZhcmlhYmxlICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgdmFyaWFibGUpO1xuXG4gICAgICAgIC8vIGxldC9jb25zdCDkuI3lhYHorrjlhYjnlKjlkI7lo7DmmI7vvIzov5nnp43njrDosaHnp7DkuLrvvJrmmoLml7bmgKfmrbvljLrvvIzoi7HmlofkuLrvvJp0ZW1wb3JhbCBkZWFkIHpvbmXvvIznroDnp7AgVERa44CCXG4gICAgICAgIC8vIHZhcuWFgeiuuOWjsOaYjuWJjeS9v+eUqO+8iOWPmOmHj+aPkOWNh++8iVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhuYW1lKTsgLy8gQmxvY2stc2NvcGVkIHZhcmlhYmxlICduYW1lJyB1c2VkIGJlZm9yZSBpdHMgZGVjbGFyYXRpb25cbiAgICAgICAgY29uc29sZS5sb2coXCJhZ2UgXCIgKyBhZ2UgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBhZ2UpOyAvLyBhZ2UgdW5kZWZpbmVkIOexu+Wei+aYr++8mnVuZGVmaW5lZFxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImlkIFwiICsgaWQgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBpZCk7XG4gICAgICAgIC8vIOiHquWKqOaOqOaWreexu+Weiyjnsbvlnovmjqjlr7wpXG4gICAgICAgIGxldCBuYW1lID0gJ0ZpcnN0IHBhZ2Ugc3RyaW5nJztcbiAgICAgICAgLy8gbGV0IOWPmOmHj+S4jeiDvemHjeWkjeWjsOaYju+8jHZhcuWPmOmHj+WPr+S7pemHjeWkjeWjsOaYju+8jOWPquW+l+WIsOacgOWQjuS4gOasoeWjsOaYjueahOWPmOmHj1xuICAgICAgICB2YXIgYWdlID0gMTg7XG4gICAgICAgIHZhciBhZ2UgPSAxOC44OyAvLyDopobnm5bkuIrmrKHnmoTlo7DmmI5cbiAgICAgICAgY29uc3QgaWQgPSAnMTI1ODAnO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm5hbWU6IFwiICsgbmFtZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIG5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImFnZSBcIiArIGFnZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGFnZSk7IC8vIGFnZSAxOC44IOexu+Wei+aYr++8mm51bWJlclxuICAgICAgICBjb25zb2xlLmxvZyhcImlkIFwiICsgaWQgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBpZCk7XG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9ICdXYW5nJztcbiAgICAgICAgICAgIGxldCBsYXN0TmFtZSA9ICdNaW5nJztcbiAgICAgICAgICAgIHZhciBncmFkZSA9IDY7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpcnN0TmFtZSBcIiArIGZpcnN0TmFtZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGZpcnN0TmFtZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhc3ROYW1lIFwiICsgbGFzdE5hbWUgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBsYXN0TmFtZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdyYWRlIFwiICsgZ3JhZGUgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBncmFkZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlyc3ROYW1lID0gJ0xpJztcbiAgICAgICAgY29uc29sZS5sb2coXCJmaXJzdE5hbWUgXCIgKyBmaXJzdE5hbWUgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBmaXJzdE5hbWUpO1xuICAgICAgICAvLyBsZXQg5L2c55So5Z+f5Li65Luj56CB5Z2X77yMdmFyIOS9nOeUqOWfn+S4uuWHveaVsOaIluWFqOWxgFxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImxhc3ROYW1lIFwiICsgbGFzdE5hbWUgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBsYXN0TmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ3JhZGUgXCIgKyBncmFkZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGdyYWRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogY29uc29sZS5sb2coYSkg5omT5Y2wYeeahOWAvFxuICAgICAqIHR5cGVvZiBhIOiOt+WPlmHnmoTnsbvlnotcbiAgICAgKi9cbiAgICBwdWJsaWMgdGVzdFByaW50KCkge1xuICAgICAgICAvLyDlrZjlnKjlj5jph4/mj5DljYdcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gMjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInByaW50MzpcIiArIGkpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwcmludDQ6XCIgKyBpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDI7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwcmludDU6XCIgKyBpKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJpbnQ2OlwiICsgaSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJpbnQxOlwiICsgaSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInByaW50MjpcIiArIGkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOmhuuW6j+aYryBwcmludDM6WzAgMSAyXSAgcHJpbnQ1OlswIDEgMl0gcHJpbnQxOlswIDEgMl0gcHJpbnQyOlswIDEgMl0gIHByaW50NDpbMyAzIDNdIHByaW50NjpbMCAxIDJdIFxuICAgICAgICAvLyBwcmludDQg5Li65L2V6L6T5Ye65LqG5aSn5LqOMueahOWAvDMs5LiU5YC86YO955u45ZCM77yfIFxuICAgICAgICAvLyDlpKfkuo4z77yadHMvanPmmK/ljZXnur/nqIvvvIzlvILmraXnmoRzZXRUaW1lb3V0KCnkvJrnrYnlkIzmraXku6PnoIHmiafooYzlrozkuYvlkI7miY3lvIDlp4vorqHml7bvvIzmraTml7Zp5Li66Lez5Ye65b6q546v55qE5YC8OjNcbiAgICAgICAgLy8g6YO955u45ZCM77yacHJpbnQ2IGxldOS/rumlsOW8guatpXNldFRpbWVvdXQoKeaNleiOt+W9k+WJjeWIm+W7uueahOWPmOmHj++8jHByaW50NCB2YXLkv67ppbDvvIzkvZznlKjln5/kuLrlh73mlbDvvIzooqvmjZXojrfnmoTmmK/lkIzkuIDkuKrlj5jph4/jgIJcbiAgICAgICAgLy8gdmFy5Y+Y6YeP5o+Q5Y2HaG9pc3RpbmfvvIzlsIblj5jph4/lkozlh73mlbDlo7DmmI7np7vliqjliLDmiYDlnKjkvZznlKjln5/nmoTpobbpg6jvvIzliIbkuKTkuKrpmLbmrrVcbiAgICAgICAgLy8g5aOw5piO6Zi25q6177ya5Y+Y6YeP5ZCN6KKr5o+Q5Y2H5Yiw5L2c55So5Z+f6aG26YOo77yM5L2G5LiN5Lya6LWL5YC844CC5aaC5p6c5Ye95pWw5aOw5piO77yM5Ye95pWw5pW05Liq5a6a5LmJ5Lmf5Lya6KKr5o+Q5Y2HXG4gICAgICAgIC8vIOWIneWni+WMlumYtuaute+8muS7o+eggeaJp+ihjOWIsOWPmOmHj+WjsOaYjuS9jee9ruaXtu+8jOS8muiiq+WunumZhei1i+WAvO+8jOWmguaenOS7o+eggeS4reayoeacieaYvuekuueahOi1i+WAvOaTjeS9nO+8jOmCo+S5iOWPmOmHj+iiq+WIneWni+WMluS4uiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0ZXN0TnVtYmVyXG4gICAgICogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIg57K+5bqm6IyD5Zu05YaF6IO96KGo56S655qE5pW05pWw5pyA5aSn5YC8IDJeNTMgLSAxID0gOTAwNzE5OTI1NDc0MDk5Me+8jOi2hei/h+ivpeWAvOWPkeeUn+eyvuW6pumXrumimFxuICAgICAqIE51bWJlci5NSU5fU0FGRV9JTlRFR0VSIOeyvuW6puiMg+WbtOWGheiDveihqOekuueahOaVtOaVsOacgOWkp+WAvCAtMl41MyArIDEgPSAtOTAwNzE5OTI1NDc0MDk5MVxuICAgICAqIE51bWJlci5NQVhfVkFMVUUg57K+5bqm6IyD5Zu05YaF5pyA5aSn5YC8IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gICAgICogTnVtYmVyLk1JTl9WQUxVRSDnsr7luqbojIPlm7TlhoXmnIDlsI/lgLwgNWUtMzI0XG4gICAgICogSW5maW5pdHkg5peg56m35aSnICgtSW5maW5pdHkg6LSf5peg56m35aSnKVxuICAgICAqIOaDs+ihqOekuuabtOWkp+aVsO+8jOWPr+S7peeUqCBiaWdpbnTnrYkg5aaCIGRlY2ltYWwuanMgYmlnbnVtYmVyLmpzIGJpZy5qc1xuICAgICAqIOeyvuW6pumXrumimO+8mua1rueCueaVsOaXtu+8jOafkOS6m+WNgei/m+WItuWwj+aVsOWPr+iDveaXoOazleeUqOeyvuehrueahOS6jOi/m+WItuihqOekuu+8jOWmgiAwLjEgKyAwLjIg5Y+v6IO95Lqn55Sf5LiA5LiqIDAuMzAwMDAwMDAwMDAwMDAwMDRcbiAgICAgKi9cbiAgICBwdWJsaWMgdGVzdE51bWJlcigpIHtcbiAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSAwLjEgKyAwLjI7IC8vIOS4jeS8mueyvuehruetieS6jiAwLjNcbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpOyAvLyDovpPlh7rlj6/og73mmK8gMC4zMDAwMDAwMDAwMDAwMDAwNFxuXG4gICAgICAgIGxldCBzYWZlSW50MTogbnVtYmVyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgKyAxOyAvLyDotoXlh7rlronlhajmlbTmlbDojIPlm7RcbiAgICAgICAgbGV0IHNhZmVJbnQyOiBudW1iZXIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiArIDI7IC8vIOi2heWHuuWuieWFqOaVtOaVsOiMg+WbtFxuICAgICAgICBjb25zb2xlLmxvZyhzYWZlSW50MSA9PT0gc2FmZUludDIpOyAvLyDovpPlh7rlj6/og73mmK8gdHJ1Ze+8jOWboOS4uueyvuW6puS4ouWksVxuXG4gICAgICAgIC8vIG5wbSBpbnN0YWxsIGJpZy5qc1xuICAgICAgICBjb25zdCBiaWdOdW1iZXI6SlNCaWcgPSBuZXcgSlNCaWcoJzk5OTk5ODg4ODg3Nzc3NzQ0NDQ0NTU1NTU2NjY2NjMzMzMzMjIyMjIxMTExMScpO1xuICAgICAgICBjb25zb2xlLmxvZyhiaWdOdW1iZXIucGx1cyhuZXcgSlNCaWcoMTApKS50b1N0cmluZygpKTtcbiAgICB9XG59XG5cbi8vIGh0dHBzOi8vYmxvZy5jc2RuLm5ldC9xcV80NDc0OTQ5MS9hcnRpY2xlL2RldGFpbHMvMTI3NDM5MTc1Il19