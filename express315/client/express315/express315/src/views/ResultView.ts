class ResultView extends AView {
    private _timeoutKey: any;

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

    private createView(): void {
        this.addChild(Texture.create("result_bg_png"));
        this.touchEnabled = true;

        var bossFace: egret.MovieClip = Texture.createMC("boos_face_mc", "boss_face");
        bossFace.x = 223;
        bossFace.y = 197
        this.addChild(bossFace);
        bossFace.play(-1);

        var tf: egret.BitmapText;
        tf = Texture.createBitmapTF("pink_fnt");
        tf.text = "x" + DataCenter.reward;
        tf.x = 230;
        tf.y = 40;
        this.addChild(tf);
    }

    public onAddedToStage(): void {        
        this._timeoutKey = egret.setTimeout(function () { ViewManager.instance.showPanel(new RewardPanel()); }, this, 3000);
    }   

    public dispose(): void {
        egret.clearTimeout(this._timeoutKey);
        super.dispose();
    }
}