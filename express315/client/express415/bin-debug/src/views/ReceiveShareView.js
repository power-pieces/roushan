var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ReceiveShareView = (function (_super) {
    __extends(ReceiveShareView, _super);
    function ReceiveShareView() {
        _super.call(this);
        this._hotZones = [
            new egret.Rectangle(94, 561, 447, 108),
            new egret.Rectangle(96, 704, 447, 108)
        ];
        ReceiveShareView.self = this;
        this.createView();
    }
    ReceiveShareView.prototype.createView = function () {
        this._bg = Texture.create("receive_share_jpg");
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
    ReceiveShareView.prototype.updateContent = function () {
        var tf = new egret.TextField();
        tf.x = 72;
        tf.y = 406;
        tf.width = 500;
        tf.height = 109;
        tf.textAlign = egret.HorizontalAlign.CENTER;
        tf.lineSpacing = 20;
        tf.textFlow = [
            { text: "我不知道你是谁击倒了", style: { "textColor": 0x666666, "size": "30", "bold": true } },
            { text: "50", style: { "textColor": 0xFF0000, "size": "30", "bold": true } },
            { text: "个山寨的什么东西好像很厉害的样子", style: { "textColor": 0x666666, "size": "30", "bold": true } },
            { text: "" }
        ];
        this._spr.addChild(tf);
        var rewardTF = new egret.BitmapText();
        var font = RES.getRes("pink_fnt");
        rewardTF.font = font;
        rewardTF.text = "x" + DataCenter.reward;
        rewardTF.x = 380;
        rewardTF.y = 300;
        this._spr.addChild(rewardTF);
    };
    ReceiveShareView.prototype.addListeners = function () {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this._bg);
    };
    ReceiveShareView.prototype.removeListeners = function () {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this._bg);
    };
    ReceiveShareView.prototype.touchBeginHandler = function (e) {
        var self = ReceiveShareView.self;
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
    ReceiveShareView.prototype.hotZoneActive = function (index) {
        switch (index) {
            case 0:
                alert("送邀请人包子");
                break;
            case 1:
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.GAME_VIEW));
                break;
        }
    };
    return ReceiveShareView;
})(AView);
ReceiveShareView.prototype.__class__ = "ReceiveShareView";
//# sourceMappingURL=ReceiveShareView.js.map