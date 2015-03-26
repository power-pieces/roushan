var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RewardPanel = (function (_super) {
    __extends(RewardPanel, _super);
    function RewardPanel() {
        _super.call(this);
        this.createView();
    }
    RewardPanel.prototype.createView = function () {
        this.addChild(Texture.create("reward_png"));

        var rewardTF = Texture.createBitmapTF("pink_fnt");
        rewardTF.text = (DataCenter.killFake - DataCenter.killReal).toString();
        rewardTF.x = 227;
        rewardTF.y = 345;
        this.addChild(rewardTF);

        var tf;
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
        ViewManager.instance.putToCenter(this);
    };

    RewardPanel.prototype.onAddedToStage = function () {
        egret.Tween.get(this).to({ alpha: 1 }, 500).wait(2000, true).to({ alpha: 0 }, 500).call(this.onHidden, this);
    };

    RewardPanel.prototype.onHidden = function () {
        this.dispose();
        ViewManager.instance.showPanel(new ResultMenuPanel(), false);
    };
    return RewardPanel;
})(AView);
