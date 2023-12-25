// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BasicKnowwledge from "./BasicKnowledge";

// CocosCreator.app/Contents/Resources/static/template/new-script.ts
const {ccclass, property} = cc._decorator;

@ccclass
export default class HomePage extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        BasicKnowwledge.sharedInstance.testStart();
    }

    start () {

    }

    // update (dt) {}
}
