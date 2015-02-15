/**
 * Created by Owen on 2015/2/10.
 */
class Roushan extends egret.DisplayObjectContainer
{
    private loadingView:LoadingUI;
    private _nowView: ViewBase = null;

    public constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    /*
     * 添加到舞台
     */
    private onAddToStage(event:egret.Event)
    {
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    private onConfigComplete(event:RES.ResourceEvent):void
    {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

        RES.loadGroup("preload");
    }
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void
    {
        if(event.groupName=="preload")
        {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            this.createGameScene();
        }
    }
    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void
    {
        if(event.groupName=="preload")
        {
            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }
    //创建游戏场景
    private createGameScene():void
    {
        DataCenter.cfg = RES.getRes("config_json");

        egret.Profiler.getInstance().run();
        Util.stage = this.stage;

        NoticeManager.addNoticeAction(NoticeCode.SHOW_START_VIEW,
            function (n: Notice): void {
                this.showStartView();
            }.bind(this));
        NoticeManager.addNoticeAction(NoticeCode.SHOW_GAME_VIEW,
            function (n: Notice): void {
                this.showGameView();
            }.bind(this));
        NoticeManager.addNoticeAction(NoticeCode.SHOW_RESULT_VIEW,
            function (n: Notice): void {
                this.showResultView();
            }.bind(this));

        var verTxt: egret.TextField = new egret.TextField();
        verTxt.text = "Version:0.1";
        verTxt._setTextColor(0xffffff);
        verTxt.x = 200;
        this.addChild(verTxt);
        //var changeViewEvent:ChangeViewEvent = new ChangeViewEvent(ChangeViewEvent.CHANGE_VIEW);
        //changeViewEvent.viewName = "StartView";
        //this.dispatchEvent(changeViewEvent);
        this.showStartView();
        //this.showResultView();
    }

    private removeCurrentView()
    {
        if (null != this._nowView)
        {
            this._nowView.parent.removeChild(this._nowView);
            this._nowView.removeListeners();
            this._nowView = null;
        }
    }
    /*
     * 显示开始界面
     */
    private showStartView():void
    {
        this.removeCurrentView();
        var showView:StartView = new StartView();
        this._nowView = showView;
        Util.stage.addChild(this._nowView);
        this._nowView.addListeners();
    }
    /*
     * 显示游戏界面
     */
    private showGameView():void
    {
        this.removeCurrentView();
        //var showView:GameView = new GameView();
        var showView:Battle = new Battle();
        this._nowView = showView;
        Util.stage.addChild(this._nowView);
        this._nowView.addListeners();
    }
    /*
     * 显示结算界面
     */
    private showResultView():void
    {
        this.removeCurrentView();
        var showView:ResultView = new ResultView();
        showView.requestRank();
        //showView.showGameInfo();
        this._nowView = showView;
        Util.stage.addChild(this._nowView);
        this._nowView.addListeners();
    }

}

