"use strict";
cc._RF.push(module, '0e101eJDZZD17UQz9KqxKbH', 'TestDelay');
// Script/Test/TestDelay.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TestDelay = /** @class */ (function (_super) {
    __extends(TestDelay, _super);
    function TestDelay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scheduleIndex = 0;
        return _this;
    }
    TestDelay.testTimeOut = function () {
        setTimeout(function () {
            console.log("TimeOut延迟1秒执行");
        }, 1000);
        TestDelay.timeIndex = setTimeout(function () {
            console.log("TimeOut延迟2秒执行，会在下一个延时0秒定时中取消，看是否执行到这里");
        }, 2000);
        setTimeout(this.delay);
    };
    TestDelay.delay = function () {
        console.log("TimeOut延时0秒执行");
        console.log("取消延迟2秒执行的TimeOut", TestDelay.timeIndex);
        clearTimeout(TestDelay.timeIndex);
    };
    TestDelay.testInterval = function () {
        var intervalIndex = null;
        var index = 0;
        intervalIndex = setInterval(function () {
            index++;
            console.log('Interval执行第' + index + '次');
            if (index > 4) {
                clearInterval(intervalIndex);
            }
        }, 1000);
    };
    TestDelay.testSchedule = function () {
        var testDelay = new TestDelay();
        testDelay.schedule(testDelay.localScheduleHandler, 1, 8, 3); // 继承cc.Component则可使用
        this.globalScheduler = cc.director.getScheduler(); // director上计时器
        this.globalScheduler.enableForTarget(testDelay); // 必须 enableForTarget 注册id
        this.globalScheduler.schedule(testDelay.globalScheduleHandler, testDelay, 1, cc.macro.REPEAT_FOREVER, 3, false);
    };
    TestDelay.prototype.localScheduleHandler = function () {
        this.scheduleIndex++;
        console.log('LocalSchedule执行第' + this.scheduleIndex + '次');
        if (this.scheduleIndex > 4) {
            this.unschedule(this.localScheduleHandler);
            TestDelay.globalScheduler.unschedule(this.globalScheduleHandler, this);
            //TestDelay.globalScheduler.unscheduleAllForTarget(this);
        }
    };
    TestDelay.prototype.globalScheduleHandler = function () {
        console.log('GlobalSchedule执行第' + this.scheduleIndex + '次');
    };
    return TestDelay;
}(cc.Component));
exports.default = TestDelay;
// setTimeOut是延迟执行一次，setInterval是每间隔指定时间就执行一次
// declare

cc._RF.pop();