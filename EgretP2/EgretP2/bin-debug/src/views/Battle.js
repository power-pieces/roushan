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
        Battle.FACTOR = Util.cfg.factor;
        this._isDebug = Util.cfg.isDebug;
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
    Battle.prototype.createP2World = function () {
        var world = new p2.World();
        //摩擦力
        world.defaultContactMaterial.friction = 1;
        //弹力
        world.defaultContactMaterial.restitution = 0;
        //柔软度
        //world.defaultContactMaterial.relaxation = 0;
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
    };
    Battle.prototype.addListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.createBlock, this);
    };
    Battle.prototype.removeListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.createBlock, this);
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
    Battle.prototype.createBlock = function (e) {
        var block = new Block();
        var positionX = e.stageX / Battle.FACTOR;
        var positionY = 760 / Battle.FACTOR;
        var shape = new p2.Rectangle(block.width / Battle.FACTOR, block.height / Battle.FACTOR);
        shape.material = this._p2World.defaultMaterial;
        var body = new p2.Body({ mass: 1, position: [positionX, positionY] });
        body.addShape(shape);
        this._p2World.addBody(body);
        body.displays = [block];
        this.addChild(block);
        block.body = body;
        this._blocks.push(block);
    };
    Battle.prototype.onTick = function (dt) {
        var world = this._p2World;
        if (dt < 10) {
            return;
        }
        if (dt > 1000) {
            return;
        }
        //检查BOSS移动
        var bossRect = this._boss.getBounds();
        bossRect.x += this._boss.x;
        bossRect.y += this._boss.y;
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
    //比例
    Battle.FACTOR = 0;
    return Battle;
})(egret.Sprite);
Battle.prototype.__class__ = "Battle";
//# sourceMappingURL=Battle.js.map