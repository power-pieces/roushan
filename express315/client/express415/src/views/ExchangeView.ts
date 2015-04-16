﻿class ExchangeView extends AView {

    private _bg: egret.Bitmap;
    private _spr: egret.Sprite;
    private _rewardTF: egret.BitmapText;

    private _hotZones: egret.Rectangle[] = [
        new egret.Rectangle(430, 2000, 195, 98),
        new egret.Rectangle(430, 2115, 195, 98),
        new egret.Rectangle(430, 2230, 195, 98),
        new egret.Rectangle(430, 2345, 195, 98),
        new egret.Rectangle(430, 2460, 195, 98),
        new egret.Rectangle(430, 2575, 195, 98),
        new egret.Rectangle(10, 10, 150, 80)
    ];

    private _args: any;

    public constructor(args:any) {
        super();
        this._args = args;
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
        var font: any = RES.getRes("pink_35_b_fnt");
        rewardTF.font = font;
        rewardTF.text = "x" + DataCenter.reward;
        rewardTF.x = 536;
        rewardTF.y = 40;
        this._spr.addChild(rewardTF);        
        this._rewardTF = rewardTF;


        this.touchEnabled = true;
        this.touchChildren = true;

        NetManager.statistic("兑换奖品按钮");
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
                //alert(DataCenter.cfg.exchange_id[i]);
                break;
            }
        }

        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
    }

    private hotZoneActive(index: number): void {
        AudioDevice.playEffect("btn_click_mp3");
        if (index >= 6) {
            NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, this._args, ViewName.EXCHANGE_VIEW));
            return;
        }
        var goodId: number = DataCenter.cfg.exchange_id[index];
        var need: number = DataCenter.cfg.exchange_need[index];
        if (DataCenter.reward < need) {
            ViewManager.instance.showPanel(new MessagePanel("您的赏银不足！", DataCenter.cfg.msg_delay));
            return;
        }

        NetManager.call("exchange", { goodId:  goodId, need:need}, this.onExchange, this);
    }

    private onExchange(data: any, params: any): void {
        if (true == data) {
            ViewManager.instance.showPanel(new ExchangeResultPanel(1, params.goodId));
            DataCenter.reward -= params.need;
            this._rewardTF.text = "x" + DataCenter.reward;
        }
        else {

            var msg = "请求失败！";
            switch (data) {
                case -1:                    
                    break;
                case 2000:
                    msg = "兑奖尚未开始，请耐心等待";
                    break;
                case 2100:
                    msg = "兑奖已结束";
                    break;
                case 3000:
                    msg = "奖品领取失败，每个奖品每人只能兑换一次";
                    break;
                case 3100:
                    msg = "该奖品已领完，请明天再来";
                    break;
                case 4000:
                    msg = "无效的访问请求";
                    break;
                case 5000:
                    msg = "奖品领取失败，每个奖品每人只能兑换一次";
                    break;
                case 6000:
                    msg = "无访问权限";
                    break;
                default:
                    break;
            }


            ViewManager.instance.showPanel(new MessagePanel(msg, DataCenter.cfg.msg_delay));
        }

        //if (0 == data) {
        //    ViewManager.instance.showPanel(new ExchangeResultPanel(2, params.goodId));
        //}
        //else {
        //    ViewManager.instance.showPanel(new ExchangeResultPanel(1, params.goodId));
        //    DataCenter.reward -= params.need;
        //    this._rewardTF.text = "x" + DataCenter.reward;
        //}
    }
}