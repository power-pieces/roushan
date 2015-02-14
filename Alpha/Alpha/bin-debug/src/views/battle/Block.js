var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Block = (function (_super) {
    __extends(Block, _super);
    function Block() {
        _super.call(this);
        this._icons = {
            1: DataCenter.cfg.carom,
            2: DataCenter.cfg.fall,
            3: DataCenter.cfg.drop,
            4: DataCenter.cfg.stop
        };
        this._body = null;
        //状态
        this._state = 0;
        //位置没有改变的进入时间
        this._posUnchangedTime = 0;
        //上一次的位置
        this._lastPostion = [0, 0];
        //压在上面的方块数
        this._upBlock = 0;
        this.createView();
    }
    Block.prototype.isStop = function () {
        return this._state == Block.STATE_STOP ? true : false;
    };
    Block.prototype.createView = function () {
        //this.anchorX = this.anchorY = 0.5;
        this.setState(Block.STATE_FALL);
    };
    Block.prototype.setBody = function (body) {
        this._body = body;
        var pos = this.getPos();
        this._lastPostion[0] = pos[0];
        this._lastPostion[1] = pos[1];
    };
    Block.prototype.getBody = function () {
        return this._body;
    };
    //压在上面的方块数
    Block.prototype.setUpBlock = function (count) {
        this._upBlock = count;
        if (this._state == Block.STATE_STOP) {
            var pngNames = this._icons[this._state];
            var imgName = pngNames[this._upBlock];
            this.changeImg(imgName);
        }
    };
    //获得位置（处理过的，主要用来比较)
    Block.prototype.getPos = function () {
        var posX = this.x >> 0;
        var posY = this.y >> 0;
        return [posX, posY];
    };
    Block.prototype.update = function () {
        this.getRect();
        var pos = this.getPos();
        var isMoved = false;
        //var dx: number = pos[0] - this._lastPostion[0];
        var dy = pos[1] - this._lastPostion[1];
        var tolerance = DataCenter.cfg.tolerance;
        if (dy * dy > tolerance * tolerance) {
            isMoved = true;
            this._lastPostion[0] = pos[0];
            this._lastPostion[1] = pos[1];
        }
        if (false == isMoved) {
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
    };
    Block.prototype.setState = function (state) {
        if (this._state == state) {
            return;
        }
        this._state = state;
        var pngNames = this._icons[state];
        var imgName = "";
        if (state == Block.STATE_STOP) {
            imgName = pngNames[this._upBlock];
        }
        else {
            imgName = pngNames[(pngNames.length * Math.random()) >> 0];
        }
        this.changeImg(imgName);
    };
    Block.prototype.changeImg = function (name) {
        this.removeChildren();
        var block = Util.createBitmapByName(name);
        this.addChild(block);
        block.anchorX = block.anchorY = 0.5;
    };
    Block.prototype.getRect = function () {
        var x = this.x - this.width / 2;
        var y = this.y - this.height / 2;
        return new egret.Rectangle(x, y, this.width, this.height);
    };
    //被弹开
    Block.STATE_CAROM = 1;
    //下落
    Block.STATE_FALL = 2;
    //失去平衡跌落
    Block.STATE_DROP = 3;
    //停止
    Block.STATE_STOP = 4;
    return Block;
})(egret.Sprite);
Block.prototype.__class__ = "Block";
//# sourceMappingURL=Block.js.map