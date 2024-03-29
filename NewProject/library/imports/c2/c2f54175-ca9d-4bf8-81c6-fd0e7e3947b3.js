"use strict";
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