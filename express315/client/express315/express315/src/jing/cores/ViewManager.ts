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
    public changeView(viewName: string): egret.Sprite {
        var view: AView = new this._viewMap[viewName]();

        if (null != this._nowView) {
            this._nowView.dispose();
        }
        view.addListeners();
        ViewManager.stage.addChild(view);
        this._nowView = view;
        return view;
    }

    private _mask: egret.Shape = new egret.Shape();

    //显示指定面板
    public showPanel(panel:AView, isMask:boolean = true, maskColor:number = 0, maskAlpha:number = 0.5): void {
        var mask: egret.Shape = this._mask;
        if (mask) {
            mask.graphics.clear();
            if (mask.parent) {
                mask.parent.removeChild(mask);
            }
        }
        if (isMask) {
            mask.graphics.beginFill(maskColor, maskAlpha);
            mask.graphics.drawRect(0, 0, ViewManager.stage.stageWidth, ViewManager.stage.stageHeight);
            mask.graphics.endFill();

            ViewManager.stage.addChild(mask);            
            mask.touchEnabled = true;
        }

        ViewManager.stage.addChild(panel);
    }

    public putToCenter(view: egret.Sprite): void {
        view.x = (ViewManager.stage.stageWidth - view.width) >> 1;
        view.y = (ViewManager.stage.stageHeight - view.height) >> 1;
    }


}
