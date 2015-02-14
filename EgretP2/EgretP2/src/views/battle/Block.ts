class Block extends egret.Sprite {

    //被弹开
    public static STATE_CAROM: number = 1;
    //下落
    public static STATE_FALL: number = 2;
    //失去平衡跌落
    public static STATE_DROP: number = 3;
    //停止
    public static STATE_STOP: number = 4;

    private _icons: any = {
        1: DataCenter.cfg.carom,
        2: DataCenter.cfg.fall,
        3: DataCenter.cfg.drop,
        4: DataCenter.cfg.stop
    }

    private _body: p2.Body = null;

    //状态
    private _state: number = 0;
    //位置没有改变的进入时间
    private _posUnchangedTime: number = 0;
    //上一次的位置
    private _lastPostion: number[] = [0, 0];
    //压在上面的方块数
    private _upBlock: number = 0;
    

    public constructor() {
        super();

        this.createView();              
    }

    public isStop(): boolean {
        return this._state == Block.STATE_STOP ? true : false;
    }

    private createView(): void{
        //this.anchorX = this.anchorY = 0.5;
        this.setState(Block.STATE_FALL);
    }

    public setBody(body: p2.Body): void{
        this._body = body;
        var pos: number[] = this.getPos();
        this._lastPostion[0] = pos[0];
        this._lastPostion[1] = pos[1];
    }

    public getBody(): p2.Body {
        return this._body;
    }

    //压在上面的方块数
    public setUpBlock(count: number): void {
        this._upBlock = count;
        if (this._state == Block.STATE_STOP) {
            var pngNames: string[] = this._icons[this._state];
            var imgName: string = pngNames[this._upBlock];
            this.changeImg(imgName);
        }
    }

    

    //获得位置（处理过的，主要用来比较)
    private getPos(): number[]{
        var posX: number = (this._body.position[0] * 100) >> 0;
        var posY: number = (this._body.position[1] * 100) >> 0;
        return [posX, posY];
    }

    public update(): void {

        this.getRect();
        var pos: number[] = this.getPos();
        this._body;
        if (pos[1] == this._lastPostion[1]) {
            //和上次位置一样
            if (0 == this._posUnchangedTime) {
                this._posUnchangedTime = egret.getTimer();
            }
            else if (this._state != Block.STATE_STOP && egret.getTimer() - this._posUnchangedTime >= 1000) {
                this.setState(Block.STATE_STOP);
            }
        }
        else {            
            //和上次位置不一样
            if (this._state == Block.STATE_STOP) {
                this.setState(Block.STATE_DROP);
            }
            //else if ((this._state == Block.STATE_FALL || this._state == Block.STATE_DROP) && this._body.position[1] > this._lastPostion[1]) {
            //    this.setState(Block.STATE_CAROM);
            //}


            this._posUnchangedTime = 0;
        }
        this._lastPostion[0] = pos[0];
        this._lastPostion[1] = pos[1];

    }

    private setState(state: number): void {
        if (this._state == state) {
            return;
        }
        this._state = state;
        

        var pngNames: string[] = this._icons[state];
        var imgName: string = "";
        if (state == Block.STATE_STOP) {
            imgName = pngNames[this._upBlock];
        }
        else {
            imgName = pngNames[(pngNames.length * Math.random()) >> 0];
        }
         

        this.changeImg(imgName);
    }

    private changeImg(name: string): void {
        this.removeChildren();
        var block: egret.Bitmap = Util.createBitmapByName(name);
        this.addChild(block);
        block.anchorX = block.anchorY = 0.5;
    }

    public getRect(): egret.Rectangle {
        var x: number = this.x - this.width / 2;
        var y: number = this.y - this.height / 2;
        return new egret.Rectangle(x,y,this.width,this.height);  
    }
}