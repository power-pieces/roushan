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
        //是否造成了伤害
        this.isDamaged = false;
        this.createView();
    }
    var __egretProto__ = Block.prototype;
    /**
    *获得上方方块数
    */
    __egretProto__.getUpBlock = function () {
        return this._upBlock;
    };
    __egretProto__.isStop = function () {
        return this._state == Block.STATE_STOP ? true : false;
    };
    __egretProto__.createView = function () {
        //this.anchorX = this.anchorY = 0.5;
        this.setState(Block.STATE_FALL);
    };
    __egretProto__.setBody = function (body) {
        this._body = body;
        var pos = this.getPos();
        this._lastPostion[0] = pos[0];
        this._lastPostion[1] = pos[1];
    };
    __egretProto__.getBody = function () {
        return this._body;
    };
    //压在上面的方块数
    __egretProto__.setUpBlock = function (count) {
        this._upBlock = count;
        if (this._state == Block.STATE_STOP) {
            var pngNames = this._icons[this._state];
            var imgName = pngNames[this._upBlock];
            this.changeImg(imgName);
        }
    };
    //获得位置（处理过的，主要用来比较)
    __egretProto__.getPos = function () {
        var posX = this.x >> 0;
        var posY = this.y >> 0;
        return [posX, posY];
    };
    __egretProto__.update = function () {
        this.getRect();
        var pos = this.getPos();
        //移动状态 0静止 1掉落 2弹飞
        var moveState = 0;
        //var dx: number = pos[0] - this._lastPostion[0];
        var dy = pos[1] - this._lastPostion[1];
        var tolerance = DataCenter.cfg.tolerance;
        if (dy < -tolerance) {
            moveState = 2;
            this._lastPostion[0] = pos[0];
            this._lastPostion[1] = pos[1];
        }
        else if (dy > tolerance) {
            moveState = 1;
            this._lastPostion[0] = pos[0];
            this._lastPostion[1] = pos[1];
        }
        if (0 == moveState) {
            //和上次位置一样
            if (0 == this._posUnchangedTime) {
                this._posUnchangedTime = egret.getTimer();
            }
            else if (this._state != Block.STATE_STOP && egret.getTimer() - this._posUnchangedTime >= DataCenter.cfg.stopCheckInterval) {
                this.setState(Block.STATE_STOP);
            }
        }
        else if (2 == moveState) {
            this.setState(Block.STATE_CAROM);
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
    __egretProto__.setState = function (state) {
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
    __egretProto__.changeImg = function (name) {
        this.removeChildren();
        var block = Util.createBitmapByName(name);
        this.addChild(block);
        block.anchorX = block.anchorY = 0.5;
    };
    __egretProto__.getRect = function () {
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