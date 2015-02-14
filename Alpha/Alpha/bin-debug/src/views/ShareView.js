/**
 * Created by Owen on 2015/2/15.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShareView = (function (_super) {
    __extends(ShareView, _super);
    function ShareView() {
        _super.call(this);
        this.width = Util.stage.stageWidth;
        this.height = Util.stage.stageHeight;
        this._shareBit = Util.createBitmapByName("share");
        this.addChild(this._shareBit);
        this.graphics.beginFill(0, 0.5);
        this.graphics.drawRect(0, 0, Util.stage.stageWidth, Util.stage.stageHeight);
        this.graphics.endFill();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
    }
    ShareView.prototype.touchTapHandler = function (e) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        this.parent.removeChild(this);
    };
    return ShareView;
})(egret.Sprite);
ShareView.prototype.__class__ = "ShareView";
//# sourceMappingURL=ShareView.js.map