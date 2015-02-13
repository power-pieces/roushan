
/**
* BOSS的血条
*/
class BossHP extends egret.Sprite {

    public constructor(w:number, h:number) {
        super();

        this.width = w;
        this.height = h;
        this.createView();
    }

    
    private createView(): void {
        this.update(DataCenter.cfg.bossHP);
    }

    public update(damage: number): void {
        var posY: number = this.height * damage / DataCenter.cfg.bossHP;
        this.graphics.clear();
        this.graphics.beginFill(0xFF0000, 1);
        this.graphics.drawRect(0, posY, 10, Util.stage.stageHeight - posY);
        this.graphics.endFill();        
    }
}