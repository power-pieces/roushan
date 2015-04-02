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

        var fakeScore: number = DataCenter.killFake * DataCenter.cfg.fake_die_score;
        var realScore: number = DataCenter.killReal * DataCenter.cfg.real_die_score;

        var reward: number = fakeScore + realScore;
        if (reward < 0) {
            reward = 0;
        }


        var front: egret.DisplayObject = Texture.create("reward_front_png");
        var behind: egret.DisplayObject = Texture.create("reward_behind_png");
        var rewardTF: egret.BitmapText = Texture.createBitmapTF("pink_80_b_fnt");
        rewardTF.text = reward.toString();

        var hgroup: HGroup = new HGroup([front, rewardTF, behind], 2, 10);
        this.addChild(hgroup);
        hgroup.width;
        hgroup.anchorX = 0.5;
        hgroup.anchorY = 0.5;
        hgroup.y = 360;
        hgroup.x = 287;

        
       
        //rewardTF.anchorX = 0;
        //rewardTF.anchorY = 1;
        //rewardTF.x = 260;
        //rewardTF.y = 388;
        //this.addChild(rewardTF);

        //front.x = rewardTF.x - 10;
        //behind.x = front.x + rewardTF.width + 20;
        //front.y = behind.y = rewardTF.y;

        var tf: egret.BitmapText;
        tf = Texture.createBitmapTF("white_40_b_fnt", "+" + fakeScore, 0.5, 1);         
        tf.x = 360;
        tf.y = 447;
        this.addChild(tf);        

        tf = Texture.createBitmapTF("white_40_b_fnt", "-" + (realScore * -1).toString(), 0.5, 1);       
        tf.x = 360;
        tf.y = 505;
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