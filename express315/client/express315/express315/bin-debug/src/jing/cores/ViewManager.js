/**
*   显示界面管理
*/
var ViewManager = (function () {
    function ViewManager() {
        this._nowView = null;
    }
    Object.defineProperty(ViewManager, "instance", {
        //获取单例
        get: function () {
            if (null == ViewManager._instance) {
                ViewManager._instance = new ViewManager();
            }
            return ViewManager._instance;
        },
        enumerable: true,
        configurable: true
    });

    //展示指定界面
    ViewManager.prototype.show = function (view) {
        if (null != this._nowView) {
            this._nowView.dispose();
        }
        view.addListeners();
        ViewManager.stage.addChild(view);
        this._nowView = view;
    };
    ViewManager.stage = null;

    ViewManager._instance = null;
    return ViewManager;
})();
//# sourceMappingURL=ViewManager.js.map
