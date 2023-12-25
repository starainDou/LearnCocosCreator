##### cc.Node属性

```
// 获取node 属性并打印  
console.log('onload');
console.log(this.node.name);
var item = this.node.getChildByName("sprite");
var pos = item.getPosition();

// name: 获取节点的名字
// active:设置节点的可见性
// position:相对坐标，参考物是父亲节点
// rotation：旋转，顺时针为正，数学逆时针为正
// scale:缩放
// anchor:锚点，左下角(0,0),右上角(1,1) ps:超过这个范围看怎样
// Size:大小
// Color:环境颜色
// Opacity:透明度
// Skew:扭曲
// Group:分组
// parent:父亲节点的cc.Node
// children/childrenCount:孩子节点的数组
// tag:节点标签

var childer = this.children;
for(var i = 0; i < children.length; i++) {
	console.log(children[i].name);
}
console.log("this node children count:" + this.node.childrenCount);

var node_new = new cc.Node(); // 创建
this.node.addChild(node_new); // 添加
node_new.removeFromParent(); // 从父节点移除
this.node.removeAllChildren(); // 移除所有孩子节点

var item1 = this.node.getChildByName("item1"); // 查找
console.log(item1.name);

var item2 = cc.find("Canvas/parent/item2"); // 全局，时间消耗大
console.log(item2.name);

var pos = item2.getPosition(); // 相对位置
pos = cc.p(100, 100);
item2.setPosition();
```


* [CoCosCreator 2.2.1 入门 教程](https://zhuanlan.zhihu.com/p/651323718)