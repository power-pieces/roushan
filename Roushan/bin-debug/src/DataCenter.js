var DataCenter = (function () {
    function DataCenter() {
    }
    //服务器地址
    DataCenter.server = "http://localhost/paper/";
    //选中的类型
    DataCenter.selectedId = 0;
    //别人的数据
    DataCenter.datas = [];
    //openid
    DataCenter.openId = "";
    //文字id
    DataCenter.linkid = 0;
    //对方文字数据
    DataCenter.linkData = null;
    //冰模式
    DataCenter.isIceMode = false;
    //最后得分
    DataCenter.score = 56;
    //战胜人数百分比
    DataCenter.percent = 34;
    return DataCenter;
})();
DataCenter.prototype.__class__ = "DataCenter";
