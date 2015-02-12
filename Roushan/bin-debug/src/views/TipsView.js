/**
 * Created by Owen on 2015/2/11.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TipsView = (function (_super) {
    __extends(TipsView, _super);
    function TipsView() {
        _super.call(this);
        //当前显示
        this._currentTip = null;
        //当前tip索引
        this._tipIndex = 0;
        //总数量
        this._totalNum = 11;
        //tip内容
        this._contents = ["曾有一座壮丽的城堡坐落于神秘的XXX仙境", "大大小小的方块在这里过着无忧无虑有钱任性的生活", "直到大魔王肉山不小心摧毁了他们的家园", "为了报仇 方块勇士们只有并肩联手", "点击屏幕 就可以将方块从屏幕上方的中央踹下去", "击中肉山光滑的头顶 对肉山的精神造成成吨伤害", "不小心落到肉山的翅膀上则会被弹飞", "将内力从后方传给前面的兄弟更能造成翻倍伤害", "努力挑战使用更少方块击败肉山吧", "冬天也不能给肉山喘息的机会 ICE模式等你挑战！"];
        this.createUI();
    }
    TipsView.prototype.createUI = function () {
        this._bg = Util.createBitmapByName("tip_bg");
        this.addChild(this._bg);
        this._tipTxt = new egret.TextField();
        this._tipTxt.size = 19;
        this._tipTxt.y = this._bg.height / 8 * 7;
    };
    /*
     * 显示tip
     */
    TipsView.prototype.showTip = function () {
        this._tipTxt.text = this._contents[this._tipIndex];
        this._tipTxt.x = (this._bg.width - this._tipTxt.width) / 2;
        this._tipIndex++;
        if (this._totalNum < this._tipIndex) {
            NoticeManager.sendNotice(new Notice(NoticeCode.CLOSE_TIP_VIEW));
            this._tipIndex = 0;
            return;
        }
        if (this._currentTip != null) {
            this._currentTip.parent.removeChild(this._currentTip);
            this._currentTip = null;
        }
        this._currentTip = Util.createBitmapByName("tip_" + this._tipIndex);
        this.addChild(this._currentTip);
        this.addChild(this._tipTxt);
    };
    /*
     * 获取背景宽度
     */
    TipsView.prototype.getBgWidth = function () {
        return this._bg.width;
    };
    return TipsView;
})(egret.Sprite);
TipsView.prototype.__class__ = "TipsView";
