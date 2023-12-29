export default class TestDelay extends cc.Component {
    private static timeIndex: number | undefined;
    private scheduleIndex: number = 0;
    private static globalScheduler:cc.Scheduler | undefined;
    static testTimeOut() {
        setTimeout(() => {
            console.log("TimeOut延迟1秒执行");
        }, 1000);
        TestDelay.timeIndex = setTimeout(() => {
            console.log("TimeOut延迟2秒执行，会在下一个延时0秒定时中取消，看是否执行到这里");
        }, 2000);
        setTimeout(this.delay);
    }
     static delay() {
        console.log("TimeOut延时0秒执行");
        console.log("取消延迟2秒执行的TimeOut", TestDelay.timeIndex);
        clearTimeout(TestDelay.timeIndex);
    }

    static testInterval() {
        let intervalIndex = null;
        let index = 0;
        intervalIndex = setInterval(() => {
            index++;
            console.log('Interval执行第' + index + '次');
            if (index > 4) { clearInterval(intervalIndex); }
        }, 1000);
    }

    static testSchedule() {
        let testDelay = new TestDelay();
        testDelay.schedule(testDelay.localScheduleHandler, 1, 8, 3); // 继承cc.Component则可使用

        this.globalScheduler  = cc.director.getScheduler(); // director上计时器
        this.globalScheduler.enableForTarget(testDelay);  // 必须 enableForTarget 注册id
        this.globalScheduler.schedule(testDelay.globalScheduleHandler, testDelay, 1, cc.macro.REPEAT_FOREVER, 3, false);
    }
    private localScheduleHandler() {
        this.scheduleIndex++;
        console.log('LocalSchedule执行第' + this.scheduleIndex + '次');
        if (this.scheduleIndex > 4) {
            this.unschedule(this.localScheduleHandler);
            TestDelay.globalScheduler.unschedule(this.globalScheduleHandler, this);
            //TestDelay.globalScheduler.unscheduleAllForTarget(this);
        }
    }
    private globalScheduleHandler() {
        console.log('GlobalSchedule执行第' + this.scheduleIndex + '次');
    }
}
// setTimeOut是延迟执行一次，setInterval是每间隔指定时间就执行一次
// declare