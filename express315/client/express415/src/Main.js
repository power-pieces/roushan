var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);

        DataCenter.inviter = Extend.callWindow("getInviterId");
        DataCenter.id = Extend.callWindow("getOpenId");
        DataCenter.name = Extend.callWindow("getName");
        DataCenter.sign = Extend.callWindow("getSign");
        DataCenter.headUrl = Extend.callWindow("getHeadUrl");

        this.init();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Main.prototype.init = function () {
        ViewManager.instance.registView(ViewName.LOADING, LoadingUI);
        ViewManager.instance.registView(ViewName.INDEX_VIEW, IndexView);
        ViewManager.instance.registView(ViewName.INTRO_VIEW, IntroView);
        ViewManager.instance.registView(ViewName.EXCHANGE_VIEW, ExchangeView);
        ViewManager.instance.registView(ViewName.GAME_VIEW, GameView);
        ViewManager.instance.registView(ViewName.RECEIVE_SHARE_VIEW, ReceiveShareView);
        ViewManager.instance.registView(ViewName.RESULT_VIEW, ResultView);
        ViewManager.instance.registView(ViewName.SHARE_VIEW, ShareView);
    };

    Main.prototype.onAddToStage = function (event) {
        ViewManager.stage = this.stage;

        this.loadingView = ViewManager.instance.changeView(ViewName.LOADING);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };

    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };

    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };

    Main.prototype.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");

        this.onResourceLoadComplete(event);
    };

    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };

    Main.prototype.createGameScene = function () {
        egret.Profiler.getInstance().run();

        DataCenter.cfg = RES.getRes("config_json");

        NoticeManager.addNoticeAction(Notice.CHANGE_VIEW, this.changeViewNotice);

        if (DataCenter.inviter) {
            NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.RECEIVE_SHARE_VIEW));
        } else {
            NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.INDEX_VIEW));
        }
    };

    Main.prototype.changeViewNotice = function (n) {
        var viewName = n.data;
        if (viewName == ViewName.GAME_VIEW) {
            if (DataCenter.remain <= 0) {
                ViewManager.instance.showPanel(new MessagePanel("体力不足"), true);
                return;
            }
        }
        ViewManager.instance.changeView(viewName);
    };
    return Main;
})(egret.DisplayObjectContainer);
