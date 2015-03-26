class ResultView extends AView {
    private _timeoutKey: any;

    private _hotZones: egret.Rectangle[] = [
        new egret.Rectangle(400, 0, 233, 100),
    ];

    public constructor() {
        super();
        this.updateData();
        this.createView();
    }

    private updateData(): void {
        var reward: number = DataCenter.killFake - DataCenter.killReal;
        if (reward < 0) {
            reward = 0;
        }
        DataCenter.reward += reward;
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
        }
    }

    private createView(): void {
        this.addChild(Texture.create("result_bg_png"));
        this.touchEnabled = true;

        var bossFace: egret.MovieClip = Texture.createMC("boos_face_mc", "boss_face");
        bossFace.x = 223;
        bossFace.y = 197
        this.addChild(bossFace);
        bossFace.play(-1);

        var mc: egret.MovieClip = Texture.createMC("punish_mc", "punish");
        this.addChild(mc);
        mc.play(-1);

        var tf: egret.BitmapText;
        tf = Texture.createBitmapTF("pink_fnt");
        tf.text = "x" + DataCenter.reward;
        tf.x = 230;
        tf.y = 40;
        this.addChild(tf);

        var talk: egret.Bitmap = Texture.create("boss_says_png");
        talk.x = 380;
        talk.y = 330;
        talk.anchorY = 1;
        talk.scaleX = 0;
        talk.scaleY = 0;
        this.addChild(talk);

        egret.Tween.get(talk).to({ scaleX: 1, scaleY: 1 }, 500);
    }

    public onAddedToStage(): void {        
        this._timeoutKey = egret.setTimeout(function () { ViewManager.instance.showPanel(new RewardPanel(),true,true); }, this, 2000);
    }   

    public dispose(): void {
        egret.Tween.removeAllTweens();
        egret.clearTimeout(this._timeoutKey);
        super.dispose();
    }
}