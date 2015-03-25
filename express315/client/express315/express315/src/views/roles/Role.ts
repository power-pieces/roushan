/**
* 游戏场景中的角色
*/
class Role extends AView {
    //type 角色类型1：正牌 2：山寨

    private _type: number = 0;

    public get type(): number {
        return this._type;
    }

    private _textures: egret.Texture[] = [];

    private _isDie: boolean = false;

    private _bitmap: egret.Bitmap = new egret.Bitmap();

    private _changeTime: number = 0;

    private _showIndex: number = -1;
    private _indexs: number[] = [0, 1, 2, 1];
    

    public constructor(type:number = 2) {
        super();
        this._type = type;
        this.createView();
    }

    private createView(): void {

        var str: string = "";
        switch (this._type) {
            case 1:
                str = "real";
                break;
            case 2:
                str = "fake";
                break;
        }

        this._textures.push(Texture.createTexture(str + "_1_png"));
        this._textures.push(Texture.createTexture(str + "_2_png"));
        this._textures.push(Texture.createTexture(str + "_3_png"));
        this._textures.push(Texture.createTexture(str + "_die_png"));

        this.change();
        this._bitmap.anchorX = this._bitmap.anchorY = 0.5;
        this.addChild(this._bitmap);
    }

    public update(): void {
        if (this._isDie) {
            return;
        }
        var time: number = egret.getTimer();
        if (time >= this._changeTime) {
            this.change();
            this._changeTime = time + DataCenter.cfg.roleFPS;
        }
    }

    private change(): void {
        this._showIndex++;
        if (this._showIndex >= this._indexs.length) {
            this._showIndex = 0;
        }       
        var index: number = this._indexs[this._showIndex];
        this._bitmap.texture = this._textures[index];
    }

    public die(): void {
        this._isDie = true;
        this._bitmap.texture = this._textures[3];

        switch (this._type) {
            case 1:
                DataCenter.killReal++;
                break;
            case 2:
                DataCenter.killFake++;
                break;
        }

        var fntRes: string = "green_fnt";
        var text: string = "+1";
        if (this._type == 1) {
            fntRes = "red_fnt";
            text = "-1";
        }

        var tf = new egret.BitmapText();
        tf.anchorX = tf.anchorY = 0.5;
        var font: any = RES.getRes(fntRes);
        tf.font = font;
        tf.text = text;
        tf.y = -(this._bitmap.height >> 1) - 50;
        this.addChild(tf);
        
        egret.Tween.get(this).to({ alpha:0},500).call(this.dispose,this);
    }

    public dispose(): void {
        egret.Tween.removeTweens(this);
        super.dispose();
    }
}

