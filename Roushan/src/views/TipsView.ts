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
        this._tipTxt.text = DataCenter.cfg.tipContents[this._tipIndex];
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