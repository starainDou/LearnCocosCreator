
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Utils/DDYUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVXRpbHMvRERZVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7UUFTSSxLQUFLO1FBQ0csVUFBSyxHQUFhLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBMEI3QyxDQUFDO0lBbENpQixvQkFBWSxHQUExQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztTQUNyQztRQUNELE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBSUQ7Ozs7T0FJRztJQUNILDBCQUFRLEdBQVIsVUFBUyxHQUFvQjtRQUN6QixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRSxFQUFFLHdCQUF3QjtZQUNuRCxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxHQUFHLENBQUMsQ0FBQzthQUMvQjtpQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDN0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7YUFDbkI7WUFDRCxPQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO2FBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUUsRUFBRSx1Q0FBdUM7WUFDekUsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxXQUFXO2dCQUN2QyxPQUFPLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUMxRTtpQkFBTSxFQUFFLGFBQWE7Z0JBQ2xCLE9BQU8sSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUM5RjtTQUNKO2FBQU0sRUFBRSwrQ0FBK0M7WUFDcEQsSUFBTSxLQUFLLEdBQVUsR0FBRyxDQUFDLENBQUMsbURBQW1EO1lBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxHQUFHLEdBQUcsT0FBTyxHQUFHLE9BQU8sS0FBSyxDQUFDLENBQUM7U0FDeEU7SUFFTCxDQUFDO0lBQ0wsY0FBQztBQUFELENBcENBLEFBb0NDLElBQUE7QUFDRCxvREFBb0Q7QUFDcEQsK0ZBQStGO0FBQy9GLGtCQUFlLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEREWVV0aWwge1xuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRERZVXRpbDtcbiAgICBwdWJsaWMgc3RhdGljIF9nZXRJbnN0YW5jZSgpOiBERFlVdGlsIHtcbiAgICAgICAgaWYgKCFERFlVdGlsLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgRERZVXRpbC5faW5zdGFuY2UgPSBuZXcgRERZVXRpbCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBERFlVdGlsLl9pbnN0YW5jZTtcbiAgICB9XG5cbiAgICAvLyDpopzoibJcbiAgICBwcml2YXRlIGNvbG9yOiBjYy5Db2xvciA9IG5ldyBjYy5Db2xvcigpO1xuICAgIC8qKlxuICAgICAqIOagueaNruWNgeWFrei/m+WItuminOiJsiBzdHJpbmcg5oiWIG51bWJlciDlvpfliLAgQ29sb3JcbiAgICAgKiBAcGFyYW0gaGV4IOWtl+espuS4suaIluWNgeWFrei/m+WItuminOiJsiAnI0ZGRkZGRicgMHhGRkZGRkZcbiAgICAgKiBAcmV0dXJucyBjYy5Db2xvclxuICAgICAqL1xuICAgIGNvbG9ySGV4KGhleDogc3RyaW5nIHwgbnVtYmVyKTogY2MuQ29sb3Ige1xuICAgICAgICBpZiAodHlwZW9mIGhleCA9PT0gJ3N0cmluZycpIHsgLy8g6L+Z6YeMIGZvbyDooqvmlLbnqoTkuLogc3RyaW5nIOexu+Wei1xuICAgICAgICAgICAgaWYgKGhleC5pbmNsdWRlcygnMHgnKSkge1xuICAgICAgICAgICAgICAgIGhleCA9IGhleC5yZXBsYWNlKCcweCcsJyMnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWhleC5zdGFydHNXaXRoKFwiI1wiKSkge1xuICAgICAgICAgICAgICAgIGhleCA9IFwiI1wiICsgaGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLmNvbG9yLmZyb21IRVgoaGV4KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaGV4ID09PSAnbnVtYmVyJykgeyAvLyDov5nph4wgZm9vIOiiq+aUtueqhOS4uiBudW1iZXIg57G75Z6LIFvov5nph4zljYHlha3ov5vliLZudW1iZXJdXG4gICAgICAgICAgICBpZiAoKGhleCAmIDB4ZmYwMDAwMDApID09PSAwKSB7IC8vIDB4RkZGRkZGXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBjYy5Db2xvcigoaGV4ID4+IDE2KSAmIDB4ZmYsIChoZXggPj4gOCkgJiAweGZmLCBoZXggJiAweGZmKTtcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIDB4RkZGRkZGRkZcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGNjLkNvbG9yKChoZXggPj4gMjQpICYgMHhmZiwgKGhleCA+PiAxNikgJiAweGZmLCAoaGV4ID4+IDgpICYgMHhmZiwgaGV4ICYgMHhmZik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7IC8vIOi/memHjOe7mW5ldmVy57G75Z6L55qE5Y+Y6YeP6LWL5YC877yM6LWw5Yiw6L+Z6YeM6K+B5piO5Li66Z2e6KeE5a6a57G75Z6L77yM6YG/5YWN5paw5aKe55qE6IGU5ZCI57G75Z6L5rKh5pyJ5a+55bqU5a6e546wXG4gICAgICAgICAgICBjb25zdCBjaGVjazogbmV2ZXIgPSBoZXg7IC8vIFR5cGUgJ2Jvb2xlYW4nIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHR5cGUgJ25ldmVyJ1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aJp+ihjOi/memHjOivtOaYjuacieacquWkhOeQhueahOiBlOWQiOexu+WeiycgKyB0eXBlb2YgaGV4ICsgJ+S4jeiDvei1i+WAvOe7mScgKyB0eXBlb2YgY2hlY2spO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn1cbi8vIOWcqOS4gOS4quaWh+S7tuaIluaooeWdl+S4re+8jGV4cG9ydC9pbXBvcnTlj6/ku6XmnInlpJrkuKrvvIzkvYbmmK9leHBvcnQgZGVmYXVsdOWPquacieS4gOS4qlxuLy8gZXhwb3J0IOWvvOWHuuaXtu+8jOWvvOWFpemcgOimgeWKoCB7fe+8jGV4cG9ydCBkZWZhdWx05a+85Ye65pe25LiN6ZyA6KaBIHt977yM5aaCIGltcG9ydCBERFlVdGlsIGZyb20gXCIuL1V0aWxzL0REWVV0aWxcIjsg55So5Lu75oSP5Y+Y6YeP5o6l5pS2XG5leHBvcnQgZGVmYXVsdCBERFlVdGlsLl9nZXRJbnN0YW5jZSgpIl19