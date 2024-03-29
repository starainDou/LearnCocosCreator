"use strict";
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