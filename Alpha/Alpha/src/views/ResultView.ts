/**
 * Created by Owen on 2015/2/12.
 */

class ResultView extends ViewBase
{

    private _bg:egret.Bitmap;
    private _result:egret.Bitmap;
    private _againBtn:egret.Bitmap;
    private _shareBtn:egret.Bitmap;

    private _remarkTxt:egret.TextField;
    //private _bitmapNums = [];
    private _useBlocksBit:BitmapNumber;
    private _percentBit:BitmapNumber;

    public constructor()
    {
        super();
        this.createUI();
    }

    private createUI():void
    {
        this._bg = DataCenter.isFail ? Util.createBitmapByName("game_fail_bg"): Util.createBitmapByName("game_bg");
        this.addChild(this._bg);

        this._result = DataCenter.isIceMode? Util.createBitmapByName("ice_result"):Util.createBitmapByName("result_bg");
        this._result.x = (this._bg.width - this._result.width ) / 2;
        this.addChild(this._result);

        this._againBtn = Util.createBitmapByName("again_btn");
        this._againBtn.x = (this._bg.width - this._againBtn.width) / 5;
        this._againBtn.y = (this._bg.height - this._againBtn.height) / 3 * 2;
        this.addChild(this._againBtn);
        this._againBtn.touchEnabled = true;

        this._shareBtn = Util.createBitmapByName("share_btn");
        this._shareBtn.x = (this._bg.width - this._shareBtn.width) / 5 * 4;
        this._shareBtn.y = (this._bg.height - this._shareBtn.height) / 3 * 2;
        this.addChild(this._shareBtn);
        this._shareBtn.touchEnabled = true;

        var r2:egret.Bitmap = Util.createBitmapByName("r2");
        r2.x = (this._bg.width - r2.width) / 5;
        r2.y = this._bg.height - r2.height;
        this.addChild(r2);
        var r3:egret.Bitmap = Util.createBitmapByName("r3");
        r3.x = (this._bg.width - r3.width) / 5 * 4;
        r3.y = this._bg.height - r3.height;
        this.addChild(r3);
        var r1:egret.Bitmap = Util.createBitmapByName("r1");
        r1.x = (this._bg.width - r1.width) / 2;
        r1.y = this._bg.height - r1.height;
        this.addChild(r1);
        var r4: egret.Bitmap = DataCenter.isFail ? Util.createBitmapByName("rf1_png"):Util.createBitmapByName("r4");
        r4.x = (this._bg.width - r4.width) / 2;
        r4.y = this._bg.height - r4.height;
        this.addChild(r4);


        //var txtY = this._bg.height / 3;
        //var txt = this.createTxt();
        //txt.text = "您只用了      个方块";
        //txt.x = (this._bg.width - txt.width) / 2;
        //txt.y = txtY;
        //txtY += 40;

        //txt = this.createTxt();
        //txt.text = "超过了        %的玩家";
        //txt.x = (this._bg.width - txt.width) / 2;
        //txt.y = txtY;
        //txtY += 100;

        this._useBlocksBit = new BitmapNumber();
        this._useBlocksBit.x = this._bg.width / 2 + 60;
        this._useBlocksBit.y = this._bg.height / 3 - 30;
        this.addChild(this._useBlocksBit);

        this._percentBit = new BitmapNumber();
        this._percentBit.x = this._bg.width / 2 + 10;
        this._percentBit.y = this._bg.height / 3 + 80;
        this.addChild(this._percentBit);

        this._remarkTxt = new egret.TextField();
        this._remarkTxt.size = 35;
        this._remarkTxt._setLineSpacing(10);
        this._remarkTxt._setTextColor(0x6b238e);
        this._remarkTxt._setFontFamily("黑体");
        this._remarkTxt._setBold(true);
        this._remarkTxt.text = "";
        this._remarkTxt.x = (this._bg.width - this._remarkTxt.width) / 2;
        this._remarkTxt.y = this._percentBit.y + 100;
        this.addChild(this._remarkTxt);
    }

    private createTxt(content:string = "", align: string = egret.HorizontalAlign.LEFT):egret.TextField
    {
        var txt:egret.TextField = new egret.TextField();
        txt.size = 30;
        txt._setLineSpacing(10);
        txt._setTextColor(0x000000);
        txt._setFontFamily("黑体");
        txt._setBold(true);
        txt.textAlign = align;
        txt.text = content;
        
        this.addChild(txt);
        return txt;
    }

    public addListeners()
    {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
        this._againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchAgainBtnHandler, this);
        this._shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchShareBtnHandler, this);
    }

    public removeListeners()
    {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBgHandler, this);
        this._againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchAgainBtnHandler, this);
        this._shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchShareBtnHandler, this);
    }

    public requestRank(): void {
        this.touchEnabled = false;

        //创建POST请求
        var url: string = DataCenter.cfg.server;
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onRequestData, this);
        var request: egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.GET;
        var values: egret.URLVariables = new egret.URLVariables("id=" + Util.getUserID() + "&block=" + DataCenter.score);
        request.data = values;
        loader.load(request);
    }

    private onRequestData(e: egret.Event): void {
        this.touchEnabled = true;

        var loader: egret.URLLoader = <egret.URLLoader> e.target;
        var json: string = loader.data;
        var data = JSON.parse(json);
        if (0 == data.code) {
            DataCenter.percent = data.percent;
            //if (DataCenter.percent >= 100) {
            //    DataCenter.percent = 99;
            //}
            Util.setUserInfo(DataCenter.score, DataCenter.percent);
            
            this.showGameInfo();
        }
        else {
            alert(data.des);
        }       
    }

    /*
     * 显示游戏信息
     */
    public showGameInfo():void
    {
        if (DataCenter.isFail) {
            this.showFail();
        }
        else {
            this.showWin();
        }        
    }

    private showWin(): void {
        this._useBlocksBit.setShowNumber(DataCenter.score);
        this._percentBit.setShowNumber(DataCenter.percent);
        this._useBlocksBit.x = (this._bg.width - this._useBlocksBit.width) / 2 + 15;
        this._percentBit.x = (this._bg.width - this._percentBit.width) / 2 - 14;

        var str: string = Util.getResultContent(DataCenter.score);
        this._remarkTxt.text = str;
        this._remarkTxt.x = (this._bg.width - this._remarkTxt.width) / 2;

        var txt: egret.TextField = null;
        txt = this.createTxt("您只用了", egret.HorizontalAlign.LEFT);
        txt.x = this._useBlocksBit.x - txt.width;
        txt.y = this._useBlocksBit.y + this._useBlocksBit.height - txt.height;
        txt = this.createTxt("个方块", egret.HorizontalAlign.LEFT);
        txt.x = this._useBlocksBit.x + this._useBlocksBit.width;
        txt.y = this._useBlocksBit.y + this._useBlocksBit.height - txt.height;

        txt = this.createTxt();
        txt.text = " 就打败了肉山大魔王";
        txt.x = (this._bg.width - txt.width) / 2;
        txt.y = this._useBlocksBit.y + this._useBlocksBit.height + 10;

        txt = this.createTxt("超过了", egret.HorizontalAlign.RIGHT);
        txt.x = this._percentBit.x - txt.width;
        txt.y = this._percentBit.y + this._percentBit.height - txt.height;
        txt = this.createTxt("%的玩家", egret.HorizontalAlign.LEFT);
        txt.x = this._percentBit.x + this._percentBit.width;
        txt.y = this._percentBit.y + this._percentBit.height - txt.height;
    }

    private showFail(): void {
        var txt: egret.TextField = null;

        txt = this.createTxt(DataCenter.cfg.failContents[0]);
        txt.x = (this._bg.width - txt.width) / 2;
        txt.y = this._useBlocksBit.y + this._useBlocksBit.height;

        txt = this.createTxt(DataCenter.cfg.failContents[1]);
        txt.x = (this._bg.width - txt.width) / 2;
        txt.y = this._percentBit.y + this._percentBit.height;

        this._shareBtn.visible = false;
    }

    /*
     * 点击游戏屏幕
     */
    private touchBgHandler(e:egret.TouchEvent)
    {
        console.log("游戏界面点击屏幕");
    }
    /*
     * 点击再一次
     */
    private touchAgainBtnHandler(e:egret.TouchEvent)
    {
        console.log("点击再一次");
        NoticeManager.sendNotice(new Notice(NoticeCode.SHOW_GAME_VIEW))
    }
    /*
     * 点击分享
     */
    private touchShareBtnHandler(e:egret.TouchEvent)
    {
        console.log("点击分享");
        var shareView:ShareView = new ShareView();
        this.addChild(shareView);
    }
}