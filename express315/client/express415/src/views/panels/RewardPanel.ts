/**
* 赏金显示面板
*/
class RewardPanel extends AView
{
    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        this.addChild(Texture.create("reward_png"));        

        
        var rewardTF: egret.BitmapText = Texture.createBitmapTF("pink_fnt");
        rewardTF.text = (DataCenter.killFake - DataCenter.killReal).toString();
        rewardTF.x = 235;
        rewardTF.y = 345;
        this.addChild(rewardTF);

        var tf: egret.BitmapText;
        tf = Texture.createBitmapTF("white_fnt");
        tf.text = "+" + DataCenter.killFake;
        tf.x = 271;
        tf.y = 415;
        this.addChild(tf);

        tf = Texture.createBitmapTF("white_fnt");
        tf.text = "-" + DataCenter.killReal;
        tf.x = 271;
        tf.y = 471;
        this.addChild(tf);


        this.alpha = 0;
        this.scaleX = 0;
        this.scaleY = 0;

        this.anchorX = this.anchorY = 0.5;
        ViewManager.instance.putToCenter(this);


    }

    public onAddedToStage(): void {  
    
        egret.Tween.get(this).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500).wait(2000, true).to({ alpha: 0, scaleX: 0, scaleY: 0},500).call(this.onHidden,this);
    }   

    private onHidden(): void {
        this.dispose();
        ViewManager.instance.showPanel(new ResultMenuPanel(), false);
        
    }
}