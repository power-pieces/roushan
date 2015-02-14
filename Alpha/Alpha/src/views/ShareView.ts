/**
 * Created by Owen on 2015/2/15.
 */

class ShareView extends egret.Sprite
{
    private _shareBit: egret.Bitmap;

    public constructor() {
        super();

        this.width = Util.stage.stageWidth;
        this.height = Util.stage.stageHeight;
        this._shareBit = Util.createBitmapByName("share");

        this.addChild(this._shareBit);
        this.graphics.beginFill(0, 0.5);
        this.graphics.drawRect(0, 0, Util.stage.stageWidth, Util.stage.stageHeight);
        this.graphics.endFill();

        this.touchEnabled = true;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
    }

    private touchTapHandler(e: egret.Event): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        this.parent.removeChild(this);
    }
}