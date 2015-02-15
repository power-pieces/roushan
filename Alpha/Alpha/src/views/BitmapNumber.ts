/**
 * Created by Owen on 2015/2/15.
 */
/*
 * 图片数字
 */
class BitmapNumber extends egret.Sprite
{
    //显示数值
    private _showNumber:number;
    //数字图片数组
    private _numBits = [];
    public constructor()
    {
        super();
    }
    /*
     * 设置显示数值
     */
    public setShowNumber(data:number):void
    {
        this._showNumber = data;
        this.clearNumBits();
        this.showNumBits();
    }
    /*
     * 清理数字图片数组
     */
    private clearNumBits():void
    {
        if(this._numBits.length == 0)
        {
            return;
        }
        var len = this._numBits.length;
        var tempBit:egret.Bitmap;
        while(len > 0)
        {
            len--;
            tempBit = this._numBits.pop();
            if(tempBit.parent != null)
            {
                tempBit.parent.removeChild(tempBit);
            }
        }
    }
    /*
     * 显示数字图片
     */
    private showNumBits():void
    {
        var geLevel:number = Util.getNumberByLevel(this._showNumber, 1);
        var geBit:egret.Bitmap = Util.getNumPicByNum(geLevel);
        this.addChild(geBit);
        this._numBits.push(geBit);
        if(this._showNumber >= 10)
        {
            var shiLevel:number = Util.getNumberByLevel(this._showNumber, 2);
            var shiBit:egret.Bitmap = Util.getNumPicByNum(shiLevel);
            this.addChild(shiBit);
            this._numBits.push(shiBit);
            geBit.x = shiBit.width;
        }
        if(this._showNumber >= 100)
        {
            var baiLevel:number = Util.getNumberByLevel(this._showNumber, 3);
            var baiBit:egret.Bitmap = Util.getNumPicByNum(baiLevel);
            this.addChild(baiBit);
            this._numBits.push(baiBit);
            shiBit.x = baiBit.width;
            geBit.x = shiBit.x + shiBit.width;
        }
    }
}