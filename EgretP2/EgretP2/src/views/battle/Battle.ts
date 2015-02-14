class Battle extends egret.Sprite {
    //方块掉落位置
    public static BLOCK_DROP_POS: number = 750;

    //比例
    public static FACTOR:number = 0;
    private _p2World: p2.World = null;
    private _isDebug: boolean = false;
    //BOSS血条
    private _bossHp: egret.Shape = null;
    private _blocks: Block[] = [];
    private _boss: Boss = null;
    private _hp: BossHP = null;
    //方块掉落箭头
    private _arrow: egret.Bitmap = null;

    //下一次可以放方块的时间
    private _blockCD: number = 0;
    //方块分层
    private _blockLayers: any = {};

    //使用方块数
    private _useBlockCount: number = 0;

    //游戏状态 1正常 2结束
    public gameState: number = 1;

    private _checkDamageTime: number = 0;
    

    public constructor() {
        super();

        Battle.FACTOR = DataCenter.cfg.factor;
        this._isDebug = DataCenter.cfg.isDebug;

        this.width = Util.stage.stageWidth;
        this.height = Util.stage.stageHeight;
        this.touchEnabled = true;
        this.createP2World();
        this.createView();
        this.addListeners();
        egret.Ticker.getInstance().register(this.onTick, this);
    }

    /**
    * 创建物理世界
    */
    private createP2World(): void {
        var world: p2.World = new p2.World();        
        //摩擦力
        world.defaultContactMaterial.friction = 1;
        //弹力
        world.defaultContactMaterial.restitution = 0;
        //柔软度
        //world.defaultContactMaterial.relaxation = Number.MAX_VALUE;
        //睡眠模式
        world.sleepMode = p2.World.NO_SLEEPING;

        if (this._isDebug) {
            //开启debug模式，使用图形绘制
            this.debug(world);
        }

        this._p2World = world;
    }

    private createView(): void {
        var bg: egret.Bitmap = Util.createBitmapByName("Roshan-Background_png");
        this.addChild(bg);

        this.createBoss();

        this._hp = new BossHP(this._boss.getHP(),Util.stage.stageHeight);
        this.addChild(this._hp);

        this._arrow = Util.createBitmapByName("arrow_png");
        this._arrow.anchorX = this._arrow.anchorY = 0.5;
        this._arrow.y = Util.stage.stageHeight - Battle.BLOCK_DROP_POS;
    }

    private addListeners(): void {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegionHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
    }

    private removeListeners(): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegionHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
    }

    private touchBegionHandler(e: egret.TouchEvent): void {
        if (egret.getTimer() < this._blockCD) {
            return;
        }

        this.addChild(this._arrow);
        this._arrow.x = e.stageX;
    }

    private touchMoveHandler(e: egret.TouchEvent): void {
        if (egret.getTimer() < this._blockCD) {
            return;
        }
        this._arrow.x = e.stageX;
    }

    private touchEndHandler(e: egret.TouchEvent): void {
        if (egret.getTimer() < this._blockCD) {
            return;
        }

        if (this._arrow.parent) {
            this._arrow.parent.removeChild(this._arrow);
        }
        this.createBlock(e.stageX);

        this._blockCD = egret.getTimer() + DataCenter.cfg.blockInterval;
    }

    private angle2(angle:number):number{
        return angle / Math.PI * 180;
    }

    private createBoss(): void {
        var boss: Boss = new Boss();

        var positionX: number = (Util.stage.stageWidth >> 1) / Battle.FACTOR;
        var positionY: number = boss.body.height / Battle.FACTOR;

        var shape: p2.Rectangle = new p2.Rectangle(boss.body.width / Battle.FACTOR, boss.body.height / Battle.FACTOR);
        shape.material = this._p2World.defaultMaterial;
        var body: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY] });
        body.type = p2.Body.KINEMATIC;
        
        body.addShape(shape);
        this._p2World.addBody(body);
        body.displays = [boss];
        this.addChild(boss);
        

        boss.p2Bodys = [body];
        boss.setVelocity(20 / Battle.FACTOR);
        this._boss = boss;
        

        //var shape: p2.Rectangle = new p2.Rectangle(5, 1);
        //var body: p2.Body = new p2.Body({ mass: 0, position: [(Util.stage.stageWidth >> 1) / Battle.FACTOR, 2], angle:this.angle2(76)});
        //shape.material = this._p2World.defaultMaterial;
        //body.addShape(shape);

        ////// Add the body to the world
        //this._p2World.addBody(body);


        //var shape: p2.Rectangle = new p2.Rectangle(5, 1);
        //var body: p2.Body = new p2.Body({ mass: 0, position: [(Util.stage.stageWidth >> 1) / Battle.FACTOR, 2], angle: this.angle2(-76) });
        //shape.material = this._p2World.defaultMaterial;
        //body.addShape(shape);

        ////// Add the body to the world
        //this._p2World.addBody(body);
    }

    private createBlock(x:number): void {
        var block: Block = new Block();

        var positionX: number = x / Battle.FACTOR;
        var positionY: number = Battle.BLOCK_DROP_POS / Battle.FACTOR;

        var shape: p2.Rectangle = new p2.Rectangle(block.width / Battle.FACTOR, block.height / Battle.FACTOR);
        shape.material = this._p2World.defaultMaterial;
        var body: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY] });
        body.addShape(shape);
        this._p2World.addBody(body);

        body.displays = [block];
        this.addChild(block);

        block.setBody(body);
        this._blocks.push(block);

        this._useBlockCount++;
    }   

    private onTick(dt): void {

        if (2 == this.gameState) {
            return;
        }

        var world: p2.World = this._p2World;
        if (dt < 10) {
            return;
        }
        if (dt > 1000) {
            return;
        }

        //检查BOSS移动
        var bossRect: egret.Rectangle = this._boss.getRect();
        if (bossRect.right >= Util.stage.stageWidth) {
            this._boss.changeDirection(-1);
        }
        else if (bossRect.x <= 0) {
            this._boss.changeDirection(1);
        }
        

        world.step(dt / 1000);

        if (!this._isDebug) {
            var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
            var l = world.bodies.length;
            for (var i: number = 0; i < l; i++) {
                var boxBody: p2.Body = world.bodies[i];
                if (boxBody.displays) {
                    var box: egret.DisplayObject = boxBody.displays[0];
                    if (box) {
                        box.x = boxBody.position[0] * Battle.FACTOR;
                        box.y = stageHeight - boxBody.position[1] * Battle.FACTOR;
                        box.rotation = 360 - boxBody.angle * 180 / Math.PI;
                        if (boxBody.sleepState == p2.Body.SLEEPING) {
                            box.alpha = 0.5;
                        }
                        else {
                            box.alpha = 1;
                        }
                    }
                }

            }
        }


        this.updateBlocks();


        if (egret.getTimer() > this._checkDamageTime) {
            var damage: number = this.calculateDamage();
            this._boss.setHP(DataCenter.cfg.bossHP - damage);
            this._hp.update(damage);
            if (damage >= DataCenter.cfg.bossHP) {
                this.gameOver();
            }
            this._checkDamageTime = egret.getTimer() + 2000;
        }
        
        
    }

    //游戏结束
    private gameOver(): void {
        this.gameState = 2;        
        this._useBlockCount;
        this.removeListeners();
        alert("game over " + this._useBlockCount);
    }

    //更新方块
    private updateBlocks(): void {
        //清空分层信息
        this._blockLayers = {};

        //开始算层的位置
        var bottom:number = this._boss.y - (this._boss.height >> 1);

        var blockCount: number = this._blocks.length;
        var block: Block;
        while (--blockCount > -1) {
            block = this._blocks[blockCount];

            if (block.y > Util.stage.stageHeight + block.height) {
                //删除掉出舞台的方块
                this.removeBlock(block);
                continue;
            }

            block.update();

            if (block.isStop()) {
                //计算所在层
                var temp: number = bottom - block.y;
                if (temp < 0) {
                    temp = 0;
                }
                var layer: number = (temp / DataCenter.cfg.layerHeight) >> 0;
                if (null == this._blockLayers[layer]) {
                    this._blockLayers[layer] = [];
                }
                this._blockLayers[layer].push(block);
            }
        }
    }

    //计算伤害
    private calculateDamage(): number {
        var damage: number = 0;
        var dmgDatas: number[][] = DataCenter.cfg.damage;
        var deep: number = dmgDatas.length;
        for (var i = 0; i < deep; i++) {
            if (null == this._blockLayers[i] || 0 == this._blockLayers[i]) {
                //断层了 结束计算
                DataCenter.blockDeep = i;
                break;
            }

            var dmgData: number[] = dmgDatas[i];

            if (this._blockLayers[i].length >= dmgData.length) {
                damage += dmgData[dmgData.length - 1];
            }
            else {
                damage += dmgData[this._blockLayers[i].length];
            }
        }

        return damage;
    }

    private removeBlock(block: Block, index:number = -1): void {
        if (index == -1) {
            index = this._blocks.indexOf(block); 
        }

        this._blocks.splice(index, 1);
        if (block.parent) {
            block.parent.removeChild(block);
        }
        this._p2World.removeBody(block.getBody());
        
    }

    /**
     * debug模式，使用图形绘制
     */
    private debug(world: p2.World): void {
        var factor: number = Battle.FACTOR;

        var canvas: HTMLCanvasElement = document.createElement("canvas");
        var stage: egret.Stage = egret.MainContext.instance.stage;
        var stageWidth: number = stage.stageWidth;
        var stageHeight: number = stage.stageHeight;
        canvas.width = stageWidth;
        canvas.height = stageHeight;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(" + 255 + "," + 255 + "," + 0 + "," + 1 + ")";
        ctx.strokeStyle = "rgba(" + 255 + "," + 0 + "," + 0 + "," + 1 + ")";
        ctx.lineWidth = 1;

        var rendererContext = egret.MainContext.instance.rendererContext;
        var f = rendererContext.onRenderFinish;
        rendererContext.onRenderFinish = function () {
            ctx.clearRect(0, 0, stageWidth, stageHeight);
            var l: number = world.bodies.length;
            for (var i: number = 0; i < l; i++) {
                var boxBody: p2.Body = world.bodies[i];
                if (boxBody.sleepState == p2.Body.SLEEPING) {
                    ctx.globalAlpha = 0.5;
                }
                else {
                    ctx.globalAlpha = 1;
                }
                for (var j: number = 0; j < boxBody.shapes.length; j++) {
                    var boxShape: p2.Shape = boxBody.shapes[j];
                    if (boxShape instanceof p2.Rectangle) {
                        var x: number = (boxBody.position[0] + +boxBody.shapeOffsets[j][0]) * factor;
                        var y: number = stageHeight - (boxBody.position[1] + +boxBody.shapeOffsets[j][1]) * factor;
                        var w: number = (<p2.Rectangle>boxShape).width * factor;
                        var h: number = (<p2.Rectangle>boxShape).height * factor;
                        var matrix: egret.Matrix = egret.Matrix.identity.identity();
                        matrix.prependTransform(x, y, 1, 1, 360 - boxBody.angle * 180 / Math.PI, 0, 0, 0, 0);
                        ctx.save();
                        ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                        ctx.beginPath();
                        ctx.rect(-(<p2.Rectangle>boxShape).width / 2 * factor, -(<p2.Rectangle>boxShape).height / 2 * factor, w, h);
                        ctx.fill();
                        ctx.closePath();
                        ctx.restore();
                    }
                    else if (boxShape instanceof p2.Plane) {
                        ctx.save();
                        ctx.setTransform(1, 0, 0, 1, 0, stageHeight - (boxBody.position[1] + boxBody.shapeOffsets[j][1]) * factor);
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(stageWidth, 0);
                        ctx.stroke();
                        ctx.closePath();
                        ctx.restore();
                    }
                    else if (boxShape instanceof p2.Circle) {
                        var x: number = (boxBody.position[0] + boxBody.shapeOffsets[j][0]) * factor;
                        var y: number = stageHeight - (boxBody.position[1] + boxBody.shapeOffsets[j][1]) * factor;
                        var matrix: egret.Matrix = egret.Matrix.identity.identity();
                        matrix.prependTransform(x, y, 1, 1, 360 - boxBody.angle * 180 / Math.PI, 0, 0, 0, 0);
                        ctx.save();
                        ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                        ctx.beginPath();
                        ctx.arc(0, 0, (<p2.Circle>boxShape).radius * factor, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.closePath();
                        ctx.restore();
                    }
                }
            }
            rendererContext["_cacheCanvasContext"].drawImage(canvas, 0, 0, stageWidth, stageHeight, 0, 0, stageWidth, stageHeight);
            f.call(rendererContext);
        };
    }

}