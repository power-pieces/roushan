var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Mask = (function (_super) {
    __extends(Mask, _super);
    function Mask() {
        _super.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }
    Mask.prototype.init = function () {
        this.graphics.clear();
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };

    Mask.prototype.touchBeginHandler = function (e) {
        if (false == this.isLock) {
            ViewManager.instance.closePanel();
        }
    };
    return Mask;
})(egret.Shape);
