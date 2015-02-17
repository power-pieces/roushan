class DataCenter {
    //配置文件
    /**
     {
     "isDebug":false,
     "factor":50,
     "bossHP":255
     }
     */
    public static cfg: any = null;

    //方块的层数
    public static blockDeep: number = 0;

    //使用的摩擦力
    public static friction: number = 1;
    //冰模式
    public static isIceMode:boolean = false;
    //最后得分
    public static score:number = 0;
    //战胜人数百分比
    public static percent: number = 0;

    //是否是失败了
    public static isFail: boolean = false;
}