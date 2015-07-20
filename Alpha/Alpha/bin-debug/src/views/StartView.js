/**
 * Created by Owen on 2015/2/11.
 * 开始界面
 */
var StartView = (function (_super) {
    __extends(StartView, _super);
    //private _tipView:TipsView;
    //private _tipViewShow:boolean;
    function StartView() {
        _super.call(this);
        this.creatUI();
    }
    var __egretProto__ = StartView.prototype;
    __egretProto__.creatUI = function () {
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
        //this._tipViewShow = false;
    };
    __egretProto__.addListeners = function () {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
        this._start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStartHandler, this);
        this._desBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDesBtnHandler, this);
        this._normalBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchNormalBtnHandler, this);
        this._specialBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSpecialBtnHandler, this);
        //NoticeManager.addNoticeAction("close_tip_view",
        //    function (n: Notice): void {
        //        this.closeTipViewHandler();
        //    }.bind(this));
    };
    __egretProto__.removeListeners = function () {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
        this._start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStartHandler, this);
        this._desBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDesBtnHandler, this);
        this._normalBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchNormalBtnHandler, this);
        this._specialBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSpecialBtnHandler, this);
        //NoticeManager.removeNoticeAction(NoticeCode.CLOSE_TIP_VIEW,
        //    function (n: Notice): void {
        //        this.closeTipViewHandler();
        //    }.bind(this));
    };
    /*
     * 点击屏幕
     */
    __egretProto__.touchBgHandler = function (e) {
        //if(this._tipViewShow)
        //{
        //    this._tipView.showTip();
        //    return;
        //}
        this.touchNormalBtnHandler(null);
    };
    /*
     * 点击开始
     */
    __egretProto__.touchStartHandler = function (e) {
        //if(this._tipViewShow)
        //{
        //    this._tipView.showTip();
        //    return;
        //}
        this.touchNormalBtnHandler(null);
    };
    /*
     * 点击说明按钮
     */
    __egretProto__.touchDesBtnHandler = function (e) {
        //if(this._tipViewShow == false)
        //{
        //    if(this._tipView == null)
        //    {
        //        this._tipView = new TipsView();
        //        this._tipView.x = (this._bg.width - this._tipView.getBgWidth()) / 2;
        //        this._tipView.y = 160;
        //    }
        //    this.addChild(this._tipView);
        //    this._tipViewShow = true;
        //}
        //this._tipView.showTip();
        var tipView = new TipsView();
        tipView.x = (this._bg.width - tipView.getBgWidth()) / 2;
        tipView.y = 160;
        tipView.addListeners();
        Util.stage.addChild(tipView);
        tipView.showTip();
    };
    /*
     * 关闭tip界面
     */
    //private closeTipViewHandler():void
    //{
    //    if(this._tipViewShow)
    //    {
    //        this.removeChild(this._tipView);
    //        this._tipViewShow = false;
    //    }
    //}
    /*
     * 点击普通模式按钮
     */
    __egretProto__.touchNormalBtnHandler = function (e) {
        //this.closeTipViewHandler();
        DataCenter.isIceMode = false;
        DataCenter.friction = DataCenter.cfg.normalFriction;
        NoticeManager.sendNotice(new Notice(NoticeCode.SHOW_GAME_VIEW));
    };
    /*
     * 点击特殊模式按钮
     */
    __egretProto__.touchSpecialBtnHandler = function (e) {
        //this.closeTipViewHandler();
        DataCenter.isIceMode = true;
        DataCenter.friction = DataCenter.cfg.iceFriction;
        NoticeManager.sendNotice(new Notice(NoticeCode.SHOW_GAME_VIEW));
    };
    return StartView;
})(ViewBase);
StartView.prototype.__class__ = "StartView";
//# sourceMappingURL=StartView.js.map