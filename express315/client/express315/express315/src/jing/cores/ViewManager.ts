/**
*   显示界面管理
*/
class ViewManager {

    public static stage: egret.Stage = null;

    public constructor() {
            
    }

    private static _instance: ViewManager = null;

    //获取单例
    public static get instance(): ViewManager {
        if (null == ViewManager._instance) {
            ViewManager._instance = new ViewManager();
        }
        return ViewManager._instance;
        
    }

    private _viewMap: any = {};
    public registView(name: string, cls:any): void {
        this._viewMap[name] = cls;
    }

    private _nowView: AView = null;

    //展示指定界面
    public changeView(viewName: string): void {
        var view: AView = new this._viewMap[viewName]();

        if (null != this._nowView) {
            this._nowView.dispose();
        }
        view.addListeners();
        ViewManager.stage.addChild(view);
        this._nowView = view;
    }

    //显示指定面板
    public showPanel(): void {

    }


}
