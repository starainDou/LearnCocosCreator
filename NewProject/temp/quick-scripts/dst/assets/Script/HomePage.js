
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/HomePage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '743f5hcsDBPOZKBwX+lrE8f', 'HomePage');
// Script/HomePage.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var BasicKnowledge_1 = require("./Test/BasicKnowledge");
var TestButton_1 = require("./Test/TestButton");
var TestDelay_1 = require("./Test/TestDelay");
// CocosCreator.app/Contents/Resources/static/template/new-script.ts
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        return _this;
    }
    HomePage_1 = HomePage;
    // LIFE-CYCLE CALLBACKS:
    HomePage.prototype.onLoad = function () {
        // 设置分辨率
        // EXACT_FIT 铺满可变形
        // NO_BORDER 拉满裁剪多出部分
        // SHOW_ALL 以允许留白形式展示整个场景
        // FIXED_HEIGHT 高度合适
        // FIXED_WIDTH 宽度合适
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.FIXED_WIDTH);
        // 获取分辨率
        var designSize = cc.view.getDesignResolutionSize();
        console.log('design size:', designSize.width, designSize.height);
        console.log(this.name); // Canvas<HomePage>
        TestButton_1.default.testDataTypeButton('data_type_button_node', this.node, this.onDataTypeButtonClick, this);
        var nodes = TestButton_1.default.testNumberButton(this.node, this.constructor.name, 'onTestNumberButtonClick'); // HomePage.name 两种获取当前脚本名称方法 
        this.scheduleOnce(function () {
            var textHeight = nodes[1].getContentSize().height;
            nodes[0].setContentSize(200, textHeight);
            nodes[1].setContentSize(200, textHeight);
        }, 0);
    };
    HomePage.prototype.start = function () {
    };
    // update (dt) {}
    HomePage.prototype.onDataTypeButtonClick = function () {
        BasicKnowledge_1.default.sharedInstance.testDataType();
        BasicKnowledge_1.default.sharedInstance.testString();
        if (HomePage_1.prototype.onDataTypeButtonClick) {
            console.log("当前方法信息:", HomePage_1.prototype.onDataTypeButtonClick);
        }
    };
    HomePage.prototype.onTestNumberButtonClick = function (event, str) {
        var node = event.target;
        console.log('参数:' + str + " 描述:" + node.name + " type:" + event.type);
        BasicKnowledge_1.default.sharedInstance.testNumber();
    };
    // 添加 Button，属性检查器中找到 Click Events 值加1，将Canvas拖入到cc.Node，选脚本，方法名
    HomePage.prototype.onTestDelayButtonClick = function () {
        TestDelay_1.default.testTimeOut();
        TestDelay_1.default.testInterval();
        TestDelay_1.default.testSchedule();
    };
    var HomePage_1;
    __decorate([
        property(cc.Button)
    ], HomePage.prototype, "button_dataType", void 0);
    __decorate([
        property(cc.Label)
    ], HomePage.prototype, "label", void 0);
    __decorate([
        property
    ], HomePage.prototype, "text", void 0);
    HomePage = HomePage_1 = __decorate([
        ccclass
    ], HomePage);
    return HomePage;
}(cc.Component));
exports.default = HomePage;
// Shift + Alt + F 格式化代码
// VSCode屏蔽meta文件 Preferences->Setting->Search 'files.exclude'->Add Pattern->**/*.meta
// 新建文件 Ctrl + Alt + Cmd + N
// 文件名搜索 Cmd + P
// 全部保存 Alt + Cmd + S

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvSG9tZVBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsd0RBQW9EO0FBQ3BELGdEQUEyQztBQUMzQyw4Q0FBeUM7QUFFekMsb0VBQW9FO0FBQzlELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBOERDO1FBeERHLFdBQUssR0FBYSxJQUFJLENBQUM7UUFHdkIsVUFBSSxHQUFXLE9BQU8sQ0FBQzs7SUFxRDNCLENBQUM7aUJBOURvQixRQUFRO0lBV3pCLHdCQUF3QjtJQUV4Qix5QkFBTSxHQUFOO1FBQ0ksUUFBUTtRQUNSLGtCQUFrQjtRQUNsQixxQkFBcUI7UUFDckIseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQixtQkFBbUI7UUFDbkIsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1RSxRQUFRO1FBQ1IsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsbUJBQW1CO1FBRTVDLG9CQUFVLENBQUMsa0JBQWtCLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEcsSUFBTSxLQUFLLEdBQXVCLG9CQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsOEJBQThCO1FBQzFKLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ3BELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVWLENBQUM7SUFFRCx3QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELGlCQUFpQjtJQUVqQix3Q0FBcUIsR0FBckI7UUFDSSx3QkFBZSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM5Qyx3QkFBZSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1QyxJQUFJLFVBQVEsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUU7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBUSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQ3BFO0lBQ0wsQ0FBQztJQUVPLDBDQUF1QixHQUEvQixVQUFnQyxLQUFlLEVBQUUsR0FBVztRQUN4RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RFLHdCQUFlLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRCxnRUFBZ0U7SUFDaEUseUNBQXNCLEdBQXRCO1FBQ0ksbUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixtQkFBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pCLG1CQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7SUExREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDTztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJDQUNJO0lBR3ZCO1FBREMsUUFBUTswQ0FDYztJQVROLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0E4RDVCO0lBQUQsZUFBQztDQTlERCxBQThEQyxDQTlEcUMsRUFBRSxDQUFDLFNBQVMsR0E4RGpEO2tCQTlEb0IsUUFBUTtBQStEN0Isd0JBQXdCO0FBQ3hCLHNGQUFzRjtBQUN0Riw0QkFBNEI7QUFDNUIsZ0JBQWdCO0FBQ2hCLHFCQUFxQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgQmFzaWNLbm93d2xlZGdlIGZyb20gXCIuL1Rlc3QvQmFzaWNLbm93bGVkZ2VcIjtcbmltcG9ydCBUZXN0QnV0dG9uIGZyb20gXCIuL1Rlc3QvVGVzdEJ1dHRvblwiO1xuaW1wb3J0IFRlc3REZWxheSBmcm9tIFwiLi9UZXN0L1Rlc3REZWxheVwiO1xuXG4vLyBDb2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9zdGF0aWMvdGVtcGxhdGUvbmV3LXNjcmlwdC50c1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVQYWdlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgYnV0dG9uX2RhdGFUeXBlOiBjYy5CdXR0b247XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHRleHQ6IHN0cmluZyA9ICdoZWxsbyc7XG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy8g6K6+572u5YiG6L6o546HXG4gICAgICAgIC8vIEVYQUNUX0ZJVCDpk7rmu6Hlj6/lj5jlvaJcbiAgICAgICAgLy8gTk9fQk9SREVSIOaLiea7oeijgeWJquWkmuWHuumDqOWIhlxuICAgICAgICAvLyBTSE9XX0FMTCDku6XlhYHorrjnlZnnmb3lvaLlvI/lsZXnpLrmlbTkuKrlnLrmma9cbiAgICAgICAgLy8gRklYRURfSEVJR0hUIOmrmOW6puWQiOmAglxuICAgICAgICAvLyBGSVhFRF9XSURUSCDlrr3luqblkIjpgIJcbiAgICAgICAgY2Mudmlldy5zZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSg3MjAsIDEyODAsIGNjLlJlc29sdXRpb25Qb2xpY3kuRklYRURfV0lEVEgpO1xuICAgICAgICAvLyDojrflj5bliIbovqjnjodcbiAgICAgICAgY29uc3QgZGVzaWduU2l6ZSA9IGNjLnZpZXcuZ2V0RGVzaWduUmVzb2x1dGlvblNpemUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2Rlc2lnbiBzaXplOicsIGRlc2lnblNpemUud2lkdGgsIGRlc2lnblNpemUuaGVpZ2h0KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lKTsgIC8vIENhbnZhczxIb21lUGFnZT5cblxuICAgICAgICBUZXN0QnV0dG9uLnRlc3REYXRhVHlwZUJ1dHRvbignZGF0YV90eXBlX2J1dHRvbl9ub2RlJywgdGhpcy5ub2RlLCB0aGlzLm9uRGF0YVR5cGVCdXR0b25DbGljaywgdGhpcyk7XG4gICAgICAgIGNvbnN0IG5vZGVzOiBbY2MuTm9kZSwgY2MuTm9kZV0gPSBUZXN0QnV0dG9uLnRlc3ROdW1iZXJCdXR0b24odGhpcy5ub2RlLCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUsICdvblRlc3ROdW1iZXJCdXR0b25DbGljaycpOyAvLyBIb21lUGFnZS5uYW1lIOS4pOenjeiOt+WPluW9k+WJjeiEmuacrOWQjeensOaWueazlSBcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRleHRIZWlnaHQgPSBub2Rlc1sxXS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodDtcbiAgICAgICAgICAgIG5vZGVzWzBdLnNldENvbnRlbnRTaXplKDIwMCwgdGV4dEhlaWdodCk7XG4gICAgICAgICAgICBub2Rlc1sxXS5zZXRDb250ZW50U2l6ZSgyMDAsIHRleHRIZWlnaHQpO1xuICAgICAgICB9LCAwKTtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cblxuICAgIG9uRGF0YVR5cGVCdXR0b25DbGljaygpIHtcbiAgICAgICAgQmFzaWNLbm93d2xlZGdlLnNoYXJlZEluc3RhbmNlLnRlc3REYXRhVHlwZSgpO1xuICAgICAgICBCYXNpY0tub3d3bGVkZ2Uuc2hhcmVkSW5zdGFuY2UudGVzdFN0cmluZygpO1xuICAgICAgICBpZiAoSG9tZVBhZ2UucHJvdG90eXBlLm9uRGF0YVR5cGVCdXR0b25DbGljaykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvZPliY3mlrnms5Xkv6Hmga86XCIsIEhvbWVQYWdlLnByb3RvdHlwZS5vbkRhdGFUeXBlQnV0dG9uQ2xpY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblRlc3ROdW1iZXJCdXR0b25DbGljayhldmVudDogY2MuRXZlbnQsIHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHZhciBub2RlID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zb2xlLmxvZygn5Y+C5pWwOicgKyBzdHIgKyBcIiDmj4/ov7A6XCIgKyBub2RlLm5hbWUgKyBcIiB0eXBlOlwiICsgZXZlbnQudHlwZSk7XG4gICAgICAgIEJhc2ljS25vd3dsZWRnZS5zaGFyZWRJbnN0YW5jZS50ZXN0TnVtYmVyKCk7XG4gICAgfVxuXG4gICAgLy8g5re75YqgIEJ1dHRvbu+8jOWxnuaAp+ajgOafpeWZqOS4reaJvuWIsCBDbGljayBFdmVudHMg5YC85YqgMe+8jOWwhkNhbnZhc+aLluWFpeWIsGNjLk5vZGXvvIzpgInohJrmnKzvvIzmlrnms5XlkI1cbiAgICBvblRlc3REZWxheUJ1dHRvbkNsaWNrKCkge1xuICAgICAgICBUZXN0RGVsYXkudGVzdFRpbWVPdXQoKTtcbiAgICAgICAgVGVzdERlbGF5LnRlc3RJbnRlcnZhbCgpO1xuICAgICAgICBUZXN0RGVsYXkudGVzdFNjaGVkdWxlKCk7XG4gICAgfVxufVxuLy8gU2hpZnQgKyBBbHQgKyBGIOagvOW8j+WMluS7o+eggVxuLy8gVlNDb2Rl5bGP6JS9bWV0YeaWh+S7tiBQcmVmZXJlbmNlcy0+U2V0dGluZy0+U2VhcmNoICdmaWxlcy5leGNsdWRlJy0+QWRkIFBhdHRlcm4tPioqLyoubWV0YVxuLy8g5paw5bu65paH5Lu2IEN0cmwgKyBBbHQgKyBDbWQgKyBOXG4vLyDmlofku7blkI3mkJzntKIgQ21kICsgUFxuLy8g5YWo6YOo5L+d5a2YIEFsdCArIENtZCArIFMiXX0=