//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var egret;
(function (egret) {
    /**
     * @private
     */
    var Logger = (function () {
        function Logger() {
        }
        var __egretProto__ = Logger.prototype;
        /**
         * @private
         * @param logType
         */
        Logger.openLogByType = function (logType) {
            if (Logger.logFuncs == null) {
                Logger.logFuncs = { "error": console.error, "debug": console.debug, "warn": console.warn, "info": console.info, "log": console.log };
            }
            switch (logType) {
                case Logger.OFF:
                    console.error = function () {
                    };
                case Logger.ERROR:
                    console.warn = function () {
                    };
                case Logger.WARN:
                    console.info = function () {
                    };
                    console.log = function () {
                    };
                case Logger.INFO:
                    console.debug = function () {
                    };
                default: break;
            }
            switch (logType) {
                case Logger.ALL:
                    console.debug = Logger.logFuncs["debug"];
                case Logger.INFO:
                    console.log = Logger.logFuncs["log"];
                    console.info = Logger.logFuncs["info"];
                case Logger.WARN:
                    console.warn = Logger.logFuncs["warn"];
                case Logger.ERROR:
                    console.error = Logger.logFuncs["error"];
                default: break;
            }
        };
        /**
         * 表示出现了致命错误，开发者必须修复错误
         * @method egret.Logger.fatal
         * @param actionCode {string} 错误信息
         * @param value {Object} 错误描述信息
         */
        Logger.fatal = function (actionCode, value) {
            if (value === void 0) { value = null; }
            throw new Error(egret.Logger.getTraceCode("Fatal", actionCode, value));
        };
        /**
         * 记录正常的Log信息
         * @method egret.Logger.info
         * @param actionCode {string} 错误信息
         * @param value {Object} 错误描述信息
         */
        Logger.info = function (actionCode, value) {
            if (value === void 0) { value = null; }
            egret.Logger.traceToConsole("Info", actionCode, value);
        };
        /**
         * 记录可能会出现问题的Log信息
         * @method egret.Logger.warning
         * @param actionCode {string} 错误信息
         * @param value {Object} 错误描述信息
         */
        Logger.warning = function (actionCode, value) {
            if (value === void 0) { value = null; }
            egret.Logger.traceToConsole("Warning", actionCode, value);
        };
        /**
         * @private
         * @param type
         * @param actionCode
         * @param value
         */
        Logger.traceToConsole = function (type, actionCode, value) {
            console.log(egret.Logger.getTraceCode(type, actionCode, value));
        };
        /**
         * @private
         * @param type
         * @param actionCode
         * @param value
         * @returns {string}
         */
        Logger.getTraceCode = function (type, actionCode, value) {
            return "[" + type + "]" + actionCode + (value == null ? "" : ":" + value);
        };
        Logger.ALL = "all";
        Logger.DEBUG = "debug";
        Logger.INFO = "info";
        Logger.WARN = "warn";
        Logger.ERROR = "error";
        Logger.OFF = "off";
        return Logger;
    })();
    egret.Logger = Logger;
    Logger.prototype.__class__ = "egret.Logger";
    /**
     * @private
     */
    function getString(id) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var message = egret.egret_string_code[id];
        if (message) {
            var length = args.length;
            for (var i = 0; i < length; i++) {
                message = message.replace("{" + i + "}", args[i]);
            }
        }
        return message;
    }
    egret.getString = getString;
    /**
     * @private
     */
    function $error(code) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        args.unshift(code);
        var actionCode = getString.apply(null, args);
        if (actionCode) {
            Logger.fatal(actionCode);
        }
        else {
            Logger.fatal(getString(-1, code));
        }
    }
    egret.$error = $error;
    /**
     * @private
     */
    function $warn(code) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        args.unshift(code);
        var actionCode = getString.apply(null, args);
        if (actionCode) {
            Logger.warning(actionCode);
        }
        else {
            Logger.warning(getString(-1, code));
        }
    }
    egret.$warn = $warn;
})(egret || (egret = {}));
