
/**
* BOSS的血条
*/
class BossHP extends egret.Sprite {

    private _shp:egret.Shape;
    private _currentDamage:number = -1;
    private _maskRec:egret.Rectangle;

    public constructor(w:number, h:number) {
        super();

        this.width = w;
        this.height = h;
        this.createView();
    }

    
    private createView(): void
    {
        this._shp = new egret.Shape();
        this._shp.graphics.beginFill(0xFF0000, 1);
        this._shp.graphics.drawRect(0, 0, 10, Util.stage.stageHeight);
        this._shp.graphics.endFill();
        this.addChild(this._shp);

        this._maskRec = new egret.Rectangle(0, 0, 10, Util.stage.stageHeight);
        this._shp.mask = this._maskRec;
    }

    public update(damage: number): void
    {
        console.log("damage:" + damage);
        if(this._currentDamage == -1 || this._currentDamage != damage)
        {
            this._currentDamage = damage;
            var posY: number = this.height * damage / DataCenter.cfg.bossHP;
            //this._maskRec.y = Util.stage.stageHeight - posY;
            //this._maskRec.y = posY;
            var tw = egret.Tween.get(this._maskRec);
            tw.to({y:posY},100);
        }
    }
}