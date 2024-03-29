
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Test/TestDelay.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        testDelay.testScheduleOnce();
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
    TestDelay.prototype.testScheduleOnce = function () {
        console.log('1.test scheduleOnce');
        this.scheduleOnce(function () {
            console.log('2.test scheduleOnce');
        }, 0);
        console.log('3.test scheduleOnce');
    };
    return TestDelay;
}(cc.Component));
exports.default = TestDelay;
// setTimeOut是延迟执行一次，setInterval是每间隔指定时间就执行一次
// declare

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVGVzdC9UZXN0RGVsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUEyREM7UUF6RFcsbUJBQWEsR0FBVyxDQUFDLENBQUM7O0lBeUR0QyxDQUFDO0lBdkRVLHFCQUFXLEdBQWxCO1FBQ0ksVUFBVSxDQUFDO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNqQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDVCxTQUFTLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDekQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1QsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ08sZUFBSyxHQUFaO1FBQ0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxzQkFBWSxHQUFuQjtRQUNJLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxhQUFhLEdBQUcsV0FBVyxDQUFDO1lBQ3hCLEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFBRSxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7YUFBRTtRQUNwRCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRU0sc0JBQVksR0FBbkI7UUFDSSxJQUFJLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzdCLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUI7UUFFbEYsSUFBSSxDQUFDLGVBQWUsR0FBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsZUFBZTtRQUNuRSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFFLDBCQUEwQjtRQUM1RSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFcEgsQ0FBQztJQUNPLHdDQUFvQixHQUE1QjtRQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDM0QsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzNDLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2RSx5REFBeUQ7U0FDNUQ7SUFDTCxDQUFDO0lBQ08seUNBQXFCLEdBQTdCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTyxvQ0FBZ0IsR0FBeEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN2QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0EzREEsQUEyREMsQ0EzRHNDLEVBQUUsQ0FBQyxTQUFTLEdBMkRsRDs7QUFDRCw2Q0FBNkM7QUFDN0MsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3REZWxheSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgdGltZUluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgcHJpdmF0ZSBzY2hlZHVsZUluZGV4OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgc3RhdGljIGdsb2JhbFNjaGVkdWxlcjpjYy5TY2hlZHVsZXIgfCB1bmRlZmluZWQ7XG4gICAgc3RhdGljIHRlc3RUaW1lT3V0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGltZU91dOW7tui/nzHnp5LmiafooYxcIik7XG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICBUZXN0RGVsYXkudGltZUluZGV4ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRpbWVPdXTlu7bov58y56eS5omn6KGM77yM5Lya5Zyo5LiL5LiA5Liq5bu25pe2MOenkuWumuaXtuS4reWPlua2iO+8jOeci+aYr+WQpuaJp+ihjOWIsOi/memHjFwiKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5kZWxheSk7XG4gICAgfVxuICAgICBzdGF0aWMgZGVsYXkoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGltZU91dOW7tuaXtjDnp5LmiafooYxcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Y+W5raI5bu26L+fMuenkuaJp+ihjOeahFRpbWVPdXRcIiwgVGVzdERlbGF5LnRpbWVJbmRleCk7XG4gICAgICAgIGNsZWFyVGltZW91dChUZXN0RGVsYXkudGltZUluZGV4KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdGVzdEludGVydmFsKCkge1xuICAgICAgICBsZXQgaW50ZXJ2YWxJbmRleCA9IG51bGw7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGludGVydmFsSW5kZXggPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0ludGVydmFs5omn6KGM56ysJyArIGluZGV4ICsgJ+asoScpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gNCkgeyBjbGVhckludGVydmFsKGludGVydmFsSW5kZXgpOyB9XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH1cblxuICAgIHN0YXRpYyB0ZXN0U2NoZWR1bGUoKSB7XG4gICAgICAgIGxldCB0ZXN0RGVsYXkgPSBuZXcgVGVzdERlbGF5KCk7XG4gICAgICAgIHRlc3REZWxheS50ZXN0U2NoZWR1bGVPbmNlKCk7XG4gICAgICAgIHRlc3REZWxheS5zY2hlZHVsZSh0ZXN0RGVsYXkubG9jYWxTY2hlZHVsZUhhbmRsZXIsIDEsIDgsIDMpOyAvLyDnu6fmib9jYy5Db21wb25lbnTliJnlj6/kvb/nlKhcblxuICAgICAgICB0aGlzLmdsb2JhbFNjaGVkdWxlciAgPSBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKTsgLy8gZGlyZWN0b3LkuIrorqHml7blmahcbiAgICAgICAgdGhpcy5nbG9iYWxTY2hlZHVsZXIuZW5hYmxlRm9yVGFyZ2V0KHRlc3REZWxheSk7ICAvLyDlv4XpobsgZW5hYmxlRm9yVGFyZ2V0IOazqOWGjGlkXG4gICAgICAgIHRoaXMuZ2xvYmFsU2NoZWR1bGVyLnNjaGVkdWxlKHRlc3REZWxheS5nbG9iYWxTY2hlZHVsZUhhbmRsZXIsIHRlc3REZWxheSwgMSwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIsIDMsIGZhbHNlKTtcbiAgICAgICAgXG4gICAgfVxuICAgIHByaXZhdGUgbG9jYWxTY2hlZHVsZUhhbmRsZXIoKSB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVJbmRleCsrO1xuICAgICAgICBjb25zb2xlLmxvZygnTG9jYWxTY2hlZHVsZeaJp+ihjOesrCcgKyB0aGlzLnNjaGVkdWxlSW5kZXggKyAn5qyhJyk7XG4gICAgICAgIGlmICh0aGlzLnNjaGVkdWxlSW5kZXggPiA0KSB7XG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5sb2NhbFNjaGVkdWxlSGFuZGxlcik7XG4gICAgICAgICAgICBUZXN0RGVsYXkuZ2xvYmFsU2NoZWR1bGVyLnVuc2NoZWR1bGUodGhpcy5nbG9iYWxTY2hlZHVsZUhhbmRsZXIsIHRoaXMpO1xuICAgICAgICAgICAgLy9UZXN0RGVsYXkuZ2xvYmFsU2NoZWR1bGVyLnVuc2NoZWR1bGVBbGxGb3JUYXJnZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBnbG9iYWxTY2hlZHVsZUhhbmRsZXIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdHbG9iYWxTY2hlZHVsZeaJp+ihjOesrCcgKyB0aGlzLnNjaGVkdWxlSW5kZXggKyAn5qyhJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0ZXN0U2NoZWR1bGVPbmNlKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnMS50ZXN0IHNjaGVkdWxlT25jZScpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnMi50ZXN0IHNjaGVkdWxlT25jZScpO1xuICAgICAgICB9LCAwKTtcbiAgICAgICAgY29uc29sZS5sb2coJzMudGVzdCBzY2hlZHVsZU9uY2UnKTtcbiAgICB9XG59XG4vLyBzZXRUaW1lT3V05piv5bu26L+f5omn6KGM5LiA5qyh77yMc2V0SW50ZXJ2YWzmmK/mr4/pl7TpmpTmjIflrprml7bpl7TlsLHmiafooYzkuIDmrKFcbi8vIGRlY2xhcmUiXX0=