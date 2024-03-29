
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Test/EncryptUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a332dTpU5lAwJ3oq8UdDUoW', 'EncryptUtil');
// Script/Test/EncryptUtil.ts

"use strict";
/*
 * @Author: dgflash
 * @Date: 2022-09-02 09:28:00
 * @LastEditors: doudianyu doudianyu@huixuanjiasu.com
 * @LastEditTime: 2024-03-11 21:09:16
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptUtil = void 0;
var crypto_es_1 = require("crypto-es");
/**
 * CryptoES 加密库封装
 * https://github.com/entronad/crypto-es
 *
 * 安装第三方库生效
 * npm install -g yarn
 * yarn add crypto-es
 */
var EncryptUtil = /** @class */ (function () {
    function EncryptUtil() {
    }
    /**
     * MD5加密
     * @param msg 加密信息
     */
    EncryptUtil.md5 = function (msg) {
        return crypto_es_1.default.MD5(msg).toString();
    };
    /** 初始化加密库 */
    EncryptUtil.initCrypto = function (key, iv) {
        this.key = key;
        this.iv = crypto_es_1.default.enc.Hex.parse(iv);
    };
    /**
     * AES 加密
     * @param msg 加密信息
     * @param key aes加密的key
     * @param iv  aes加密的iv
     */
    EncryptUtil.aesEncrypt = function (msg, key, iv) {
        return crypto_es_1.default.AES.encrypt(msg, this.key, {
            iv: this.iv,
            format: this.JsonFormatter
        }).toString();
    };
    /**
     * AES 解密
     * @param str 解密字符串
     * @param key aes加密的key
     * @param iv  aes加密的iv
     */
    EncryptUtil.aesDecrypt = function (str, key, iv) {
        var decrypted = crypto_es_1.default.AES.decrypt(str, this.key, {
            iv: this.iv,
            format: this.JsonFormatter
        });
        return decrypted.toString(crypto_es_1.default.enc.Utf8);
    };
    EncryptUtil.key = null;
    EncryptUtil.iv = null;
    EncryptUtil.JsonFormatter = {
        stringify: function (cipherParams) {
            var jsonObj = { ct: cipherParams.ciphertext.toString(crypto_es_1.default.enc.Base64) };
            if (cipherParams.iv) {
                jsonObj.iv = cipherParams.iv.toString();
            }
            if (cipherParams.salt) {
                jsonObj.s = cipherParams.salt.toString();
            }
            return JSON.stringify(jsonObj);
        },
        parse: function (jsonStr) {
            var jsonObj = JSON.parse(jsonStr);
            var cipherParams = crypto_es_1.default.lib.CipherParams.create({ ciphertext: crypto_es_1.default.enc.Base64.parse(jsonObj.ct) });
            if (jsonObj.iv) {
                cipherParams.iv = crypto_es_1.default.enc.Hex.parse(jsonObj.iv);
            }
            if (jsonObj.s) {
                cipherParams.salt = crypto_es_1.default.enc.Hex.parse(jsonObj.s);
            }
            return cipherParams;
        },
    };
    return EncryptUtil;
}());
exports.EncryptUtil = EncryptUtil;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVGVzdC9FbmNyeXB0VXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0dBS0c7OztBQUVILHVDQUFpQztBQUVqQzs7Ozs7OztHQU9HO0FBQ0g7SUFBQTtJQThFQSxDQUFDO0lBMUVHOzs7T0FHRztJQUNJLGVBQUcsR0FBVixVQUFXLEdBQVc7UUFDbEIsT0FBTyxtQkFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsYUFBYTtJQUNOLHNCQUFVLEdBQWpCLFVBQWtCLEdBQVcsRUFBRSxFQUFVO1FBQ3JDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxtQkFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLHNCQUFVLEdBQWpCLFVBQWtCLEdBQVcsRUFBRSxHQUFXLEVBQUUsRUFBVTtRQUNsRCxPQUFPLG1CQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FDdkIsR0FBRyxFQUNILElBQUksQ0FBQyxHQUFHLEVBQ1I7WUFDSSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWE7U0FDN0IsQ0FDSixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLHNCQUFVLEdBQWpCLFVBQWtCLEdBQVcsRUFBRSxHQUFXLEVBQUUsRUFBVTtRQUNsRCxJQUFNLFNBQVMsR0FBRyxtQkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQ2xDLEdBQUcsRUFDSCxJQUFJLENBQUMsR0FBRyxFQUNSO1lBQ0ksRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1gsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhO1NBQzdCLENBQ0osQ0FBQztRQUNGLE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxtQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBbERjLGVBQUcsR0FBVyxJQUFLLENBQUM7SUFDcEIsY0FBRSxHQUEyQixJQUFLLENBQUM7SUFtRG5DLHlCQUFhLEdBQUc7UUFDM0IsU0FBUyxFQUFFLFVBQVUsWUFBaUI7WUFDbEMsSUFBTSxPQUFPLEdBQVEsRUFBRSxFQUFFLEVBQUUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsbUJBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNuRixJQUFJLFlBQVksQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pCLE9BQU8sQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUMzQztZQUNELElBQUksWUFBWSxDQUFDLElBQUksRUFBRTtnQkFDbkIsT0FBTyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzVDO1lBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDRCxLQUFLLEVBQUUsVUFBVSxPQUFZO1lBQ3pCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEMsSUFBTSxZQUFZLEdBQUcsbUJBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FDakQsRUFBRSxVQUFVLEVBQUUsbUJBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FDeEQsQ0FBQztZQUNGLElBQUksT0FBTyxDQUFDLEVBQUUsRUFBRTtnQkFDWixZQUFZLENBQUMsRUFBRSxHQUFHLG1CQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2FBQ3ZEO1lBQ0QsSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFO2dCQUNYLFlBQVksQ0FBQyxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDeEQ7WUFDRCxPQUFPLFlBQVksQ0FBQztRQUN4QixDQUFDO0tBQ0osQ0FBQztJQUNOLGtCQUFDO0NBOUVELEFBOEVDLElBQUE7QUE5RVksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQEF1dGhvcjogZGdmbGFzaFxuICogQERhdGU6IDIwMjItMDktMDIgMDk6Mjg6MDBcbiAqIEBMYXN0RWRpdG9yczogZG91ZGlhbnl1IGRvdWRpYW55dUBodWl4dWFuamlhc3UuY29tXG4gKiBATGFzdEVkaXRUaW1lOiAyMDI0LTAzLTExIDIxOjA5OjE2XG4gKi9cblxuaW1wb3J0IGNyeXB0b2VzIGZyb20gXCJjcnlwdG8tZXNcIjtcblxuLyoqIFxuICogQ3J5cHRvRVMg5Yqg5a+G5bqT5bCB6KOFIFxuICogaHR0cHM6Ly9naXRodWIuY29tL2VudHJvbmFkL2NyeXB0by1lc1xuICogXG4gKiDlronoo4XnrKzkuInmlrnlupPnlJ/mlYhcbiAqIG5wbSBpbnN0YWxsIC1nIHlhcm5cbiAqIHlhcm4gYWRkIGNyeXB0by1lc1xuICovXG5leHBvcnQgY2xhc3MgRW5jcnlwdFV0aWwge1xuICAgIHByaXZhdGUgc3RhdGljIGtleTogc3RyaW5nID0gbnVsbCE7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaXY6IGNyeXB0b2VzLmxpYi5Xb3JkQXJyYXkgPSBudWxsITtcblxuICAgIC8qKlxuICAgICAqIE1ENeWKoOWvhlxuICAgICAqIEBwYXJhbSBtc2cg5Yqg5a+G5L+h5oGvXG4gICAgICovXG4gICAgc3RhdGljIG1kNShtc2c6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBjcnlwdG9lcy5NRDUobXNnKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8qKiDliJ3lp4vljJbliqDlr4blupMgKi9cbiAgICBzdGF0aWMgaW5pdENyeXB0byhrZXk6IHN0cmluZywgaXY6IHN0cmluZykge1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy5pdiA9IGNyeXB0b2VzLmVuYy5IZXgucGFyc2UoaXYpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFFUyDliqDlr4ZcbiAgICAgKiBAcGFyYW0gbXNnIOWKoOWvhuS/oeaBr1xuICAgICAqIEBwYXJhbSBrZXkgYWVz5Yqg5a+G55qEa2V5IFxuICAgICAqIEBwYXJhbSBpdiAgYWVz5Yqg5a+G55qEaXZcbiAgICAgKi9cbiAgICBzdGF0aWMgYWVzRW5jcnlwdChtc2c6IHN0cmluZywga2V5OiBzdHJpbmcsIGl2OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gY3J5cHRvZXMuQUVTLmVuY3J5cHQoXG4gICAgICAgICAgICBtc2csXG4gICAgICAgICAgICB0aGlzLmtleSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpdjogdGhpcy5pdixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuSnNvbkZvcm1hdHRlclxuICAgICAgICAgICAgfSxcbiAgICAgICAgKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFFUyDop6Plr4ZcbiAgICAgKiBAcGFyYW0gc3RyIOino+WvhuWtl+espuS4slxuICAgICAqIEBwYXJhbSBrZXkgYWVz5Yqg5a+G55qEa2V5IFxuICAgICAqIEBwYXJhbSBpdiAgYWVz5Yqg5a+G55qEaXZcbiAgICAgKi9cbiAgICBzdGF0aWMgYWVzRGVjcnlwdChzdHI6IHN0cmluZywga2V5OiBzdHJpbmcsIGl2OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBkZWNyeXB0ZWQgPSBjcnlwdG9lcy5BRVMuZGVjcnlwdChcbiAgICAgICAgICAgIHN0cixcbiAgICAgICAgICAgIHRoaXMua2V5LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGl2OiB0aGlzLml2LFxuICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5Kc29uRm9ybWF0dGVyXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZGVjcnlwdGVkLnRvU3RyaW5nKGNyeXB0b2VzLmVuYy5VdGY4KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBKc29uRm9ybWF0dGVyID0ge1xuICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uIChjaXBoZXJQYXJhbXM6IGFueSkge1xuICAgICAgICAgICAgY29uc3QganNvbk9iajogYW55ID0geyBjdDogY2lwaGVyUGFyYW1zLmNpcGhlcnRleHQudG9TdHJpbmcoY3J5cHRvZXMuZW5jLkJhc2U2NCkgfTtcbiAgICAgICAgICAgIGlmIChjaXBoZXJQYXJhbXMuaXYpIHtcbiAgICAgICAgICAgICAgICBqc29uT2JqLml2ID0gY2lwaGVyUGFyYW1zLml2LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2lwaGVyUGFyYW1zLnNhbHQpIHtcbiAgICAgICAgICAgICAgICBqc29uT2JqLnMgPSBjaXBoZXJQYXJhbXMuc2FsdC50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGpzb25PYmopO1xuICAgICAgICB9LFxuICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGpzb25TdHI6IGFueSkge1xuICAgICAgICAgICAgY29uc3QganNvbk9iaiA9IEpTT04ucGFyc2UoanNvblN0cik7XG4gICAgICAgICAgICBjb25zdCBjaXBoZXJQYXJhbXMgPSBjcnlwdG9lcy5saWIuQ2lwaGVyUGFyYW1zLmNyZWF0ZShcbiAgICAgICAgICAgICAgICB7IGNpcGhlcnRleHQ6IGNyeXB0b2VzLmVuYy5CYXNlNjQucGFyc2UoanNvbk9iai5jdCkgfSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoanNvbk9iai5pdikge1xuICAgICAgICAgICAgICAgIGNpcGhlclBhcmFtcy5pdiA9IGNyeXB0b2VzLmVuYy5IZXgucGFyc2UoanNvbk9iai5pdilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChqc29uT2JqLnMpIHtcbiAgICAgICAgICAgICAgICBjaXBoZXJQYXJhbXMuc2FsdCA9IGNyeXB0b2VzLmVuYy5IZXgucGFyc2UoanNvbk9iai5zKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNpcGhlclBhcmFtcztcbiAgICAgICAgfSxcbiAgICB9O1xufSJdfQ==