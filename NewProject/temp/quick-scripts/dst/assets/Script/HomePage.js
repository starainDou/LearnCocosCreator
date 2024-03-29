
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
/*
 * @Author: doudianyu doudianyu@huixuanjiasu.com
 * @Date: 2023-12-25 17:04:56
 * @LastEditors: doudianyu doudianyu@huixuanjiasu.com
 * @LastEditTime: 2024-03-11 21:06:12
 * @FilePath: /NewProject/assets/Script/HomePage.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
var EncryptUtil_1 = require("./Test/EncryptUtil");
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
        // let encrypted = TestCrypto.es_encryptAES("11111", "1234567890123456", "1234567890123456");
        //let encrypted = TestCrypto.aesEncrypt("11111", "1234567890123456", "1234567890123456");
        var encrypted = EncryptUtil_1.EncryptUtil.aesDecrypt("11111", "1234567890123456", "1234567890123456");
        console.log("encrypted:", encrypted);
        BasicKnowledge_1.default.sharedInstance.testThreeDots('aaa', 'bbb', 'ccc');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvSG9tZVBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7O0dBT0c7QUFDSCxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLHdEQUFvRDtBQUNwRCxrREFBaUQ7QUFDakQsZ0RBQTJDO0FBRTNDLDhDQUF5QztBQUV6QyxvRUFBb0U7QUFDOUQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUFtRUM7UUE3REcsV0FBSyxHQUFhLElBQUksQ0FBQztRQUd2QixVQUFJLEdBQVcsT0FBTyxDQUFDOztJQTBEM0IsQ0FBQztpQkFuRW9CLFFBQVE7SUFXekIsd0JBQXdCO0lBRXhCLHlCQUFNLEdBQU47UUFDSSxRQUFRO1FBQ1Isa0JBQWtCO1FBQ2xCLHFCQUFxQjtRQUNyQix5QkFBeUI7UUFDekIsb0JBQW9CO1FBQ3BCLG1CQUFtQjtRQUNuQixFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVFLFFBQVE7UUFDUixJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBRSxtQkFBbUI7UUFFNUMsb0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRyxJQUFNLEtBQUssR0FBdUIsb0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLHlCQUF5QixDQUFDLENBQUMsQ0FBQyw4QkFBOEI7UUFDMUosSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDcEQsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDekMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRU4sNkZBQTZGO1FBQzdGLHlGQUF5RjtRQUN6RixJQUFJLFNBQVMsR0FBRyx5QkFBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUN4RixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyQyx3QkFBZSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsd0JBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxpQkFBaUI7SUFFakIsd0NBQXFCLEdBQXJCO1FBQ0ksd0JBQWUsQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDOUMsd0JBQWUsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUMsSUFBSSxVQUFRLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVEsQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUNwRTtJQUNMLENBQUM7SUFFTywwQ0FBdUIsR0FBL0IsVUFBZ0MsS0FBZSxFQUFFLEdBQVc7UUFDeEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RSx3QkFBZSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsZ0VBQWdFO0lBQ2hFLHlDQUFzQixHQUF0QjtRQUNJLG1CQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEIsbUJBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QixtQkFBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzdCLENBQUM7O0lBL0REO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ087SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsyQ0FDSTtJQUd2QjtRQURDLFFBQVE7MENBQ2M7SUFUTixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBbUU1QjtJQUFELGVBQUM7Q0FuRUQsQUFtRUMsQ0FuRXFDLEVBQUUsQ0FBQyxTQUFTLEdBbUVqRDtrQkFuRW9CLFFBQVE7QUFvRTdCLHdCQUF3QjtBQUN4QixzRkFBc0Y7QUFDdEYsNEJBQTRCO0FBQzVCLGdCQUFnQjtBQUNoQixxQkFBcUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQEF1dGhvcjogZG91ZGlhbnl1IGRvdWRpYW55dUBodWl4dWFuamlhc3UuY29tXG4gKiBARGF0ZTogMjAyMy0xMi0yNSAxNzowNDo1NlxuICogQExhc3RFZGl0b3JzOiBkb3VkaWFueXUgZG91ZGlhbnl1QGh1aXh1YW5qaWFzdS5jb21cbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjQtMDMtMTEgMjE6MDY6MTJcbiAqIEBGaWxlUGF0aDogL05ld1Byb2plY3QvYXNzZXRzL1NjcmlwdC9Ib21lUGFnZS50c1xuICogQERlc2NyaXB0aW9uOiDov5nmmK/pu5jorqTorr7nva4s6K+36K6+572uYGN1c3RvbU1hZGVgLCDmiZPlvIBrb3JvRmlsZUhlYWRlcuafpeeci+mFjee9riDov5vooYzorr7nva46IGh0dHBzOi8vZ2l0aHViLmNvbS9PQktvcm8xL2tvcm8xRmlsZUhlYWRlci93aWtpLyVFOSU4NSU4RCVFNyVCRCVBRVxuICovXG4vLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IEJhc2ljS25vd3dsZWRnZSBmcm9tIFwiLi9UZXN0L0Jhc2ljS25vd2xlZGdlXCI7XG5pbXBvcnQgeyBFbmNyeXB0VXRpbCB9IGZyb20gXCIuL1Rlc3QvRW5jcnlwdFV0aWxcIjtcbmltcG9ydCBUZXN0QnV0dG9uIGZyb20gXCIuL1Rlc3QvVGVzdEJ1dHRvblwiO1xuaW1wb3J0IHsgVGVzdENyeXB0byB9IGZyb20gXCIuL1Rlc3QvVGVzdENyeXB0b1wiO1xuaW1wb3J0IFRlc3REZWxheSBmcm9tIFwiLi9UZXN0L1Rlc3REZWxheVwiO1xuXG4vLyBDb2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9zdGF0aWMvdGVtcGxhdGUvbmV3LXNjcmlwdC50c1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVQYWdlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgYnV0dG9uX2RhdGFUeXBlOiBjYy5CdXR0b247XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHRleHQ6IHN0cmluZyA9ICdoZWxsbyc7XG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy8g6K6+572u5YiG6L6o546HXG4gICAgICAgIC8vIEVYQUNUX0ZJVCDpk7rmu6Hlj6/lj5jlvaJcbiAgICAgICAgLy8gTk9fQk9SREVSIOaLiea7oeijgeWJquWkmuWHuumDqOWIhlxuICAgICAgICAvLyBTSE9XX0FMTCDku6XlhYHorrjnlZnnmb3lvaLlvI/lsZXnpLrmlbTkuKrlnLrmma9cbiAgICAgICAgLy8gRklYRURfSEVJR0hUIOmrmOW6puWQiOmAglxuICAgICAgICAvLyBGSVhFRF9XSURUSCDlrr3luqblkIjpgIJcbiAgICAgICAgY2Mudmlldy5zZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSg3MjAsIDEyODAsIGNjLlJlc29sdXRpb25Qb2xpY3kuRklYRURfV0lEVEgpO1xuICAgICAgICAvLyDojrflj5bliIbovqjnjodcbiAgICAgICAgY29uc3QgZGVzaWduU2l6ZSA9IGNjLnZpZXcuZ2V0RGVzaWduUmVzb2x1dGlvblNpemUoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2Rlc2lnbiBzaXplOicsIGRlc2lnblNpemUud2lkdGgsIGRlc2lnblNpemUuaGVpZ2h0KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lKTsgIC8vIENhbnZhczxIb21lUGFnZT5cblxuICAgICAgICBUZXN0QnV0dG9uLnRlc3REYXRhVHlwZUJ1dHRvbignZGF0YV90eXBlX2J1dHRvbl9ub2RlJywgdGhpcy5ub2RlLCB0aGlzLm9uRGF0YVR5cGVCdXR0b25DbGljaywgdGhpcyk7XG4gICAgICAgIGNvbnN0IG5vZGVzOiBbY2MuTm9kZSwgY2MuTm9kZV0gPSBUZXN0QnV0dG9uLnRlc3ROdW1iZXJCdXR0b24odGhpcy5ub2RlLCB0aGlzLmNvbnN0cnVjdG9yLm5hbWUsICdvblRlc3ROdW1iZXJCdXR0b25DbGljaycpOyAvLyBIb21lUGFnZS5uYW1lIOS4pOenjeiOt+WPluW9k+WJjeiEmuacrOWQjeensOaWueazlSBcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRleHRIZWlnaHQgPSBub2Rlc1sxXS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodDtcbiAgICAgICAgICAgIG5vZGVzWzBdLnNldENvbnRlbnRTaXplKDIwMCwgdGV4dEhlaWdodCk7XG4gICAgICAgICAgICBub2Rlc1sxXS5zZXRDb250ZW50U2l6ZSgyMDAsIHRleHRIZWlnaHQpO1xuICAgICAgICB9LCAwKTtcblxuICAgICAgICAvLyBsZXQgZW5jcnlwdGVkID0gVGVzdENyeXB0by5lc19lbmNyeXB0QUVTKFwiMTExMTFcIiwgXCIxMjM0NTY3ODkwMTIzNDU2XCIsIFwiMTIzNDU2Nzg5MDEyMzQ1NlwiKTtcbiAgICAgICAgLy9sZXQgZW5jcnlwdGVkID0gVGVzdENyeXB0by5hZXNFbmNyeXB0KFwiMTExMTFcIiwgXCIxMjM0NTY3ODkwMTIzNDU2XCIsIFwiMTIzNDU2Nzg5MDEyMzQ1NlwiKTtcbiAgICAgICAgbGV0IGVuY3J5cHRlZCA9IEVuY3J5cHRVdGlsLmFlc0RlY3J5cHQoXCIxMTExMVwiLCBcIjEyMzQ1Njc4OTAxMjM0NTZcIiwgXCIxMjM0NTY3ODkwMTIzNDU2XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImVuY3J5cHRlZDpcIiwgZW5jcnlwdGVkKTtcbiAgICAgICAgQmFzaWNLbm93d2xlZGdlLnNoYXJlZEluc3RhbmNlLnRlc3RUaHJlZURvdHMoJ2FhYScsICdiYmInLCAnY2NjJyk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxuXG4gICAgb25EYXRhVHlwZUJ1dHRvbkNsaWNrKCkge1xuICAgICAgICBCYXNpY0tub3d3bGVkZ2Uuc2hhcmVkSW5zdGFuY2UudGVzdERhdGFUeXBlKCk7XG4gICAgICAgIEJhc2ljS25vd3dsZWRnZS5zaGFyZWRJbnN0YW5jZS50ZXN0U3RyaW5nKCk7XG4gICAgICAgIGlmIChIb21lUGFnZS5wcm90b3R5cGUub25EYXRhVHlwZUJ1dHRvbkNsaWNrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW9k+WJjeaWueazleS/oeaBrzpcIiwgSG9tZVBhZ2UucHJvdG90eXBlLm9uRGF0YVR5cGVCdXR0b25DbGljayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVGVzdE51bWJlckJ1dHRvbkNsaWNrKGV2ZW50OiBjYy5FdmVudCwgc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnNvbGUubG9nKCflj4LmlbA6JyArIHN0ciArIFwiIOaPj+i/sDpcIiArIG5vZGUubmFtZSArIFwiIHR5cGU6XCIgKyBldmVudC50eXBlKTtcbiAgICAgICAgQmFzaWNLbm93d2xlZGdlLnNoYXJlZEluc3RhbmNlLnRlc3ROdW1iZXIoKTtcbiAgICB9XG5cbiAgICAvLyDmt7vliqAgQnV0dG9u77yM5bGe5oCn5qOA5p+l5Zmo5Lit5om+5YiwIENsaWNrIEV2ZW50cyDlgLzliqAx77yM5bCGQ2FudmFz5ouW5YWl5YiwY2MuTm9kZe+8jOmAieiEmuacrO+8jOaWueazleWQjVxuICAgIG9uVGVzdERlbGF5QnV0dG9uQ2xpY2soKSB7XG4gICAgICAgIFRlc3REZWxheS50ZXN0VGltZU91dCgpO1xuICAgICAgICBUZXN0RGVsYXkudGVzdEludGVydmFsKCk7XG4gICAgICAgIFRlc3REZWxheS50ZXN0U2NoZWR1bGUoKTtcbiAgICB9XG59XG4vLyBTaGlmdCArIEFsdCArIEYg5qC85byP5YyW5Luj56CBXG4vLyBWU0NvZGXlsY/olL1tZXRh5paH5Lu2IFByZWZlcmVuY2VzLT5TZXR0aW5nLT5TZWFyY2ggJ2ZpbGVzLmV4Y2x1ZGUnLT5BZGQgUGF0dGVybi0+KiovKi5tZXRhXG4vLyDmlrDlu7rmlofku7YgQ3RybCArIEFsdCArIENtZCArIE5cbi8vIOaWh+S7tuWQjeaQnOe0oiBDbWQgKyBQXG4vLyDlhajpg6jkv53lrZggQWx0ICsgQ21kICsgUyJdfQ==