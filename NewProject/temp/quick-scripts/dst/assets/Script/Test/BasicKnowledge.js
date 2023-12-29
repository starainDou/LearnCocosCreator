
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Test/BasicKnowledge.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '17af4nvgkFAG6IvzTgl2IbN', 'BasicKnowledge');
// Script/Test/BasicKnowledge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDYTest = void 0;
var bignumber_js_1 = require("bignumber.js");
var DDYTest;
(function (DDYTest) {
    // 全局变量
    DDYTest.log = CC_EDITOR ? cc.log : console.log;
    DDYTest.rootNode = null;
    // 全局函数
    function randomNumber(from, to) {
        if (to === void 0) { to = 0; }
        return (to - from) * Math.random() + from;
    }
    DDYTest.randomNumber = randomNumber;
    function randomInt(from, to) {
        if (to === void 0) { to = 0; }
        return ~~((to - from) * Math.random() + from);
    }
    DDYTest.randomInt = randomInt;
})(DDYTest = exports.DDYTest || (exports.DDYTest = {}));
window['DDYTest'] = DDYTest; // 挂载到 window 成为全局命名空间
// 枚举成员是只读的
// 整型数字枚举，默认0起始，逐个加1。可指定起始值或指定值
var LocalDirection;
(function (LocalDirection) {
    LocalDirection[LocalDirection["NORTH"] = 2] = "NORTH";
    LocalDirection[LocalDirection["SOUTH"] = 4] = "SOUTH";
    LocalDirection[LocalDirection["WEST"] = 5] = "WEST";
    LocalDirection[LocalDirection["EAST"] = 6] = "EAST";
})(LocalDirection || (LocalDirection = {}));
;
// 字符串枚举
var Season;
(function (Season) {
    Season["SPRINT"] = "Spring";
    Season["SUMMER"] = "Summer";
    Season["AUTUMN"] = "Autumn";
    Season["WINTER"] = "Winter";
})(Season || (Season = {}));
// 异构枚举[整型和字符串混合]
var IDCardSubfix;
(function (IDCardSubfix) {
    IDCardSubfix[IDCardSubfix["ONE"] = 0] = "ONE";
    IDCardSubfix[IDCardSubfix["TWO"] = 1] = "TWO";
    IDCardSubfix[IDCardSubfix["THREE"] = 2] = "THREE";
    IDCardSubfix[IDCardSubfix["FOUR"] = 3] = "FOUR";
    IDCardSubfix[IDCardSubfix["FIVE"] = 4] = "FIVE";
    IDCardSubfix[IDCardSubfix["SIX"] = 5] = "SIX";
    IDCardSubfix[IDCardSubfix["SEVEN"] = 6] = "SEVEN";
    IDCardSubfix[IDCardSubfix["EIGHT"] = 7] = "EIGHT";
    IDCardSubfix[IDCardSubfix["NINE"] = 8] = "NINE";
    IDCardSubfix[IDCardSubfix["ZERO"] = 9] = "ZERO";
    IDCardSubfix["X"] = "X";
})(IDCardSubfix || (IDCardSubfix = {}));
// 数字枚举相对字符串枚举多了 “反向映射”，可以通过枚举的值获取到对应的键key
var BasicKnowwledge = /** @class */ (function () {
    function BasicKnowwledge() {
    }
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
        var list1 = [1, 2, 3];
        var list2 = [4, 5, 6];
        var list3 = [7, 8, 9];
        var map1 = new Map();
        map1.set('key1', 1);
        var map2 = new Map([["a", 1], ["b", 2]]);
        var mp3 = console.log(str + " 类型是：" + typeof str);
        console.log(num + " 类型是：" + typeof num);
        console.log(isRequesting + " 类型是：" + typeof isRequesting);
        console.log(result + " 类型是：" + typeof result);
        console.log(variable + " 类型是：" + typeof variable);
        console.log(list1 + " 类型是：" + typeof list1); // 1,2,3 类型是：object
        console.log(list2 + " 类型是：" + typeof list2);
        console.log(list3 + " 类型是：" + typeof list3);
        console.log('enum LocalDirection' + LocalDirection.NORTH + " 类型是：" + typeof LocalDirection.NORTH);
        console.log('反射枚举值', LocalDirection[0], LocalDirection[2]); // 0 undefined  2 NORTH
        console.log('enum Season', Season.SPRINT);
        console.log('enum IDCardSubfix', IDCardSubfix[0], IDCardSubfix.ONE, IDCardSubfix.X);
        var notSure = 666;
        console.log(notSure + " 类型是：" + typeof notSure); // 666 类型是：number
        notSure = "Semlinker";
        console.log(notSure + " 类型是：" + typeof notSure); // Semlinker 类型是：string
        notSure = false;
        console.log(notSure + " 类型是：" + typeof notSure); // false 类型是：boolean
        // unknown 成为 TS类型系统的另一种顶级类型，其他值可以赋值给unknown变量，除了any和unknown，其他类型不接受unknown赋值
        var unknownValue;
        unknownValue = true; // OK
        console.log(unknownValue);
        unknownValue = 42; // OK
        console.log(unknownValue);
        unknownValue = "Hello World"; // OK
        console.log(unknownValue);
        var unknownValue2 = unknownValue; // OK
        var anyValue2 = unknownValue; // OK
        console.log(unknownValue2, anyValue2);
        // let value3: boolean = unknownValue; // Error
        // Tuple元组，可以存不同类型值
        var tupleType = ["Semlinker", true];
        console.log(tupleType + " 类型是：" + typeof tupleType + " 0:" + tupleType[0]); // Semlinker,true 类型是：object 0:Semlinker
        var tuple1 = [1, '2'];
        var tuple2 = [1, '2', true];
        console.log(tuple1 + " 类型是：" + typeof tuple1);
        console.log(tuple2 + " 类型是：" + typeof tuple2);
        // 扩展元素，类型前添加 ... 表示他是一个扩展元素
        // !!! CocosCreator2.4.x 不支持扩展元素
        // type StringNumberBooleans = [string, number, ...boolean]; //前两个元素为string,number,剩下元素都为boolean
        // type StringNumbersBoolean = [string, ...number, boolean]; //首尾两个元素为string,boolean,中间元素都为number
        // type StringsNumberBoolean = [...string, number, boolean]; // 最后两个元素为number,boolean，前面元素为string
        // Void类型 某种程度上来说，void 类型像是与 any 类型相反，它表示没有任何类型。
        // 注意：声明 void 类型的变量没有什么作用，因为它的值只能为 undefined 或 null
        var voidValue;
        console.log(voidValue + " 类型是：" + typeof voidValue);
        voidValue = undefined;
        console.log(voidValue + " 类型是：" + typeof voidValue);
        voidValue = null;
        console.log(voidValue + " 类型是：" + typeof voidValue);
        // 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给 number 类型的变量。
        // 然而，"strictNullChecks": true，null 和 undefined 只能赋值给 void 和它们各自的类型。
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
        DDYTest.log('随机数为:' + DDYTest.randomNumber(2, 8));
        DDYTest.log('随机整数:' + DDYTest.randomInt(2, 8));
    };
    /**
     * console.log(a) 打印a的值
     * 变量间可用 , 或 +  连接
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
        var num1 = 10000; // 十进制
        var num2 = 4; // 二进制
        var num3 = 64; // 八进制
        var num4 = 0x100; // 十六进制
        console.log(num1 + " 类型是：" + typeof num1);
        console.log(num2 + " 类型是：" + typeof num2);
        console.log(num3 + " 类型是：" + typeof num3);
        console.log(num4 + " 类型是：" + typeof num4);
        console.log('num4 to string:', num4.toString());
        // Cocos3x可以用 npm install big.js --save 方式 
        // Cocos2x只能将源码放进assets 大数表示库对比 https://blog.csdn.net/feiying0canglang/article/details/125194433
        // https://github.com/MikeMcl/bignumber.js
        var bigNum1 = new bignumber_js_1.default('999999999999999999999999999');
        console.log(bigNum1.toString()); // 9.99999999999999999999999999e+26
        console.log(bigNum1.toFixed()); // 999999999999999999999999999
        var bigNum2 = new bignumber_js_1.default(bigNum1.toString());
        console.log(bigNum2.toFixed()); // 999999999999999999999999999
    };
    BasicKnowwledge.prototype.testString = function () {
        var str1 = 'Today is Sunday! Sunday';
        console.log(str1 + '长度:' + str1.length);
        console.log(str1 + 'Sun:' + str1.indexOf('Sun') + " 不存在的Mon:" + str1.indexOf('Mon')); // 首次出现位置，索引从0开始，未找到-1
        console.log(str1 + 'Sun:' + str1.lastIndexOf('Sun') + " 不存在的Mon:" + str1.lastIndexOf('Mon')); // 尾次出现位置，索引从0开始，未找到-1
        console.log(str1 + '从指定起始位置找Sun:' + str1.indexOf('Sun', 12)); // 检索起始位置查找首次出现位置
        console.log(str1 + '是否包含Sun:' + str1.includes('Sun') + ' 是否包含Mon:' + str1.includes('Mon')); // 是否包含指定字符串
        console.log(str1.slice(17));
        console.log(str1.slice(1, 3));
        console.log(str1.slice(-1, 3)); // 如果某个参数为负，则从字符串的结尾开始计数
        console.log(str1.slice(1, -3));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVGVzdC9CYXNpY0tub3dsZWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBcUM7QUFFckMsSUFBaUIsT0FBTyxDQVd2QjtBQVhELFdBQWlCLE9BQU87SUFDcEIsT0FBTztJQUNJLFdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDdkMsZ0JBQVEsR0FBWSxJQUFJLENBQUM7SUFDcEMsT0FBTztJQUNQLFNBQWdCLFlBQVksQ0FBQyxJQUFXLEVBQUUsRUFBYTtRQUFiLG1CQUFBLEVBQUEsTUFBYTtRQUNuRCxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDOUMsQ0FBQztJQUZlLG9CQUFZLGVBRTNCLENBQUE7SUFDRCxTQUFnQixTQUFTLENBQUMsSUFBVyxFQUFFLEVBQWE7UUFBYixtQkFBQSxFQUFBLE1BQWE7UUFDaEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUZlLGlCQUFTLFlBRXhCLENBQUE7QUFDTCxDQUFDLEVBWGdCLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQVd2QjtBQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxzQkFBc0I7QUFFbkQsV0FBVztBQUNYLCtCQUErQjtBQUMvQixJQUFLLGNBS0o7QUFMRCxXQUFLLGNBQWM7SUFDZixxREFBUyxDQUFBO0lBQ1QscURBQVMsQ0FBQTtJQUNULG1EQUFJLENBQUE7SUFDSixtREFBSSxDQUFBO0FBQ1IsQ0FBQyxFQUxJLGNBQWMsS0FBZCxjQUFjLFFBS2xCO0FBQUEs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QyxzQkFBc0I7UUFDcEgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7UUFDL0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVk7UUFDeEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsd0JBQXdCO1FBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUF2TWUsOEJBQWMsR0FBb0IsSUFBSSxlQUFlLEVBQUUsQ0FBQztJQXdNNUUsc0JBQUM7Q0ExTUQsQUEwTUMsSUFBQTtrQkExTW9CLGVBQWU7QUE2TXBDLDhEQUE4RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCaWdOdW1iZXIgZnJvbSBcImJpZ251bWJlci5qc1wiO1xuXG5leHBvcnQgbmFtZXNwYWNlIEREWVRlc3Qge1xuICAgIC8vIOWFqOWxgOWPmOmHj1xuICAgIGV4cG9ydCBsZXQgbG9nID0gQ0NfRURJVE9SID8gY2MubG9nIDogY29uc29sZS5sb2c7XG4gICAgZXhwb3J0IGxldCByb290Tm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgLy8g5YWo5bGA5Ye95pWwXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbU51bWJlcihmcm9tOm51bWJlciwgdG86bnVtYmVyID0gMCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodG8gLSBmcm9tKSAqIE1hdGgucmFuZG9tKCkgKyBmcm9tO1xuICAgIH1cbiAgICBleHBvcnQgZnVuY3Rpb24gcmFuZG9tSW50KGZyb206bnVtYmVyLCB0bzpudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIH5+KCh0byAtIGZyb20pICogTWF0aC5yYW5kb20oKSArIGZyb20pO1xuICAgIH1cbn1cbndpbmRvd1snRERZVGVzdCddID0gRERZVGVzdDsgLy8g5oyC6L295YiwIHdpbmRvdyDmiJDkuLrlhajlsYDlkb3lkI3nqbrpl7RcblxuLy8g5p6a5Li+5oiQ5ZGY5piv5Y+q6K+755qEXG4vLyDmlbTlnovmlbDlrZfmnprkuL7vvIzpu5jorqQw6LW35aeL77yM6YCQ5Liq5YqgMeOAguWPr+aMh+Wumui1t+Wni+WAvOaIluaMh+WumuWAvFxuZW51bSBMb2NhbERpcmVjdGlvbiB7XG4gICAgTk9SVEggPSAyLFxuICAgIFNPVVRIID0gNCxcbiAgICBXRVNULFxuICAgIEVBU1QsXG59O1xuLy8g5a2X56ym5Liy5p6a5Li+XG5lbnVtIFNlYXNvbiB7XG4gICAgU1BSSU5UID0gJ1NwcmluZycsXG4gICAgU1VNTUVSID0gJ1N1bW1lcicsXG4gICAgQVVUVU1OID0gJ0F1dHVtbicsXG4gICAgV0lOVEVSID0gJ1dpbnRlcicsXG59XG4vLyDlvILmnoTmnprkuL5b5pW05Z6L5ZKM5a2X56ym5Liy5re35ZCIXVxuZW51bSBJRENhcmRTdWJmaXgge1xuICAgIE9ORSwgVFdPLCBUSFJFRSwgRk9VUiwgRklWRSwgU0lYLCBTRVZFTiwgRUlHSFQsIE5JTkUsIFpFUk8sXG4gICAgWCA9ICdYJyxcbn1cbi8vIOaVsOWtl+aemuS4vuebuOWvueWtl+espuS4suaemuS4vuWkmuS6hiDigJzlj43lkJHmmKDlsITigJ3vvIzlj6/ku6XpgJrov4fmnprkuL7nmoTlgLzojrflj5bliLDlr7nlupTnmoTplK5rZXlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzaWNLbm93d2xlZGdlIHtcblxuICAgIHN0YXRpYyByZWFkb25seSBzaGFyZWRJbnN0YW5jZTogQmFzaWNLbm93d2xlZGdlID0gbmV3IEJhc2ljS25vd3dsZWRnZSgpO1xuXG4gICAgLyoqXG4gICAgICog566A5Y2V5pWw5o2u57G75Z6LXG4gICAgICogbGV0IOWjsOaYjuWdl+e6p+S9nOeUqOWfn+eahOWPmOmHj1xuICAgICAqIHZhciDlo7DmmI7lhajlsYDkvZznlKjln5/miJblh73mlbDkvZznlKjln5/nmoTlj5jph4/vvIzlrZjlnKjlj5jph4/mj5DljYfnjrDosaFcbiAgICAgKiBjb25zdCDlo7DmmI7luLjph4/vvIzlo7DmmI7ml7blv4XpobvotYvlgLzvvIzkuIDml6botYvlgLzlkIzkuIDkvZznlKjln5/kuI3og73lnKjlho3ph43mlrDotYvlgLzvvIzkvYblrprkuYnnmoTlvJXnlKjnsbvlnovvvIzlj6/ku6XmlLnlj5jlhoXpg6jmlbDmja5cbiAgICAgKi9cbiAgICBwdWJsaWMgdGVzdERhdGFUeXBlKCkge1xuICAgICAgICAvLyDmjIflrprnsbvlnotcbiAgICAgICAgY29uc3Qgc3RyOiBzdHJpbmcgPSAgJ0hvbWUgcGFnZSBzdHJpbmcnO1xuICAgICAgICBjb25zdCBudW06IG51bWJlciA9IDE7IC8vIHRz5LiN5YW35L2T5Yy65YiGIGludCBmbG9hdCBkb3VibGVcbiAgICAgICAgY29uc3QgaXNSZXF1ZXN0aW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGxldCByZXN1bHQ6IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IHZhcmlhYmxlOm51bGwgPSBudWxsO1xuICAgICAgICBsZXQgbGlzdDE6IG51bWJlcltdID0gWzEsIDIsIDNdO1xuICAgICAgICBsZXQgbGlzdDIgPSBbNCwgNSwgNl07XG4gICAgICAgIGxldCBsaXN0MzogQXJyYXk8bnVtYmVyPiA9IFs3LCA4LCA5XTtcbiAgICAgICAgbGV0IG1hcDE6IE1hcDxzdHJpbmcsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG4gICAgICAgIG1hcDEuc2V0KCdrZXkxJywgMSk7XG4gICAgICAgIGxldCBtYXAyID0gbmV3IE1hcChbW1wiYVwiLCAxXSwgW1wiYlwiLCAyXV0pO1xuICAgICAgICBsZXQgbXAzID0gXG4gICAgICAgIGNvbnNvbGUubG9nKHN0ciArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIHN0cik7XG4gICAgICAgIGNvbnNvbGUubG9nKG51bSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIG51bSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGlzUmVxdWVzdGluZyArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGlzUmVxdWVzdGluZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIHJlc3VsdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHZhcmlhYmxlICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgdmFyaWFibGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhsaXN0MSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGxpc3QxKTsgLy8gMSwyLDMg57G75Z6L5piv77yab2JqZWN0XG4gICAgICAgIGNvbnNvbGUubG9nKGxpc3QyICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgbGlzdDIpO1xuICAgICAgICBjb25zb2xlLmxvZyhsaXN0MyArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGxpc3QzKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnZW51bSBMb2NhbERpcmVjdGlvbicgKyBMb2NhbERpcmVjdGlvbi5OT1JUSCArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIExvY2FsRGlyZWN0aW9uLk5PUlRIKTtcbiAgICAgICAgY29uc29sZS5sb2coJ+WPjeWwhOaemuS4vuWAvCcsIExvY2FsRGlyZWN0aW9uWzBdLCBMb2NhbERpcmVjdGlvblsyXSk7IC8vIDAgdW5kZWZpbmVkICAyIE5PUlRIXG4gICAgICAgIGNvbnNvbGUubG9nKCdlbnVtIFNlYXNvbicsIFNlYXNvbi5TUFJJTlQpO1xuICAgICAgICBjb25zb2xlLmxvZygnZW51bSBJRENhcmRTdWJmaXgnLCBJRENhcmRTdWJmaXhbMF0sIElEQ2FyZFN1YmZpeC5PTkUsIElEQ2FyZFN1YmZpeC5YKTtcblxuICAgICAgICBsZXQgbm90U3VyZTogYW55ID0gNjY2O1xuICAgICAgICBjb25zb2xlLmxvZyhub3RTdXJlICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2Ygbm90U3VyZSk7IC8vIDY2NiDnsbvlnovmmK/vvJpudW1iZXJcbiAgICAgICAgbm90U3VyZSA9IFwiU2VtbGlua2VyXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKG5vdFN1cmUgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBub3RTdXJlKTsgLy8gU2VtbGlua2VyIOexu+Wei+aYr++8mnN0cmluZ1xuICAgICAgICBub3RTdXJlID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKG5vdFN1cmUgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBub3RTdXJlKTsgLy8gZmFsc2Ug57G75Z6L5piv77yaYm9vbGVhblxuXG4gICAgICAgIC8vIHVua25vd24g5oiQ5Li6IFRT57G75Z6L57O757uf55qE5Y+m5LiA56eN6aG257qn57G75Z6L77yM5YW25LuW5YC85Y+v5Lul6LWL5YC857uZdW5rbm93buWPmOmHj++8jOmZpOS6hmFueeWSjHVua25vd27vvIzlhbbku5bnsbvlnovkuI3mjqXlj5d1bmtub3du6LWL5YC8XG4gICAgICAgIGxldCB1bmtub3duVmFsdWU6IHVua25vd247XG4gICAgICAgIHVua25vd25WYWx1ZSA9IHRydWU7IC8vIE9LXG4gICAgICAgIGNvbnNvbGUubG9nKHVua25vd25WYWx1ZSk7XG4gICAgICAgIHVua25vd25WYWx1ZSA9IDQyOyAvLyBPS1xuICAgICAgICBjb25zb2xlLmxvZyh1bmtub3duVmFsdWUpO1xuICAgICAgICB1bmtub3duVmFsdWUgPSBcIkhlbGxvIFdvcmxkXCI7IC8vIE9LXG4gICAgICAgIGNvbnNvbGUubG9nKHVua25vd25WYWx1ZSk7XG5cbiAgICAgICAgbGV0IHVua25vd25WYWx1ZTI6IHVua25vd24gPSB1bmtub3duVmFsdWU7IC8vIE9LXG4gICAgICAgIGxldCBhbnlWYWx1ZTI6IGFueSA9IHVua25vd25WYWx1ZTsgLy8gT0tcbiAgICAgICAgY29uc29sZS5sb2codW5rbm93blZhbHVlMiwgYW55VmFsdWUyKTtcbiAgICAgICAgLy8gbGV0IHZhbHVlMzogYm9vbGVhbiA9IHVua25vd25WYWx1ZTsgLy8gRXJyb3JcblxuICAgICAgICAvLyBUdXBsZeWFg+e7hO+8jOWPr+S7peWtmOS4jeWQjOexu+Wei+WAvFxuICAgICAgICBsZXQgdHVwbGVUeXBlOiBbc3RyaW5nLCBib29sZWFuXSA9IFtcIlNlbWxpbmtlclwiLCB0cnVlXTtcbiAgICAgICAgY29uc29sZS5sb2codHVwbGVUeXBlICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgdHVwbGVUeXBlICsgXCIgMDpcIiArIHR1cGxlVHlwZVswXSk7IC8vIFNlbWxpbmtlcix0cnVlIOexu+Wei+aYr++8mm9iamVjdCAwOlNlbWxpbmtlclxuICAgICAgICAvLyDnlLHkuo7kuIDoiKzlhYPnu4TmmK/nn6XpgZPlhYPntKDmlbDph4/lkozlr7nlupTnsbvlnovvvIzmiYDku6Xlj6/ku6Xlr7nlhYPnu4TnmoTkuIvmoIforr/pl67mmK/lkKbotornlYzlkozlhbfkvZPlhYPntKDnmoTmk43kvZzmmK/lkKblkIjms5XlgZrmo4Dmn6XjgIJcbiAgICAgICAgLy8g5LiK6Z2i6K+05LiA6Iis5oOF5Ya15piv5Zug5Li677yM5YWD57uEIOaUr+aMgeWPr+mAieWFg+e0oOWSjOaJqeWxleWFg+e0oO+8jOmAoOaIkOWFg+e7hOWunumZhemVv+W6puS4jeWumuOAguWPr+mAieWFg+e0oOWPquWHuueOsOWcqOmYn+WwvlxuICAgICAgICB0eXBlIE15VHVwbGUgPSBbbnVtYmVyLCBzdHJpbmcsIGJvb2xlYW4/XTsgLy8gdHlwZeWumuS5ieWIq+WQjSDnu5PlsL7lj6/pgInlhYPntKAg5YWD57uEXG4gICAgICAgIGNvbnN0IHR1cGxlMTogTXlUdXBsZSA9IFsxLCAnMiddO1xuICAgICAgICBjb25zdCB0dXBsZTI6IE15VHVwbGUgPSBbMSwgICcyJywgdHJ1ZV07XG4gICAgICAgIGNvbnNvbGUubG9nKHR1cGxlMSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIHR1cGxlMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHR1cGxlMiArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIHR1cGxlMik7XG4gICAgICAgIC8vIOaJqeWxleWFg+e0oO+8jOexu+Wei+WJjea3u+WKoCAuLi4g6KGo56S65LuW5piv5LiA5Liq5omp5bGV5YWD57SgXG4gICAgICAgIC8vICEhISBDb2Nvc0NyZWF0b3IyLjQueCDkuI3mlK/mjIHmianlsZXlhYPntKBcbiAgICAgICAgLy8gdHlwZSBTdHJpbmdOdW1iZXJCb29sZWFucyA9IFtzdHJpbmcsIG51bWJlciwgLi4uYm9vbGVhbl07IC8v5YmN5Lik5Liq5YWD57Sg5Li6c3RyaW5nLG51bWJlcizliankuIvlhYPntKDpg73kuLpib29sZWFuXG4gICAgICAgIC8vIHR5cGUgU3RyaW5nTnVtYmVyc0Jvb2xlYW4gPSBbc3RyaW5nLCAuLi5udW1iZXIsIGJvb2xlYW5dOyAvL+mmluWwvuS4pOS4quWFg+e0oOS4unN0cmluZyxib29sZWFuLOS4remXtOWFg+e0oOmDveS4um51bWJlclxuICAgICAgICAvLyB0eXBlIFN0cmluZ3NOdW1iZXJCb29sZWFuID0gWy4uLnN0cmluZywgbnVtYmVyLCBib29sZWFuXTsgLy8g5pyA5ZCO5Lik5Liq5YWD57Sg5Li6bnVtYmVyLGJvb2xlYW7vvIzliY3pnaLlhYPntKDkuLpzdHJpbmdcblxuICAgICAgICAvLyBWb2lk57G75Z6LIOafkOenjeeoi+W6puS4iuadpeivtO+8jHZvaWQg57G75Z6L5YOP5piv5LiOIGFueSDnsbvlnovnm7jlj43vvIzlroPooajnpLrmsqHmnInku7vkvZXnsbvlnovjgIJcbiAgICAgICAgLy8g5rOo5oSP77ya5aOw5piOIHZvaWQg57G75Z6L55qE5Y+Y6YeP5rKh5pyJ5LuA5LmI5L2c55So77yM5Zug5Li65a6D55qE5YC85Y+q6IO95Li6IHVuZGVmaW5lZCDmiJYgbnVsbFxuICAgICAgICBsZXQgdm9pZFZhbHVlOiB2b2lkO1xuICAgICAgICBjb25zb2xlLmxvZyh2b2lkVmFsdWUgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiB2b2lkVmFsdWUpO1xuICAgICAgICB2b2lkVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKHZvaWRWYWx1ZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIHZvaWRWYWx1ZSk7XG4gICAgICAgIHZvaWRWYWx1ZSA9IG51bGw7XG4gICAgICAgIGNvbnNvbGUubG9nKHZvaWRWYWx1ZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIHZvaWRWYWx1ZSk7XG4gICAgICAgIC8vIOm7mOiupOaDheWGteS4iyBudWxsIOWSjCB1bmRlZmluZWQg5piv5omA5pyJ57G75Z6L55qE5a2Q57G75Z6L44CCIOWwseaYr+ivtOS9oOWPr+S7peaKiiBudWxsIOWSjCB1bmRlZmluZWQg6LWL5YC857uZIG51bWJlciDnsbvlnovnmoTlj5jph4/jgIJcbiAgICAgICAgLy8g54S26ICM77yMXCJzdHJpY3ROdWxsQ2hlY2tzXCI6IHRydWXvvIxudWxsIOWSjCB1bmRlZmluZWQg5Y+q6IO96LWL5YC857uZIHZvaWQg5ZKM5a6D5Lus5ZCE6Ieq55qE57G75Z6L44CCXG5cbiAgICAgICAgLy8gbGV0L2NvbnN0IOS4jeWFgeiuuOWFiOeUqOWQjuWjsOaYju+8jOi/meenjeeOsOixoeensOS4uu+8muaaguaXtuaAp+atu+WMuu+8jOiLseaWh+S4uu+8mnRlbXBvcmFsIGRlYWQgem9uZe+8jOeugOensCBURFrjgIJcbiAgICAgICAgLy8gdmFy5YWB6K645aOw5piO5YmN5L2/55So77yI5Y+Y6YeP5o+Q5Y2H77yJXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5hbWUpOyAvLyBCbG9jay1zY29wZWQgdmFyaWFibGUgJ25hbWUnIHVzZWQgYmVmb3JlIGl0cyBkZWNsYXJhdGlvblxuICAgICAgICBjb25zb2xlLmxvZyhcImFnZSBcIiArIGFnZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGFnZSk7IC8vIGFnZSB1bmRlZmluZWQg57G75Z6L5piv77yadW5kZWZpbmVkXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaWQgXCIgKyBpZCArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGlkKTtcbiAgICAgICAgLy8g6Ieq5Yqo5o6o5pat57G75Z6LKOexu+Wei+aOqOWvvClcbiAgICAgICAgbGV0IG5hbWUgPSAnRmlyc3QgcGFnZSBzdHJpbmcnO1xuICAgICAgICAvLyBsZXQg5Y+Y6YeP5LiN6IO96YeN5aSN5aOw5piO77yMdmFy5Y+Y6YeP5Y+v5Lul6YeN5aSN5aOw5piO77yM5Y+q5b6X5Yiw5pyA5ZCO5LiA5qyh5aOw5piO55qE5Y+Y6YePXG4gICAgICAgIHZhciBhZ2UgPSAxODtcbiAgICAgICAgdmFyIGFnZSA9IDE4Ljg7IC8vIOimhuebluS4iuasoeeahOWjsOaYjlxuICAgICAgICBjb25zdCBpZCA9ICcxMjU4MCc7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibmFtZTogXCIgKyBuYW1lICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgbmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWdlIFwiICsgYWdlICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgYWdlKTsgLy8gYWdlIDE4Ljgg57G75Z6L5piv77yabnVtYmVyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaWQgXCIgKyBpZCArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGlkKTtcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgZmlyc3ROYW1lID0gJ1dhbmcnO1xuICAgICAgICAgICAgbGV0IGxhc3ROYW1lID0gJ01pbmcnO1xuICAgICAgICAgICAgdmFyIGdyYWRlID0gNjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlyc3ROYW1lIFwiICsgZmlyc3ROYW1lICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgZmlyc3ROYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFzdE5hbWUgXCIgKyBsYXN0TmFtZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGxhc3ROYW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ3JhZGUgXCIgKyBncmFkZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGdyYWRlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaXJzdE5hbWUgPSAnTGknO1xuICAgICAgICBjb25zb2xlLmxvZyhcImZpcnN0TmFtZSBcIiArIGZpcnN0TmFtZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGZpcnN0TmFtZSk7XG4gICAgICAgIC8vIGxldCDkvZznlKjln5/kuLrku6PnoIHlnZfvvIx2YXIg5L2c55So5Z+f5Li65Ye95pWw5oiW5YWo5bGAXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwibGFzdE5hbWUgXCIgKyBsYXN0TmFtZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGxhc3ROYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJncmFkZSBcIiArIGdyYWRlICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgZ3JhZGUpO1xuXG4gICAgICAgIEREWVRlc3QubG9nKCfpmo/mnLrmlbDkuLo6JyArIEREWVRlc3QucmFuZG9tTnVtYmVyKDIsIDgpKTtcbiAgICAgICAgRERZVGVzdC5sb2coJ+maj+acuuaVtOaVsDonICsgRERZVGVzdC5yYW5kb21JbnQoMiwgOCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjb25zb2xlLmxvZyhhKSDmiZPljbBh55qE5YC8XG4gICAgICog5Y+Y6YeP6Ze05Y+v55SoICwg5oiWICsgIOi/nuaOpVxuICAgICAqIHR5cGVvZiBhIOiOt+WPlmHnmoTnsbvlnotcbiAgICAgKi9cbiAgICBwdWJsaWMgdGVzdFByaW50KCkge1xuICAgICAgICAvLyDlrZjlnKjlj5jph4/mj5DljYdcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gMjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInByaW50MzpcIiArIGkpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwcmludDQ6XCIgKyBpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDI7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwcmludDU6XCIgKyBpKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJpbnQ2OlwiICsgaSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJpbnQxOlwiICsgaSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInByaW50MjpcIiArIGkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOmhuuW6j+aYryBwcmludDM6WzAgMSAyXSAgcHJpbnQ1OlswIDEgMl0gcHJpbnQxOlswIDEgMl0gcHJpbnQyOlswIDEgMl0gIHByaW50NDpbMyAzIDNdIHByaW50NjpbMCAxIDJdIFxuICAgICAgICAvLyBwcmludDQg5Li65L2V6L6T5Ye65LqG5aSn5LqOMueahOWAvDMs5LiU5YC86YO955u45ZCM77yfIFxuICAgICAgICAvLyDlpKfkuo4z77yadHMvanPmmK/ljZXnur/nqIvvvIzlvILmraXnmoRzZXRUaW1lb3V0KCnkvJrnrYnlkIzmraXku6PnoIHmiafooYzlrozkuYvlkI7miY3lvIDlp4vorqHml7bvvIzmraTml7Zp5Li66Lez5Ye65b6q546v55qE5YC8OjNcbiAgICAgICAgLy8g6YO955u45ZCM77yacHJpbnQ2IGxldOS/rumlsOW8guatpXNldFRpbWVvdXQoKeaNleiOt+W9k+WJjeWIm+W7uueahOWPmOmHj++8jHByaW50NCB2YXLkv67ppbDvvIzkvZznlKjln5/kuLrlh73mlbDvvIzooqvmjZXojrfnmoTmmK/lkIzkuIDkuKrlj5jph4/jgIJcbiAgICAgICAgLy8gdmFy5Y+Y6YeP5o+Q5Y2HaG9pc3RpbmfvvIzlsIblj5jph4/lkozlh73mlbDlo7DmmI7np7vliqjliLDmiYDlnKjkvZznlKjln5/nmoTpobbpg6jvvIzliIbkuKTkuKrpmLbmrrVcbiAgICAgICAgLy8g5aOw5piO6Zi25q6177ya5Y+Y6YeP5ZCN6KKr5o+Q5Y2H5Yiw5L2c55So5Z+f6aG26YOo77yM5L2G5LiN5Lya6LWL5YC844CC5aaC5p6c5Ye95pWw5aOw5piO77yM5Ye95pWw5pW05Liq5a6a5LmJ5Lmf5Lya6KKr5o+Q5Y2HXG4gICAgICAgIC8vIOWIneWni+WMlumYtuaute+8muS7o+eggeaJp+ihjOWIsOWPmOmHj+WjsOaYjuS9jee9ruaXtu+8jOS8muiiq+WunumZhei1i+WAvO+8jOWmguaenOS7o+eggeS4reayoeacieaYvuekuueahOi1i+WAvOaTjeS9nO+8jOmCo+S5iOWPmOmHj+iiq+WIneWni+WMluS4uiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0ZXN0TnVtYmVyXG4gICAgICogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIg57K+5bqm6IyD5Zu05YaF6IO96KGo56S655qE5pW05pWw5pyA5aSn5YC8IDJeNTMgLSAxID0gOTAwNzE5OTI1NDc0MDk5Me+8jOi2hei/h+ivpeWAvOWPkeeUn+eyvuW6pumXrumimFxuICAgICAqIE51bWJlci5NSU5fU0FGRV9JTlRFR0VSIOeyvuW6puiMg+WbtOWGheiDveihqOekuueahOaVtOaVsOacgOWkp+WAvCAtMl41MyArIDEgPSAtOTAwNzE5OTI1NDc0MDk5MVxuICAgICAqIE51bWJlci5NQVhfVkFMVUUg57K+5bqm6IyD5Zu05YaF5pyA5aSn5YC8IDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4XG4gICAgICogTnVtYmVyLk1JTl9WQUxVRSDnsr7luqbojIPlm7TlhoXmnIDlsI/lgLwgNWUtMzI0XG4gICAgICogSW5maW5pdHkg5peg56m35aSnICgtSW5maW5pdHkg6LSf5peg56m35aSnKVxuICAgICAqIOaDs+ihqOekuuabtOWkp+aVsO+8jOWPr+S7peeUqCBiaWdpbnTnrYkg5aaCIGRlY2ltYWwuanMgYmlnbnVtYmVyLmpzIGJpZy5qc1xuICAgICAqIOeyvuW6pumXrumimO+8mua1rueCueaVsOaXtu+8jOafkOS6m+WNgei/m+WItuWwj+aVsOWPr+iDveaXoOazleeUqOeyvuehrueahOS6jOi/m+WItuihqOekuu+8jOWmgiAwLjEgKyAwLjIg5Y+v6IO95Lqn55Sf5LiA5LiqIDAuMzAwMDAwMDAwMDAwMDAwMDRcbiAgICAgKi9cbiAgICBwdWJsaWMgdGVzdE51bWJlcigpIHtcbiAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSAwLjEgKyAwLjI7IC8vIOS4jeS8mueyvuehruetieS6jiAwLjNcbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpOyAvLyDovpPlh7rlj6/og73mmK8gMC4zMDAwMDAwMDAwMDAwMDAwNFxuXG4gICAgICAgIGxldCBzYWZlSW50MTogbnVtYmVyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgKyAxOyAvLyDotoXlh7rlronlhajmlbTmlbDojIPlm7RcbiAgICAgICAgbGV0IHNhZmVJbnQyOiBudW1iZXIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiArIDI7IC8vIOi2heWHuuWuieWFqOaVtOaVsOiMg+WbtFxuICAgICAgICBjb25zb2xlLmxvZyhzYWZlSW50MSA9PT0gc2FmZUludDIpOyAvLyDovpPlh7rlj6/og73mmK8gdHJ1Ze+8jOWboOS4uueyvuW6puS4ouWksVxuXG4gICAgICAgIGxldCBudW0xOiBudW1iZXIgPSAxMDAwMCAvLyDljYHov5vliLZcbiAgICAgICAgbGV0IG51bTI6IG51bWJlciA9IDBiMTAwIC8vIOS6jOi/m+WItlxuICAgICAgICBsZXQgbnVtMzogbnVtYmVyID0gMG8xMDAgLy8g5YWr6L+b5Yi2XG4gICAgICAgIGxldCBudW00OiBudW1iZXIgPSAweDEwMCAvLyDljYHlha3ov5vliLZcbiAgICAgICAgY29uc29sZS5sb2cobnVtMSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIG51bTEpO1xuICAgICAgICBjb25zb2xlLmxvZyhudW0yICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgbnVtMik7XG4gICAgICAgIGNvbnNvbGUubG9nKG51bTMgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBudW0zKTtcbiAgICAgICAgY29uc29sZS5sb2cobnVtNCArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIG51bTQpO1xuICAgICAgICBjb25zb2xlLmxvZygnbnVtNCB0byBzdHJpbmc6JywgbnVtNC50b1N0cmluZygpKTtcblxuICAgICAgICAvLyBDb2NvczN45Y+v5Lul55SoIG5wbSBpbnN0YWxsIGJpZy5qcyAtLXNhdmUg5pa55byPIFxuICAgICAgICAvLyBDb2NvczJ45Y+q6IO95bCG5rqQ56CB5pS+6L+bYXNzZXRzIOWkp+aVsOihqOekuuW6k+WvueavlCBodHRwczovL2Jsb2cuY3Nkbi5uZXQvZmVpeWluZzBjYW5nbGFuZy9hcnRpY2xlL2RldGFpbHMvMTI1MTk0NDMzXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWtlTWNsL2JpZ251bWJlci5qc1xuICAgICAgICBsZXQgYmlnTnVtMSA9IG5ldyBCaWdOdW1iZXIoJzk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OScpO1xuICAgICAgICBjb25zb2xlLmxvZyhiaWdOdW0xLnRvU3RyaW5nKCkpOyAvLyA5Ljk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5ZSsyNlxuICAgICAgICBjb25zb2xlLmxvZyhiaWdOdW0xLnRvRml4ZWQoKSk7IC8vIDk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OVxuXG4gICAgICAgIGxldCBiaWdOdW0yID0gbmV3IEJpZ051bWJlcihiaWdOdW0xLnRvU3RyaW5nKCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhiaWdOdW0yLnRvRml4ZWQoKSk7IC8vIDk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OVxuICAgIH1cblxuICAgIHB1YmxpYyB0ZXN0U3RyaW5nKCkge1xuICAgICAgICBsZXQgc3RyMSA9ICdUb2RheSBpcyBTdW5kYXkhIFN1bmRheSc7XG4gICAgICAgIGNvbnNvbGUubG9nKHN0cjEgKyAn6ZW/5bqmOicgKyBzdHIxLmxlbmd0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHN0cjEgKyAnU3VuOicgKyBzdHIxLmluZGV4T2YoJ1N1bicpICsgXCIg5LiN5a2Y5Zyo55qETW9uOlwiICsgc3RyMS5pbmRleE9mKCdNb24nKSk7IC8vIOmmluasoeWHuueOsOS9jee9ru+8jOe0ouW8leS7jjDlvIDlp4vvvIzmnKrmib7liLAtMVxuICAgICAgICBjb25zb2xlLmxvZyhzdHIxICsgJ1N1bjonICsgc3RyMS5sYXN0SW5kZXhPZignU3VuJykgKyBcIiDkuI3lrZjlnKjnmoRNb246XCIgKyBzdHIxLmxhc3RJbmRleE9mKCdNb24nKSk7IC8vIOWwvuasoeWHuueOsOS9jee9ru+8jOe0ouW8leS7jjDlvIDlp4vvvIzmnKrmib7liLAtMVxuICAgICAgICBjb25zb2xlLmxvZyhzdHIxICsgJ+S7juaMh+Wumui1t+Wni+S9jee9ruaJvlN1bjonICsgc3RyMS5pbmRleE9mKCdTdW4nLCAxMikpOyAvLyDmo4DntKLotbflp4vkvY3nva7mn6Xmib7pppbmrKHlh7rnjrDkvY3nva5cbiAgICAgICAgY29uc29sZS5sb2coc3RyMSArICfmmK/lkKbljIXlkKtTdW46JyArIHN0cjEuaW5jbHVkZXMoJ1N1bicpICsgJyDmmK/lkKbljIXlkKtNb246JyArIHN0cjEuaW5jbHVkZXMoJ01vbicpKTsgLy8g5piv5ZCm5YyF5ZCr5oyH5a6a5a2X56ym5LiyXG4gICAgICAgIGNvbnNvbGUubG9nKHN0cjEuc2xpY2UoMTcpKTtcbiAgICAgICAgY29uc29sZS5sb2coc3RyMS5zbGljZSgxLCAzKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHN0cjEuc2xpY2UoLTEsIDMpKTsgLy8g5aaC5p6c5p+Q5Liq5Y+C5pWw5Li66LSf77yM5YiZ5LuO5a2X56ym5Liy55qE57uT5bC+5byA5aeL6K6h5pWwXG4gICAgICAgIGNvbnNvbGUubG9nKHN0cjEuc2xpY2UoMSwgLTMpKTtcbiAgICB9XG59XG5cblxuLy8gaHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzQ5NDkxL2FydGljbGUvZGV0YWlscy8xMjc0MzkxNzUiXX0=