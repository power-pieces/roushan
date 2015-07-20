/**
 * Created by Owen on 2015/2/11.
 */
var TipsView = (function (_super) {
    __extends(TipsView, _super);
    function TipsView(contents) {
        if (contents === void 0) { contents = null; }
        _super.call(this);
        //当前显示
        this._currentTip = null;
        //当前tip索引
        this._tipIndex = 0;
        //指向的内容的索引
        this._contentIndex = -1;
        //内容
        this._contents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        //
        this._mask = new egret.Sprite();
        if (null != contents) {
            this._contents = contents;
        }
        this.createUI();
    }
    var __egretProto__ = TipsView.prototype;
    __egretProto__.createUI = function () {
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
    __egretProto__.addListeners = function () {
        this.touchEnabled = true;
        Util.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stage_touchBeginHandler, this);
    };
    __egretProto__.removeListeners = function () {
        this.touchEnabled = false;
        Util.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stage_touchBeginHandler, this);
    };
    __egretProto__.stage_touchBeginHandler = function (e) {
        this.showTip();
    };
    /*
     * 显示tip
     */
    __egretProto__.showTip = function () {
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
    /*
     * 清理tip
     */
    __egretProto__.clearTip = function () {
        if (this._currentTip == null) {
            return;
        }
        if (this._currentTip.parent != null) {
            this._currentTip.parent.removeChild(this._currentTip);
        }
        this._currentTip = null;
    };
    /*
     * 显示新的tip
     */
    __egretProto__.showNewTip = function () {
        this._currentTip = Util.createBitmapByName("tip_" + this._tipIndex);
        this.addChild(this._currentTip);
        this.addChild(this._closeBtn);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCloseHandler, this);
        this._currentTip.alpha = 0;
        var tw = egret.Tween.get(this._currentTip);
        tw.to({ alpha: 1 }, 200);
        tw.call(this.showTipTxt, this);
    };
    /*
     * 点击关闭按钮
     */
    __egretProto__.touchCloseHandler = function (e) {
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
    /*
     * 显示tiptxt
     */
    __egretProto__.showTipTxt = function () {
        this._tipTxt.text = DataCenter.cfg.tipContents[this._tipIndex - 1];
        this._tipTxt.x = (this._bg.width - this._tipTxt.width) / 2;
        this.addChild(this._tipTxt);
    };
    /*
     * 清理之前显示的并显示新的tip
     */
    __egretProto__.clearAndShowTip = function () {
        this.clearTip();
        this.showNewTip();
    };
    /*
     * 获取背景宽度
     */
    __egretProto__.getBgWidth = function () {
        return this._bg.width;
    };
    return TipsView;
})(egret.Sprite);
TipsView.prototype.__class__ = "TipsView";
//# sourceMappingURL=TipsView.js.map