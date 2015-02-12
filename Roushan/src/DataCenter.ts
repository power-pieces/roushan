class DataCenter {
    //服务器地址
    public static server:string = "http://localhost/paper/"

    //选中的类型
    public static selectedId: number = 0;
    //别人的数据
    public static datas: any[] = [];

    //openid
    public static openId: string = "";
    //文字id
    public static linkid: number = 0;
    //对方文字数据
    public static linkData: any = null;



    //冰模式
    public static isIceMode:boolean = false;
    //最后得分
    public static score:number = 56;
    //战胜人数百分比
    public static percent:number = 34;
}