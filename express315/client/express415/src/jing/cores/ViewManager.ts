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
        view.onAddedToStage();
        this._nowView = view;
        return view;
    }

    private _mask: Mask = new Mask();

    private _panel: AView = null;

    //显示指定面板
    public showPanel(panel: AView, isMask: boolean = true, lockMask: boolean = false, maskColor: number = 0, maskAlpha: number = 0.7): AView {
        if (this._panel) {
            this.closePanel();
        }

        var mask: Mask = this._mask;
        if (mask) {
            mask.init();
        }
        if (isMask) {
            mask.graphics.beginFill(maskColor, maskAlpha);
            mask.graphics.drawRect(0, 0, ViewManager.stage.stageWidth, ViewManager.stage.stageHeight);
            mask.graphics.endFill();

            ViewManager.stage.addChild(mask);            
            mask.touchEnabled = true;
            mask.isLock = lockMask;
        }
        panel.addListeners();
        ViewManager.stage.addChild(panel);
        panel.onAddedToStage();
        this._panel = panel;
        return panel;
    }

    public closePanel(): void {
        if (this._panel) {
            this._panel.dispose();
            this._panel = null;

            if (this._mask) {
                this._mask.init();
            }
        }
    }

    public putToCenter(view: egret.Sprite): void {
        view.x = (ViewManager.stage.stageWidth - view.width) >> 1;
        view.y = (ViewManager.stage.stageHeight - view.height) >> 1;
    }


}
