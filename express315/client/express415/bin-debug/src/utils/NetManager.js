/**
* 网络通信类
* 示例：NetManager.call("login", { id: 1 }, this.onNetBack, this);
*/
var NetManager = (function () {
    function NetManager() {
    }
    NetManager.implicitCall = function (action, params) {
        this._params = params;
        var np = new NetProxy();
        var url = DataCenter.cfg.server;
        var args = {};
        args.mod = "user";
        args.action = action;
        params.id = DataCenter.id;
        params.sign = DataCenter.sign;
        args.params = JSON.stringify(params);
        np.request(url, null, null, args);
    };
    NetManager.call = function (action, params, callBack, thisObject) {
        ViewManager.instance.showPanel(new MessagePanel("网络通信中..."), true, true);
        if (null != this._proxy) {
            ViewManager.instance.showPanel(new MessagePanel("网络冲突，请稍后重试!"), true);
            return;
        }
        this._callBack = callBack.bind(thisObject);
        this._params = params;
        var np = new NetProxy();
        var url = DataCenter.cfg.server;
        var args = {};
        args.mod = "user";
        args.action = action;
        params.id = DataCenter.id;
        params.sign = DataCenter.sign;
        args.params = JSON.stringify(params);
        np.request(url, this.onCallBack, this, args, egret.URLRequestMethod.GET, egret.URLLoaderDataFormat.TEXT);
        this._proxy = np;
    };
    NetManager.onCallBack = function (jsonStr) {
        console.log(jsonStr);
        ViewManager.instance.closePanel();
        try {
            var data = JSON.parse(jsonStr);
            if (data.error > 0) {
                ViewManager.instance.showPanel(new MessagePanel("错误：" + data.msg), true, true);
            }
            else {
                this._callBack(data.data, this._params);
            }
        }
        catch (e) {
            ViewManager.instance.showPanel(new MessagePanel("程序崩溃：" + jsonStr), true, true);
        }
        this._proxy = null;
    };
    return NetManager;
})();
NetManager.prototype.__class__ = "NetManager";
//# sourceMappingURL=NetManager.js.map