var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IntroView = (function (_super) {
    __extends(IntroView, _super);
    function IntroView() {
        _super.call(this);
        this._hotZones = [
            new egret.Rectangle(400, 0, 233, 100),
            new egret.Rectangle(94, 700, 453, 113),
            new egret.Rectangle(94, 827, 449, 113),
        ];
        this.createView();
    }
    IntroView.prototype.createView = function () {
        this.addChild(Texture.create("intro_jpg"));
        this.touchEnabled = true;
        this.touchChildren = false;
        var rewardTF = new egret.BitmapText();
        var font = RES.getRes("pink_fnt");
        rewardTF.font = font;
        rewardTF.text = "X" + DataCenter.reward;
        rewardTF.x = 230;
        rewardTF.y = 35;
        this.addChild(rewardTF);
        var remainTF = new egret.BitmapText();
        font = RES.getRes("white_fnt");
        remainTF.font = font;
        remainTF.text = "X" + DataCenter.remain;
        remainTF.x = 390;
        remainTF.y = 742;
        this.addChild(remainTF);
    };
    IntroView.prototype.addListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };
    IntroView.prototype.removeListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };
    IntroView.prototype.touchBeginHandler = function (e) {
        for (var i = 0; i < this._hotZones.length; i++) {
            if (this._hotZones[i].contains(e.localX, e.localY)) {
                this.hotZoneActive(i);
                break;
            }
        }
    };
    IntroView.prototype.hotZoneActive = function (index) {
        switch (index) {
            case 0:
                console.log("兑换奖品");
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.EXCHANGE_VIEW));
                break;
            case 1:
                console.log("开始游戏");
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.GAME_VIEW));
                break;
            case 2:
                console.log("分享");
                ViewManager.instance.showPanel(new ShareTipPanel(), true, false);
                break;
        }
    };
    return IntroView;
})(AView);
IntroView.prototype.__class__ = "IntroView";
//# sourceMappingURL=IntroView.js.map