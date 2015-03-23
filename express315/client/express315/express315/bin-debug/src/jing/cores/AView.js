var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* 显示的基础类
*/
var AView = (function (_super) {
    __extends(AView, _super);
    function AView() {
        _super.call(this);
    }
    AView.prototype.addListeners = function () {
    };
    AView.prototype.removeListeners = function () {
    };
    AView.prototype.dispose = function () {
        this.removeListeners();
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return AView;
})(egret.Sprite);
AView.prototype.__class__ = "AView";
//# sourceMappingURL=AView.js.map