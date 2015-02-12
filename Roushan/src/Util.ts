class Util
{

    public constructor() {
        
    }

    public static stage: egret.Stage = null;
    /*
     * 获取舞台宽度
     */
    public static getStageWidth():number
    {
        return this.stage.width;
    }
    /*
     * 获取舞台高度
     */
    public static getStageHeight():number
    {
        return this.stage.height;
    }
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    */
    public static createBitmapByName(name: string): egret.Bitmap
    {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /*
     * 获取对应数位的值
     *
     */
    public static getNumberByLevel(total:number, level:number):number
    {
        var tempNum:number;
        var levelNum:number = 1;
        for(var i = 0; i < level; i++)
        {
            levelNum *= 10;
        }
        tempNum = Math.floor(total * 10 / levelNum);
        return tempNum % levelNum;
    }
    /*
     * 通过数值获取图片
     */
    public static getNumPicByNum(num:number):egret.Bitmap
    {
        var picName:string = "number" + num;
        return Util.createBitmapByName(picName);
    }
}