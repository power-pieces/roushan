class IntroView extends AView {

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
        var font: any = RES.getRes("pink_fnt");
        rewardTF.font = font;
        rewardTF.text = "X" + DataCenter.reward;
        rewardTF.x = 230;
        rewardTF.y = 35;
        this.addChild(rewardTF);


        var remainTF = new egret.BitmapText();
        font = RES.getRes("white_fnt");
        remainTF.font = font;
        remainTF.text = "X" + DataCenter.remain;
        remainTF.x = 390;
        remainTF.y = 742;
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

        switch (index) {
            case 0:
                console.log("兑换奖品");   
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.EXCHANGE_VIEW));             
                break;
            case 1:
                console.log("开始游戏");
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.GAME_VIEW));
                break;
            case 2:
                console.log("分享");
                ViewManager.instance.showPanel(new ShareTipPanel(), true,false);
                break;
        }
    }
}