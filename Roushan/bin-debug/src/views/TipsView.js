/**
 * Created by Owen on 2015/2/11.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TipsView = (function (_super) {
    __extends(TipsView, _super);
    function TipsView() {
        _super.call(this);
        //当前显示
        this._currentTip = null;
        //当前tip索引
        this._tipIndex = 0;
        //总数量
        this._totalNum = 11;
        this.createUI();
    }
    TipsView.prototype.createUI = function () {
        this._bg = Util.createBitmapByName("tip_bg");
        this.addChild(this._bg);
        this._tipTxt = new egret.TextField();
        this._tipTxt.size = 19;
        this._tipTxt.y = this._bg.height / 8 * 7;
    };
    /*
     * 显示tip
     */
    TipsView.prototype.showTip = function () {
        this._tipTxt.text = DataCenter.cfg.tipContents[this._tipIndex];
        this._tipTxt.x = (this._bg.width - this._tipTxt.width) / 2;
        this._tipIndex++;
        if (this._totalNum < this._tipIndex) {
            NoticeManager.sendNotice(new Notice(NoticeCode.CLOSE_TIP_VIEW));
            this._tipIndex = 0;
            return;
        }
        if (this._currentTip != null) {
            this._currentTip.parent.removeChild(this._currentTip);
            this._currentTip = null;
        }
        this._currentTip = Util.createBitmapByName("tip_" + this._tipIndex);
        this.addChild(this._currentTip);
        this.addChild(this._tipTxt);
    };
    /*
     * 获取背景宽度
     */
    TipsView.prototype.getBgWidth = function () {
        return this._bg.width;
    };
    return TipsView;
})(egret.Sprite);
TipsView.prototype.__class__ = "TipsView";
