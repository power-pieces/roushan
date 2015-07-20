var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
