﻿class IndexView extends AView
{
    private _hotZones: egret.Rectangle[] = [
        new egret.Rectangle(0, 0, 628, 885),
        new egret.Rectangle(6, 900, 617, 92),
    ];

    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        this.addChild(Texture.create("index_jpg"));
        this.touchEnabled = true;

        var indexClick: egret.Bitmap = Texture.create("index_click_png");
        indexClick.x = 185;
        indexClick.y = 646;
        this.addChild(indexClick);
        egret.Tween.get(indexClick, { loop: true }).to({ alpha: 0 }, 1000).to({ alpha: 1 }, 1000);
    }

    public addListeners(): void {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }

    public removeListeners(): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }

    private touchBeginHandler(e: egret.TouchEvent): void {
        console.log(e.localX, e.localY);
        for (var i: number = 0; i < this._hotZones.length; i++) {
            if (this._hotZones[i].contains(e.localX, e.localY)) {
                this.hotZoneActive(i);
                break;
            }
        }
    }

    private hotZoneActive(index: number): void {
        
        AudioDevice.playEffect("btn_click_mp3");
        switch (index) {
            case 0:
                NetManager.statistic("点我开打按钮");
                console.log("进入游戏");
                //这个时候开始播放BGM
                //AudioDevice.playBGM("bgm_mp3");                
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.INTRO_VIEW));
                break;
            case 1:
                NetManager.statistic("APP下载按钮");
                console.log("下载");
                window.open(DataCenter.cfg.app_link);
                break;
        }
    }

    public dispose() {
        egret.Tween.removeAllTweens();
        super.dispose();
    }


}