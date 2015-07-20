var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TipsView = (function (_super) {
    __extends(TipsView, _super);
    function TipsView(contents) {
        if (contents === void 0) { contents = null; }
        _super.call(this);
        this._currentTip = null;
        this._tipIndex = 0;
        this._contentIndex = -1;
        this._contents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        this._mask = new egret.Sprite();
        if (null != contents) {
            this._contents = contents;
        }
        this.createUI();
    }
    TipsView.prototype.createUI = function () {
        this._mask.graphics.beginFill(0, 0.5);
        this._mask.graphics.drawRect(0, 0, Util.getStageWidth(), Util.getStageHeight());
        this._mask.graphics.endFill();
        this._mask.width = Util.getStageWidth();
        this._mask.height = Util.getStageHeight();
        this._mask.touchEnabled = true;
        Util.stage.addChild(this._mask);
        this._bg = Util.createBitmapByName("tip_bg");
        this.addChild(this._bg);
        this._tipTxt = new egret.TextField();
        this._tipTxt.size = 19;
        this._tipTxt.y = this._bg.height / 8 * 7;
        this._closeBtn = Util.createBitmapByName("close_btn");
        this._closeBtn.touchEnabled = true;
        this._closeBtn.x = this._bg.width - (this._closeBtn.width / 2) - 8;
        this._closeBtn.y = 0 - this._closeBtn.height / 2 + 8;
        this.addChild(this._closeBtn);
    };
    TipsView.prototype.addListeners = function () {
        this.touchEnabled = true;
        Util.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stage_touchBeginHandler, this);
    };
    TipsView.prototype.removeListeners = function () {
        this.touchEnabled = false;
        Util.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stage_touchBeginHandler, this);
    };
    TipsView.prototype.stage_touchBeginHandler = function (e) {
        this.showTip();
    };
    TipsView.prototype.showTip = function () {
        this._contentIndex++;
        if (this._contents.length <= this._contentIndex) {
            this.touchCloseHandler(null);
            return;
        }
        this._tipIndex = this._contents[this._contentIndex];
        if (this._currentTip != null) {
            if (this._tipTxt.parent != null) {
                this.removeChild(this._tipTxt);
            }
            this._currentTip.alpha = 1;
            var tw = egret.Tween.get(this._currentTip);
            tw.to({ alpha: 0.2 }, 200);
            tw.call(this.clearAndShowTip, this);
            return;
        }
        this.showNewTip();
    };
    TipsView.prototype.clearTip = function () {
        if (this._currentTip == null) {
            return;
        }
        if (this._currentTip.parent != null) {
            this._currentTip.parent.removeChild(this._currentTip);
        }
        this._currentTip = null;
    };
    TipsView.prototype.showNewTip = function () {
        this._currentTip = Util.createBitmapByName("tip_" + this._tipIndex);
        this.addChild(this._currentTip);
        this.addChild(this._closeBtn);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCloseHandler, this);
        this._currentTip.alpha = 0;
        var tw = egret.Tween.get(this._currentTip);
        tw.to({ alpha: 1 }, 200);
        tw.call(this.showTipTxt, this);
    };
    TipsView.prototype.touchCloseHandler = function (e) {
        NoticeManager.sendNotice(new Notice(NoticeCode.CLOSE_TIP_VIEW));
        this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCloseHandler, this);
        this._tipIndex = 0;
        if (this._tipTxt.parent != null) {
            this.removeChild(this._tipTxt);
        }
        this.clearTip();
        this.removeListeners();
        this.parent.removeChild(this);
        this._mask.parent.removeChild(this._mask);
    };
    TipsView.prototype.showTipTxt = function () {
        this._tipTxt.text = DataCenter.cfg.tipContents[this._tipIndex - 1];
        this._tipTxt.x = (this._bg.width - this._tipTxt.width) / 2;
        this.addChild(this._tipTxt);
    };
    TipsView.prototype.clearAndShowTip = function () {
        this.clearTip();
        this.showNewTip();
    };
    TipsView.prototype.getBgWidth = function () {
        return this._bg.width;
    };
    return TipsView;
})(egret.Sprite);
