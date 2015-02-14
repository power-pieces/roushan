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
        this._tipIndex ++;
        if(this._totalNum < this._tipIndex)
        {
            NoticeManager.sendNotice(new Notice(NoticeCode.CLOSE_TIP_VIEW));
            this._tipIndex = 0;
            this.removeChild(this._tipTxt);
            this.clearTip();
            return;
        }
        if(this._currentTip != null)
        {
            this.removeChild(this._tipTxt);
            this._currentTip.alpha = 1;
            var tw = egret.Tween.get(this._currentTip);
            tw.to({alpha:0.2},200);
            tw.call(this.clearAndShowTip, this);
            return;
        }
        this.showNewTip();
    }
    /*
     * 清理tip
     */
    private clearTip():void
    {
        this._currentTip.parent.removeChild(this._currentTip);
        this._currentTip = null;
    }
    /*
     * 显示新的tip
     */
    private showNewTip():void
    {
        this._currentTip = Util.createBitmapByName("tip_" + this._tipIndex);
        this.addChild(this._currentTip);
        this._currentTip.alpha = 0;
        var tw = egret.Tween.get(this._currentTip);
        tw.to({alpha:1},200);
        tw.call(this.showTipTxt, this);
    }
    /*
     * 显示tiptxt
     */
    private showTipTxt():void
    {
        this._tipTxt.text = DataCenter.cfg.tipContents[this._tipIndex - 1];
        this._tipTxt.x = (this._bg.width - this._tipTxt.width) / 2;
        this.addChild(this._tipTxt);
    }
    /*
     * 清理之前显示的并显示新的tip
     */
    private clearAndShowTip():void
    {
        this.clearTip();
        this.showNewTip();
    }
    /*
     * 获取背景宽度
     */
    public getBgWidth():number
    {
        return this._bg.width;
    }
}