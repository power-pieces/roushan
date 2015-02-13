class Boss extends egret.Sprite {

    //左边翅膀
    public leftWing: egret.Bitmap;
    //右边翅膀
    public rightWing: egret.Bitmap;
    //身体
    public body: egret.Bitmap;
    //表情
    public face: egret.Bitmap;

    public p2Bodys: p2.Body[] = [];

    public hp: number = 0;

    //移动速度
    private _velocity: number = 0;
    //左 -1 右 1
    private _dir: number = 1;

    public constructor() {
        super();
        this.hp = DataCenter.cfg.bossHP;
        this.createView();
    }


    private createView(): void {
        
        this.leftWing = Util.createBitmapByName("r2_png");
        this.rightWing = Util.createBitmapByName("r3_png");     
        this.body = Util.createBitmapByName("r1_png");
          

        
        this.addChild(this.leftWing);
        this.addChild(this.rightWing);
        this.addChild(this.body);

        this.body.anchorX = this.body.anchorY = 0.5;
        this.leftWing.anchorX = this.leftWing.anchorY = 0.5;
        this.rightWing.anchorX = this.rightWing.anchorY = 0.5;

        this.rightWing.x = 188;
        this.leftWing.x = -this.rightWing.x;
        this.leftWing.y = this.rightWing.y = -27;     

        this.setState(1);     
    }

    private setState(state: number): void {
        if (this.face) {
            this.removeChild(this.face);
        }
        this.face = Util.createBitmapByName("rf" + state + "_png");
        this.face.anchorX = this.face.anchorY = 0.5;
        this.addChild(this.face);
    }

    private changeHP(): void {
        
    }

    //设置水平速度
    public setVelocity(value: number): void {
        this._velocity = value;
        this.updateMove();
    }

    //更新移动
    private updateMove(): void {
        for (var i = 0; i < this.p2Bodys.length; i++) {
            this.p2Bodys[i].velocity[0] = this._velocity * this._dir;
        }
        
    }

    //改变移动方向
    public changeDirection(dir: number): void {
        if (this._dir == dir) {
            return;
        }
        this._dir = dir;
        this.updateMove();
    }

    public getRect(): egret.Rectangle {
        var bossRect: egret.Rectangle = this.getBounds();
        bossRect.x += this.x;
        bossRect.y += this.y;    
        return bossRect;    
    }
}