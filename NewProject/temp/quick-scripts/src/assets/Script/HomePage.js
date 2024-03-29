"use strict";
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