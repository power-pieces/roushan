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
        //获取接口数据
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
        //设置加载进度界面
        this.loadingView = ViewManager.instance.changeView(ViewName.LOADING);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            //this.stage.removeChild(this.loadingView);
            //this.loadingView.dispose();
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    /**
    * 资源组加载出错
     *  The resource group loading failed
    */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        egret.Profiler.getInstance().run();
        DataCenter.cfg = RES.getRes("config_json");
        NoticeManager.addNoticeAction(Notice.CHANGE_VIEW, this.changeViewNotice);
        var params = {};
        params.name = DataCenter.name;
        params.headUrl = DataCenter.headUrl;
        if (DataCenter.inviter) {
            params.inviter = DataCenter.inviter;
        }
        NetManager.call("login", params, this.onLoadData, this);
    };
    Main.prototype.onLoadData = function (data, params) {
        DataCenter.reward = +data.user.reward;
        DataCenter.remain = +data.user.remain;
        DataCenter.inviterName = data.inviter.name;
        DataCenter.inviterHeadUrl = data.inviter.head_url;
        if (DataCenter.inviter) {
            NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.RECEIVE_SHARE_VIEW));
        }
        else {
            NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.INDEX_VIEW));
        }
    };
    Main.prototype.changeViewNotice = function (n) {
        var viewName = n.data;
        if (viewName == ViewName.GAME_VIEW) {
            //要进游戏，先检查体力够不够
            if (DataCenter.remain <= 0) {
                ViewManager.instance.showPanel(new MessagePanel("体力不足"), true);
                return;
            }
        }
        ViewManager.instance.changeView(viewName);
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
//# sourceMappingURL=Main.js.map