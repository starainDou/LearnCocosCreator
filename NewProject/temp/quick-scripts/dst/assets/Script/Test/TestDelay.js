
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVGVzdC9UZXN0RGVsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUFpREM7UUEvQ1csbUJBQWEsR0FBVyxDQUFDLENBQUM7O0lBK0N0QyxDQUFDO0lBN0NVLHFCQUFXLEdBQWxCO1FBQ0ksVUFBVSxDQUFDO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNqQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDVCxTQUFTLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDekQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1QsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ08sZUFBSyxHQUFaO1FBQ0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxzQkFBWSxHQUFuQjtRQUNJLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxhQUFhLEdBQUcsV0FBVyxDQUFDO1lBQ3hCLEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFBRSxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7YUFBRTtRQUNwRCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRU0sc0JBQVksR0FBbkI7UUFDSSxJQUFJLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUI7UUFFbEYsSUFBSSxDQUFDLGVBQWUsR0FBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsZUFBZTtRQUNuRSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFFLDBCQUEwQjtRQUM1RSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUNPLHdDQUFvQixHQUE1QjtRQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDM0QsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzNDLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2RSx5REFBeUQ7U0FDNUQ7SUFDTCxDQUFDO0lBQ08seUNBQXFCLEdBQTdCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFDTCxnQkFBQztBQUFELENBakRBLEFBaURDLENBakRzQyxFQUFFLENBQUMsU0FBUyxHQWlEbEQ7O0FBQ0QsNkNBQTZDO0FBQzdDLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0RGVsYXkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIHByaXZhdGUgc3RhdGljIHRpbWVJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIHByaXZhdGUgc2NoZWR1bGVJbmRleDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHN0YXRpYyBnbG9iYWxTY2hlZHVsZXI6Y2MuU2NoZWR1bGVyIHwgdW5kZWZpbmVkO1xuICAgIHN0YXRpYyB0ZXN0VGltZU91dCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRpbWVPdXTlu7bov58x56eS5omn6KGMXCIpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgVGVzdERlbGF5LnRpbWVJbmRleCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaW1lT3V05bu26L+fMuenkuaJp+ihjO+8jOS8muWcqOS4i+S4gOS4quW7tuaXtjDnp5Llrprml7bkuK3lj5bmtojvvIznnIvmmK/lkKbmiafooYzliLDov5nph4xcIik7XG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuZGVsYXkpO1xuICAgIH1cbiAgICAgc3RhdGljIGRlbGF5KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRpbWVPdXTlu7bml7Yw56eS5omn6KGMXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIuWPlua2iOW7tui/nzLnp5LmiafooYznmoRUaW1lT3V0XCIsIFRlc3REZWxheS50aW1lSW5kZXgpO1xuICAgICAgICBjbGVhclRpbWVvdXQoVGVzdERlbGF5LnRpbWVJbmRleCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRlc3RJbnRlcnZhbCgpIHtcbiAgICAgICAgbGV0IGludGVydmFsSW5kZXggPSBudWxsO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBpbnRlcnZhbEluZGV4ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbnRlcnZhbOaJp+ihjOesrCcgKyBpbmRleCArICfmrKEnKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IDQpIHsgY2xlYXJJbnRlcnZhbChpbnRlcnZhbEluZGV4KTsgfVxuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdGVzdFNjaGVkdWxlKCkge1xuICAgICAgICBsZXQgdGVzdERlbGF5ID0gbmV3IFRlc3REZWxheSgpO1xuICAgICAgICB0ZXN0RGVsYXkuc2NoZWR1bGUodGVzdERlbGF5LmxvY2FsU2NoZWR1bGVIYW5kbGVyLCAxLCA4LCAzKTsgLy8g57un5om/Y2MuQ29tcG9uZW505YiZ5Y+v5L2/55SoXG5cbiAgICAgICAgdGhpcy5nbG9iYWxTY2hlZHVsZXIgID0gY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCk7IC8vIGRpcmVjdG9y5LiK6K6h5pe25ZmoXG4gICAgICAgIHRoaXMuZ2xvYmFsU2NoZWR1bGVyLmVuYWJsZUZvclRhcmdldCh0ZXN0RGVsYXkpOyAgLy8g5b+F6aG7IGVuYWJsZUZvclRhcmdldCDms6jlhoxpZFxuICAgICAgICB0aGlzLmdsb2JhbFNjaGVkdWxlci5zY2hlZHVsZSh0ZXN0RGVsYXkuZ2xvYmFsU2NoZWR1bGVIYW5kbGVyLCB0ZXN0RGVsYXksIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSLCAzLCBmYWxzZSk7XG4gICAgfVxuICAgIHByaXZhdGUgbG9jYWxTY2hlZHVsZUhhbmRsZXIoKSB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVJbmRleCsrO1xuICAgICAgICBjb25zb2xlLmxvZygnTG9jYWxTY2hlZHVsZeaJp+ihjOesrCcgKyB0aGlzLnNjaGVkdWxlSW5kZXggKyAn5qyhJyk7XG4gICAgICAgIGlmICh0aGlzLnNjaGVkdWxlSW5kZXggPiA0KSB7XG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5sb2NhbFNjaGVkdWxlSGFuZGxlcik7XG4gICAgICAgICAgICBUZXN0RGVsYXkuZ2xvYmFsU2NoZWR1bGVyLnVuc2NoZWR1bGUodGhpcy5nbG9iYWxTY2hlZHVsZUhhbmRsZXIsIHRoaXMpO1xuICAgICAgICAgICAgLy9UZXN0RGVsYXkuZ2xvYmFsU2NoZWR1bGVyLnVuc2NoZWR1bGVBbGxGb3JUYXJnZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBnbG9iYWxTY2hlZHVsZUhhbmRsZXIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdHbG9iYWxTY2hlZHVsZeaJp+ihjOesrCcgKyB0aGlzLnNjaGVkdWxlSW5kZXggKyAn5qyhJyk7XG4gICAgfVxufVxuLy8gc2V0VGltZU91dOaYr+W7tui/n+aJp+ihjOS4gOasoe+8jHNldEludGVydmFs5piv5q+P6Ze06ZqU5oyH5a6a5pe26Ze05bCx5omn6KGM5LiA5qyhXG4vLyBkZWNsYXJlIl19