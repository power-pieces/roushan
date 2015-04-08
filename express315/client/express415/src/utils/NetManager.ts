
/**
* 网络通信类
* 示例：NetManager.call("login", { id: 1 }, this.onNetBack, this);      
*/
class NetManager {

    private static _proxy: NetProxy;
    private static _callBack: Function;
    private static _params: any;

    public static implicitCall(action: string, params: any): void {
        this._params = params;

        var np: NetProxy = new NetProxy();
        var url: string = DataCenter.cfg.server;

        var args: any = {};
        args.mod = "user";
        args.action = action;
        params.id = DataCenter.id;
        params.sign = DataCenter.sign;
        args.params = JSON.stringify(params);        

        np.request(url, null, null, args);
    }

    public static call(action: string, params: any, callBack: Function, thisObject: any): void {
        ViewManager.instance.showPanel(new MessagePanel("网络通信中..."), true, true);
        if (null != this._proxy) {
            ViewManager.instance.showPanel(new MessagePanel("网络冲突，请稍后重试!"), true);
            return;
        }

        this._callBack = callBack.bind(thisObject);
        this._params = params;

        var np: NetProxy = new NetProxy();
        var url: string = DataCenter.cfg.server;

        var args: any = {};
        args.mod = "user";
        args.action = action;
        params.id = DataCenter.id;
        params.sign = DataCenter.sign;
        args.params = JSON.stringify(params);

        //alert("传递的参数：" + args.params);

        np.request(url, this.onCallBack, this, args, egret.URLRequestMethod.GET, egret.URLLoaderDataFormat.TEXT);
        this._proxy = np;
    }

    private static onCallBack(jsonStr: string): void {
        console.log(jsonStr);
        ViewManager.instance.closePanel();
        this._proxy = null;

        try {
            var data: any = JSON.parse(jsonStr);
            if (data.error > 0) {
                ViewManager.instance.showPanel(new MessagePanel("错误：" + data.msg), true, true);
            }
            else {
                this._callBack(data.data, this._params);
            }
        }        
        catch (e) {
            alert("程序崩溃：" + e.message);
            alert("程序崩溃：" + jsonStr);
            //ViewManager.instance.showPanel(new MessagePanel("程序崩溃：" + jsonStr), true, true);
        }

        
    }
}