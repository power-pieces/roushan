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
    //private _totalNum = 11;
    //关闭
    private _closeBtn: egret.Bitmap;

    //指向的内容的索引
    private _contentIndex: number = -1;
    //内容
    private _contents: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    //
    private _mask: egret.Sprite = new egret.Sprite();

    public constructor(contents:number[] = null)
    {
        super();
        if (null != contents) {
            this._contents = contents;
        }
        this.createUI();
    }

    private createUI():void
    {
        this._mask.graphics.beginFill(0, 0.5);
        this._mask.graphics.drawRect(0, 0, Util.getStageWidth(), Util.getStageHeight());
        this._mask.graphics.endFill();
        this._mask.width = Util.getStageWidth();
        this._mask.height = Util.getStageHeight();
        this._mask.touchEnabled = true;
        Util.stage.addChild(this._mask);

        this._bg = Util.createBitmapByName("tip_bg");
        this.addChild(this._bg);
        this._tipTxt = new egret.TextField();
        this._tipTxt.size = 19;
        this._tipTxt.y = this._bg.height / 8 * 7;
        this._closeBtn = Util.createBitmapByName("close_btn");
        this._closeBtn.touchEnabled = true;
        this._closeBtn.x = this._bg.width - (this._closeBtn.width / 2) - 8;
        this._closeBtn.y = 0 - this._closeBtn.height / 2 + 8;
        this.addChild(this._closeBtn);
    }

    public addListeners(): void {
        this.touchEnabled = true;
        Util.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stage_touchBeginHandler, this);
    }

    public removeListeners(): void {
        this.touchEnabled = false;
        Util.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stage_touchBeginHandler, this);
    }

    private stage_touchBeginHandler(e: egret.TouchEvent): void {
        this.showTip();
    }

    /*
     * 显示tip
     */
    public showTip():void
    {
        this._contentIndex++;
        if (this._contents.length <= this._contentIndex)
        {
            this.touchCloseHandler(null);
            return;
        }
        this._tipIndex = this._contents[this._contentIndex];

        if(this._currentTip != null)
        {
            if(this._tipTxt.parent != null)
            {
                this.removeChild(this._tipTxt);
            }
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
        if(this._currentTip == null)
        {
            return;
        }
        if(this._currentTip.parent != null)
        {
            this._currentTip.parent.removeChild(this._currentTip);
        }
        this._currentTip = null;
    }
    /*
     * 显示新的tip
     */
    private showNewTip():void
    {
        this._currentTip = Util.createBitmapByName("tip_" + this._tipIndex);
        this.addChild(this._currentTip);
        this.addChild(this._closeBtn);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCloseHandler, this);
        this._currentTip.alpha = 0;
        var tw = egret.Tween.get(this._currentTip);
        tw.to({alpha:1},200);
        tw.call(this.showTipTxt, this);
    }
    /*
     * 点击关闭按钮
     */
    private touchCloseHandler(e:egret.TouchEvent):void
    {
        NoticeManager.sendNotice(new Notice(NoticeCode.CLOSE_TIP_VIEW));
        this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCloseHandler, this);
        this._tipIndex = 0;
        if(this._tipTxt.parent != null)
        {
            this.removeChild(this._tipTxt);
        }
        this.clearTip();

        this.removeListeners();

        this.parent.removeChild(this);

        this._mask.parent.removeChild(this._mask);
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