var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Battle = (function (_super) {
    __extends(Battle, _super);
    function Battle() {
        _super.call(this);
        this._p2World = null;
        this._isDebug = false;
        //BOSS血条
        this._bossHp = null;
        this._blocks = [];
        this._boss = null;
        this._hp = null;
        //方块掉落箭头
        this._arrow = null;
        //下一次可以放方块的时间
        this._blockCD = 0;
        //方块分层
        this._blockLayers = {};
        //使用方块数
        this._useBlockCount = 0;
        //游戏状态 1正常 2结束
        this.gameState = 1;
        Battle.FACTOR = DataCenter.cfg.factor;
        this._isDebug = DataCenter.cfg.isDebug;
        this.width = Util.stage.stageWidth;
        this.height = Util.stage.stageHeight;
        this.touchEnabled = true;
        this.createP2World();
        this.createView();
        egret.Ticker.getInstance().register(this.onTick, this);
    }
    /**
    * 创建物理世界
    */
    Battle.prototype.createP2World = function () {
        var world = new p2.World();
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
    };
    Battle.prototype.createView = function () {
        var bg = Util.createBitmapByName("Roshan-Background_png");
        this.addChild(bg);
        this.createBoss();
        this._hp = new BossHP(this._boss.hp, Util.stage.stageHeight);
        this.addChild(this._hp);
        this._arrow = Util.createBitmapByName("arrow_png");
        this._arrow.anchorX = this._arrow.anchorY = 0.5;
        this._arrow.y = Util.stage.stageHeight - Battle.BLOCK_DROP_POS;
    };
    Battle.prototype.addListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegionHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
    };
    Battle.prototype.removeListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegionHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
    };
    Battle.prototype.touchBegionHandler = function (e) {
        if (egret.getTimer() < this._blockCD) {
            return;
        }
        this.addChild(this._arrow);
        this._arrow.x = e.stageX;
    };
    Battle.prototype.touchMoveHandler = function (e) {
        if (egret.getTimer() < this._blockCD) {
            return;
        }
        this._arrow.x = e.stageX;
    };
    Battle.prototype.touchEndHandler = function (e) {
        if (egret.getTimer() < this._blockCD) {
            return;
        }
        if (this._arrow.parent) {
            this._arrow.parent.removeChild(this._arrow);
        }
        this.createBlock(e.stageX);
        this._blockCD = egret.getTimer() + DataCenter.cfg.blockInterval;
    };
    Battle.prototype.angle2 = function (angle) {
        return angle / Math.PI * 180;
    };
    Battle.prototype.createBoss = function () {
        var boss = new Boss();
        var positionX = (Util.stage.stageWidth >> 1) / Battle.FACTOR;
        var positionY = boss.body.height / Battle.FACTOR;
        var shape = new p2.Rectangle(boss.body.width / Battle.FACTOR, boss.body.height / Battle.FACTOR);
        shape.material = this._p2World.defaultMaterial;
        var body = new p2.Body({ mass: 1, position: [positionX, positionY] });
        body.type = p2.Body.KINEMATIC;
        body.addShape(shape);
        this._p2World.addBody(body);
        body.displays = [boss];
        this.addChild(boss);
        boss.p2Bodys = [body];
        //boss.setVelocity(20 / Battle.FACTOR);
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
    };
    Battle.prototype.createBlock = function (x) {
        var block = new Block();
        var positionX = x / Battle.FACTOR;
        var positionY = Battle.BLOCK_DROP_POS / Battle.FACTOR;
        var shape = new p2.Rectangle(block.width / Battle.FACTOR, block.height / Battle.FACTOR);
        shape.material = this._p2World.defaultMaterial;
        var body = new p2.Body({ mass: 1, position: [positionX, positionY] });
        body.addShape(shape);
        this._p2World.addBody(body);
        body.displays = [block];
        this.addChild(block);
        block.setBody(body);
        this._blocks.push(block);
        this._useBlockCount++;
    };
    Battle.prototype.onTick = function (dt) {
        if (2 == this.gameState) {
            return;
        }
        var world = this._p2World;
        if (dt < 10) {
            return;
        }
        if (dt > 1000) {
            return;
        }
        //检查BOSS移动
        var bossRect = this._boss.getRect();
        if (bossRect.right >= Util.stage.stageWidth) {
            this._boss.changeDirection(-1);
        }
        else if (bossRect.x <= 0) {
            this._boss.changeDirection(1);
        }
        world.step(dt / 1000);
        if (!this._isDebug) {
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var l = world.bodies.length;
            for (var i = 0; i < l; i++) {
                var boxBody = world.bodies[i];
                if (boxBody.displays) {
                    var box = boxBody.displays[0];
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
        var damage = this.calculateDamage();
        this._hp.update(damage);
        console.log("damage:" + damage);
        console.log("DataCenter.cfg.bossHP:" + DataCenter.cfg.bossHP);
        if (damage >= DataCenter.cfg.bossHP) {
            this.gameOver();
        }
    };
    //游戏结束
    Battle.prototype.gameOver = function () {
        //this.gameState = 2;
        //this.removeListeners();
        //alert("game over " + this._useBlockCount);
        DataCenter.score = this._useBlockCount;
        DataCenter.percent = this._useBlockCount;
        NoticeManager.sendNotice(new Notice(NoticeCode.SHOW_RESULT_VIEW));
    };
    //更新方块
    Battle.prototype.updateBlocks = function () {
        //清空分层信息
        this._blockLayers = {};
        //开始算层的位置
        var bottom = this._boss.y - (this._boss.height >> 1);
        var blockCount = this._blocks.length;
        var block;
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
                var temp = bottom - block.y;
                if (temp < 0) {
                    temp = 0;
                }
                var layer = (temp / DataCenter.cfg.layerHeight) >> 0;
                if (null == this._blockLayers[layer]) {
                    this._blockLayers[layer] = [];
                }
                this._blockLayers[layer].push(block);
            }
        }
    };
    //计算伤害
    Battle.prototype.calculateDamage = function () {
        var damage = 0;
        var dmgDatas = DataCenter.cfg.damage;
        var deep = dmgDatas.length;
        for (var i = 0; i < deep; i++) {
            if (null == this._blockLayers[i] || 0 == this._blockLayers[i]) {
                break;
            }
            var dmgData = dmgDatas[i];
            if (this._blockLayers[i].length >= dmgData.length) {
                damage += dmgData[dmgData.length - 1];
            }
            else {
                damage += dmgData[this._blockLayers[i].length];
            }
        }
        return damage;
    };
    Battle.prototype.removeBlock = function (block, index) {
        if (index === void 0) { index = -1; }
        if (index == -1) {
            index = this._blocks.indexOf(block);
        }
        this._blocks.splice(index, 1);
        if (block.parent) {
            block.parent.removeChild(block);
        }
        this._p2World.removeBody(block.getBody());
    };
    /**
     * debug模式，使用图形绘制
     */
    Battle.prototype.debug = function (world) {
        var factor = Battle.FACTOR;
        var canvas = document.createElement("canvas");
        var stage = egret.MainContext.instance.stage;
        var stageWidth = stage.stageWidth;
        var stageHeight = stage.stageHeight;
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
            var l = world.bodies.length;
            for (var i = 0; i < l; i++) {
                var boxBody = world.bodies[i];
                if (boxBody.sleepState == p2.Body.SLEEPING) {
                    ctx.globalAlpha = 0.5;
                }
                else {
                    ctx.globalAlpha = 1;
                }
                for (var j = 0; j < boxBody.shapes.length; j++) {
                    var boxShape = boxBody.shapes[j];
                    if (boxShape instanceof p2.Rectangle) {
                        var x = (boxBody.position[0] + +boxBody.shapeOffsets[j][0]) * factor;
                        var y = stageHeight - (boxBody.position[1] + +boxBody.shapeOffsets[j][1]) * factor;
                        var w = boxShape.width * factor;
                        var h = boxShape.height * factor;
                        var matrix = egret.Matrix.identity.identity();
                        matrix.prependTransform(x, y, 1, 1, 360 - boxBody.angle * 180 / Math.PI, 0, 0, 0, 0);
                        ctx.save();
                        ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                        ctx.beginPath();
                        ctx.rect(-boxShape.width / 2 * factor, -boxShape.height / 2 * factor, w, h);
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
                        var x = (boxBody.position[0] + boxBody.shapeOffsets[j][0]) * factor;
                        var y = stageHeight - (boxBody.position[1] + boxBody.shapeOffsets[j][1]) * factor;
                        var matrix = egret.Matrix.identity.identity();
                        matrix.prependTransform(x, y, 1, 1, 360 - boxBody.angle * 180 / Math.PI, 0, 0, 0, 0);
                        ctx.save();
                        ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                        ctx.beginPath();
                        ctx.arc(0, 0, boxShape.radius * factor, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.closePath();
                        ctx.restore();
                    }
                }
            }
            rendererContext["_cacheCanvasContext"].drawImage(canvas, 0, 0, stageWidth, stageHeight, 0, 0, stageWidth, stageHeight);
            f.call(rendererContext);
        };
    };
    //方块掉落位置
    Battle.BLOCK_DROP_POS = 750;
    //比例
    Battle.FACTOR = 0;
    return Battle;
})(ViewBase);
Battle.prototype.__class__ = "Battle";
