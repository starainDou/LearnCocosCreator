
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Test/TestScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c2f54F1yp1L+IHG/Q5+OUez', 'TestScene');
// Script/Test/TestScene.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TestScene = /** @class */ (function (_super) {
    __extends(TestScene, _super);
    function TestScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 0;
        return _this;
    }
    TestScene.prototype.jumpSceneDataType = function () {
        cc.director.loadScene('TestDataTypeScene', function () {
            console.log('TestDataType scene onLaunched');
        });
    };
    TestScene.prototype.jumpSceneGeneric = function () {
        cc.director.loadScene('TestGenericScene', function () {
            console.log('TestGenericc scene onLaunched');
        });
    };
    TestScene.prototype.jumpSceneMathScene = function () {
        cc.director.loadScene('TestMathScene', this.onLaunchedMathScene);
    };
    TestScene.prototype.onLaunchedMathScene = function () {
        console.log('TestGenericc scene onLaunched');
    };
    TestScene.prototype.jumpButtonScene = function () {
        cc.director.preloadScene('TestButtonScene', function (completedCount, totalCount, item) {
            console.log('TestButton scene onProgressMethod', completedCount, totalCount);
        }, function (error) {
            console.log('TestButton scene onLoaded error:' + error);
        });
    };
    TestScene.prototype.onProgressMethod = function (completedCount, totalCount, item) {
        console.log('TestGenericc scene onProgressMethod', completedCount, totalCount);
    };
    TestScene.prototype.jumpNetworkScene = function () {
        cc.director.preloadScene('TestNetworkScene', this.onProgressMethod, function (error) {
            console.log('TestNetwork scene onLoaded error:' + error);
        });
    };
    // https://blog.csdn.net/dxt19980308/article/details/130288780
    TestScene.prototype.jumpLayoutScene = function () {
        cc.director.preloadScene('TestLayoutScene', function (error) {
            console.log('TestNetwork scene onLoaded error:' + error);
        });
    };
    __decorate([
        property(cc.Integer)
    ], TestScene.prototype, "count", void 0);
    TestScene = __decorate([
        ccclass // 注释类定义，该类是cocos组件类
    ], TestScene);
    return TestScene;
}(cc.Component));
exports.default = TestScene;
// @ccclass  注释类定义，该类是cocos组件类
// @property 注释属性定义，指定属性的属性、默认值等  @property(cc.)
// export function property(options?: {type?: any; visible?: boolean|(() => boolean); displayName?: string; tooltip?: string; multiline?: boolean; readonly?: boolean; min?: number; max?: number; step?: number; range?: number[]; slide?: boolean; serializable?: boolean; formerlySerializedAs?: string; editorOnly?: boolean; override?: boolean; animatable?: boolean} | any[]|Function|cc.ValueType|number|string|boolean): Function;
//	export function property(_target: Object, _key: any, _desc?: any): void;
// @menu 注释组件的菜单路径，在编辑器中创建实例时选择 @menu("Custom/UUID")
// @executionOrder 注释组件的执行顺序，控制组件update被调用顺序 @executionOrder(2)
// @requireComponent 注释组件依赖关系，指定当前组件必须依赖其他组件存在 @requireComponent(cc.RigiBody)
// @disallowMultiple 注释组件唯一性，当前组件在同一节点只能存在一个实例 
// @editor 注释自定义编辑器相关的信息，包括自定义的属性检查器等 @editor(cc.Prefab)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVGVzdC9UZXN0U2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUE4Q0M7UUEzQ0csV0FBSyxHQUFXLENBQUMsQ0FBQzs7SUEyQ3RCLENBQUM7SUF6Q1UscUNBQWlCLEdBQXhCO1FBQ0ksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUU7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNNLG9DQUFnQixHQUF2QjtRQUNJLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxzQ0FBa0IsR0FBekI7UUFDRyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNPLHVDQUFtQixHQUEzQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sbUNBQWUsR0FBdEI7UUFDSSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLGNBQWMsRUFBRSxVQUFVLEVBQUUsSUFBSTtZQUN6RSxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRixDQUFDLEVBQUUsVUFBVSxLQUFLO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxvQ0FBZ0IsR0FBeEIsVUFBeUIsY0FBc0IsRUFBRSxVQUFrQixFQUFFLElBQVM7UUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUNNLG9DQUFnQixHQUF2QjtRQUNJLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLEtBQUs7WUFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw4REFBOEQ7SUFDdkQsbUNBQWUsR0FBdEI7UUFDSSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLEtBQUs7WUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUExQ0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzs0Q0FDSDtJQUhELFNBQVM7UUFEN0IsT0FBTyxDQUFDLG9CQUFvQjtPQUNSLFNBQVMsQ0E4QzdCO0lBQUQsZ0JBQUM7Q0E5Q0QsQUE4Q0MsQ0E5Q3NDLEVBQUUsQ0FBQyxTQUFTLEdBOENsRDtrQkE5Q29CLFNBQVM7QUFnRDlCLDhCQUE4QjtBQUM5QixnREFBZ0Q7QUFDaEQsMmFBQTJhO0FBQzNhLDJFQUEyRTtBQUMzRSxvREFBb0Q7QUFDcEQsK0RBQStEO0FBQy9ELDZFQUE2RTtBQUM3RSwrQ0FBK0M7QUFDL0Msd0RBQXdEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzcyAvLyDms6jph4rnsbvlrprkuYnvvIzor6XnsbvmmK9jb2Nvc+e7hOS7tuexu1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdFNjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5JbnRlZ2VyKVxuICAgIGNvdW50OiBudW1iZXIgPSAwO1xuXG4gICAgcHVibGljIGp1bXBTY2VuZURhdGFUeXBlKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ1Rlc3REYXRhVHlwZVNjZW5lJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Rlc3REYXRhVHlwZSBzY2VuZSBvbkxhdW5jaGVkJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMganVtcFNjZW5lR2VuZXJpYygpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdUZXN0R2VuZXJpY1NjZW5lJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUZXN0R2VuZXJpY2Mgc2NlbmUgb25MYXVuY2hlZCcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMganVtcFNjZW5lTWF0aFNjZW5lKCkge1xuICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnVGVzdE1hdGhTY2VuZScsIHRoaXMub25MYXVuY2hlZE1hdGhTY2VuZSk7XG4gICAgfVxuICAgIHByaXZhdGUgb25MYXVuY2hlZE1hdGhTY2VuZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1Rlc3RHZW5lcmljYyBzY2VuZSBvbkxhdW5jaGVkJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGp1bXBCdXR0b25TY2VuZSgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKCdUZXN0QnV0dG9uU2NlbmUnLCAoY29tcGxldGVkQ291bnQsIHRvdGFsQ291bnQsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUZXN0QnV0dG9uIHNjZW5lIG9uUHJvZ3Jlc3NNZXRob2QnLCBjb21wbGV0ZWRDb3VudCwgdG90YWxDb3VudCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Rlc3RCdXR0b24gc2NlbmUgb25Mb2FkZWQgZXJyb3I6JyArIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblByb2dyZXNzTWV0aG9kKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUZXN0R2VuZXJpY2Mgc2NlbmUgb25Qcm9ncmVzc01ldGhvZCcsIGNvbXBsZXRlZENvdW50LCB0b3RhbENvdW50KTtcbiAgICB9XG4gICAgcHVibGljIGp1bXBOZXR3b3JrU2NlbmUoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZSgnVGVzdE5ldHdvcmtTY2VuZScsIHRoaXMub25Qcm9ncmVzc01ldGhvZCwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVGVzdE5ldHdvcmsgc2NlbmUgb25Mb2FkZWQgZXJyb3I6JyArIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2R4dDE5OTgwMzA4L2FydGljbGUvZGV0YWlscy8xMzAyODg3ODBcbiAgICBwdWJsaWMganVtcExheW91dFNjZW5lKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoJ1Rlc3RMYXlvdXRTY2VuZScsIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Rlc3ROZXR3b3JrIHNjZW5lIG9uTG9hZGVkIGVycm9yOicgKyBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gQGNjY2xhc3MgIOazqOmHiuexu+WumuS5ie+8jOivpeexu+aYr2NvY29z57uE5Lu257G7XG4vLyBAcHJvcGVydHkg5rOo6YeK5bGe5oCn5a6a5LmJ77yM5oyH5a6a5bGe5oCn55qE5bGe5oCn44CB6buY6K6k5YC8562JICBAcHJvcGVydHkoY2MuKVxuLy8gZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnR5KG9wdGlvbnM/OiB7dHlwZT86IGFueTsgdmlzaWJsZT86IGJvb2xlYW58KCgpID0+IGJvb2xlYW4pOyBkaXNwbGF5TmFtZT86IHN0cmluZzsgdG9vbHRpcD86IHN0cmluZzsgbXVsdGlsaW5lPzogYm9vbGVhbjsgcmVhZG9ubHk/OiBib29sZWFuOyBtaW4/OiBudW1iZXI7IG1heD86IG51bWJlcjsgc3RlcD86IG51bWJlcjsgcmFuZ2U/OiBudW1iZXJbXTsgc2xpZGU/OiBib29sZWFuOyBzZXJpYWxpemFibGU/OiBib29sZWFuOyBmb3JtZXJseVNlcmlhbGl6ZWRBcz86IHN0cmluZzsgZWRpdG9yT25seT86IGJvb2xlYW47IG92ZXJyaWRlPzogYm9vbGVhbjsgYW5pbWF0YWJsZT86IGJvb2xlYW59IHwgYW55W118RnVuY3Rpb258Y2MuVmFsdWVUeXBlfG51bWJlcnxzdHJpbmd8Ym9vbGVhbik6IEZ1bmN0aW9uO1xuLy9cdGV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eShfdGFyZ2V0OiBPYmplY3QsIF9rZXk6IGFueSwgX2Rlc2M/OiBhbnkpOiB2b2lkO1xuLy8gQG1lbnUg5rOo6YeK57uE5Lu255qE6I+c5Y2V6Lev5b6E77yM5Zyo57yW6L6R5Zmo5Lit5Yib5bu65a6e5L6L5pe26YCJ5oupIEBtZW51KFwiQ3VzdG9tL1VVSURcIilcbi8vIEBleGVjdXRpb25PcmRlciDms6jph4rnu4Tku7bnmoTmiafooYzpobrluo/vvIzmjqfliLbnu4Tku7Z1cGRhdGXooqvosIPnlKjpobrluo8gQGV4ZWN1dGlvbk9yZGVyKDIpXG4vLyBAcmVxdWlyZUNvbXBvbmVudCDms6jph4rnu4Tku7bkvp3otZblhbPns7vvvIzmjIflrprlvZPliY3nu4Tku7blv4Xpobvkvp3otZblhbbku5bnu4Tku7blrZjlnKggQHJlcXVpcmVDb21wb25lbnQoY2MuUmlnaUJvZHkpXG4vLyBAZGlzYWxsb3dNdWx0aXBsZSDms6jph4rnu4Tku7bllK/kuIDmgKfvvIzlvZPliY3nu4Tku7blnKjlkIzkuIDoioLngrnlj6rog73lrZjlnKjkuIDkuKrlrp7kvosgXG4vLyBAZWRpdG9yIOazqOmHiuiHquWumuS5iee8lui+keWZqOebuOWFs+eahOS/oeaBr++8jOWMheaLrOiHquWumuS5ieeahOWxnuaAp+ajgOafpeWZqOetiSBAZWRpdG9yKGNjLlByZWZhYikiXX0=