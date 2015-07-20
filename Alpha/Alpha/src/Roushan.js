var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Roushan = (function (_super) {
    __extends(Roushan, _super);
    function Roushan() {
        _super.call(this);
        this._nowView = null;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Roushan.prototype.onAddToStage = function (event) {
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        this.loadingView.x = (this.stage.stageWidth - this.loadingView.width) / 2;
        this.loadingView.y = (this.stage.stageHeight - this.loadingView.height) / 2;
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    Roushan.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    Roushan.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    Roushan.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    Roushan.prototype.createGameScene = function () {
        DataCenter.cfg = RES.getRes("config_json");
        Util.stage = this.stage;
        NoticeManager.addNoticeAction(NoticeCode.SHOW_START_VIEW, function (n) {
            this.showStartView();
        }.bind(this));
        NoticeManager.addNoticeAction(NoticeCode.SHOW_GAME_VIEW, function (n) {
            this.showGameView();
        }.bind(this));
        NoticeManager.addNoticeAction(NoticeCode.SHOW_RESULT_VIEW, function (n) {
            this.showResultView();
        }.bind(this));
        var verTxt = new egret.TextField();
        verTxt.text = "Version:0.3";
        verTxt._setTextColor(0xffffff);
        verTxt.x = 200;
        this.showStartView();
    };
    Roushan.prototype.removeCurrentView = function () {
        if (null != this._nowView) {
            this._nowView.parent.removeChild(this._nowView);
            this._nowView.removeListeners();
            this._nowView = null;
        }
    };
    Roushan.prototype.showStartView = function () {
        this.removeCurrentView();
        var showView = new StartView();
        this._nowView = showView;
        Util.stage.addChild(this._nowView);
        this._nowView.addListeners();
    };
    Roushan.prototype.showGameView = function () {
        this.removeCurrentView();
        var showView = new Battle();
        this._nowView = showView;
        Util.stage.addChild(this._nowView);
        this._nowView.addListeners();
        if (DataCenter.isNew) {
            DataCenter.isNew = false;
            var tipView = new TipsView([5, 6, 8]);
            tipView.addListeners();
            tipView.x = (Util.getStageWidth() - tipView.getBgWidth()) / 2;
            tipView.y = 160;
            Util.stage.addChild(tipView);
            tipView.showTip();
        }
    };
    Roushan.prototype.showResultView = function () {
        this.removeCurrentView();
        var showView = new ResultView();
        showView.requestRank();
        this._nowView = showView;
        Util.stage.addChild(this._nowView);
        this._nowView.addListeners();
    };
    return Roushan;
})(egret.DisplayObjectContainer);
