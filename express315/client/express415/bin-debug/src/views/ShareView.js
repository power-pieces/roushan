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
        //this.updateContent();
        NetManager.call("getShareList", { reciverId: DataCenter.id }, this.onGetShareList, this);
    };
    ShareView.prototype.onGetShareList = function (data, params) {
        this.updateContent(data.length);
        if (data.length > 10) {
            data.length = 10;
        }
        var posY = this._bg.height;
        for (var i = 0; i < data.length; i++) {
            //创建列表项
            var item = new ShareListItem(data[i]);
            item.x = 0;
            item.y = posY;
            this._spr.addChild(item);
            posY += item.height;
        }
        ViewManager.instance.showPanel(new ShareTipPanel(), true, false);
    };
    ShareView.prototype.updateContent = function (count) {
        var tf = new egret.BitmapText();
        var font = RES.getRes("pink_fnt");
        tf.font = font;
        tf.text = "X" + count;
        tf.x = 316;
        tf.y = 478;
        //this.addChild(tf);
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