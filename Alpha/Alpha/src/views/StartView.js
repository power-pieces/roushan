var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StartView = (function (_super) {
    __extends(StartView, _super);
    function StartView() {
        _super.call(this);
        this.creatUI();
    }
    StartView.prototype.creatUI = function () {
        this._bg = Util.createBitmapByName("start_bg");
        this.addChild(this._bg);
        this._start = Util.createBitmapByName("start_tip");
        this._start.x = (this._bg.width - this._start.width) / 2;
        this._start.y = (this._bg.height - this._start.height) / 3 * 2;
        this.addChild(this._start);
        this._desBtn = Util.createBitmapByName("des_btn");
        this._desBtn.x = (this._bg.width - this._desBtn.width) / 2;
        this._desBtn.y = (this._bg.height - this._desBtn.height) / 5 * 4;
        this.addChild(this._desBtn);
        this._normalBtn = Util.createBitmapByName("normal_mode_btn");
        this._normalBtn.x = (this._bg.width - this._normalBtn.width) / 4;
        this._normalBtn.y = (this._bg.height - this._normalBtn.height) / 5 * 4;
        this.addChild(this._normalBtn);
        this._specialBtn = Util.createBitmapByName("special_mode_btn");
        this._specialBtn.x = (this._bg.width - this._specialBtn.width) / 4 * 3;
        this._specialBtn.y = (this._bg.height - this._specialBtn.height) / 5 * 4;
        this.addChild(this._specialBtn);
        this._bg.touchEnabled = true;
        this._start.touchEnabled = true;
        this._desBtn.touchEnabled = true;
        this._normalBtn.touchEnabled = true;
        this._specialBtn.touchEnabled = true;
    };
    StartView.prototype.addListeners = function () {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
        this._start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStartHandler, this);
        this._desBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDesBtnHandler, this);
        this._normalBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchNormalBtnHandler, this);
        this._specialBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSpecialBtnHandler, this);
    };
    StartView.prototype.removeListeners = function () {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
        this._start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStartHandler, this);
        this._desBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDesBtnHandler, this);
        this._normalBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchNormalBtnHandler, this);
        this._specialBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSpecialBtnHandler, this);
    };
    StartView.prototype.touchBgHandler = function (e) {
        this.touchNormalBtnHandler(null);
    };
    StartView.prototype.touchStartHandler = function (e) {
        this.touchNormalBtnHandler(null);
    };
    StartView.prototype.touchDesBtnHandler = function (e) {
        var tipView = new TipsView();
        tipView.x = (this._bg.width - tipView.getBgWidth()) / 2;
        tipView.y = 160;
        tipView.addListeners();
        Util.stage.addChild(tipView);
        tipView.showTip();
    };
    StartView.prototype.touchNormalBtnHandler = function (e) {
        DataCenter.isIceMode = false;
        DataCenter.friction = DataCenter.cfg.normalFriction;
        NoticeManager.sendNotice(new Notice(NoticeCode.SHOW_GAME_VIEW));
    };
    StartView.prototype.touchSpecialBtnHandler = function (e) {
        DataCenter.isIceMode = true;
        DataCenter.friction = DataCenter.cfg.iceFriction;
        NoticeManager.sendNotice(new Notice(NoticeCode.SHOW_GAME_VIEW));
    };
    return StartView;
})(ViewBase);
