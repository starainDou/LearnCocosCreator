"use strict";
cc._RF.push(module, '7ab0c1edKlE57ugyfyezF8s', 'DDYUtil');
// Script/Utils/DDYUtil.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DDYUtil = /** @class */ (function () {
    function DDYUtil() {
        // 颜色
        this.color = new cc.Color();
    }
    DDYUtil._getInstance = function () {
        if (!DDYUtil._instance) {
            DDYUtil._instance = new DDYUtil();
        }
        return DDYUtil._instance;
    };
    /**
     * 根据十六进制颜色 string 或 number 得到 Color
     * @param hex 字符串或十六进制颜色 '#FFFFFF' 0xFFFFFF
     * @returns cc.Color
     */
    DDYUtil.prototype.colorHex = function (hex) {
        if (typeof hex === 'string') { // 这里 foo 被收窄为 string 类型
            if (hex.includes('0x')) {
                hex = hex.replace('0x', '#');
            }
            else if (!hex.startsWith("#")) {
                hex = "#" + hex;
            }
            return this.color.fromHEX(hex);
        }
        else if (typeof hex === 'number') { // 这里 foo 被收窄为 number 类型 [这里十六进制number]
            if ((hex & 0xff000000) === 0) { // 0xFFFFFF
                return new cc.Color((hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);
            }
            else { // 0xFFFFFFFF
                return new cc.Color((hex >> 24) & 0xff, (hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff);
            }
        }
        else { // 这里给never类型的变量赋值，走到这里证明为非规定类型，避免新增的联合类型没有对应实现
            var check = hex; // Type 'boolean' is not assignable to type 'never'
            console.log('执行这里说明有未处理的联合类型' + typeof hex + '不能赋值给' + typeof check);
        }
    };
    return DDYUtil;
}());
// 在一个文件或模块中，export/import可以有多个，但是export default只有一个
// export 导出时，导入需要加 {}，export default导出时不需要 {}，如 import DDYUtil from "./Utils/DDYUtil"; 用任意变量接收
exports.default = DDYUtil._getInstance();

cc._RF.pop();