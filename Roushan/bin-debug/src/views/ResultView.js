/**
 * Created by Owen on 2015/2/12.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ResultView = (function (_super) {
    __extends(ResultView, _super);
    function ResultView() {
        _super.call(this);
        this._bitmapNums = [];
        this.createUI();
    }
    ResultView.prototype.createUI = function () {
        this._bg = Util.createBitmapByName("game_bg");
        this.addChild(this._bg);
        this._result = Util.createBitmapByName("result_bg");
        this._result.x = (this._bg.width - this._result.width) / 2;
        this.addChild(this._result);
        this._againBtn = Util.createBitmapByName("again_btn");
        this._againBtn.x = (this._bg.width - this._againBtn.width) / 5;
        this._againBtn.y = (this._bg.height - this._againBtn.height) / 3 * 2;
        this.addChild(this._againBtn);
        this._againBtn.touchEnabled = true;
        this._shareBtn = Util.createBitmapByName("share_btn");
        this._shareBtn.x = (this._bg.width - this._shareBtn.width) / 5 * 4;
        this._shareBtn.y = (this._bg.height - this._shareBtn.height) / 3 * 2;
        this.addChild(this._shareBtn);
        this._shareBtn.touchEnabled = true;
        var r2 = Util.createBitmapByName("r2");
        r2.x = (this._bg.width - r2.width) / 5;
        r2.y = this._bg.height - r2.height;
        this.addChild(r2);
        var r3 = Util.createBitmapByName("r3");
        r3.x = (this._bg.width - r3.width) / 5 * 4;
        r3.y = this._bg.height - r3.height;
        this.addChild(r3);
        var r1 = Util.createBitmapByName("r1");
        r1.x = (this._bg.width - r1.width) / 2;
        r1.y = this._bg.height - r1.height;
        this.addChild(r1);
        var r4 = Util.createBitmapByName("r4");
        r4.x = (this._bg.width - r4.width) / 2;
        r4.y = this._bg.height - r4.height;
        this.addChild(r4);
        var txtY = this._bg.height / 3;
        var txt = this.createTxt();
        txt.text = "您只用了      个方块";
        txt.x = (this._bg.width - txt.width) / 2;
        txt.y = txtY;
        txtY += 40;
        txt = this.createTxt();
        txt.text = " 就打败了肉山大魔王";
        txt.x = (this._bg.width - txt.width) / 2;
        txt.y = txtY;
        txtY += 60;
        txt = this.createTxt();
        txt.text = "超过了      %的玩家";
        txt.x = (this._bg.width - txt.width) / 2;
        txt.y = txtY;
        txtY += 100;
        this._remarkTxt = new egret.TextField();
        this._remarkTxt.size = 35;
        this._remarkTxt._setLineSpacing(10);
        this._remarkTxt._setTextColor(0x6b238e);
        this._remarkTxt._setFontFamily("黑体");
        this._remarkTxt._setBold(true);
        this._remarkTxt.text = "你是猴子派来的逗比吗";
        this._remarkTxt.x = (this._bg.width - this._remarkTxt.width) / 2;
        this._remarkTxt.y = txtY;
        this.addChild(this._remarkTxt);
    };
    ResultView.prototype.createTxt = function () {
        var txt = new egret.TextField();
        txt.size = 30;
        txt._setLineSpacing(10);
        txt._setTextColor(0x000000);
        txt._setFontFamily("黑体");
        txt._setBold(true);
        this.addChild(txt);
        return txt;
    };
    ResultView.prototype.addListeners = function () {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
        this._againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchAgainBtnHandler, this);
        this._shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchShareBtnHandler, this);
    };
    ResultView.prototype.removeListeners = function () {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
        this._againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchAgainBtnHandler, this);
        this._shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchShareBtnHandler, this);
    };
    /*
     * 显示游戏信息
     */
    ResultView.prototype.showGameInfo = function () {
        this.clearGameInfo();
        var score1 = Util.getNumberByLevel(DataCenter.score, 1);
        var score2 = Util.getNumberByLevel(DataCenter.score, 2);
        var percent1 = Util.getNumberByLevel(DataCenter.percent, 1);
        var percent2 = Util.getNumberByLevel(DataCenter.percent, 2);
        var score1Bit = Util.getNumPicByNum(score1);
        score1Bit.x = this._bg.width / 2 + 13;
        score1Bit.y = this._bg.height / 3 - 30;
        this.addChild(score1Bit);
        this._bitmapNums.push(score1Bit);
        if (score2 != 0) {
            var score2Bit = Util.getNumPicByNum(score2);
            score2Bit.x = score1Bit.x - 40;
            score2Bit.y = score1Bit.y;
            this.addChild(score2Bit);
            this._bitmapNums.push(score2Bit);
        }
        var percent1Bit = Util.getNumPicByNum(percent1);
        percent1Bit.x = score1Bit.x - 23;
        percent1Bit.y = score1Bit.y + 100;
        this.addChild(percent1Bit);
        this._bitmapNums.push(percent1Bit);
        if (percent2 != 0) {
            var percent2Bit = Util.getNumPicByNum(percent2);
            percent2Bit.x = percent1Bit.x - 40;
            percent2Bit.y = percent1Bit.y;
            this.addChild(percent2Bit);
            this._bitmapNums.push(percent2Bit);
        }
    };
    /*
     * 清理游戏信息
     */
    ResultView.prototype.clearGameInfo = function () {
        var len = this._bitmapNums.length;
        var tempBit;
        while (len > 0) {
            len--;
            tempBit = this._bitmapNums.pop();
            tempBit.parent.removeChild(tempBit);
        }
    };
    /*
     * 点击游戏屏幕
     */
    ResultView.prototype.touchBgHandler = function (e) {
        console.log("游戏界面点击屏幕");
    };
    /*
     * 点击再一次
     */
    ResultView.prototype.touchAgainBtnHandler = function (e) {
        console.log("点击再一次");
        NoticeManager.sendNotice(new Notice(NoticeCode.SHOW_GAME_VIEW));
    };
    /*
     * 点击分享
     */
    ResultView.prototype.touchShareBtnHandler = function (e) {
        console.log("点击分享");
    };
    return ResultView;
})(ViewBase);
ResultView.prototype.__class__ = "ResultView";
