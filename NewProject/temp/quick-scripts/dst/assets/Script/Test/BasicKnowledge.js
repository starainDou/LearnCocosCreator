
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
        var argvNull = null;
        var argvUndefinded = undefined;
        var argvNever;
        var argvUnknown;
        argvUnknown = "true string";
        this.testDefaultArgv();
        this.testDefaultArgv(argvNull);
        this.testDefaultArgv(argvUndefinded);
        this.testDefaultArgv(argvNever);
        //this.testDefaultArgv(argvUnknown); 
        // string转number
        var stringNumber1 = new Number('123');
        var stringNumber2 = new Number("HeHe"); // NaN
        console.log(stringNumber1, stringNumber2);
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
    // 扩展元素，类型前添加 ...(扩展运算符) 表示他是一个扩展元素
    // 函数参数中 ... 表示剩余参数
    BasicKnowwledge.prototype.testThreeDots = function (first) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        console.log("first:", first);
        for (var index = 0; index < rest.length; index++) {
            console.log("rest index" + index + ":" + rest[index]);
        }
        // 数组或对象字面量中使用 ... 用来展开数组或对象中的元素，简化代码编写
        var array1 = [1, 2, 3];
        var array2 = [4, 5, 6];
        var array3 = [7, 8, 9];
        var array4 = array1.concat(array2, array3); // ES5合并
        var array5 = __spreadArrays(array1, array2, array3); // ES6合并
        console.log("array4:" + array4 + " array5:" + array5);
        console.log("array1 max:", Math.max.apply(null, array1)); // ES5 要调用apply展开数组
        console.log("array2 max:", Math.max.apply(Math, array2)); // ES6 ...运算符直接展开
        var baseInfo = { name: 'Tom', age: 18 };
        var allInfo = __assign({ gender: 'male', class: 6 }, baseInfo);
        console.log("allInfo:", allInfo);
        // 还可以字符串转字符数组
        // Typescript 类型指令 https://blog.csdn.net/weixin_53312997/article/details/127551316
        // @ts-ignore
        var chars1 = __spreadArrays("hello").reverse(); // 注:任何实现了Iterator接口的对象都可使用...转换为数组
        console.log(chars1); // ["h", "e", "l", "l", "o"]
        // Map
        var myMap = new Map([
            [0, 'a'], [1, 'b'], [2, 'c']
        ]);
        myMap.set(3, 'd'); // 设置值
        // 根据key取value
        console.log("key:2 对应的value:", myMap.get(2));
        if (myMap.has(1)) { // 是否包含某个key bool
            myMap.delete(1); // 根据key删除键值对
        }
        console.log('元素个数:', myMap.size); // size获取个数
        // @ts-ignore
        console.log("allKeys:" + __spreadArrays(Array.from(myMap.keys())));
        // @ts-ignore
        console.log("allValues:" + __spreadArrays(Array.from(myMap.values())));
        var map0 = new Map([
            ['name', 'James'],
            ['age', 30],
        ]);
        // foreEach遍历 value在前，key在后
        map0.forEach(function (value, key) {
            console.log(value, key); // 👉️ James name, 30 age
        });
        for (var _a = 0, _b = Array.from(map0.values()); _a < _b.length; _a++) {
            var value = _b[_a];
            console.log("转为数组遍历value 1:", value); // 该方式打印出了值
        }
        for (var value in Array.from(map0.values())) {
            console.log("转为数组遍历value 2:", value); // 该方式只打印出了序号 0,1
        }
        // @ts-ignore
        for (var _c = 0, map0_1 = map0; _c < map0_1.length; _c++) { // 使用@ts-ignore否则 can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.
            var _d = map0_1[_c], key = _d[0], value = _d[1];
            console.log(key, value); // 👉️ name James, age 30
        }
        // 日期构造
        console.log("ES5:", new (Date.bind.apply(Date, [null, 2024, 1, 31])));
        console.log("ES6:", new (Date.bind.apply(Date, __spreadArrays([void 0], [2024, 1, 31])))());
        // 数组解构
        var _e = [1, 2, 3, 4, 5], x1 = _e[0], xn = _e.slice(1);
        // @ts-ignore
        var _f = [], y1 = _f[0], yn = _f.slice(1);
        console.log("x1:" + x1);
        console.log("xn:" + xn);
        console.log("y1:" + y1); // undefined
        console.log("yn:" + yn); // 空
        // 生成器
        var makeNumber = function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, 1];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, 2];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, 3];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        };
        // @ts-ignore
        console.log(__spreadArrays(Array.from(makeNumber()))); // Array.from() // 转数组
        console.log(Array.from('RemoteDev'));
        console.log(Array.from(new Set([1, 2, 3, 4, 5, 6])));
        console.log(Array.from({ length: 10 }, function () { return 'Item'; })); //生成10个Item
        console.log(Array.of(1, 5, 7, 9)); //将一组值转换成数组
        // Typescript数组扩展使用 https://blog.csdn.net/fittec/article/details/125923425
        var args = [2, 3];
        // @ts-ignore
        this.testFunctionParamExtension.apply(this, __spreadArrays([1], args, [4], [5]));
        this.testFunctionParamExtension.apply(null, [1, 2, 3, 4, 5]);
    };
    BasicKnowwledge.innerPrint = function () {
        var infos = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            infos[_i] = arguments[_i];
        }
        var log = 'doudoudoudianyu666666';
        for (var index = 0; index < infos.length; index++) {
            log += (" " + infos[index]);
        }
        console.log(log);
    };
    BasicKnowwledge.prototype.testFunctionParamExtension = function (v, w, x, y, z) {
        console.log("v" + v + " w:" + w + " x:" + x + " y:" + y + " z:" + z);
    };
    BasicKnowwledge.prototype.testDefaultArgv = function (argv) {
        if (argv === void 0) { argv = "aaa"; }
        console.log("argv:" + argv + " " + typeof argv);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVGVzdC9CYXNpY0tub3dsZWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBcUM7QUFFckMsSUFBaUIsT0FBTyxDQVd2QjtBQVhELFdBQWlCLE9BQU87SUFDcEIsT0FBTztJQUNJLFdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDdkMsZ0JBQVEsR0FBWSxJQUFJLENBQUM7SUFDcEMsT0FBTztJQUNQLFNBQWdCLFlBQVksQ0FBQyxJQUFZLEVBQUUsRUFBYztRQUFkLG1CQUFBLEVBQUEsTUFBYztRQUNyRCxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDOUMsQ0FBQztJQUZlLG9CQUFZLGVBRTNCLENBQUE7SUFDRCxTQUFnQixTQUFTLENBQUMsSUFBWSxFQUFFLEVBQWM7UUFBZCxtQkFBQSxFQUFBLE1BQWM7UUFDbEQsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUZlLGlCQUFTLFlBRXhCLENBQUE7QUFDTCxDQUFDLEVBWGdCLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQVd2QjtBQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxzQkFBc0I7QUFFbkQsV0FBVztBQUNYLCtCQUErQjtBQUMvQixJQUFLLGNBS0o7QUFMRCxXQUFLLGNBQWM7SUFDZixxREFBUyxDQUFBO0lBQ1QscURBQVMsQ0FBQTtJQUNULG1EQUFJLENBQUE7SUFDSixtREFBSSxD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XCJiaWdudW1iZXIuanNcIjtcblxuZXhwb3J0IG5hbWVzcGFjZSBERFlUZXN0IHtcbiAgICAvLyDlhajlsYDlj5jph49cbiAgICBleHBvcnQgbGV0IGxvZyA9IENDX0VESVRPUiA/IGNjLmxvZyA6IGNvbnNvbGUubG9nO1xuICAgIGV4cG9ydCBsZXQgcm9vdE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIC8vIOWFqOWxgOWHveaVsFxuICAgIGV4cG9ydCBmdW5jdGlvbiByYW5kb21OdW1iZXIoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyID0gMCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodG8gLSBmcm9tKSAqIE1hdGgucmFuZG9tKCkgKyBmcm9tO1xuICAgIH1cbiAgICBleHBvcnQgZnVuY3Rpb24gcmFuZG9tSW50KGZyb206IG51bWJlciwgdG86IG51bWJlciA9IDApOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gfn4oKHRvIC0gZnJvbSkgKiBNYXRoLnJhbmRvbSgpICsgZnJvbSk7XG4gICAgfVxufVxud2luZG93WydERFlUZXN0J10gPSBERFlUZXN0OyAvLyDmjILovb3liLAgd2luZG93IOaIkOS4uuWFqOWxgOWRveWQjeepuumXtFxuXG4vLyDmnprkuL7miJDlkZjmmK/lj6ror7vnmoRcbi8vIOaVtOWei+aVsOWtl+aemuS4vu+8jOm7mOiupDDotbflp4vvvIzpgJDkuKrliqAx44CC5Y+v5oyH5a6a6LW35aeL5YC85oiW5oyH5a6a5YC8XG5lbnVtIExvY2FsRGlyZWN0aW9uIHtcbiAgICBOT1JUSCA9IDIsXG4gICAgU09VVEggPSA0LFxuICAgIFdFU1QsXG4gICAgRUFTVCxcbn07XG4vLyDlrZfnrKbkuLLmnprkuL5cbmVudW0gU2Vhc29uIHtcbiAgICBTUFJJTlQgPSAnU3ByaW5nJyxcbiAgICBTVU1NRVIgPSAnU3VtbWVyJyxcbiAgICBBVVRVTU4gPSAnQXV0dW1uJyxcbiAgICBXSU5URVIgPSAnV2ludGVyJyxcbn1cbi8vIOW8guaehOaemuS4vlvmlbTlnovlkozlrZfnrKbkuLLmt7flkIhdXG5lbnVtIElEQ2FyZFN1YmZpeCB7XG4gICAgT05FLCBUV08sIFRIUkVFLCBGT1VSLCBGSVZFLCBTSVgsIFNFVkVOLCBFSUdIVCwgTklORSwgWkVSTyxcbiAgICBYID0gJ1gnLFxufVxuLy8g5pWw5a2X5p6a5Li+55u45a+55a2X56ym5Liy5p6a5Li+5aSa5LqGIOKAnOWPjeWQkeaYoOWwhOKAne+8jOWPr+S7pemAmui/h+aemuS4vueahOWAvOiOt+WPluWIsOWvueW6lOeahOmUrmtleVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNpY0tub3d3bGVkZ2Uge1xuXG4gICAgc3RhdGljIHJlYWRvbmx5IHNoYXJlZEluc3RhbmNlOiBCYXNpY0tub3d3bGVkZ2UgPSBuZXcgQmFzaWNLbm93d2xlZGdlKCk7XG5cbiAgICAvKipcbiAgICAgKiDnroDljZXmlbDmja7nsbvlnotcbiAgICAgKiBsZXQg5aOw5piO5Z2X57qn5L2c55So5Z+f55qE5Y+Y6YePXG4gICAgICogdmFyIOWjsOaYjuWFqOWxgOS9nOeUqOWfn+aIluWHveaVsOS9nOeUqOWfn+eahOWPmOmHj++8jOWtmOWcqOWPmOmHj+aPkOWNh+eOsOixoVxuICAgICAqIGNvbnN0IOWjsOaYjuW4uOmHj++8jOWjsOaYjuaXtuW/hemhu+i1i+WAvO+8jOS4gOaXpui1i+WAvOWQjOS4gOS9nOeUqOWfn+S4jeiDveWcqOWGjemHjeaWsOi1i+WAvO+8jOS9huWumuS5ieeahOW8leeUqOexu+Wei++8jOWPr+S7peaUueWPmOWGhemDqOaVsOaNrlxuICAgICAqL1xuICAgIHB1YmxpYyB0ZXN0RGF0YVR5cGUoKSB7XG4gICAgICAgIC8vIOaMh+Wumuexu+Wei1xuICAgICAgICBjb25zdCBzdHI6IHN0cmluZyA9ICdIb21lIHBhZ2Ugc3RyaW5nJztcbiAgICAgICAgY29uc3QgbnVtOiBudW1iZXIgPSAxOyAvLyB0c+S4jeWFt+S9k+WMuuWIhiBpbnQgZmxvYXQgZG91YmxlXG4gICAgICAgIGNvbnN0IGlzUmVxdWVzdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBsZXQgcmVzdWx0OiB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCB2YXJpYWJsZTogbnVsbCA9IG51bGw7XG4gICAgICAgIGxldCBsaXN0MTogbnVtYmVyW10gPSBbMSwgMiwgM107XG4gICAgICAgIGxldCBsaXN0MiA9IFs0LCA1LCA2XTtcbiAgICAgICAgbGV0IGxpc3QzOiBBcnJheTxudW1iZXI+ID0gWzcsIDgsIDldO1xuICAgICAgICBsZXQgbWFwMTogTWFwPHN0cmluZywgbnVtYmVyPiA9IG5ldyBNYXAoKTtcbiAgICAgICAgbWFwMS5zZXQoJ2tleTEnLCAxKTtcbiAgICAgICAgbGV0IG1hcDIgPSBuZXcgTWFwKFtbXCJhXCIsIDFdLCBbXCJiXCIsIDJdXSk7XG4gICAgICAgIGxldCBtcDMgPVxuICAgICAgICAgICAgY29uc29sZS5sb2coc3RyICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2Ygc3RyKTtcbiAgICAgICAgY29uc29sZS5sb2cobnVtICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgbnVtKTtcbiAgICAgICAgY29uc29sZS5sb2coaXNSZXF1ZXN0aW5nICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgaXNSZXF1ZXN0aW5nKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0ICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgcmVzdWx0KTtcbiAgICAgICAgY29uc29sZS5sb2codmFyaWFibGUgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiB2YXJpYWJsZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGxpc3QxICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgbGlzdDEpOyAvLyAxLDIsMyDnsbvlnovmmK/vvJpvYmplY3RcbiAgICAgICAgY29uc29sZS5sb2cobGlzdDIgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBsaXN0Mik7XG4gICAgICAgIGNvbnNvbGUubG9nKGxpc3QzICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgbGlzdDMpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdlbnVtIExvY2FsRGlyZWN0aW9uJyArIExvY2FsRGlyZWN0aW9uLk5PUlRIICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgTG9jYWxEaXJlY3Rpb24uTk9SVEgpO1xuICAgICAgICBjb25zb2xlLmxvZygn5Y+N5bCE5p6a5Li+5YC8JywgTG9jYWxEaXJlY3Rpb25bMF0sIExvY2FsRGlyZWN0aW9uWzJdKTsgLy8gMCB1bmRlZmluZWQgIDIgTk9SVEhcbiAgICAgICAgY29uc29sZS5sb2coJ2VudW0gU2Vhc29uJywgU2Vhc29uLlNQUklOVCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlbnVtIElEQ2FyZFN1YmZpeCcsIElEQ2FyZFN1YmZpeFswXSwgSURDYXJkU3ViZml4Lk9ORSwgSURDYXJkU3ViZml4LlgpO1xuXG4gICAgICAgIGxldCBhcmd2TnVsbDogbnVsbCA9IG51bGw7XG4gICAgICAgIGxldCBhcmd2VW5kZWZpbmRlZDogdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgYXJndk5ldmVyOiBuZXZlcjtcbiAgICAgICAgbGV0IGFyZ3ZVbmtub3duOiB1bmtub3duO1xuICAgICAgICBhcmd2VW5rbm93biA9IFwidHJ1ZSBzdHJpbmdcIjtcbiAgICAgICAgdGhpcy50ZXN0RGVmYXVsdEFyZ3YoKTtcbiAgICAgICAgdGhpcy50ZXN0RGVmYXVsdEFyZ3YoYXJndk51bGwpO1xuICAgICAgICB0aGlzLnRlc3REZWZhdWx0QXJndihhcmd2VW5kZWZpbmRlZCk7XG4gICAgICAgIHRoaXMudGVzdERlZmF1bHRBcmd2KGFyZ3ZOZXZlcik7XG4gICAgICAgIC8vdGhpcy50ZXN0RGVmYXVsdEFyZ3YoYXJndlVua25vd24pOyBcblxuICAgICAgICAvLyBzdHJpbmfovaxudW1iZXJcbiAgICAgICAgbGV0IHN0cmluZ051bWJlcjEgPSBuZXcgTnVtYmVyKCcxMjMnKTtcbiAgICAgICAgbGV0IHN0cmluZ051bWJlcjIgPSBuZXcgTnVtYmVyKFwiSGVIZVwiKTsgLy8gTmFOXG4gICAgICAgIGNvbnNvbGUubG9nKHN0cmluZ051bWJlcjEsIHN0cmluZ051bWJlcjIpO1xuXG4gICAgICAgIGxldCBub3RTdXJlOiBhbnkgPSA2NjY7XG4gICAgICAgIGNvbnNvbGUubG9nKG5vdFN1cmUgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBub3RTdXJlKTsgLy8gNjY2IOexu+Wei+aYr++8mm51bWJlclxuICAgICAgICBub3RTdXJlID0gXCJTZW1saW5rZXJcIjtcbiAgICAgICAgY29uc29sZS5sb2cobm90U3VyZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIG5vdFN1cmUpOyAvLyBTZW1saW5rZXIg57G75Z6L5piv77yac3RyaW5nXG4gICAgICAgIG5vdFN1cmUgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2cobm90U3VyZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIG5vdFN1cmUpOyAvLyBmYWxzZSDnsbvlnovmmK/vvJpib29sZWFuXG5cbiAgICAgICAgLy8gdW5rbm93biDmiJDkuLogVFPnsbvlnovns7vnu5/nmoTlj6bkuIDnp43pobbnuqfnsbvlnovvvIzlhbbku5blgLzlj6/ku6XotYvlgLznu5l1bmtub3du5Y+Y6YeP77yM6Zmk5LqGYW555ZKMdW5rbm93bu+8jOWFtuS7luexu+Wei+S4jeaOpeWPl3Vua25vd27otYvlgLxcbiAgICAgICAgbGV0IHVua25vd25WYWx1ZTogdW5rbm93bjtcbiAgICAgICAgdW5rbm93blZhbHVlID0gdHJ1ZTsgLy8gT0tcbiAgICAgICAgY29uc29sZS5sb2codW5rbm93blZhbHVlKTtcbiAgICAgICAgdW5rbm93blZhbHVlID0gNDI7IC8vIE9LXG4gICAgICAgIGNvbnNvbGUubG9nKHVua25vd25WYWx1ZSk7XG4gICAgICAgIHVua25vd25WYWx1ZSA9IFwiSGVsbG8gV29ybGRcIjsgLy8gT0tcbiAgICAgICAgY29uc29sZS5sb2codW5rbm93blZhbHVlKTtcblxuICAgICAgICBsZXQgdW5rbm93blZhbHVlMjogdW5rbm93biA9IHVua25vd25WYWx1ZTsgLy8gT0tcbiAgICAgICAgbGV0IGFueVZhbHVlMjogYW55ID0gdW5rbm93blZhbHVlOyAvLyBPS1xuICAgICAgICBjb25zb2xlLmxvZyh1bmtub3duVmFsdWUyLCBhbnlWYWx1ZTIpO1xuICAgICAgICAvLyBsZXQgdmFsdWUzOiBib29sZWFuID0gdW5rbm93blZhbHVlOyAvLyBFcnJvclxuXG4gICAgICAgIC8vIFR1cGxl5YWD57uE77yM5Y+v5Lul5a2Y5LiN5ZCM57G75Z6L5YC8XG4gICAgICAgIGxldCB0dXBsZVR5cGU6IFtzdHJpbmcsIGJvb2xlYW5dID0gW1wiU2VtbGlua2VyXCIsIHRydWVdO1xuICAgICAgICBjb25zb2xlLmxvZyh0dXBsZVR5cGUgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiB0dXBsZVR5cGUgKyBcIiAwOlwiICsgdHVwbGVUeXBlWzBdKTsgLy8gU2VtbGlua2VyLHRydWUg57G75Z6L5piv77yab2JqZWN0IDA6U2VtbGlua2VyXG4gICAgICAgIC8vIOeUseS6juS4gOiIrOWFg+e7hOaYr+efpemBk+WFg+e0oOaVsOmHj+WSjOWvueW6lOexu+Wei++8jOaJgOS7peWPr+S7peWvueWFg+e7hOeahOS4i+agh+iuv+mXruaYr+WQpui2iueVjOWSjOWFt+S9k+WFg+e0oOeahOaTjeS9nOaYr+WQpuWQiOazleWBmuajgOafpeOAglxuICAgICAgICAvLyDkuIrpnaLor7TkuIDoiKzmg4XlhrXmmK/lm6DkuLrvvIzlhYPnu4Qg5pSv5oyB5Y+v6YCJ5YWD57Sg5ZKM5omp5bGV5YWD57Sg77yM6YCg5oiQ5YWD57uE5a6e6ZmF6ZW/5bqm5LiN5a6a44CC5Y+v6YCJ5YWD57Sg5Y+q5Ye6546w5Zyo6Zif5bC+XG4gICAgICAgIHR5cGUgTXlUdXBsZSA9IFtudW1iZXIsIHN0cmluZywgYm9vbGVhbj9dOyAvLyB0eXBl5a6a5LmJ5Yir5ZCNIOe7k+WwvuWPr+mAieWFg+e0oCDlhYPnu4RcbiAgICAgICAgY29uc3QgdHVwbGUxOiBNeVR1cGxlID0gWzEsICcyJ107XG4gICAgICAgIGNvbnN0IHR1cGxlMjogTXlUdXBsZSA9IFsxLCAnMicsIHRydWVdO1xuICAgICAgICBjb25zb2xlLmxvZyh0dXBsZTEgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiB0dXBsZTEpO1xuICAgICAgICBjb25zb2xlLmxvZyh0dXBsZTIgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiB0dXBsZTIpO1xuXG4gICAgICAgIC8vIFZvaWTnsbvlnosg5p+Q56eN56iL5bqm5LiK5p2l6K+077yMdm9pZCDnsbvlnovlg4/mmK/kuI4gYW55IOexu+Wei+ebuOWPje+8jOWug+ihqOekuuayoeacieS7u+S9leexu+Wei+OAglxuICAgICAgICAvLyDms6jmhI/vvJrlo7DmmI4gdm9pZCDnsbvlnovnmoTlj5jph4/msqHmnInku4DkuYjkvZznlKjvvIzlm6DkuLrlroPnmoTlgLzlj6rog73kuLogdW5kZWZpbmVkIOaIliBudWxsXG4gICAgICAgIGxldCB2b2lkVmFsdWU6IHZvaWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKHZvaWRWYWx1ZSArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIHZvaWRWYWx1ZSk7XG4gICAgICAgIHZvaWRWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc29sZS5sb2codm9pZFZhbHVlICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2Ygdm9pZFZhbHVlKTtcbiAgICAgICAgdm9pZFZhbHVlID0gbnVsbDtcbiAgICAgICAgY29uc29sZS5sb2codm9pZFZhbHVlICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2Ygdm9pZFZhbHVlKTtcbiAgICAgICAgLy8g6buY6K6k5oOF5Ya15LiLIG51bGwg5ZKMIHVuZGVmaW5lZCDmmK/miYDmnInnsbvlnovnmoTlrZDnsbvlnovjgIIg5bCx5piv6K+05L2g5Y+v5Lul5oqKIG51bGwg5ZKMIHVuZGVmaW5lZCDotYvlgLznu5kgbnVtYmVyIOexu+Wei+eahOWPmOmHj+OAglxuICAgICAgICAvLyDnhLbogIzvvIxcInN0cmljdE51bGxDaGVja3NcIjogdHJ1Ze+8jG51bGwg5ZKMIHVuZGVmaW5lZCDlj6rog73otYvlgLznu5kgdm9pZCDlkozlroPku6zlkIToh6rnmoTnsbvlnovjgIJcblxuICAgICAgICAvLyBsZXQvY29uc3Qg5LiN5YWB6K645YWI55So5ZCO5aOw5piO77yM6L+Z56eN546w6LGh56ew5Li677ya5pqC5pe25oCn5q275Yy677yM6Iux5paH5Li677yadGVtcG9yYWwgZGVhZCB6b25l77yM566A56ewIFREWuOAglxuICAgICAgICAvLyB2YXLlhYHorrjlo7DmmI7liY3kvb/nlKjvvIjlj5jph4/mj5DljYfvvIlcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmFtZSk7IC8vIEJsb2NrLXNjb3BlZCB2YXJpYWJsZSAnbmFtZScgdXNlZCBiZWZvcmUgaXRzIGRlY2xhcmF0aW9uXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWdlIFwiICsgYWdlICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgYWdlKTsgLy8gYWdlIHVuZGVmaW5lZCDnsbvlnovmmK/vvJp1bmRlZmluZWRcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJpZCBcIiArIGlkICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgaWQpO1xuICAgICAgICAvLyDoh6rliqjmjqjmlq3nsbvlnoso57G75Z6L5o6o5a+8KVxuICAgICAgICBsZXQgbmFtZSA9ICdGaXJzdCBwYWdlIHN0cmluZyc7XG4gICAgICAgIC8vIGxldCDlj5jph4/kuI3og73ph43lpI3lo7DmmI7vvIx2YXLlj5jph4/lj6/ku6Xph43lpI3lo7DmmI7vvIzlj6rlvpfliLDmnIDlkI7kuIDmrKHlo7DmmI7nmoTlj5jph49cbiAgICAgICAgdmFyIGFnZSA9IDE4O1xuICAgICAgICB2YXIgYWdlID0gMTguODsgLy8g6KaG55uW5LiK5qyh55qE5aOw5piOXG4gICAgICAgIGNvbnN0IGlkID0gJzEyNTgwJztcbiAgICAgICAgY29uc29sZS5sb2coXCJuYW1lOiBcIiArIG5hbWUgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBuYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJhZ2UgXCIgKyBhZ2UgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBhZ2UpOyAvLyBhZ2UgMTguOCDnsbvlnovmmK/vvJpudW1iZXJcbiAgICAgICAgY29uc29sZS5sb2coXCJpZCBcIiArIGlkICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgaWQpO1xuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdE5hbWUgPSAnV2FuZyc7XG4gICAgICAgICAgICBsZXQgbGFzdE5hbWUgPSAnTWluZyc7XG4gICAgICAgICAgICB2YXIgZ3JhZGUgPSA2O1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaXJzdE5hbWUgXCIgKyBmaXJzdE5hbWUgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBmaXJzdE5hbWUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJsYXN0TmFtZSBcIiArIGxhc3ROYW1lICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgbGFzdE5hbWUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJncmFkZSBcIiArIGdyYWRlICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgZ3JhZGUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9ICdMaSc7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmlyc3ROYW1lIFwiICsgZmlyc3ROYW1lICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgZmlyc3ROYW1lKTtcbiAgICAgICAgLy8gbGV0IOS9nOeUqOWfn+S4uuS7o+eggeWdl++8jHZhciDkvZznlKjln5/kuLrlh73mlbDmiJblhajlsYBcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJsYXN0TmFtZSBcIiArIGxhc3ROYW1lICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgbGFzdE5hbWUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImdyYWRlIFwiICsgZ3JhZGUgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBncmFkZSk7XG5cbiAgICAgICAgRERZVGVzdC5sb2coJ+maj+acuuaVsOS4ujonICsgRERZVGVzdC5yYW5kb21OdW1iZXIoMiwgOCkpO1xuICAgICAgICBERFlUZXN0LmxvZygn6ZqP5py65pW05pWwOicgKyBERFlUZXN0LnJhbmRvbUludCgyLCA4KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNvbnNvbGUubG9nKGEpIOaJk+WNsGHnmoTlgLxcbiAgICAgKiDlj5jph4/pl7Tlj6/nlKggLCDmiJYgKyAg6L+e5o6lXG4gICAgICogdHlwZW9mIGEg6I635Y+WYeeahOexu+Wei1xuICAgICAqL1xuICAgIHB1YmxpYyB0ZXN0UHJpbnQoKSB7XG4gICAgICAgIC8vIOWtmOWcqOWPmOmHj+aPkOWNh1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSAyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJpbnQzOlwiICsgaSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInByaW50NDpcIiArIGkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInByaW50NTpcIiArIGkpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwcmludDY6XCIgKyBpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IDI7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwcmludDE6XCIgKyBpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHJpbnQyOlwiICsgaSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6aG65bqP5pivIHByaW50MzpbMCAxIDJdICBwcmludDU6WzAgMSAyXSBwcmludDE6WzAgMSAyXSBwcmludDI6WzAgMSAyXSAgcHJpbnQ0OlszIDMgM10gcHJpbnQ2OlswIDEgMl0gXG4gICAgICAgIC8vIHByaW50NCDkuLrkvZXovpPlh7rkuoblpKfkuo4y55qE5YC8MyzkuJTlgLzpg73nm7jlkIzvvJ8gXG4gICAgICAgIC8vIOWkp+S6jjPvvJp0cy9qc+aYr+WNlee6v+eoi++8jOW8guatpeeahHNldFRpbWVvdXQoKeS8muetieWQjOatpeS7o+eggeaJp+ihjOWujOS5i+WQjuaJjeW8gOWni+iuoeaXtu+8jOatpOaXtmnkuLrot7Plh7rlvqrnjq/nmoTlgLw6M1xuICAgICAgICAvLyDpg73nm7jlkIzvvJpwcmludDYgbGV05L+u6aWw5byC5q2lc2V0VGltZW91dCgp5o2V6I635b2T5YmN5Yib5bu655qE5Y+Y6YeP77yMcHJpbnQ0IHZhcuS/rumlsO+8jOS9nOeUqOWfn+S4uuWHveaVsO+8jOiiq+aNleiOt+eahOaYr+WQjOS4gOS4quWPmOmHj+OAglxuICAgICAgICAvLyB2YXLlj5jph4/mj5DljYdob2lzdGluZ++8jOWwhuWPmOmHj+WSjOWHveaVsOWjsOaYjuenu+WKqOWIsOaJgOWcqOS9nOeUqOWfn+eahOmhtumDqO+8jOWIhuS4pOS4qumYtuautVxuICAgICAgICAvLyDlo7DmmI7pmLbmrrXvvJrlj5jph4/lkI3ooqvmj5DljYfliLDkvZznlKjln5/pobbpg6jvvIzkvYbkuI3kvJrotYvlgLzjgILlpoLmnpzlh73mlbDlo7DmmI7vvIzlh73mlbDmlbTkuKrlrprkuYnkuZ/kvJrooqvmj5DljYdcbiAgICAgICAgLy8g5Yid5aeL5YyW6Zi25q6177ya5Luj56CB5omn6KGM5Yiw5Y+Y6YeP5aOw5piO5L2N572u5pe277yM5Lya6KKr5a6e6ZmF6LWL5YC877yM5aaC5p6c5Luj56CB5Lit5rKh5pyJ5pi+56S655qE6LWL5YC85pON5L2c77yM6YKj5LmI5Y+Y6YeP6KKr5Yid5aeL5YyW5Li6IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRlc3ROdW1iZXJcbiAgICAgKiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiDnsr7luqbojIPlm7TlhoXog73ooajnpLrnmoTmlbTmlbDmnIDlpKflgLwgMl41MyAtIDEgPSA5MDA3MTk5MjU0NzQwOTkx77yM6LaF6L+H6K+l5YC85Y+R55Sf57K+5bqm6Zeu6aKYXG4gICAgICogTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIg57K+5bqm6IyD5Zu05YaF6IO96KGo56S655qE5pW05pWw5pyA5aSn5YC8IC0yXjUzICsgMSA9IC05MDA3MTk5MjU0NzQwOTkxXG4gICAgICogTnVtYmVyLk1BWF9WQUxVRSDnsr7luqbojIPlm7TlhoXmnIDlpKflgLwgMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAgICAgKiBOdW1iZXIuTUlOX1ZBTFVFIOeyvuW6puiMg+WbtOWGheacgOWwj+WAvCA1ZS0zMjRcbiAgICAgKiBJbmZpbml0eSDml6DnqbflpKcgKC1JbmZpbml0eSDotJ/ml6DnqbflpKcpXG4gICAgICog5oOz6KGo56S65pu05aSn5pWw77yM5Y+v5Lul55SoIGJpZ2ludOetiSDlpoIgZGVjaW1hbC5qcyBiaWdudW1iZXIuanMgYmlnLmpzXG4gICAgICog57K+5bqm6Zeu6aKY77ya5rWu54K55pWw5pe277yM5p+Q5Lqb5Y2B6L+b5Yi25bCP5pWw5Y+v6IO95peg5rOV55So57K+56Gu55qE5LqM6L+b5Yi26KGo56S677yM5aaCIDAuMSArIDAuMiDlj6/og73kuqfnlJ/kuIDkuKogMC4zMDAwMDAwMDAwMDAwMDAwNFxuICAgICAqL1xuICAgIHB1YmxpYyB0ZXN0TnVtYmVyKCkge1xuICAgICAgICBsZXQgdmFsdWU6IG51bWJlciA9IDAuMSArIDAuMjsgLy8g5LiN5Lya57K+56Gu562J5LqOIDAuM1xuICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7IC8vIOi+k+WHuuWPr+iDveaYryAwLjMwMDAwMDAwMDAwMDAwMDA0XG5cbiAgICAgICAgbGV0IHNhZmVJbnQxOiBudW1iZXIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiArIDE7IC8vIOi2heWHuuWuieWFqOaVtOaVsOiMg+WbtFxuICAgICAgICBsZXQgc2FmZUludDI6IG51bWJlciA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSICsgMjsgLy8g6LaF5Ye65a6J5YWo5pW05pWw6IyD5Zu0XG4gICAgICAgIGNvbnNvbGUubG9nKHNhZmVJbnQxID09PSBzYWZlSW50Mik7IC8vIOi+k+WHuuWPr+iDveaYryB0cnVl77yM5Zug5Li657K+5bqm5Lii5aSxXG5cbiAgICAgICAgbGV0IG51bTE6IG51bWJlciA9IDEwMDAwIC8vIOWNgei/m+WItlxuICAgICAgICBsZXQgbnVtMjogbnVtYmVyID0gMGIxMDAgLy8g5LqM6L+b5Yi2XG4gICAgICAgIGxldCBudW0zOiBudW1iZXIgPSAwbzEwMCAvLyDlhavov5vliLZcbiAgICAgICAgbGV0IG51bTQ6IG51bWJlciA9IDB4MTAwIC8vIOWNgeWFrei/m+WItlxuICAgICAgICBjb25zb2xlLmxvZyhudW0xICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgbnVtMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKG51bTIgKyBcIiDnsbvlnovmmK/vvJpcIiArIHR5cGVvZiBudW0yKTtcbiAgICAgICAgY29uc29sZS5sb2cobnVtMyArIFwiIOexu+Wei+aYr++8mlwiICsgdHlwZW9mIG51bTMpO1xuICAgICAgICBjb25zb2xlLmxvZyhudW00ICsgXCIg57G75Z6L5piv77yaXCIgKyB0eXBlb2YgbnVtNCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdudW00IHRvIHN0cmluZzonLCBudW00LnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIC8vIENvY29zM3jlj6/ku6XnlKggbnBtIGluc3RhbGwgYmlnLmpzIC0tc2F2ZSDmlrnlvI8gXG4gICAgICAgIC8vIENvY29zMnjlj6rog73lsIbmupDnoIHmlL7ov5thc3NldHMg5aSn5pWw6KGo56S65bqT5a+55q+UIGh0dHBzOi8vYmxvZy5jc2RuLm5ldC9mZWl5aW5nMGNhbmdsYW5nL2FydGljbGUvZGV0YWlscy8xMjUxOTQ0MzNcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pa2VNY2wvYmlnbnVtYmVyLmpzXG4gICAgICAgIGxldCBiaWdOdW0xID0gbmV3IEJpZ051bWJlcignOTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGJpZ051bTEudG9TdHJpbmcoKSk7IC8vIDkuOTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTllKzI2XG4gICAgICAgIGNvbnNvbGUubG9nKGJpZ051bTEudG9GaXhlZCgpKTsgLy8gOTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5XG5cbiAgICAgICAgbGV0IGJpZ051bTIgPSBuZXcgQmlnTnVtYmVyKGJpZ051bTEudG9TdHJpbmcoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGJpZ051bTIudG9GaXhlZCgpKTsgLy8gOTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5XG4gICAgfVxuXG4gICAgcHVibGljIHRlc3RTdHJpbmcoKSB7XG4gICAgICAgIGxldCBzdHIxID0gJ1RvZGF5IGlzIFN1bmRheSEgU3VuZGF5JztcbiAgICAgICAgY29uc29sZS5sb2coc3RyMSArICfplb/luqY6JyArIHN0cjEubGVuZ3RoKTtcbiAgICAgICAgY29uc29sZS5sb2coc3RyMSArICdTdW46JyArIHN0cjEuaW5kZXhPZignU3VuJykgKyBcIiDkuI3lrZjlnKjnmoRNb246XCIgKyBzdHIxLmluZGV4T2YoJ01vbicpKTsgLy8g6aaW5qyh5Ye6546w5L2N572u77yM57Si5byV5LuOMOW8gOWni++8jOacquaJvuWIsC0xXG4gICAgICAgIGNvbnNvbGUubG9nKHN0cjEgKyAnU3VuOicgKyBzdHIxLmxhc3RJbmRleE9mKCdTdW4nKSArIFwiIOS4jeWtmOWcqOeahE1vbjpcIiArIHN0cjEubGFzdEluZGV4T2YoJ01vbicpKTsgLy8g5bC+5qyh5Ye6546w5L2N572u77yM57Si5byV5LuOMOW8gOWni++8jOacquaJvuWIsC0xXG4gICAgICAgIGNvbnNvbGUubG9nKHN0cjEgKyAn5LuO5oyH5a6a6LW35aeL5L2N572u5om+U3VuOicgKyBzdHIxLmluZGV4T2YoJ1N1bicsIDEyKSk7IC8vIOajgOe0oui1t+Wni+S9jee9ruafpeaJvummluasoeWHuueOsOS9jee9rlxuICAgICAgICBjb25zb2xlLmxvZyhzdHIxICsgJ+aYr+WQpuWMheWQq1N1bjonICsgc3RyMS5pbmNsdWRlcygnU3VuJykgKyAnIOaYr+WQpuWMheWQq01vbjonICsgc3RyMS5pbmNsdWRlcygnTW9uJykpOyAvLyDmmK/lkKbljIXlkKvmjIflrprlrZfnrKbkuLJcbiAgICAgICAgY29uc29sZS5sb2coc3RyMS5zbGljZSgxNykpO1xuICAgICAgICBjb25zb2xlLmxvZyhzdHIxLnNsaWNlKDEsIDMpKTtcbiAgICAgICAgY29uc29sZS5sb2coc3RyMS5zbGljZSgtMSwgMykpOyAvLyDlpoLmnpzmn5DkuKrlj4LmlbDkuLrotJ/vvIzliJnku47lrZfnrKbkuLLnmoTnu5PlsL7lvIDlp4vorqHmlbBcbiAgICAgICAgY29uc29sZS5sb2coc3RyMS5zbGljZSgxLCAtMykpO1xuICAgIH1cbiAgICAvLyDmianlsZXlhYPntKDvvIznsbvlnovliY3mt7vliqAgLi4uKOaJqeWxlei/kOeul+espikg6KGo56S65LuW5piv5LiA5Liq5omp5bGV5YWD57SgXG4gICAgLy8g5Ye95pWw5Y+C5pWw5LitIC4uLiDooajnpLrliankvZnlj4LmlbBcbiAgICBwdWJsaWMgdGVzdFRocmVlRG90cyhmaXJzdDogc3RyaW5nLCAuLi5yZXN0OiBzdHJpbmdbXSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImZpcnN0OlwiLCBmaXJzdCk7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCByZXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXN0IGluZGV4XCIgKyBpbmRleCArIFwiOlwiICsgcmVzdFtpbmRleF0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIOWFg+e7hOS4rS4uLlR5cGVbXSDmlbDnu4TooajnpLrliankvZnpg6jliIZcbiAgICAgICAgdHlwZSBTdHJpbmdOdW1iZXJCb29sZWFucyA9IFtzdHJpbmcsIG51bWJlciwgLi4uYm9vbGVhbltdXTsgLy/liY3kuKTkuKrlhYPntKDkuLpzdHJpbmcsbnVtYmVyLOWJqeS4i+WFg+e0oOmDveS4umJvb2xlYW5cbiAgICAgICAgdHlwZSBTdHJpbmdOdW1iZXJzQm9vbGVhbiA9IFtzdHJpbmcsIC4uLm51bWJlcltdLCBib29sZWFuXTsgLy/pppblsL7kuKTkuKrlhYPntKDkuLpzdHJpbmcsYm9vbGVhbizkuK3pl7TlhYPntKDpg73kuLpudW1iZXJcbiAgICAgICAgdHlwZSBTdHJpbmdzTnVtYmVyQm9vbGVhbiA9IFsuLi5zdHJpbmdbXSwgbnVtYmVyLCBib29sZWFuXTsgLy8g5pyA5ZCO5Lik5Liq5YWD57Sg5Li6bnVtYmVyLGJvb2xlYW7vvIzliY3pnaLlhYPntKDkuLpzdHJpbmdcblxuICAgICAgICAvLyDmlbDnu4TmiJblr7nosaHlrZfpnaLph4/kuK3kvb/nlKggLi4uIOeUqOadpeWxleW8gOaVsOe7hOaIluWvueixoeS4reeahOWFg+e0oO+8jOeugOWMluS7o+eggee8luWGmVxuICAgICAgICBjb25zdCBhcnJheTEgPSBbMSwgMiwgM107XG4gICAgICAgIGNvbnN0IGFycmF5MiA9IFs0LCA1LCA2XTtcbiAgICAgICAgY29uc3QgYXJyYXkzID0gWzcsIDgsIDldO1xuICAgICAgICBjb25zdCBhcnJheTQgPSBhcnJheTEuY29uY2F0KGFycmF5MiwgYXJyYXkzKTsgLy8gRVM15ZCI5bm2XG4gICAgICAgIGNvbnN0IGFycmF5NSA9IFsuLi5hcnJheTEsIC4uLmFycmF5MiwgLi4uYXJyYXkzXTsgLy8gRVM25ZCI5bm2XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXJyYXk0OlwiICsgYXJyYXk0ICsgXCIgYXJyYXk1OlwiICsgYXJyYXk1KTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcImFycmF5MSBtYXg6XCIsIE1hdGgubWF4LmFwcGx5KG51bGwsIGFycmF5MSkpOyAvLyBFUzUg6KaB6LCD55SoYXBwbHnlsZXlvIDmlbDnu4RcbiAgICAgICAgY29uc29sZS5sb2coXCJhcnJheTIgbWF4OlwiLCBNYXRoLm1heCguLi5hcnJheTIpKTsgLy8gRVM2IC4uLui/kOeul+espuebtOaOpeWxleW8gFxuXG4gICAgICAgIGNvbnN0IGJhc2VJbmZvID0geyBuYW1lOiAnVG9tJywgYWdlOiAxOCB9O1xuICAgICAgICBjb25zdCBhbGxJbmZvID0geyBnZW5kZXI6ICdtYWxlJywgY2xhc3M6IDYsIC4uLmJhc2VJbmZvIH07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsSW5mbzpcIiwgYWxsSW5mbyk7XG4gICAgICAgIC8vIOi/mOWPr+S7peWtl+espuS4sui9rOWtl+espuaVsOe7hFxuICAgICAgICAvLyBUeXBlc2NyaXB0IOexu+Wei+aMh+S7pCBodHRwczovL2Jsb2cuY3Nkbi5uZXQvd2VpeGluXzUzMzEyOTk3L2FydGljbGUvZGV0YWlscy8xMjc1NTEzMTZcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB2YXIgY2hhcnMxID0gWy4uLlwiaGVsbG9cIl0ucmV2ZXJzZSgpOyAvLyDms6g65Lu75L2V5a6e546w5LqGSXRlcmF0b3LmjqXlj6PnmoTlr7nosaHpg73lj6/kvb/nlKguLi7ovazmjaLkuLrmlbDnu4RcbiAgICAgICAgY29uc29sZS5sb2coY2hhcnMxKSAvLyBbXCJoXCIsIFwiZVwiLCBcImxcIiwgXCJsXCIsIFwib1wiXVxuXG4gICAgICAgIC8vIE1hcFxuICAgICAgICBsZXQgbXlNYXAgPSBuZXcgTWFwKFtcbiAgICAgICAgICAgIFswLCAnYSddLCBbMSwgJ2InXSwgWzIsICdjJ11cbiAgICAgICAgXSk7XG4gICAgICAgIG15TWFwLnNldCgzLCAnZCcpOy8vIOiuvue9ruWAvFxuICAgICAgICAvLyDmoLnmja5rZXnlj5Z2YWx1ZVxuICAgICAgICBjb25zb2xlLmxvZyhcImtleToyIOWvueW6lOeahHZhbHVlOlwiLCBteU1hcC5nZXQoMikpO1xuICAgICAgICBpZiAobXlNYXAuaGFzKDEpKSB7IC8vIOaYr+WQpuWMheWQq+afkOS4qmtleSBib29sXG4gICAgICAgICAgICBteU1hcC5kZWxldGUoMSk7IC8vIOagueaNrmtleeWIoOmZpOmUruWAvOWvuVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCflhYPntKDkuKrmlbA6JywgbXlNYXAuc2l6ZSk7IC8vIHNpemXojrflj5bkuKrmlbBcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zb2xlLmxvZyhcImFsbEtleXM6XCIgKyBbLi4uQXJyYXkuZnJvbShteU1hcC5rZXlzKCkpXSk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGxWYWx1ZXM6XCIgKyBbLi4uQXJyYXkuZnJvbShteU1hcC52YWx1ZXMoKSldKVxuXG4gICAgICAgIGNvbnN0IG1hcDAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nIHwgbnVtYmVyPihbXG4gICAgICAgICAgICBbJ25hbWUnLCAnSmFtZXMnXSxcbiAgICAgICAgICAgIFsnYWdlJywgMzBdLFxuICAgICAgICBdKTtcblxuICAgICAgICAvLyBmb3JlRWFjaOmBjeWOhiB2YWx1ZeWcqOWJje+8jGtleeWcqOWQjlxuICAgICAgICBtYXAwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbHVlLCBrZXkpOyAvLyDwn5GJ77iPIEphbWVzIG5hbWUsIDMwIGFnZVxuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2YgQXJyYXkuZnJvbShtYXAwLnZhbHVlcygpKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLovazkuLrmlbDnu4TpgY3ljoZ2YWx1ZSAxOlwiLCB2YWx1ZSk7IC8vIOivpeaWueW8j+aJk+WNsOWHuuS6huWAvFxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHZhbHVlIGluIEFycmF5LmZyb20obWFwMC52YWx1ZXMoKSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6L2s5Li65pWw57uE6YGN5Y6GdmFsdWUgMjpcIiwgdmFsdWUpOyAvLyDor6XmlrnlvI/lj6rmiZPljbDlh7rkuobluo/lj7cgMCwxXG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBtYXAwKSB7IC8vIOS9v+eUqEB0cy1pZ25vcmXlkKbliJkgY2FuIG9ubHkgYmUgaXRlcmF0ZWQgdGhyb3VnaCB3aGVuIHVzaW5nIHRoZSAnLS1kb3dubGV2ZWxJdGVyYXRpb24nIGZsYWcgb3Igd2l0aCBhICctLXRhcmdldCcgb2YgJ2VzMjAxNScgb3IgaGlnaGVyLlxuICAgICAgICAgICAgY29uc29sZS5sb2coa2V5LCB2YWx1ZSk7IC8vIPCfkYnvuI8gbmFtZSBKYW1lcywgYWdlIDMwXG4gICAgICAgIH1cblxuICAgICAgICAvLyDml6XmnJ/mnoTpgKBcbiAgICAgICAgY29uc29sZS5sb2coXCJFUzU6XCIsIG5ldyAoRGF0ZS5iaW5kLmFwcGx5KERhdGUsIFtudWxsLCAyMDI0LCAxLCAzMV0pKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVM2OlwiLCBuZXcgRGF0ZSguLi5bMjAyNCwgMSwgMzFdKSk7XG4gICAgICAgIC8vIOaVsOe7hOino+aehFxuICAgICAgICBjb25zdCBbeDEsIC4uLnhuXSA9IFsxLCAyLCAzLCA0LCA1XTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBbeTEsIC4uLnluXSA9IFtdO1xuICAgICAgICBjb25zb2xlLmxvZyhcIngxOlwiICsgeDEpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInhuOlwiICsgeG4pO1xuICAgICAgICBjb25zb2xlLmxvZyhcInkxOlwiICsgeTEpOyAvLyB1bmRlZmluZWRcbiAgICAgICAgY29uc29sZS5sb2coXCJ5bjpcIiArIHluKTsgLy8g56m6XG5cbiAgICAgICAgLy8g55Sf5oiQ5ZmoXG4gICAgICAgIGxldCBtYWtlTnVtYmVyID0gZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHlpZWxkIDE7XG4gICAgICAgICAgICB5aWVsZCAyO1xuICAgICAgICAgICAgeWllbGQgMztcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnNvbGUubG9nKFsuLi5BcnJheS5mcm9tKG1ha2VOdW1iZXIoKSldKTsgLy8gQXJyYXkuZnJvbSgpIC8vIOi9rOaVsOe7hFxuICAgICAgICBjb25zb2xlLmxvZyhBcnJheS5mcm9tKCdSZW1vdGVEZXYnKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEFycmF5LmZyb20obmV3IFNldChbMSwgMiwgMywgNCwgNSwgNl0pKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sICgpID0+ICdJdGVtJykpOy8v55Sf5oiQMTDkuKpJdGVtXG4gICAgICAgIGNvbnNvbGUubG9nKEFycmF5Lm9mKDEsIDUsIDcsIDkpKTsvL+WwhuS4gOe7hOWAvOi9rOaNouaIkOaVsOe7hFxuICAgICAgICAvLyBUeXBlc2NyaXB05pWw57uE5omp5bGV5L2/55SoIGh0dHBzOi8vYmxvZy5jc2RuLm5ldC9maXR0ZWMvYXJ0aWNsZS9kZXRhaWxzLzEyNTkyMzQyNVxuXG4gICAgICAgIHZhciBhcmdzID0gWzIsIDNdO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMudGVzdEZ1bmN0aW9uUGFyYW1FeHRlbnNpb24oMSwgLi4uYXJncywgNCwgLi4uWzVdKTtcbiAgICAgICAgdGhpcy50ZXN0RnVuY3Rpb25QYXJhbUV4dGVuc2lvbi5hcHBseShudWxsLCBbMSwgMiwgMywgNCwgNV0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGlubmVyUHJpbnQoLi4uaW5mb3M6IChzdHJpbmcgfCBudW1iZXIpW10pIHtcbiAgICAgICAgbGV0IGxvZyA9ICdkb3Vkb3Vkb3VkaWFueXU2NjY2NjYnO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgaW5mb3MubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsb2cgKz0gKFwiIFwiICsgaW5mb3NbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhsb2cpO1xuICAgIH1cbiAgICBwcml2YXRlIHRlc3RGdW5jdGlvblBhcmFtRXh0ZW5zaW9uKHYsIHcsIHgsIHksIHopIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ2XCIgKyB2ICsgXCIgdzpcIiArIHcgKyBcIiB4OlwiICsgeCArIFwiIHk6XCIgKyB5ICsgXCIgejpcIiArIHopO1xuICAgIH1cblxuICAgIHByaXZhdGUgdGVzdERlZmF1bHRBcmd2KGFyZ3YgPSBcImFhYVwiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXJndjpcIiArIGFyZ3YgKyBcIiBcIiArIHR5cGVvZiBhcmd2KTtcbiAgICB9XG59XG5cblxuLy8gaHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ0NzQ5NDkxL2FydGljbGUvZGV0YWlscy8xMjc0MzkxNzUiXX0=