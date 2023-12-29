"use strict";
cc._RF.push(module, 'b86f8UiGKFIk6qpGBY0/B15', 'TestMath');
// Script/Test/TestMath.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMath = void 0;
var BasicKnowledge_1 = require("./BasicKnowledge");
var TestMath = /** @class */ (function () {
    function TestMath() {
    }
    TestMath.testStart = function () {
        // 数值操作
        console.log('-10取绝对值' + Math.abs(-10));
        console.log('大于等于 向上取整 4.1:' + Math.ceil(4.1) + ' -4.1:' + Math.ceil(-4.1));
        console.log('小于等于 向下取整 4.9:' + Math.ceil(4.9) + ' -4.9:' + Math.ceil(-4.9));
        console.log('四舍五入取整 4.5:' + Math.round(4.9) + ' 4.4:' + Math.round(-4.9) + '-4.5:' + Math.round(-4.5) + '-4.4' + Math.round(-4.4));
        console.log('双非取整 4.9:' + ~~(4.9) + ' 4.1:' + ~~(4.1) + ' -4.9:' + ~~(-4.9) + ' -4.1:' + ~~(-4.1));
        // 三角函数
        console.log('正弦值:' + Math.sin(30 * Math.PI / 180));
        console.log('余弦值:' + Math.cos(30 * Math.PI / 180));
        console.log('正切值:' + Math.tan(30 * Math.PI / 180));
        console.log('反正弦值:' + Math.asin(30 * Math.PI / 180));
        console.log('反余弦值:' + Math.acos(30 * Math.PI / 180));
        console.log('反正切值:' + Math.atan(30 * Math.PI / 180));
        // 指数运算
        console.log('e的3次幂:' + Math.exp(3));
        console.log('4的3次幂:' + Math.pow(4, 3));
        console.log('真数16的自然对数:' + Math.log(16));
        console.log('真数8以底为2的log对数:' + Math.log2(8));
        console.log('真数100以底为10的常用对数:' + Math.log10(100));
        console.log('36的平方根:' + Math.sqrt(36));
        // 随机数
        console.log('随机数为:' + BasicKnowledge_1.DDYTest.randomNumber(2, 8));
        console.log('随机整数:' + BasicKnowledge_1.DDYTest.randomInt(2, 8));
        // ~~ 双位非，对整数部分取非再取非，与Math.floor()相似但并不相同，~~速度快，但可读性差，只适用于32位范围(-2^31 到 2^31-1),否则溢出
        // ~~ 直接忽略小数部分，4.->4 4.1->4 -4.9->-4 -4.1->-4
        // 小于等于 Math.floor(4.9)->4 Math.floor(-4.9)->-5 
        // 大于等于 Math.ceil(4.9)->5 Math.ceil(-4.9)->-4
        // 四舍五入 Math.round(4.4)->4 Math.round(4.5)->5
    };
    return TestMath;
}());
exports.TestMath = TestMath;

cc._RF.pop();