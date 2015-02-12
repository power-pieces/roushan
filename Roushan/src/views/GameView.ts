/**
 * Created by Owen on 2015/2/11.
 * 游戏界面
 */
class GameView extends ViewBase
{

    private _bg:egret.Bitmap;
    private _flag:egret.Bitmap;

    public constructor()
    {
        super();
        this.createUI();
    }

    private createUI():void
    {
        this._bg = Util.createBitmapByName("game_bg");
        Util.stage.addChild(this._bg);
        this._bg.touchEnabled = true;

        this._flag = Util.createBitmapByName("drop_flag");
        this._flag.x = (this._bg.width - this._flag.width) / 2;
        Util.stage.addChild(this._flag);
    }

    public addListener()
    {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
    }

    public removeListener()
    {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
    }
    /*
     * 点击游戏屏幕
     */
    private touchBgHandler(e:egret.TouchEvent)
    {
        NoticeManager.sendNotice(new Notice(NoticeCode.SHOW_RESULT_VIEW));
    }
}