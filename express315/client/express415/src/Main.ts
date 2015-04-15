/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        //获取接口数据
        var info: any = Extend.callWindow("getInfo");        
        DataCenter.inviter = info.inviter == ""?null:info.inviter;
        DataCenter.id = info.id;        
        DataCenter.userName = info.name;        
        DataCenter.sign = info.sign;
        DataCenter.headUrl = info.headUrl;
	    DataCenter.unionid = info.unionid;
        
        this.init();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private init(): void {
        ViewManager.instance.registView(ViewName.LOADING, LoadingUI);
        ViewManager.instance.registView(ViewName.INDEX_VIEW, IndexView);
        ViewManager.instance.registView(ViewName.INTRO_VIEW, IntroView);
        ViewManager.instance.registView(ViewName.EXCHANGE_VIEW, ExchangeView);
        ViewManager.instance.registView(ViewName.GAME_VIEW, GameView);
        ViewManager.instance.registView(ViewName.RECEIVE_SHARE_VIEW, ReceiveShareView);
        ViewManager.instance.registView(ViewName.RESULT_VIEW, ResultView);
        ViewManager.instance.registView(ViewName.SHARE_VIEW,ShareView);
    }

    private onAddToStage(event: egret.Event) {
        ViewManager.stage = this.stage;


        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

        RES.loadGroup("initial");
    }
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            //this.stage.removeChild(this.loadingView);
            //this.loadingView.dispose();
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
        else if (event.groupName == "initial") {
            DataCenter.cfg = RES.getRes("config_json");
            NetManager.statistic("游戏访问统计");
            //设置加载进度界面
            this.loadingView = <LoadingUI>ViewManager.instance.changeView(ViewName.LOADING);

            RES.loadGroup("preload");
        }
    }
    /**
    * 资源组加载出错
     *  The resource group loading failed
    */
    private onResourceLoadError(event: RES.ResourceEvent): void {        
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textContainer: egret.Sprite;
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {     
        //DataCenter.killFake = 80;
        //DataCenter.killReal = 10;
        //ViewManager.instance.showPanel(new RewardPanel());
        //return;
           
        AudioDevice.prep(["btn_click_mp3", "game_over_mp3", "hit_fake_mp3", "hit_fake_combo_mp3", "hit_real_mp3", "ready_mp3", "score_show_mp3", "fake_cry_mp3", "bgm_mp3"], this.stage,
            function (): void { AudioDevice.playBGM("bgm_mp3"); });
        

        NoticeManager.addNoticeAction(Notice.CHANGE_VIEW, this.changeViewNotice);

        if (DataCenter.cfg.isDebug) {
            NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.GAME_VIEW));
            return;
        }


        var params: any = {};
        params.name = DataCenter.userName;
        params.headUrl = DataCenter.headUrl;
        if (DataCenter.inviter) {
            params.inviter = DataCenter.inviter;
        }
        NetManager.call("login", params, this.onLoadData, this);
    }

    private onLoadData(data: any, params: any): void {
        DataCenter.killCount = +data.user.kill_count;
        DataCenter.reward = +data.user.reward;
        DataCenter.remain = +data.user.remain;
        DataCenter.userName = data.user.name;
        DataCenter.headUrl = data.user.head_url;
        if (data.inviter) {
            DataCenter.inviterName = data.inviter.name;
            DataCenter.inviterHeadUrl = data.inviter.head_url;
            DataCenter.inviterKill = +data.inviter.kill_count;
        }

        Extend.callReadyShare(DataCenter.killCount);

        if (DataCenter.inviter) {
            if (DataCenter.inviter == DataCenter.id) {
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.SHARE_VIEW, true));
            }
            else {
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.RECEIVE_SHARE_VIEW));
            }
        }
        else {
            NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.INDEX_VIEW));
        }
    }

    private changeViewNotice(n: Notice): void {
        var viewName: string = n.data;
        if (viewName == ViewName.GAME_VIEW) {
            //要进游戏，先检查体力够不够
            if (DataCenter.remain <= 0) {
                ViewManager.instance.showPanel(new MessagePanel("体力不足", DataCenter.cfg.msg_delay), true);
                return;
            }
        }
        ViewManager.instance.changeView(viewName,n.args);
    }
}


