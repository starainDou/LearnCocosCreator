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

import BasicKnowwledge from "./Test/BasicKnowledge";
import { EncryptUtil } from "./Test/EncryptUtil";
import TestButton from "./Test/TestButton";
import { TestCrypto } from "./Test/TestCrypto";
import TestDelay from "./Test/TestDelay";

// CocosCreator.app/Contents/Resources/static/template/new-script.ts
const { ccclass, property } = cc._decorator;

@ccclass
export default class HomePage extends cc.Component {

    @property(cc.Button)
    button_dataType: cc.Button;

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 设置分辨率
        // EXACT_FIT 铺满可变形
        // NO_BORDER 拉满裁剪多出部分
        // SHOW_ALL 以允许留白形式展示整个场景
        // FIXED_HEIGHT 高度合适
        // FIXED_WIDTH 宽度合适
        cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.FIXED_WIDTH);
        // 获取分辨率
        const designSize = cc.view.getDesignResolutionSize();
        console.log('design size:', designSize.width, designSize.height);
        console.log(this.name);  // Canvas<HomePage>

        TestButton.testDataTypeButton('data_type_button_node', this.node, this.onDataTypeButtonClick, this);
        const nodes: [cc.Node, cc.Node] = TestButton.testNumberButton(this.node, this.constructor.name, 'onTestNumberButtonClick'); // HomePage.name 两种获取当前脚本名称方法 
        this.scheduleOnce(()  => {
            const textHeight = nodes[1].getContentSize().height;
            nodes[0].setContentSize(200, textHeight);
            nodes[1].setContentSize(200, textHeight);
        }, 0);

        // let encrypted = TestCrypto.es_encryptAES("11111", "1234567890123456", "1234567890123456");
        //let encrypted = TestCrypto.aesEncrypt("11111", "1234567890123456", "1234567890123456");
        let encrypted = EncryptUtil.aesDecrypt("11111", "1234567890123456", "1234567890123456");
        console.log("encrypted:", encrypted);
        BasicKnowwledge.sharedInstance.testThreeDots('aaa', 'bbb', 'ccc');
    }

    start() {

    }

    // update (dt) {}

    onDataTypeButtonClick() {
        BasicKnowwledge.sharedInstance.testDataType();
        BasicKnowwledge.sharedInstance.testString();
        if (HomePage.prototype.onDataTypeButtonClick) {
            console.log("当前方法信息:", HomePage.prototype.onDataTypeButtonClick);
        }
    }

    private onTestNumberButtonClick(event: cc.Event, str: string) {
        var node = event.target;
        console.log('参数:' + str + " 描述:" + node.name + " type:" + event.type);
        BasicKnowwledge.sharedInstance.testNumber();
    }

    // 添加 Button，属性检查器中找到 Click Events 值加1，将Canvas拖入到cc.Node，选脚本，方法名
    onTestDelayButtonClick() {
        TestDelay.testTimeOut();
        TestDelay.testInterval();
        TestDelay.testSchedule();
    }
}
// Shift + Alt + F 格式化代码
// VSCode屏蔽meta文件 Preferences->Setting->Search 'files.exclude'->Add Pattern->**/*.meta
// 新建文件 Ctrl + Alt + Cmd + N
// 文件名搜索 Cmd + P
// 全部保存 Alt + Cmd + S