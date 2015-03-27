/*
* 网络通信代理
*/
var NetProxy = (function () {
    function NetProxy() {
        this._loader = null;
        this._request = null;
        this._callBack = null;
    }
    NetProxy.prototype.request = function (url, callBack, thisObject, params, method, dataFormat) {
        if (callBack === void 0) { callBack = null; }
        if (thisObject === void 0) { thisObject = null; }
        if (params === void 0) { params = null; }
        if (method === void 0) { method = egret.URLRequestMethod.GET; }
        if (dataFormat === void 0) { dataFormat = egret.URLLoaderDataFormat.TEXT; }
        if (callBack) {
            this._callBack = callBack.bind(thisObject);
        }
        this._loader = new egret.URLLoader();
        this._loader.dataFormat = dataFormat;
        this._request = new egret.URLRequest(url);
        this._request.method = method;
        if (params) {
            var values = new egret.URLVariables();
            values.variables = params;
            this._request.data = values;
        }
        this._loader.addEventListener(egret.Event.COMPLETE, this.onRequestData, this);
        this._loader.load(this._request);
    };
    //private requestData(): void {
    //    //创建POST请求
    //    var url: string = DataCenter.server + "server/load.php";
    //    var loader: egret.URLLoader = new egret.URLLoader();
    //    loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
    //    loader.addEventListener(egret.Event.COMPLETE, this.onRequestData, this);
    //    var request: egret.URLRequest = new egret.URLRequest(url);
    //    request.method = egret.URLRequestMethod.GET;
    //    var values: egret.URLVariables = new egret.URLVariables("id=" + DataCenter.selectedId);
    //    request.data = values;
    //    loader.load(request);
    //}
    NetProxy.prototype.onRequestData = function (e) {
        this._loader.removeEventListener(egret.Event.COMPLETE, this.onRequestData, this);
        if (this._callBack) {
            this._callBack(this._loader.data);
        }
    };
    return NetProxy;
})();
NetProxy.prototype.__class__ = "NetProxy";
//# sourceMappingURL=NetProxy.js.map