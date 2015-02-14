/**
 * Created by Owen on 2015/2/12.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*
 * 界面基类
 */
var ViewBase = (function (_super) {
    __extends(ViewBase, _super);
    function ViewBase() {
        _super.call(this);
    }
    ViewBase.prototype.addListeners = function () {
    };
    ViewBase.prototype.removeListeners = function () {
    };
    return ViewBase;
})(egret.DisplayObjectContainer);
ViewBase.prototype.__class__ = "ViewBase";
