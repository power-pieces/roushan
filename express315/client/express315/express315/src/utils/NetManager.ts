
/**
* 网络通信类
* 示例：NetManager.call("login", { id: 1 }, this.onNetBack, this);      
*/
class NetManager {

    private static _proxy: NetProxy;
    private static _callBack: Function;
    private static _params: any;

    public static call(action: string, params: any, callBack: Function, thisObject: any): void {
        ViewManager.instance.showPanel(new MessagePanel("网络通信中..."), true, true);

        this._callBack = callBack.bind(thisObject);
        this._params = params;

        if (null != this._proxy) {
            return;
        }


        var np: NetProxy = new NetProxy();
        var url: string = DataCenter.cfg.server;

        var args: any = {};
        args.mod = "user";
        args.action = action;
        params.id = DataCenter.id;
        params.sign = DataCenter.sign;
        args.params = JSON.stringify(params);

        np.request(url, this.onCallBack, this, args, egret.URLRequestMethod.GET, egret.URLLoaderDataFormat.TEXT);
        this._proxy = np;
    }

    private static onCallBack(jsonStr: string): void {
        ViewManager.instance.closePanel();

        try {
            var data: any = JSON.parse(jsonStr);
            if (data.error > 0) {
                ViewManager.instance.showPanel(new MessagePanel("错误：" + data.msg), true, true);
            }
            this._callBack(data.data, this._params);
        }
        catch (e) {
            ViewManager.instance.showPanel(new MessagePanel("程序崩溃：" + e.message), true, true);
        }
    }
}