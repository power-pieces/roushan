﻿class IntroView extends AView {

    private _hotZones: egret.Rectangle[] = [
        new egret.Rectangle(400, 0, 233, 100),
        new egret.Rectangle(94, 700, 453, 113),
        new egret.Rectangle(94, 827, 449, 113),
    ];

    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        this.addChild(Texture.create("intro_jpg"));
        this.touchEnabled = true;
        this.touchChildren = false;

        var rewardTF = new egret.BitmapText();
        var font: any = RES.getRes("pink_35_b_fnt");
        rewardTF.font = font;
        rewardTF.text = "X" + DataCenter.reward;
        rewardTF.x = 230;
        rewardTF.y = 35;
        this.addChild(rewardTF);


        var remainTF = new egret.BitmapText();
        font = RES.getRes("white_40_b_fnt");
        remainTF.font = font;
        remainTF.text = "X" + DataCenter.remain;
        remainTF.x = 390;
        remainTF.y = 740;
        this.addChild(remainTF);
    }

    public addListeners(): void {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }

    public removeListeners(): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }

    private touchBeginHandler(e: egret.TouchEvent): void {
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
                console.log("兑换奖品");   
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.EXCHANGE_VIEW, ViewName.INTRO_VIEW));             
                break;
            case 1:
                NetManager.statistic("开始按钮");
                console.log("开始游戏");
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.GAME_VIEW));
                break;
            case 2:
                NetManager.statistic("召唤小伙伴获得包子按钮");
                console.log("分享");
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.SHARE_VIEW));
                break;
        }
    }
}