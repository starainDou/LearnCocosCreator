
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
        label.overflow = cc.Label.Overflow.SHRINK; // 文字显示超出范围时的处理方式
        label.enableWrapText = true; // 是否自动换行
        label.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        labelNode.setContentSize(200, labelNode.height);
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
        button.normalColor = cc.Color.CYAN;
        button.pressedColor = cc.Color.BLUE;
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
        //label.overflow = cc.Label.Overflow.RESIZE_HEIGHT; // 文字显示超出范围时的处理方式：自适应宽度
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
        button.normalColor = cc.Color.CYAN;
        button.pressedColor = cc.Color.BLUE;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVGVzdC9UZXN0QnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXVDO0FBRXZDO0lBQUE7SUFrSUEsQ0FBQztJQWpJRyx3Q0FBd0M7SUFDakMsNkJBQWtCLEdBQXpCLFVBQThDLElBQVksRUFBRSxNQUFjLEVBQUUsUUFBVyxFQUFFLE1BQVk7UUFDakcsSUFBTSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxtQkFBbUI7UUFDckQsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDdkIsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxVQUFVO1FBQ3RDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWpELElBQU0sU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsWUFBWTtRQUM3QyxTQUFTLENBQUMsSUFBSSxHQUFHLDZCQUE2QixDQUFDO1FBQy9DLFNBQVMsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQzlCLFNBQVMsQ0FBQyxLQUFLLEdBQUksaUJBQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPO1FBQ3RELFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCO1FBQzFELFNBQVMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7UUFFMUUsSUFBTSxLQUFLLEdB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SSxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxxQkFBVSxHQUFqQixVQUFrQixNQUFjO0lBRWhDLENBQUM7SUFDTCxpQkFBQztBQUFELENBbElBLEFBa0lDLElBQUE7O0FBQ0QsMEVBQTBFO0FBQzFFLHNFQUFzRSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBERFlVdGlsIGZyb20gXCIuLi9VdGlscy9ERFlVdGlsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RCdXR0b24ge1xuICAgIC8vIFQgZXh0ZW5kcyBGdW5jdGlvbiDms5vlnotU77yM5LiU6ZyA6KaB57un5om/6IeqRnVuY3Rpb25cbiAgICBzdGF0aWMgdGVzdERhdGFUeXBlQnV0dG9uPFQgZXh0ZW5kcyBGdW5jdGlvbj4obmFtZTogc3RyaW5nLCBwYXJlbnQ6Y2MuTm9kZSwgY2FsbGJhY2s6IFQsIHRhcmdldD86IGFueSkge1xuICAgICAgICBjb25zdCBidXR0b25Ob2RlID0gbmV3IGNjLk5vZGUoKTsgLy8g5Yib5bu6YnV0dG9u55qEIG5vZGXoioLngrlcbiAgICAgICAgYnV0dG9uTm9kZS5uYW1lID0gbmFtZTtcbiAgICAgICAgYnV0dG9uTm9kZS5wYXJlbnQgPSBwYXJlbnQ7IC8vIOa3u+WKoOWIsOW9k+WJjeiKgueCuVxuICAgICAgICBidXR0b25Ob2RlLnNldFBvc2l0aW9uKG5ldyBjYy5WZWMyKDAsIDY1MCkpO1xuICAgICAgICBidXR0b25Ob2RlLnNldENvbnRlbnRTaXplKG5ldyBjYy5TaXplKDIwMCwgIDUwKSk7XG5cbiAgICAgICAgY29uc3QgbGFiZWxOb2RlID0gbmV3IGNjLk5vZGUoKTsgLy8g5Yib5bu65oyJ6ZKu5paH5pys55qE6IqC54K5XG4gICAgICAgIGxhYmVsTm9kZS5uYW1lID0gJ2RhdGFfdHlwZV9idXR0b25fbGFiZWxfbm9kZSc7XG4gICAgICAgIGxhYmVsTm9kZS5wYXJlbnQgPSBidXR0b25Ob2RlO1xuICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSAgRERZVXRpbC5jb2xvckhleCgweDAwQUFGRik7IC8vIOaWh+Wtl+minOiJslxuICAgICAgICBsYWJlbE5vZGUuc2V0UG9zaXRpb24obmV3IGNjLlZlYzIoMCwgMCkpOyAvLyDorr7nva4gTGFiZWwg5L2N572u5bGF5LitXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZShidXR0b25Ob2RlLmdldENvbnRlbnRTaXplKCkpOyAvLyDorr7nva4gTGFiZWwg5aSn5bCP5LiO5oyJ6ZKu55u45ZCMXG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gJ+eCueWHu+aIkea1i+ivleaVsOaNruexu+Weiyc7XG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMzA7XG5cbiAgICAgICAgY29uc3QgYnV0dG9uID0gYnV0dG9uTm9kZS5hZGRDb21wb25lbnQoY2MuQnV0dG9uKTtcbiAgICAgICAgYnV0dG9uLm5vZGUub24oJ2NsaWNrJywgY2FsbGJhY2ssIHRhcmdldCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRlc3ROdW1iZXJCdXR0b24ocGFyZW50OmNjLk5vZGUsIGNvbXBvbmVudDogc3RyaW5nLCBoYW5kbGVyOiBzdHJpbmcpOiBbY2MuTm9kZSwgY2MuTm9kZV0ge1xuICAgICAgICBjb25zdCBidXR0b25Ob2RlID0gbmV3IGNjLk5vZGUoJ3Rlc3RfbnVtYmVyX2J1dHRvbl9ub2RlJyk7XG4gICAgICAgIHBhcmVudC5hZGRDaGlsZChidXR0b25Ob2RlKTsgXG4gICAgICAgIGJ1dHRvbk5vZGUuc2V0UG9zaXRpb24obmV3IGNjLlZlYzIoMCwgNjAwKSk7XG4gICAgICAgIC8vYnV0dG9uTm9kZS5zZXRDb250ZW50U2l6ZShuZXcgY2MuU2l6ZSgyMDAsICA1MCkpO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICAgIGxhYmVsTm9kZS5uYW1lID0gJ2RhdGFfdHlwZV9idXR0b25fbGFiZWxfbm9kZSc7XG4gICAgICAgIGJ1dHRvbk5vZGUuYWRkQ2hpbGQobGFiZWxOb2RlKTtcbiAgICAgICAgbGFiZWxOb2RlLnNldFBvc2l0aW9uKG5ldyBjYy5WZWMyKDAsIDApKTtcbiAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gJ+eCueWHu+aIkea1i+ivlU51bWJlcu+8jOaIkeWPr+aYr+iDveWkn+aNouihjOeahOWTpu+8jOS4jeS/oeS9oOeci+eci0hlbGxvIHdvcmwhWW91IGFyZSBzbyBiZWF1dHlmdWwgYW5kIGxvdmVseSc7XG4gICAgICAgIGxhYmVsLmZvbnRTaXplID0gMjI7XG4gICAgICAgIGxhYmVsLmxpbmVIZWlnaHQgPSAyNlxuICAgICAgICBsYWJlbC51c2VTeXN0ZW1Gb250ID0gdHJ1ZTtcbiAgICAgICAgbGFiZWwub3ZlcmZsb3cgPSBjYy5MYWJlbC5PdmVyZmxvdy5TSFJJTks7IC8vIOaWh+Wtl+aYvuekuui2heWHuuiMg+WbtOaXtueahOWkhOeQhuaWueW8j1xuICAgICAgICBsYWJlbC5lbmFibGVXcmFwVGV4dCA9IHRydWU7IC8vIOaYr+WQpuiHquWKqOaNouihjFxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uTEVGVDtcbiAgICAgICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xuXG4gICAgICAgIGxhYmVsTm9kZS5zZXRDb250ZW50U2l6ZSgyMDAsIGxhYmVsTm9kZS5oZWlnaHQpO1xuICAgIFxuICAgICAgICBjb25zdCBjbGlja0V2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLnRhcmdldCA9IHBhcmVudDtcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIuY3VzdG9tRXZlbnREYXRhID0gXCLmiJHmmK/mnIDlkI7kuIDkuKrlj4LmlbBcIjtcbiAgICAgICAgXG5cbiAgICAgICAgbGV0IHNwcml0ZSA9IGJ1dHRvbk5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XG4gICAgICAgIHNwcml0ZS50cmltID0gZmFsc2U7IC8vIOaYr+WQpuS9v+eUqOijgeWJquaooeW8j1xuICAgICAgICBzcHJpdGUudHlwZSA9IGNjLlNwcml0ZS5UeXBlLlNMSUNFRDtcbiAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5iYWNrZ3JvdW5kU3ByaXRlRnJhbWUoRERZVXRpbC5jb2xvckhleCgweDk5MzM0NCkpO1xuXG5cbiAgICAgICAgY29uc3QgYnV0dG9uID0gYnV0dG9uTm9kZS5hZGRDb21wb25lbnQoY2MuQnV0dG9uKTtcbiAgICAgICAgYnV0dG9uLnRhcmdldCA9IGJ1dHRvbk5vZGU7XG4gICAgICAgIGJ1dHRvbi5ub3JtYWxDb2xvciA9IGNjLkNvbG9yLkNZQU47XG4gICAgICAgIGJ1dHRvbi5wcmVzc2VkQ29sb3IgPSBjYy5Db2xvci5CTFVFO1xuICAgICAgICBidXR0b24udHJhbnNpdGlvbiA9IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLkNPTE9SO1xuICAgICAgICBidXR0b24uY2xpY2tFdmVudHMucHVzaChjbGlja0V2ZW50SGFuZGxlcik7XG4gICAgICAgIHJldHVybiBbYnV0dG9uTm9kZSwgbGFiZWxOb2RlXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdGVzdHROdW1iZXJCdXR0b24yKHBhcmVudDpjYy5Ob2RlLCBjb21wb25lbnQ6IHN0cmluZywgaGFuZGxlcjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbk5vZGUgPSBuZXcgY2MuTm9kZSgndGVzdF9udW1iZXJfYnV0dG9uX25vZGUnKTtcbiAgICAgICAgYnV0dG9uTm9kZS5wYXJlbnQgPSBwYXJlbnQ7IFxuICAgICAgICBidXR0b25Ob2RlLnNldFBvc2l0aW9uKG5ldyBjYy5WZWMyKDAsIDYwMCkpO1xuICAgICAgICBidXR0b25Ob2RlLnNldENvbnRlbnRTaXplKG5ldyBjYy5TaXplKDIwMCwgIDUwKSk7XG4gICAgICAgIGJ1dHRvbk5vZGUuY29sb3IgPSBjYy5Db2xvci5HUkVFTjtcblxuICAgICAgICBjb25zdCBsYWJlbE5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICBsYWJlbE5vZGUubmFtZSA9ICdkYXRhX3R5cGVfYnV0dG9uX2xhYmVsX25vZGUnO1xuICAgICAgICBsYWJlbE5vZGUucGFyZW50ID0gYnV0dG9uTm9kZTtcbiAgICAgICAgbGFiZWxOb2RlLnNldFBvc2l0aW9uKG5ldyBjYy5WZWMyKDAsIDApKTtcbiAgICAgICAgbGFiZWxOb2RlLnNldENvbnRlbnRTaXplKGJ1dHRvbk5vZGUuZ2V0Q29udGVudFNpemUoKSk7XG4gICAgICAgIGxhYmVsTm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGxhYmVsLnN0cmluZyA9ICfngrnlh7vmiJHmtYvor5VOdW1iZXInO1xuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDMwO1xuICAgICAgICBsYWJlbC51c2VTeXN0ZW1Gb250ID0gdHJ1ZTtcbiAgICAgICAgLy9sYWJlbC5vdmVyZmxvdyA9IGNjLkxhYmVsLk92ZXJmbG93LlJFU0laRV9IRUlHSFQ7IC8vIOaWh+Wtl+aYvuekuui2heWHuuiMg+WbtOaXtueahOWkhOeQhuaWueW8j++8muiHqumAguW6lOWuveW6plxuICAgICAgICBsYWJlbC5lbmFibGVXcmFwVGV4dCA9IHRydWU7IC8vIOaYr+WQpuiHquWKqOaNouihjFxuICAgICAgICBsYWJlbC5ob3Jpem9udGFsQWxpZ24gPSBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uTEVGVDtcbiAgICBcbiAgICAgICAgY29uc3QgY2xpY2tFdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci50YXJnZXQgPSBwYXJlbnQ7XG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIuaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmN1c3RvbUV2ZW50RGF0YSA9IFwi5oiR5piv5pyA5ZCO5LiA5Liq5Y+C5pWwXCI7XG5cbiAgICAgICAgY29uc3QgYmFja2dyb3VuZCA9IG5ldyBjYy5Ob2RlKCdiYWNrZ3JvdW5kJyk7XG4gICAgICAgIGJhY2tncm91bmQuc2V0UG9zaXRpb24obmV3IGNjLlZlYzIoMCwgMCkpO1xuICAgICAgICBiYWNrZ3JvdW5kLnNldENvbnRlbnRTaXplKGJ1dHRvbk5vZGUuZ2V0Q29udGVudFNpemUoKSk7XG4gICAgICAgIGJhY2tncm91bmQuY29sb3IgPSBjYy5Db2xvci5XSElURTtcbiAgICAgICAgXG5cbiAgICAgICAgbGV0IHNwcml0ZSA9IGJ1dHRvbk5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XG4gICAgICAgIHNwcml0ZS50cmltID0gZmFsc2U7IC8vIOaYr+WQpuS9v+eUqOijgeWJquaooeW8j1xuICAgICAgICBzcHJpdGUudHlwZSA9IGNjLlNwcml0ZS5UeXBlLlNMSUNFRDtcblxuXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGJ1dHRvbk5vZGUuYWRkQ29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgIGJ1dHRvbi5ub3JtYWxDb2xvciA9IGNjLkNvbG9yLkNZQU47XG4gICAgICAgIGJ1dHRvbi5wcmVzc2VkQ29sb3IgPSBjYy5Db2xvci5CTFVFO1xuICAgICAgICBidXR0b24udHJhbnNpdGlvbiA9IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLkNPTE9SO1xuICAgICAgICAvL2J1dHRvbi5jbGlja0V2ZW50cy5wdXNoKGNsaWNrRXZlbnRIYW5kbGVyKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGJhY2tncm91bmRTcHJpdGVGcmFtZShjb2xvcjogY2MuQ29sb3IpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIGxldCB0ZXh0dXJlID0gbmV3IGNjLlRleHR1cmUyRCgpO1xuICAgICAgICB0ZXh0dXJlLmluaXRXaXRoRGF0YShuZXcgVWludDhBcnJheShbY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgY29sb3IuYV0pLCBjYy5UZXh0dXJlMkQuUGl4ZWxGb3JtYXQuUkdCODg4LCAxLCAxKTtcbiAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xuICAgICAgICByZXR1cm4gc3ByaXRlRnJhbWU7XG4gICAgfVxuXG4gICAgc3RhdGljIHRlc3RCdXR0b24ocGFyZW50OmNjLk5vZGUpIHtcbiAgICAgXG4gICAgfVxufVxuLy8gY2MuU3ByaXRlIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8yLjQvYXBpL3poL2NsYXNzZXMvU3ByaXRlLmh0bWxcbi8vIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8yLjQvbWFudWFsL3poL2NvbXBvbmVudHMvYnV0dG9uLmh0bWwiXX0=