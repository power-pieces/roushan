class DataCenter {

    //配置文件
    public static cfg: any = null;

    //邀请人ID
    public static inviter: string = null;

    //邀请人的名字
    public static inviterName: string = null;

    //邀请人的图像地址
    public static inviterHeadUrl: string = null;

    //邀请人杀人数
    public static inviterKill: number = 999;

    //玩家ID
    public static id: string = "";

    //玩家名字
    public static userName: string = "";

    //玩家头像地址
    public static headUrl: string = "";

    //验证签名
    public static sign: string = "";

    //剩余游戏次数
    public static remain: number = 999;

    //赏金数量
    public static reward: number = 999;

    //杀死正牌数
    public static killReal: number = 0;

    //杀死山寨数
    public static killFake: number = 0;
}