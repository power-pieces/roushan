/**
 * Created by Owen on 2015/2/12.
 */
var ResultView = (function (_super) {
    __extends(ResultView, _super);
    function ResultView() {
        _super.call(this);
        this.createUI();
    }
    var __egretProto__ = ResultView.prototype;
    __egretProto__.createUI = function () {
        this._bg = DataCenter.isFail ? Util.createBitmapByName("game_fail_bg") : Util.createBitmapByName("game_bg");
        this.addChild(this._bg);
        this._result = DataCenter.isIceMode ? Util.createBitmapByName("ice_result") : Util.createBitmapByName("result_bg");
        this._result.x = (this._bg.width - this._result.width) / 2;
        this.addChild(this._result);
        this._againBtn = Util.createBitmapByName("again_btn");
        this._againBtn.x = (this._bg.width - this._againBtn.width) / 5;
        this._againBtn.y = (this._bg.height - this._againBtn.height) / 3 * 2;
        this.addChild(this._againBtn);
        this._againBtn.touchEnabled = true;
        this._shareBtn = Util.createBitmapByName(DataCenter.isFail ? "invite_btn" : "share_btn");
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
        var r4 = DataCenter.isFail ? Util.createBitmapByName("rf1_png") : Util.createBitmapByName("r4");
        r4.x = (this._bg.width - r4.width) / 2;
        r4.y = this._bg.height - r4.height;
        this.addChild(r4);
        //var txtY = this._bg.height / 3;
        //var txt = this.createTxt();
        //txt.text = "您只用了      个方块";
        //txt.x = (this._bg.width - txt.width) / 2;
        //txt.y = txtY;
        //txtY += 40;
        //txt = this.createTxt();
        //txt.text = "超过了        %的玩家";
        //txt.x = (this._bg.width - txt.width) / 2;
        //txt.y = txtY;
        //txtY += 100;
        this._useBlocksBit = new BitmapNumber();
        this._useBlocksBit.x = this._bg.width / 2 + 60;
        this._useBlocksBit.y = this._bg.height / 3 - 30;
        this.addChild(this._useBlocksBit);
        this._percentBit = new BitmapNumber();
        this._percentBit.x = this._bg.width / 2 + 10;
        this._percentBit.y = this._bg.height / 3 + 80;
        this.addChild(this._percentBit);
        this._remarkTxt = new egret.TextField();
        this._remarkTxt.size = 35;
        this._remarkTxt._setLineSpacing(10);
        this._remarkTxt._setTextColor(0x6b238e);
        this._remarkTxt._setFontFamily("黑体");
        this._remarkTxt._setBold(true);
        this._remarkTxt.text = "";
        this._remarkTxt.x = (this._bg.width - this._remarkTxt.width) / 2;
        this._remarkTxt.y = this._percentBit.y + 100;
        this.addChild(this._remarkTxt);
    };
    __egretProto__.createTxt = function (content, align) {
        if (content === void 0) { content = ""; }
        if (align === void 0) { align = egret.HorizontalAlign.LEFT; }
        var txt = new egret.TextField();
        txt.size = 30;
        txt._setLineSpacing(10);
        txt._setTextColor(0x000000);
        txt._setFontFamily("黑体");
        txt._setBold(true);
        txt.textAlign = align;
        txt.text = content;
        this.addChild(txt);
        return txt;
    };
    __egretProto__.addListeners = function () {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
        this._againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchAgainBtnHandler, this);
        this._shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchShareBtnHandler, this);
    };
    __egretProto__.removeListeners = function () {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
        this._againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchAgainBtnHandler, this);
        this._shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchShareBtnHandler, this);
    };
    __egretProto__.requestRank = function () {
        this.touchEnabled = false;
        if (DataCenter.score <= DataCenter.cfg.bestScore) {
            DataCenter.percent = 100;
        }
        else if (DataCenter.score >= DataCenter.cfg.lowestScore) {
            DataCenter.percent = 88;
        }
        else {
            DataCenter.percent = 100 - (DataCenter.score - DataCenter.cfg.bestScore);
        }
        /*
        //创建POST请求
        var url: string = DataCenter.cfg.server;
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onRequestData, this);
        var request: egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.GET;
        var values: egret.URLVariables = new egret.URLVariables("id=" + Util.getUserID() + "&block=" + DataCenter.score);
        request.data = values;
        loader.load(request);
        */
        Util.setUserInfo(DataCenter.score, DataCenter.percent);
        this.showGameInfo();
    };
    __egretProto__.onRequestData = function (e) {
        this.touchEnabled = true;
        var loader = e.target;
        var json = loader.data;
        var data = JSON.parse(json);
        if (0 == data.code) {
            DataCenter.percent = data.percent;
            //if (DataCenter.percent >= 100) {
            //    DataCenter.percent = 99;
            //}
            Util.setUserInfo(DataCenter.score, DataCenter.percent);
            this.showGameInfo();
        }
        else {
            alert(data.des);
        }
    };
    /*
     * 显示游戏信息
     */
    __egretProto__.showGameInfo = function () {
        if (DataCenter.isFail) {
            this.showFail();
        }
        else {
            this.showWin();
        }
    };
    __egretProto__.showWin = function () {
        this._useBlocksBit.setShowNumber(DataCenter.score);
        this._percentBit.setShowNumber(DataCenter.percent);
        this._useBlocksBit.x = (this._bg.width - this._useBlocksBit.width) / 2 + 15;
        this._percentBit.x = (this._bg.width - this._percentBit.width) / 2 - 14;
        var str = Util.getResultContent(DataCenter.score);
        this._remarkTxt.text = str;
        this._remarkTxt.x = (this._bg.width - this._remarkTxt.width) / 2;
        var txt = null;
        txt = this.createTxt("您只用了", egret.HorizontalAlign.LEFT);
        txt.x = this._useBlocksBit.x - txt.width;
        txt.y = this._useBlocksBit.y + this._useBlocksBit.height - txt.height;
        txt = this.createTxt("个方块", egret.HorizontalAlign.LEFT);
        txt.x = this._useBlocksBit.x + this._useBlocksBit.width;
        txt.y = this._useBlocksBit.y + this._useBlocksBit.height - txt.height;
        txt = this.createTxt();
        txt.text = " 就打败了肉山大魔王";
        txt.x = (this._bg.width - txt.width) / 2;
        txt.y = this._useBlocksBit.y + this._useBlocksBit.height + 10;
        txt = this.createTxt("超过了", egret.HorizontalAlign.RIGHT);
        txt.x = this._percentBit.x - txt.width;
        txt.y = this._percentBit.y + this._percentBit.height - txt.height;
        txt = this.createTxt("%的玩家", egret.HorizontalAlign.LEFT);
        txt.x = this._percentBit.x + this._percentBit.width;
        txt.y = this._percentBit.y + this._percentBit.height - txt.height;
    };
    __egretProto__.showFail = function () {
        var txt = null;
        txt = this.createTxt(DataCenter.cfg.failContents[0]);
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.x = (this._bg.width - txt.width) / 2 - 20;
        txt.y = this._useBlocksBit.y + this._useBlocksBit.height;
        txt = this.createTxt(DataCenter.cfg.failContents[1]);
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.x = (this._bg.width - txt.width) / 2;
        txt.y = this._percentBit.y + this._percentBit.height;
        //this._shareBtn.visible = false;
    };
    /*
     * 点击游戏屏幕
     */
    __egretProto__.touchBgHandler = function (e) {
        console.log("游戏界面点击屏幕");
    };
    /*
     * 点击再一次
     */
    __egretProto__.touchAgainBtnHandler = function (e) {
        console.log("点击再一次");
        NoticeManager.sendNotice(new Notice(NoticeCode.SHOW_GAME_VIEW));
    };
    /*
     * 点击分享
     */
    __egretProto__.touchShareBtnHandler = function (e) {
        console.log("点击分享");
        var shareView = new ShareView();
        this.addChild(shareView);
    };
    return ResultView;
})(ViewBase);
ResultView.prototype.__class__ = "ResultView";
//# sourceMappingURL=ResultView.js.map