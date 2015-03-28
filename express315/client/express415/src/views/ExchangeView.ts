﻿class ExchangeView extends AView {

    private _bg: egret.Bitmap;
    private _spr: egret.Sprite;
    private _rewardTF: egret.BitmapText;

    private _hotZones: egret.Rectangle[] = [
        new egret.Rectangle(428, 767, 163, 91),
        new egret.Rectangle(428, 895, 163, 91),
        new egret.Rectangle(428, 1021, 163, 91),
        new egret.Rectangle(428, 1145, 163, 91),
        new egret.Rectangle(428, 1273, 163, 91),
        new egret.Rectangle(428, 1399, 163, 91)
    ];

    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {

        this._spr = new egret.Sprite();

        var bg: egret.Bitmap = Texture.create("exchange_jpg");
        bg.touchEnabled = true;
        this._bg = bg;
        this._spr.addChild(bg);
        var scrollView: egret.ScrollView = new egret.ScrollView(this._spr);
        this.addChild(scrollView);
        scrollView.height = ViewManager.stage.stageHeight;

        var rewardTF = new egret.BitmapText();
        var font: any = RES.getRes("pink_fnt");
        rewardTF.font = font;
        rewardTF.text = "x" + DataCenter.reward;
        rewardTF.x = 240;
        rewardTF.y = 40;
        this._spr.addChild(rewardTF);        
        this._rewardTF = rewardTF;


        this.touchEnabled = true;
        this.touchChildren = true;
    }

    public addListeners(): void {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }

    public removeListeners(): void {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
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

        var goodId: number = DataCenter.cfg.exchange_id[index];
        var need: number = DataCenter.cfg.exchange_need[index];
        if (DataCenter.reward < need) {
            ViewManager.instance.showPanel(new MessagePanel("您的赏银不足！"));
            return;
        }

        NetManager.call("exchange", { goodId:  goodId, need:need}, this.onExchange, this);
    }

    private onExchange(data: any, params: any): void {
        if (0 == data) {
            ViewManager.instance.showPanel(new ExchangeResultPanel(2, params.goodId));
        }
        else {
            ViewManager.instance.showPanel(new ExchangeResultPanel(1, params.goodId));
            DataCenter.reward -= params.need;
            this._rewardTF.text = "x" + DataCenter.reward;
        }
    }
}