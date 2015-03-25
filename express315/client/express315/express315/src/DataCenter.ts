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

    //玩家ID
    public static id: string = "";

    //剩余游戏次数
    public static remain: number = 999;

    //赏金数量
    public static reward: number = 999;

    //杀死正牌数
    public static killReal: number = 0;

    //杀死山寨数
    public static killFake: number = 0;
}