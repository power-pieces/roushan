/**
 * Created by Owen on 2015/2/11.
 */

class TipsView extends egret.Sprite
{
    //背景
    private _bg:egret.Bitmap;
    //当前显示
    private _currentTip:egret.Bitmap = null;
    //tip文本
    private _tipTxt:egret.TextField;
    //当前tip索引
    private _tipIndex = 0;
    //总数量
    private _totalNum = 11;
    //tip内容
    private _contents = ["曾有一座壮丽的城堡坐落于神秘的XXX仙境", "大大小小的方块在这里过着无忧无虑有钱任性的生活",
    "直到大魔王肉山不小心摧毁了他们的家园", "为了报仇 方块勇士们只有并肩联手", "点击屏幕 就可以将方块从屏幕上方的中央踹下去",
    "击中肉山光滑的头顶 对肉山的精神造成成吨伤害", "不小心落到肉山的翅膀上则会被弹飞", "将内力从后方传给前面的兄弟更能造成翻倍伤害",
    "努力挑战使用更少方块击败肉山吧", "冬天也不能给肉山喘息的机会 ICE模式等你挑战！"];

    public constructor()
    {
        super();
        this.createUI();
    }

    private createUI():void
    {
        this._bg = Util.createBitmapByName("tip_bg");
        this.addChild(this._bg);
        this._tipTxt = new egret.TextField();
        this._tipTxt.size = 19;
        this._tipTxt.y = this._bg.height / 8 * 7;
    }
    /*
     * 显示tip
     */
    public showTip():void
    {
        this._tipTxt.text = this._contents[this._tipIndex];
        this._tipTxt.x = (this._bg.width - this._tipTxt.width) / 2;
        this._tipIndex ++;
        if(this._totalNum < this._tipIndex)
        {
            NoticeManager.sendNotice(new Notice(NoticeCode.CLOSE_TIP_VIEW));
            this._tipIndex = 0;
            return;
        }
        if(this._currentTip != null)
        {
            this._currentTip.parent.removeChild(this._currentTip);
            this._currentTip = null;
        }
        this._currentTip = Util.createBitmapByName("tip_" + this._tipIndex);
        this.addChild(this._currentTip);
        this.addChild(this._tipTxt);
    }
    /*
     * 获取背景宽度
     */
    public getBgWidth():number
    {
        return this._bg.width;
    }
}