var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExchangeView = (function (_super) {
    __extends(ExchangeView, _super);
    function ExchangeView() {
        _super.call(this);
        this._hotZones = [
            new egret.Rectangle(428, 767, 163, 91),
            new egret.Rectangle(428, 895, 163, 91),
            new egret.Rectangle(428, 1021, 163, 91),
            new egret.Rectangle(428, 1145, 163, 91),
            new egret.Rectangle(428, 1273, 163, 91),
            new egret.Rectangle(428, 1399, 163, 91)
        ];
        this.createView();
    }
    ExchangeView.prototype.createView = function () {
        var bg = Texture.create("exchange_jpg");
        bg.touchEnabled = true;
        this._bg = bg;
        var scrollView = new egret.ScrollView(bg);
        this.addChild(scrollView);
        scrollView.height = ViewManager.stage.stageHeight;
        var rewardTF = new egret.BitmapText();
        var font = RES.getRes("pink_fnt");
        rewardTF.font = font;
        rewardTF.text = "x" + DataCenter.reward;
        rewardTF.x = 246;
        rewardTF.y = 48;
        this.addChild(rewardTF);
        this._rewardTF = rewardTF;
        this.touchEnabled = true;
        this.touchChildren = true;
    };
    ExchangeView.prototype.addListeners = function () {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };
    ExchangeView.prototype.removeListeners = function () {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };
    ExchangeView.prototype.touchBeginHandler = function (e) {
        for (var i = 0; i < this._hotZones.length; i++) {
            if (this._hotZones[i].contains(e.localX, e.localY)) {
                this.hotZoneActive(i);
                break;
            }
        }
    };
    ExchangeView.prototype.hotZoneActive = function (index) {
        var goodId = DataCenter.cfg.exchange_id[index];
        var need = DataCenter.cfg.exchange_need[index];
        if (DataCenter.reward < need) {
            ViewManager.instance.showPanel(new ExchangeResultPanel(3, goodId));
            return;
        }
        NetManager.call("exchange", { goodId: goodId, need: need }, this.onExchange, this);
    };
    ExchangeView.prototype.onExchange = function (data, params) {
        if (0 == data) {
            ViewManager.instance.showPanel(new ExchangeResultPanel(2, params.goodId));
        }
        else {
            ViewManager.instance.showPanel(new ExchangeResultPanel(1, params.goodId));
            DataCenter.reward -= params.need;
            this._rewardTF.text = "x" + DataCenter.reward;
        }
    };
    return ExchangeView;
})(AView);
ExchangeView.prototype.__class__ = "ExchangeView";
//# sourceMappingURL=ExchangeView.js.map