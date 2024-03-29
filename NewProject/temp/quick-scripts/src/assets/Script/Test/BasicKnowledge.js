"use strict";
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