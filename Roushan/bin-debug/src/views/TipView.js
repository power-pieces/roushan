var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TipView = (function (_super) {
    __extends(TipView, _super);
    function TipView(tipSrc, isLock) {
        if (isLock === void 0) { isLock = false; }
        _super.call(this);
        this.width = Util.stage.stageWidth;
        this.height = Util.stage.stageHeight;
        this._tip = Util.createBitmapByName(tipSrc);
        this.addChild(this._tip);
        this.graphics.beginFill(0, 0.5);
        this.graphics.drawRect(0, 0, Util.stage.stageWidth, Util.stage.stageHeight);
        this.graphics.endFill();
        this.touchEnabled = !isLock;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
    }
    TipView.prototype.touchTapHandler = function (e) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        this.parent.removeChild(this);
    };
    return TipView;
})(egret.Sprite);
TipView.prototype.__class__ = "TipView";
