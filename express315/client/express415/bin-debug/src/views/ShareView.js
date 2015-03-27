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
        this._hotZones = [
            new egret.Rectangle(100, 563, 440, 110)
        ];
        ShareView.self = this;
        this.createView();
    }
    ShareView.prototype.createView = function () {
        this._bg = Texture.create("share_jpg");
        this._bg.touchEnabled = true;
        this._spr = new egret.Sprite();
        this._spr.addChild(this._bg);
        //this.addChild(this._spr);
        this.touchChildren = this.touchEnabled = true;
        var scrollView = new egret.ScrollView(this._spr);
        scrollView.height = ViewManager.stage.stageHeight;
        this.addChild(scrollView);
        scrollView.stage = ViewManager.stage;
        this.updateContent();
    };
    ShareView.prototype.updateContent = function () {
        var tf = new egret.TextField();
        tf.x = 45;
        tf.y = 420;
        tf.width = 546;
        tf.height = 109;
        tf.textAlign = egret.HorizontalAlign.CENTER;
        tf.lineSpacing = 20;
        tf.textFlow = [
            { text: "呵呵呵人品好，获得朋友赠送\n", style: { "textColor": 0x666666, "size": "30", "bold": true } },
            { text: "包子", style: { "textColor": 0x666666, "size": "40", "bold": true } },
            { text: " x1", style: { "textColor": 0xFF0000, "size": "40", "bold": true } },
            { text: "" }
        ];
        this._spr.addChild(tf);
    };
    ShareView.prototype.addListeners = function () {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this._bg);
    };
    ShareView.prototype.removeListeners = function () {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this._bg);
    };
    ShareView.prototype.touchBeginHandler = function (e) {
        var self = ShareView.self;
        for (var i = 0; i < self._hotZones.length; i++) {
            if (self._hotZones[i].contains(e.localX, e.localY)) {
                self.hotZoneActive(i);
                break;
            }
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    ShareView.prototype.hotZoneActive = function (index) {
        switch (index) {
            case 0:
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.GAME_VIEW));
                break;
        }
    };
    return ShareView;
})(AView);
ShareView.prototype.__class__ = "ShareView";
//# sourceMappingURL=ShareView.js.map