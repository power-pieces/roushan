var DataCenter = (function () {
    function DataCenter() {
    }
    //配置文件
    DataCenter.cfg = null;
    //邀请人ID
    DataCenter.inviter = null;
    //邀请人的名字
    DataCenter.inviterName = null;
    //邀请人的图像地址
    DataCenter.inviterHeadUrl = null;
    //邀请人杀人数
    DataCenter.inviterKill = 999;
    //玩家ID
    DataCenter.id = "";
    //玩家名字
    DataCenter.name = "";
    //玩家头像地址
    DataCenter.headUrl = "";
    //验证签名
    DataCenter.sign = "";
    //剩余游戏次数
    DataCenter.remain = 999;
    //赏金数量
    DataCenter.reward = 999;
    //杀死正牌数
    DataCenter.killReal = 0;
    //杀死山寨数
    DataCenter.killFake = 0;
    return DataCenter;
})();
DataCenter.prototype.__class__ = "DataCenter";
//# sourceMappingURL=DataCenter.js.map