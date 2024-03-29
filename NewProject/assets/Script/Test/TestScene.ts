
const { ccclass, property } = cc._decorator;

@ccclass // 注释类定义，该类是cocos组件类
export default class TestScene extends cc.Component {

    @property(cc.Integer)
    count: number = 0;

    public jumpSceneDataType() {
        cc.director.loadScene('TestDataTypeScene', () => {
            console.log('TestDataType scene onLaunched');
        });
    }
    public jumpSceneGeneric() {
        cc.director.loadScene('TestGenericScene', function(){
            console.log('TestGenericc scene onLaunched');
        });
    }

    public jumpSceneMathScene() {
       cc.director.loadScene('TestMathScene', this.onLaunchedMathScene);
    }
    private onLaunchedMathScene() {
        console.log('TestGenericc scene onLaunched');
    }

    public jumpButtonScene() {
        cc.director.preloadScene('TestButtonScene', (completedCount, totalCount, item) => {
            console.log('TestButton scene onProgressMethod', completedCount, totalCount);
        }, function (error) {
            console.log('TestButton scene onLoaded error:' + error);
        });
    }

    private onProgressMethod(completedCount: number, totalCount: number, item: any) {
        console.log('TestGenericc scene onProgressMethod', completedCount, totalCount);
    }
    public jumpNetworkScene() {
        cc.director.preloadScene('TestNetworkScene', this.onProgressMethod, (error) => {
            console.log('TestNetwork scene onLoaded error:' + error);
        });
    }

    // https://blog.csdn.net/dxt19980308/article/details/130288780
    public jumpLayoutScene() {
        cc.director.preloadScene('TestLayoutScene', (error) => {
            console.log('TestNetwork scene onLoaded error:' + error);
        });
    }
}

// @ccclass  注释类定义，该类是cocos组件类
// @property 注释属性定义，指定属性的属性、默认值等  @property(cc.)
// export function property(options?: {type?: any; visible?: boolean|(() => boolean); displayName?: string; tooltip?: string; multiline?: boolean; readonly?: boolean; min?: number; max?: number; step?: number; range?: number[]; slide?: boolean; serializable?: boolean; formerlySerializedAs?: string; editorOnly?: boolean; override?: boolean; animatable?: boolean} | any[]|Function|cc.ValueType|number|string|boolean): Function;
//	export function property(_target: Object, _key: any, _desc?: any): void;
// @menu 注释组件的菜单路径，在编辑器中创建实例时选择 @menu("Custom/UUID")
// @executionOrder 注释组件的执行顺序，控制组件update被调用顺序 @executionOrder(2)
// @requireComponent 注释组件依赖关系，指定当前组件必须依赖其他组件存在 @requireComponent(cc.RigiBody)
// @disallowMultiple 注释组件唯一性，当前组件在同一节点只能存在一个实例 
// @editor 注释自定义编辑器相关的信息，包括自定义的属性检查器等 @editor(cc.Prefab)