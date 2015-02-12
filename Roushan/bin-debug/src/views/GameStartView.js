var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Owen on 2015/2/11.
 */
var GameStartView = (function (_super) {
    __extends(GameStartView, _super);
    function GameStartView() {
        _super.call(this);
        this.creatUI();
    }
    GameStartView.prototype.creatUI = function () {
        this._bg = Util.createBitmapByName("game_start_bg");
        this.addChild(this._bg);
        this._tip = Util.createBitmapByName("game_start_tip");
        this._tip.x = this._bg.width / 2;
        this._tip.y = this._bg.height / 2;
        this.addChild(this._tip);
        this._desBtn = Util.createBitmapByName("des_btn");
        this._desBtn.x = this._bg.width / 2;
        this._desBtn.y = this._bg.height / 3 * 2;
        this.addChild(this._desBtn);
        this._normalBtn = Util.createBitmapByName("normal_mode_btn");
        this._normalBtn.x = this._bg.width / 3;
        this._normalBtn.y = this._bg.height / 3 * 2;
        this.addChild(this._normalBtn);
        this._specialBtn = Util.createBitmapByName("special_mode_btn");
        this._specialBtn.x = this._bg.width / 3 * 2;
        this._specialBtn.y = this._bg.height / 3 * 2;
        this.addChild(this._specialBtn);
        this._bg.touchEnabled = true;
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
        this._tip.touchEnabled = true;
        this._tip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTipHandler, this);
        this._desBtn.touchEnabled = true;
        this._desBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDesBtnHandler, this);
        this._normalBtn.touchEnabled = true;
        this._normalBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchNormalBtnHandler, this);
        this._specialBtn.touchEnabled = true;
        this._specialBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSpecialBtnHandler, this);
        this._tipViewShow = false;
    };
    /*
     * 点击屏幕
     */
    GameStartView.prototype.touchBgHandler = function (e) {
        console.log("点击屏幕");
        if (this._tipViewShow) {
            console.log("2");
            this._tipView.showTip();
        }
    };
    /*
     * 点击tip
     */
    GameStartView.prototype.touchTipHandler = function (e) {
        console.log("点击tip");
        if (this._tipView == null) {
            this._tipView = new TipsView();
            this.addChild(this._tipView);
            this._tipViewShow = true;
            return;
        }
        console.log("2");
        this._tipView.showTip();
    };
    /*
     * 点击说明按钮
     */
    GameStartView.prototype.touchDesBtnHandler = function (e) {
        console.log("点击说明按钮");
    };
    /*
     * 点击普通模式按钮
     */
    GameStartView.prototype.touchNormalBtnHandler = function (e) {
        console.log("点击普通模式按钮");
    };
    /*
     * 点击特殊模式按钮
     */
    GameStartView.prototype.touchSpecialBtnHandler = function (e) {
        console.log("点击特殊模式按钮");
    };
    return GameStartView;
})(egret.Sprite);
GameStartView.prototype.__class__ = "StartView";
