
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Test/TestMath.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        console.log('2和7中的较大值:' + Math.max(2, 5, 7));
    };
    return TestMath;
}());
exports.TestMath = TestMath;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVGVzdC9UZXN0TWF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBMkM7QUFFM0M7SUFBQTtJQWlDQSxDQUFDO0lBaENVLGtCQUFTLEdBQWhCO1FBQ0ksT0FBTztRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkksT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkcsT0FBTztRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JELE9BQU87UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU07UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyx3QkFBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyx3QkFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxvRkFBb0Y7UUFDcEYsNkNBQTZDO1FBQzdDLGdEQUFnRDtRQUNoRCw2Q0FBNkM7UUFDN0MsNkNBQTZDO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpELENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FqQ0EsQUFpQ0MsSUFBQTtBQWpDWSw0QkFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEREWVRlc3QgfSBmcm9tIFwiLi9CYXNpY0tub3dsZWRnZVwiO1xuXG5leHBvcnQgY2xhc3MgVGVzdE1hdGgge1xuICAgIHN0YXRpYyB0ZXN0U3RhcnQoKSB7XG4gICAgICAgIC8vIOaVsOWAvOaTjeS9nFxuICAgICAgICBjb25zb2xlLmxvZygnLTEw5Y+W57ud5a+55YC8JyArIE1hdGguYWJzKC0xMCkpO1xuICAgICAgICBjb25zb2xlLmxvZygn5aSn5LqO562J5LqOIOWQkeS4iuWPluaVtCA0LjE6JyArIE1hdGguY2VpbCg0LjEpICsgJyAtNC4xOicgKyBNYXRoLmNlaWwoLTQuMSkpO1xuICAgICAgICBjb25zb2xlLmxvZygn5bCP5LqO562J5LqOIOWQkeS4i+WPluaVtCA0Ljk6JyArIE1hdGguY2VpbCg0LjkpICsgJyAtNC45OicgKyBNYXRoLmNlaWwoLTQuOSkpO1xuICAgICAgICBjb25zb2xlLmxvZygn5Zub6IiN5LqU5YWl5Y+W5pW0IDQuNTonICsgTWF0aC5yb3VuZCg0LjkpICsgJyA0LjQ6JyArIE1hdGgucm91bmQoLTQuOSkgKyAnLTQuNTonICsgTWF0aC5yb3VuZCgtNC41KSArICctNC40JyArIE1hdGgucm91bmQoLTQuNCkpO1xuICAgICAgICBjb25zb2xlLmxvZygn5Y+M6Z2e5Y+W5pW0IDQuOTonICsgfn4oNC45KSArICcgNC4xOicgKyB+fig0LjEpICsgJyAtNC45OicgKyB+figtNC45KSArICcgLTQuMTonICsgfn4oLTQuMSkpO1xuICAgICAgICAvLyDkuInop5Llh73mlbBcbiAgICAgICAgY29uc29sZS5sb2coJ+ato+W8puWAvDonICsgTWF0aC5zaW4oMzAgKiBNYXRoLlBJIC8gMTgwKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCfkvZnlvKblgLw6JyArIE1hdGguY29zKDMwICogTWF0aC5QSSAvIDE4MCkpO1xuICAgICAgICBjb25zb2xlLmxvZygn5q2j5YiH5YC8OicgKyBNYXRoLnRhbigzMCAqIE1hdGguUEkgLyAxODApKTtcbiAgICAgICAgY29uc29sZS5sb2coJ+WPjeato+W8puWAvDonICsgTWF0aC5hc2luKDMwICogTWF0aC5QSSAvIDE4MCkpO1xuICAgICAgICBjb25zb2xlLmxvZygn5Y+N5L2Z5bym5YC8OicgKyBNYXRoLmFjb3MoMzAgKiBNYXRoLlBJIC8gMTgwKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCflj43mraPliIflgLw6JyArIE1hdGguYXRhbigzMCAqIE1hdGguUEkgLyAxODApKTtcbiAgICAgICAgLy8g5oyH5pWw6L+Q566XXG4gICAgICAgIGNvbnNvbGUubG9nKCdl55qEM+asoeW5gjonICsgTWF0aC5leHAoMykpO1xuICAgICAgICBjb25zb2xlLmxvZygnNOeahDPmrKHluYI6JyArIE1hdGgucG93KDQsIDMpKTtcbiAgICAgICAgY29uc29sZS5sb2coJ+ecn+aVsDE255qE6Ieq54S25a+55pWwOicgKyBNYXRoLmxvZygxNikpO1xuICAgICAgICBjb25zb2xlLmxvZygn55yf5pWwOOS7peW6leS4ujLnmoRsb2flr7nmlbA6JyArIE1hdGgubG9nMig4KSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCfnnJ/mlbAxMDDku6XlupXkuLoxMOeahOW4uOeUqOWvueaVsDonICsgTWF0aC5sb2cxMCgxMDApKTtcbiAgICAgICAgY29uc29sZS5sb2coJzM255qE5bmz5pa55qC5OicgKyBNYXRoLnNxcnQoMzYpKTtcbiAgICAgICAgLy8g6ZqP5py65pWwXG4gICAgICAgIGNvbnNvbGUubG9nKCfpmo/mnLrmlbDkuLo6JyArIEREWVRlc3QucmFuZG9tTnVtYmVyKDIsIDgpKTtcbiAgICAgICAgY29uc29sZS5sb2coJ+maj+acuuaVtOaVsDonICsgRERZVGVzdC5yYW5kb21JbnQoMiwgOCkpO1xuICAgICAgICAvLyB+fiDlj4zkvY3pnZ7vvIzlr7nmlbTmlbDpg6jliIblj5bpnZ7lho3lj5bpnZ7vvIzkuI5NYXRoLmZsb29yKCnnm7jkvLzkvYblubbkuI3nm7jlkIzvvIx+fumAn+W6puW/q++8jOS9huWPr+ivu+aAp+W3ru+8jOWPqumAgueUqOS6jjMy5L2N6IyD5Zu0KC0yXjMxIOWIsCAyXjMxLTEpLOWQpuWImea6ouWHulxuICAgICAgICAvLyB+fiDnm7TmjqXlv73nlaXlsI/mlbDpg6jliIbvvIw0Li0+NCA0LjEtPjQgLTQuOS0+LTQgLTQuMS0+LTRcbiAgICAgICAgLy8g5bCP5LqO562J5LqOIE1hdGguZmxvb3IoNC45KS0+NCBNYXRoLmZsb29yKC00LjkpLT4tNSBcbiAgICAgICAgLy8g5aSn5LqO562J5LqOIE1hdGguY2VpbCg0LjkpLT41IE1hdGguY2VpbCgtNC45KS0+LTRcbiAgICAgICAgLy8g5Zub6IiN5LqU5YWlIE1hdGgucm91bmQoNC40KS0+NCBNYXRoLnJvdW5kKDQuNSktPjVcbiAgICAgICAgY29uc29sZS5sb2coJzLlkow35Lit55qE6L6D5aSn5YC8OicgKyBNYXRoLm1heCgyLCA1LCA3KSk7XG5cbiAgICB9XG59Il19