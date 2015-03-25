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
        //设置加载进度界面
        this.loadingView = <LoadingUI>ViewManager.instance.changeView(ViewName.LOADING);


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
        RES.loadGroup("preload");
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
        egret.Profiler.getInstance().run();

        DataCenter.cfg = RES.getRes("config_json");

        NoticeManager.addNoticeAction(Notice.CHANGE_VIEW, this.changeViewNotice);

        NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.INDEX_VIEW));
    }

    private changeViewNotice(n: Notice): void {
        var viewName:string = n.data;
        ViewManager.instance.changeView(viewName);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        var textContainer: egret.Sprite = this.textContainer;
        var count: number = -1;
        var self: any = this;
        var change: Function = function () {
            count++;
            if (count >= result.length) {
                count = 0;
            }
            var lineArr = result[count];

            self.changeDescription(textContainer, lineArr);

            var tw = egret.Tween.get(textContainer);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        }

        change();
    }
    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textContainer: egret.Sprite, lineArr: Array<any>): void {
        textContainer.removeChildren();
        var w: number = 0;
        for (var i: number = 0; i < lineArr.length; i++) {
            var info: any = lineArr[i];
            var colorLabel: egret.TextField = new egret.TextField();
            colorLabel.x = w;
            colorLabel.anchorX = colorLabel.anchorY = 0;
            colorLabel.textColor = parseInt(info["textColor"]);
            colorLabel.text = info["text"];
            colorLabel.size = 30;
            textContainer.addChild(colorLabel);

            w += colorLabel.width;
        }
    }
}


