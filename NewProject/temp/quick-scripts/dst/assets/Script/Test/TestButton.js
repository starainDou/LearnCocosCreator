
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Test/TestButton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3ce3fMUtoJGjqy8Zx/fiMc9', 'TestButton');
// Script/Test/TestButton.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DDYUtil_1 = require("../Utils/DDYUtil");
var TestButton = /** @class */ (function () {
    function TestButton() {
    }
    // T extends Function 泛型T，且需要继承自Function
    TestButton.testDataTypeButton = function (name, parent, callback, target) {
        var buttonNode = new cc.Node(); // 创建button的 node节点
        buttonNode.name = name;
        buttonNode.parent = parent; // 添加到当前节点
        buttonNode.setPosition(new cc.Vec2(0, 650));
        buttonNode.setContentSize(new cc.Size(200, 50));
        var labelNode = new cc.Node(); // 创建按钮文本的节点
        labelNode.name = 'data_type_button_label_node';
        labelNode.parent = buttonNode;
        labelNode.color = DDYUtil_1.default.colorHex(0x00AAFF); // 文字颜色
        labelNode.setPosition(new cc.Vec2(0, 0)); // 设置 Label 位置居中
        labelNode.setContentSize(buttonNode.getContentSize()); // 设置 Label 大小与按钮相同
        var label = labelNode.addComponent(cc.Label);
        label.string = '点击我测试数据类型';
        label.fontSize = 30;
        var button = buttonNode.addComponent(cc.Button);
        button.node.on('click', callback, target);
    };
    TestButton.testNumberButton = function (parent, component, handler) {
        var buttonNode = new cc.Node('test_number_button_node');
        parent.addChild(buttonNode);
        buttonNode.setPosition(new cc.Vec2(0, 600));
        //buttonNode.setContentSize(new cc.Size(200,  50));
        var labelNode = new cc.Node();
        labelNode.name = 'data_type_button_label_node';
        buttonNode.addChild(labelNode);
        labelNode.setPosition(new cc.Vec2(0, 0));
        labelNode.color = cc.Color.WHITE;
        var label = labelNode.addComponent(cc.Label);
        label.string = '点击我测试Number，我可是能够换行的哦，不信你看看Hello worl!You are so beautyful and lovely';
        label.fontSize = 22;
        label.lineHeight = 26;
        label.useSystemFont = true;
        label.overflow = cc.Label.Overflow.RESIZE_HEIGHT; // 文字显示超出范围时的处理方式
        label.enableWrapText = true; // 是否自动换行
        label.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        labelNode.setContentSize(200, 22);
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = parent;
        clickEventHandler.component = component;
        clickEventHandler.handler = handler;
        clickEventHandler.customEventData = "我是最后一个参数";
        var sprite = buttonNode.addComponent(cc.Sprite);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.trim = false; // 是否使用裁剪模式
        sprite.type = cc.Sprite.Type.SLICED;
        sprite.spriteFrame = this.backgroundSpriteFrame(DDYUtil_1.default.colorHex(0x993344));
        var button = buttonNode.addComponent(cc.Button);
        button.target = buttonNode;
        button.normalColor = cc.Color.RED; // 常态颜色
        button.pressedColor = cc.Color.BLUE; // 点击颜色
        button.hoverColor = cc.Color.GREEN; // 悬停颜色
        button.disabledColor = cc.Color.GRAY; // 禁用颜色
        button.transition = cc.Button.Transition.COLOR;
        button.clickEvents.push(clickEventHandler);
        return [buttonNode, labelNode];
    };
    TestButton.testtNumberButton2 = function (parent, component, handler) {
        var buttonNode = new cc.Node('test_number_button_node');
        buttonNode.parent = parent;
        buttonNode.setPosition(new cc.Vec2(0, 600));
        buttonNode.setContentSize(new cc.Size(200, 50));
        buttonNode.color = cc.Color.GREEN;
        var labelNode = new cc.Node();
        labelNode.name = 'data_type_button_label_node';
        labelNode.parent = buttonNode;
        labelNode.setPosition(new cc.Vec2(0, 0));
        labelNode.setContentSize(buttonNode.getContentSize());
        labelNode.color = cc.Color.WHITE;
        var label = labelNode.addComponent(cc.Label);
        label.string = '点击我测试Number';
        label.fontSize = 30;
        label.useSystemFont = true;
        label.overflow = cc.Label.Overflow.RESIZE_HEIGHT; // 文字显示超出范围时的处理方式：自适应高度
        label.enableWrapText = true; // 是否自动换行
        label.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = parent;
        clickEventHandler.component = component;
        clickEventHandler.handler = handler;
        clickEventHandler.customEventData = "我是最后一个参数";
        var background = new cc.Node('background');
        background.setPosition(new cc.Vec2(0, 0));
        background.setContentSize(buttonNode.getContentSize());
        background.color = cc.Color.WHITE;
        var sprite = buttonNode.addComponent(cc.Sprite);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.trim = false; // 是否使用裁剪模式
        sprite.type = cc.Sprite.Type.SLICED;
        var button = buttonNode.addComponent(cc.Button);
        button.normalColor = cc.Color.RED; // 常态颜色
        button.pressedColor = cc.Color.BLUE; // 点击颜色
        button.hoverColor = cc.Color.GREEN; // 悬停颜色
        button.disabledColor = cc.Color.GRAY; // 禁用颜色
        button.transition = cc.Button.Transition.COLOR;
        //button.clickEvents.push(clickEventHandler);
    };
    TestButton.backgroundSpriteFrame = function (color) {
        var texture = new cc.Texture2D();
        texture.initWithData(new Uint8Array([color.r, color.g, color.b, color.a]), cc.Texture2D.PixelFormat.RGB888, 1, 1);
        var spriteFrame = new cc.SpriteFrame(texture);
        return spriteFrame;
    };
    TestButton.testButton = function (parent) {
    };
    return TestButton;
}());
exports.default = TestButton;
// cc.Sprite https://docs.cocos.com/creator/2.4/api/zh/classes/Sprite.html
// https://docs.cocos.com/creator/2.4/manual/zh/components/button.html

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVGVzdC9UZXN0QnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXVDO0FBRXZDO0lBQUE7SUFzSUEsQ0FBQztJQXJJRyx3Q0FBd0M7SUFDakMsNkJBQWtCLEdBQXpCLFVBQThDLElBQVksRUFBRSxNQUFjLEVBQUUsUUFBVyxFQUFFLE1BQVk7UUFDakcsSUFBTSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxtQkFBbUI7UUFDckQsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDdkIsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxVQUFVO1FBQ3RDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWpELElBQU0sU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWTtRQUM3QyxTQUFTLENBQUMsSUFBSSxHQUFHLDZCQUE2QixDQUFDO1FBQy9DLFNBQVMsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQzlCLFNBQVMsQ0FBQyxLQUFLLEdBQUksaUJBQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPO1FBQ3RELFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCO1FBQzFELFNBQVMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7UUFFMUUsSUFBTSxLQUFLLEdB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R0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDL0MsNkNBQTZDO0lBR2pELENBQUM7SUFFYyxnQ0FBcUIsR0FBcEMsVUFBcUMsS0FBZTtRQUNoRCxJQUFJLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsSCxJQUFJLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUVNLHFCQUFVLEdBQWpCLFVBQWtCLE1BQWM7SUFFaEMsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0F0SUEsQUFzSUMsSUFBQTs7QUFDRCwwRUFBMEU7QUFDMUUsc0VBQXNFIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEREWVV0aWwgZnJvbSBcIi4uL1V0aWxzL0REWVV0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdEJ1dHRvbiB7XG4gICAgLy8gVCBleHRlbmRzIEZ1bmN0aW9uIOazm+Wei1TvvIzkuJTpnIDopoHnu6fmib/oh6pGdW5jdGlvblxuICAgIHN0YXRpYyB0ZXN0RGF0YVR5cGVCdXR0b248VCBleHRlbmRzIEZ1bmN0aW9uPihuYW1lOiBzdHJpbmcsIHBhcmVudDpjYy5Ob2RlLCBjYWxsYmFjazogVCwgdGFyZ2V0PzogYW55KSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbk5vZGUgPSBuZXcgY2MuTm9kZSgpOyAvLyDliJvlu7pidXR0b27nmoQgbm9kZeiKgueCuVxuICAgICAgICBidXR0b25Ob2RlLm5hbWUgPSBuYW1lO1xuICAgICAgICBidXR0b25Ob2RlLnBhcmVudCA9IHBhcmVudDsgLy8g5re75Yqg5Yiw5b2T5YmN6IqC54K5XG4gICAgICAgIGJ1dHRvbk5vZGUuc2V0UG9zaXRpb24obmV3IGNjLlZlYzIoMCwgNjUwKSk7XG4gICAgICAgIGJ1dHRvbk5vZGUuc2V0Q29udGVudFNpemUobmV3IGNjLlNpemUoMjAwLCAgNTApKTtcblxuICAgICAgICBjb25zdCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZSgpOyAvLyDliJvlu7rmjInpkq7mlofmnKznmoToioLngrlcbiAgICAgICAgbGFiZWxOb2RlLm5hbWUgPSAnZGF0YV90eXBlX2J1dHRvbl9sYWJlbF9ub2RlJztcbiAgICAgICAgbGFiZWxOb2RlLnBhcmVudCA9IGJ1dHRvbk5vZGU7XG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9ICBERFlVdGlsLmNvbG9ySGV4KDB4MDBBQUZGKTsgLy8g5paH5a2X6aKc6ImyXG4gICAgICAgIGxhYmVsTm9kZS5zZXRQb3NpdGlvbihuZXcgY2MuVmVjMigwLCAwKSk7IC8vIOiuvue9riBMYWJlbCDkvY3nva7lsYXkuK1cbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKGJ1dHRvbk5vZGUuZ2V0Q29udGVudFNpemUoKSk7IC8vIOiuvue9riBMYWJlbCDlpKflsI/kuI7mjInpkq7nm7jlkIxcblxuICAgICAgICBjb25zdCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBsYWJlbC5zdHJpbmcgPSAn54K55Ye75oiR5rWL6K+V5pWw5o2u57G75Z6LJztcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAzMDtcblxuICAgICAgICBjb25zdCBidXR0b24gPSBidXR0b25Ob2RlLmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICBidXR0b24ubm9kZS5vbignY2xpY2snLCBjYWxsYmFjaywgdGFyZ2V0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdGVzdE51bWJlckJ1dHRvbihwYXJlbnQ6Y2MuTm9kZSwgY29tcG9uZW50OiBzdHJpbmcsIGhhbmRsZXI6IHN0cmluZyk6IFtjYy5Ob2RlLCBjYy5Ob2RlXSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbk5vZGUgPSBuZXcgY2MuTm9kZSgndGVzdF9udW1iZXJfYnV0dG9uX25vZGUnKTtcbiAgICAgICAgcGFyZW50LmFkZENoaWxkKGJ1dHRvbk5vZGUpOyBcbiAgICAgICAgYnV0dG9uTm9kZS5zZXRQb3NpdGlvbihuZXcgY2MuVmVjMigwLCA2MDApKTtcbiAgICAgICAgLy9idXR0b25Ob2RlLnNldENvbnRlbnRTaXplKG5ldyBjYy5TaXplKDIwMCwgIDUwKSk7XG5cbiAgICAgICAgY29uc3QgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgICAgbGFiZWxOb2RlLm5hbWUgPSAnZGF0YV90eXBlX2J1dHRvbl9sYWJlbF9ub2RlJztcbiAgICAgICAgYnV0dG9uTm9kZS5hZGRDaGlsZChsYWJlbE5vZGUpO1xuICAgICAgICBsYWJlbE5vZGUuc2V0UG9zaXRpb24obmV3IGNjLlZlYzIoMCwgMCkpO1xuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSBjYy5Db2xvci5XSElURTtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IGxhYmVsTm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBsYWJlbC5zdHJpbmcgPSAn54K55Ye75oiR5rWL6K+VTnVtYmVy77yM5oiR5Y+v5piv6IO95aSf5o2i6KGM55qE5ZOm77yM5LiN5L+h5L2g55yL55yLSGVsbG8gd29ybCFZb3UgYXJlIHNvIGJlYXV0eWZ1bCBhbmQgbG92ZWx5JztcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAyMjtcbiAgICAgICAgbGFiZWwubGluZUhlaWdodCA9IDI2XG4gICAgICAgIGxhYmVsLnVzZVN5c3RlbUZvbnQgPSB0cnVlO1xuICAgICAgICBsYWJlbC5vdmVyZmxvdyA9IGNjLkxhYmVsLk92ZXJmbG93LlJFU0laRV9IRUlHSFQ7IC8vIOaWh+Wtl+aYvuekuui2heWHuuiMg+WbtOaXtueahOWkhOeQhuaWueW8j1xuICAgICAgICBsYWJlbC5lbmFibGVXcmFwVGV4dCA9IHRydWU7IC8vIOaYr+WQpuiHquWKqOaNouihjFxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uTEVGVDtcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xuXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSgyMDAsIDIyKTtcbiAgICBcbiAgICAgICAgY29uc3QgY2xpY2tFdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci50YXJnZXQgPSBwYXJlbnQ7XG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmN1c3RvbUV2ZW50RGF0YSA9IFwi5oiR5piv5pyA5ZCO5LiA5Liq5Y+C5pWwXCI7XG4gICAgICAgIFxuXG4gICAgICAgIGxldCBzcHJpdGUgPSBidXR0b25Ob2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xuICAgICAgICBzcHJpdGUudHJpbSA9IGZhbHNlOyAvLyDmmK/lkKbkvb/nlKjoo4HliarmqKHlvI9cbiAgICAgICAgc3ByaXRlLnR5cGUgPSBjYy5TcHJpdGUuVHlwZS5TTElDRUQ7XG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuYmFja2dyb3VuZFNwcml0ZUZyYW1lKEREWVV0aWwuY29sb3JIZXgoMHg5OTMzNDQpKTtcblxuXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGJ1dHRvbk5vZGUuYWRkQ29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgIGJ1dHRvbi50YXJnZXQgPSBidXR0b25Ob2RlO1xuICAgICAgICBidXR0b24ubm9ybWFsQ29sb3IgPSBjYy5Db2xvci5SRUQ7IC8vIOW4uOaAgeminOiJslxuICAgICAgICBidXR0b24ucHJlc3NlZENvbG9yID0gY2MuQ29sb3IuQkxVRTsgLy8g54K55Ye76aKc6ImyXG4gICAgICAgIGJ1dHRvbi5ob3ZlckNvbG9yID0gY2MuQ29sb3IuR1JFRU47IC8vIOaCrOWBnOminOiJslxuICAgICAgICBidXR0b24uZGlzYWJsZWRDb2xvciA9IGNjLkNvbG9yLkdSQVk7IC8vIOemgeeUqOminOiJslxuICAgICAgICBidXR0b24udHJhbnNpdGlvbiA9IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLkNPTE9SO1xuICAgICAgICBidXR0b24uY2xpY2tFdmVudHMucHVzaChjbGlja0V2ZW50SGFuZGxlcik7XG4gICAgICAgIHJldHVybiBbYnV0dG9uTm9kZSwgbGFiZWxOb2RlXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdGVzdHROdW1iZXJCdXR0b24yKHBhcmVudDpjYy5Ob2RlLCBjb21wb25lbnQ6IHN0cmluZywgaGFuZGxlcjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbk5vZGUgPSBuZXcgY2MuTm9kZSgndGVzdF9udW1iZXJfYnV0dG9uX25vZGUnKTtcbiAgICAgICAgYnV0dG9uTm9kZS5wYXJlbnQgPSBwYXJlbnQ7IFxuICAgICAgICBidXR0b25Ob2RlLnNldFBvc2l0aW9uKG5ldyBjYy5WZWMyKDAsIDYwMCkpO1xuICAgICAgICBidXR0b25Ob2RlLnNldENvbnRlbnRTaXplKG5ldyBjYy5TaXplKDIwMCwgIDUwKSk7XG4gICAgICAgIGJ1dHRvbk5vZGUuY29sb3IgPSBjYy5Db2xvci5HUkVFTjtcblxuICAgICAgICBjb25zdCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICBsYWJlbE5vZGUubmFtZSA9ICdkYXRhX3R5cGVfYnV0dG9uX2xhYmVsX25vZGUnO1xuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gYnV0dG9uTm9kZTtcbiAgICAgICAgbGFiZWxOb2RlLnNldFBvc2l0aW9uKG5ldyBjYy5WZWMyKDAsIDApKTtcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKGJ1dHRvbk5vZGUuZ2V0Q29udGVudFNpemUoKSk7XG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGxhYmVsLnN0cmluZyA9ICfngrnlh7vmiJHmtYvor5VOdW1iZXInO1xuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDMwO1xuICAgICAgICBsYWJlbC51c2VTeXN0ZW1Gb250ID0gdHJ1ZTtcbiAgICAgICAgbGFiZWwub3ZlcmZsb3cgPSBjYy5MYWJlbC5PdmVyZmxvdy5SRVNJWkVfSEVJR0hUOyAvLyDmloflrZfmmL7npLrotoXlh7rojIPlm7Tml7bnmoTlpITnkIbmlrnlvI/vvJroh6rpgILlupTpq5jluqZcbiAgICAgICAgbGFiZWwuZW5hYmxlV3JhcFRleHQgPSB0cnVlOyAvLyDmmK/lkKboh6rliqjmjaLooYxcbiAgICAgICAgbGFiZWwuaG9yaXpvbnRhbEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduLkxFRlQ7XG4gICAgXG4gICAgICAgIGNvbnN0IGNsaWNrRXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIudGFyZ2V0ID0gcGFyZW50O1xuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci5jdXN0b21FdmVudERhdGEgPSBcIuaIkeaYr+acgOWQjuS4gOS4quWPguaVsFwiO1xuXG4gICAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBuZXcgY2MuTm9kZSgnYmFja2dyb3VuZCcpO1xuICAgICAgICBiYWNrZ3JvdW5kLnNldFBvc2l0aW9uKG5ldyBjYy5WZWMyKDAsIDApKTtcbiAgICAgICAgYmFja2dyb3VuZC5zZXRDb250ZW50U2l6ZShidXR0b25Ob2RlLmdldENvbnRlbnRTaXplKCkpO1xuICAgICAgICBiYWNrZ3JvdW5kLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XG4gICAgICAgIFxuXG4gICAgICAgIGxldCBzcHJpdGUgPSBidXR0b25Ob2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xuICAgICAgICBzcHJpdGUudHJpbSA9IGZhbHNlOyAvLyDmmK/lkKbkvb/nlKjoo4HliarmqKHlvI9cbiAgICAgICAgc3ByaXRlLnR5cGUgPSBjYy5TcHJpdGUuVHlwZS5TTElDRUQ7XG5cblxuICAgICAgICBjb25zdCBidXR0b24gPSBidXR0b25Ob2RlLmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICBidXR0b24ubm9ybWFsQ29sb3IgPSBjYy5Db2xvci5SRUQ7IC8vIOW4uOaAgeminOiJslxuICAgICAgICBidXR0b24ucHJlc3NlZENvbG9yID0gY2MuQ29sb3IuQkxVRTsgLy8g54K55Ye76aKc6ImyXG4gICAgICAgIGJ1dHRvbi5ob3ZlckNvbG9yID0gY2MuQ29sb3IuR1JFRU47IC8vIOaCrOWBnOminOiJslxuICAgICAgICBidXR0b24uZGlzYWJsZWRDb2xvciA9IGNjLkNvbG9yLkdSQVk7IC8vIOemgeeUqOminOiJslxuICAgICAgICBidXR0b24udHJhbnNpdGlvbiA9IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLkNPTE9SO1xuICAgICAgICAvL2J1dHRvbi5jbGlja0V2ZW50cy5wdXNoKGNsaWNrRXZlbnRIYW5kbGVyKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGJhY2tncm91bmRTcHJpdGVGcmFtZShjb2xvcjogY2MuQ29sb3IpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIGxldCB0ZXh0dXJlID0gbmV3IGNjLlRleHR1cmUyRCgpO1xuICAgICAgICB0ZXh0dXJlLmluaXRXaXRoRGF0YShuZXcgVWludDhBcnJheShbY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgY29sb3IuYV0pLCBjYy5UZXh0dXJlMkQuUGl4ZWxGb3JtYXQuUkdCODg4LCAxLCAxKTtcbiAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xuICAgICAgICByZXR1cm4gc3ByaXRlRnJhbWU7XG4gICAgfVxuXG4gICAgc3RhdGljIHRlc3RCdXR0b24ocGFyZW50OmNjLk5vZGUpIHtcbiAgICAgXG4gICAgfVxufVxuLy8gY2MuU3ByaXRlIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8yLjQvYXBpL3poL2NsYXNzZXMvU3ByaXRlLmh0bWxcbi8vIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8yLjQvbWFudWFsL3poL2NvbXBvbmVudHMvYnV0dG9uLmh0bWwiXX0=