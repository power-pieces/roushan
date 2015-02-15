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
        return tempNum % 10;
    }
    /*
     * 通过数值获取图片
     */
    public static getNumPicByNum(num:number):egret.Bitmap
    {
        var picName:string = "number" + num;
        return Util.createBitmapByName(picName);
    }
    /*
     * 通过使用方块数量获取结束内容
     */
    public static getResultContent(num:number):string
    {
        var tempIndex = 0;
        if(num <= 10)
        {
            tempIndex = 0;
        }
        else if(num <= 20)
        {
            tempIndex = 1;
        }
        else if(num <= 30)
        {
            tempIndex = 2;
        }
        else if(num <= 40)
        {
            tempIndex = 3;
        }
        else
        {
            tempIndex = 4;
        }
        return DataCenter.cfg.resultContents[tempIndex];
    }

    //获取用户ID
    public static getUserID(): string {
        if (window["getMyOpenId"]) {
            var id: string = window["getMyOpenId"]();
            return id;
        }
        else {
            return "test";
        }
        
    }

    //设置分享信息
    public static setUserInfo(block: number, per: number): void {
        if (window["setTimeLine"]) {
            window["setTimeLine"](block, per);
            window["setAppMessage"](block, per);
        }
    }
}