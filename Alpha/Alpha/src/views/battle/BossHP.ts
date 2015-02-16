
/**
* BOSS的血条
*/
class BossHP extends egret.Sprite {
    private _bg: egret.Bitmap;
    private _life: egret.Bitmap;
    public constructor() {
        super();

        this.createView();
    }

    
    private createView(): void
    {
        this._bg = Util.createBitmapByName("life_bg");
        this._life = Util.createBitmapByName("life");

        this.addChild(this._bg);
        this.addChild(this._life);

        var mask:egret.Rectangle = new egret.Rectangle(0, 0, this._life.width, this._life.height);
        this._life.mask = mask;
    }

    public update(damage:number): void
    {
        var per: number = damage / DataCenter.cfg.bossHP;
        var mask: egret.Rectangle = this._life.mask;
        mask.y = mask.height * per;
        this._life.mask = mask;
    }
}