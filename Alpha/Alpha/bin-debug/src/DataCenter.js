var DataCenter = (function () {
    function DataCenter() {
    }
    var __egretProto__ = DataCenter.prototype;
    //配置文件
    /**
     {
     "isDebug":false,
     "factor":50,
     "bossHP":255
     }
     */
    DataCenter.cfg = null;
    //方块的层数
    DataCenter.blockDeep = 0;
    //使用的摩擦力
    DataCenter.friction = 1;
    //冰模式
    DataCenter.isIceMode = false;
    //最后得分
    DataCenter.score = 0;
    //战胜人数百分比
    DataCenter.percent = 0;
    //是否是失败了
    DataCenter.isFail = false;
    //是否是全新的
    DataCenter.isNew = true;
    return DataCenter;
})();
DataCenter.prototype.__class__ = "DataCenter";
//# sourceMappingURL=DataCenter.js.map