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

    private _nowView: AView = null;

    //展示指定界面
    public show(view: AView): void {
        if (null != this._nowView) {
            this._nowView.dispose();
        }
        view.addListeners();
        ViewManager.stage.addChild(view);
        this._nowView = view;
    }


}
