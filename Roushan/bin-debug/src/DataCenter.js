var DataCenter = (function () {
    function DataCenter() {
    }
    //配置文件
    /**
     {
     "isDebug":false,
     "factor":50,
     "bossHP":255
     }
     */
    DataCenter.cfg = null;
    //冰模式
    DataCenter.isIceMode = false;
    //最后得分
    DataCenter.score = 56;
    //战胜人数百分比
    DataCenter.percent = 34;
    return DataCenter;
})();
DataCenter.prototype.__class__ = "DataCenter";
