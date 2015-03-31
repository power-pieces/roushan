class ResultView extends AView {
    private _timeoutKey: any;

    private _hotZones: egret.Rectangle[] = [
        new egret.Rectangle(400, 0, 233, 100),
    ];

    //跳过动画
    private _jumpEf: boolean = false;

    public constructor(args:any) {
        super();
        if (args == ViewName.EXCHANGE_VIEW) {
            this._jumpEf = true;
        }
        if (false == this._jumpEf) {
            this.updateData();
        }
        this.createView();
    }

    private updateData(): void {

        //扣体力
        DataCenter.remain -= 1;

        var reward: number = DataCenter.killFake - DataCenter.killReal;
        if (reward < 0) {
            reward = 0;
        }

        if (reward > 0) {
            //增加赏金
            DataCenter.reward += reward;
        }

        NetManager.implicitCall("addReward", { isResult: 1, amount: reward, killCount: DataCenter.killFake });

        
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
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.EXCHANGE_VIEW, ViewName.RESULT_VIEW));
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
        tf.x = 180;
        tf.y = 50;
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
        if (this._jumpEf) {
            ViewManager.instance.showPanel(new ResultMenuPanel(), false);
        }
        else {
            this._timeoutKey = egret.setTimeout(function () { ViewManager.instance.showPanel(new RewardPanel(), true, true); }, this, 2000);
        }
    }   

    public dispose(): void {
        egret.Tween.removeAllTweens();
        egret.clearTimeout(this._timeoutKey);
        super.dispose();
    }
}