var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Owen on 2015/2/11.
 * 游戏界面
 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.call(this);
        this.createUI();
    }
    GameView.prototype.createUI = function () {
        this._bg = Util.createBitmapByName("game_bg");
        Util.stage.addChild(this._bg);
        this._bg.touchEnabled = true;
        this._flag = Util.createBitmapByName("drop_flag");
        this._flag.x = (this._bg.width - this._flag.width) / 2;
        Util.stage.addChild(this._flag);
    };
    GameView.prototype.addListener = function () {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
    };
    GameView.prototype.removeListener = function () {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
    };
    /*
     * 点击游戏屏幕
     */
    GameView.prototype.touchBgHandler = function (e) {
        NoticeManager.sendNotice(new Notice(NoticeCode.SHOW_RESULT_VIEW));
    };
    return GameView;
})(ViewBase);
GameView.prototype.__class__ = "GameView";
