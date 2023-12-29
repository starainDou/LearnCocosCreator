import DDYUtil from "../Utils/DDYUtil";

export default class TestButton {
    // T extends Function 泛型T，且需要继承自Function
    static testDataTypeButton<T extends Function>(name: string, parent:cc.Node, callback: T, target?: any) {
        const buttonNode = new cc.Node(); // 创建button的 node节点
        buttonNode.name = name;
        buttonNode.parent = parent; // 添加到当前节点
        buttonNode.setPosition(new cc.Vec2(0, 650));
        buttonNode.setContentSize(new cc.Size(200,  50));

        const labelNode = new cc.Node(); // 创建按钮文本的节点
        labelNode.name = 'data_type_button_label_node';
        labelNode.parent = buttonNode;
        labelNode.color =  DDYUtil.colorHex(0x00AAFF); // 文字颜色
        labelNode.setPosition(new cc.Vec2(0, 0)); // 设置 Label 位置居中
        labelNode.setContentSize(buttonNode.getContentSize()); // 设置 Label 大小与按钮相同

        const label = labelNode.addComponent(cc.Label);
        label.string = '点击我测试数据类型';
        label.fontSize = 30;

        const button = buttonNode.addComponent(cc.Button);
        button.node.on('click', callback, target);
    }

    static testNumberButton(parent:cc.Node, component: string, handler: string): [cc.Node, cc.Node] {
        const buttonNode = new cc.Node('test_number_button_node');
        parent.addChild(buttonNode); 
        buttonNode.setPosition(new cc.Vec2(0, 600));
        //buttonNode.setContentSize(new cc.Size(200,  50));

        const labelNode = new cc.Node();
        labelNode.name = 'data_type_button_label_node';
        buttonNode.addChild(labelNode);
        labelNode.setPosition(new cc.Vec2(0, 0));
        labelNode.color = cc.Color.WHITE;

        const label = labelNode.addComponent(cc.Label);
        label.string = '点击我测试Number，我可是能够换行的哦，不信你看看Hello worl!You are so beautyful and lovely';
        label.fontSize = 22;
        label.lineHeight = 26
        label.useSystemFont = true;
        label.overflow = cc.Label.Overflow.SHRINK; // 文字显示超出范围时的处理方式
        label.enableWrapText = true; // 是否自动换行
        label.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        label.verticalAlign = cc.Label.VerticalAlign.CENTER;

        labelNode.setContentSize(200, labelNode.height);
    
        const clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = parent;
        clickEventHandler.component = component;
        clickEventHandler.handler = handler;
        clickEventHandler.customEventData = "我是最后一个参数";
        

        let sprite = buttonNode.addComponent(cc.Sprite);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.trim = false; // 是否使用裁剪模式
        sprite.type = cc.Sprite.Type.SLICED;
        sprite.spriteFrame = this.backgroundSpriteFrame(DDYUtil.colorHex(0x993344));


        const button = buttonNode.addComponent(cc.Button);
        button.target = buttonNode;
        button.normalColor = cc.Color.CYAN;
        button.pressedColor = cc.Color.BLUE;
        button.transition = cc.Button.Transition.COLOR;
        button.clickEvents.push(clickEventHandler);
        return [buttonNode, labelNode];
    }

    static testtNumberButton2(parent:cc.Node, component: string, handler: string) {
        const buttonNode = new cc.Node('test_number_button_node');
        buttonNode.parent = parent; 
        buttonNode.setPosition(new cc.Vec2(0, 600));
        buttonNode.setContentSize(new cc.Size(200,  50));
        buttonNode.color = cc.Color.GREEN;

        const labelNode = new cc.Node();
        labelNode.name = 'data_type_button_label_node';
        labelNode.parent = buttonNode;
        labelNode.setPosition(new cc.Vec2(0, 0));
        labelNode.setContentSize(buttonNode.getContentSize());
        labelNode.color = cc.Color.WHITE;

        const label = labelNode.addComponent(cc.Label);
        label.string = '点击我测试Number';
        label.fontSize = 30;
        label.useSystemFont = true;
        //label.overflow = cc.Label.Overflow.RESIZE_HEIGHT; // 文字显示超出范围时的处理方式：自适应宽度
        label.enableWrapText = true; // 是否自动换行
        label.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
    
        const clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = parent;
        clickEventHandler.component = component;
        clickEventHandler.handler = handler;
        clickEventHandler.customEventData = "我是最后一个参数";

        const background = new cc.Node('background');
        background.setPosition(new cc.Vec2(0, 0));
        background.setContentSize(buttonNode.getContentSize());
        background.color = cc.Color.WHITE;
        

        let sprite = buttonNode.addComponent(cc.Sprite);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.trim = false; // 是否使用裁剪模式
        sprite.type = cc.Sprite.Type.SLICED;


        const button = buttonNode.addComponent(cc.Button);
        button.normalColor = cc.Color.CYAN;
        button.pressedColor = cc.Color.BLUE;
        button.transition = cc.Button.Transition.COLOR;
        //button.clickEvents.push(clickEventHandler);
        
        
    }

    private static backgroundSpriteFrame(color: cc.Color): cc.SpriteFrame {
        let texture = new cc.Texture2D();
        texture.initWithData(new Uint8Array([color.r, color.g, color.b, color.a]), cc.Texture2D.PixelFormat.RGB888, 1, 1);
        let spriteFrame = new cc.SpriteFrame(texture);
        return spriteFrame;
    }

    static testButton(parent:cc.Node) {
     
    }
}
// cc.Sprite https://docs.cocos.com/creator/2.4/api/zh/classes/Sprite.html
// https://docs.cocos.com/creator/2.4/manual/zh/components/button.html