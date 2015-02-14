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
    private _bitmapNums = [];

    public constructor()
    {
        super();
        this.createUI();
    }

    private createUI():void
    {
        this._bg = Util.createBitmapByName("game_bg");
        this.addChild(this._bg);

        this._result = Util.createBitmapByName("result_bg");
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
        var r4:egret.Bitmap = Util.createBitmapByName("r4");
        r4.x = (this._bg.width - r4.width) / 2;
        r4.y = this._bg.height - r4.height;
        this.addChild(r4);


        var txtY = this._bg.height / 3;
        var txt = this.createTxt();
        txt.text = "您只用了      个方块";
        txt.x = (this._bg.width - txt.width) / 2;
        txt.y = txtY;
        txtY += 40;
        txt = this.createTxt();
        txt.text = " 就打败了肉山大魔王";
        txt.x = (this._bg.width - txt.width) / 2;
        txt.y = txtY;
        txtY += 60;
        txt = this.createTxt();
        txt.text = "超过了      %的玩家";
        txt.x = (this._bg.width - txt.width) / 2;
        txt.y = txtY;
        txtY += 100;

        this._remarkTxt = new egret.TextField();
        this._remarkTxt.size = 35;
        this._remarkTxt._setLineSpacing(10);
        this._remarkTxt._setTextColor(0x6b238e);
        this._remarkTxt._setFontFamily("黑体");
        this._remarkTxt._setBold(true);
        this._remarkTxt.text = "";
        this._remarkTxt.x = (this._bg.width - this._remarkTxt.width) / 2;
        this._remarkTxt.y = txtY;
        this.addChild(this._remarkTxt);
    }

    private createTxt():egret.TextField
    {
        var txt:egret.TextField = new egret.TextField();
        txt.size = 30;
        txt._setLineSpacing(10);
        txt._setTextColor(0x000000);
        txt._setFontFamily("黑体");
        txt._setBold(true);
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
            if (DataCenter.percent >= 100) {
                DataCenter.percent = 99;
            }
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
        this.clearGameInfo();
        var score1:number = Util.getNumberByLevel(DataCenter.score, 1);
        var score2:number = Util.getNumberByLevel(DataCenter.score, 2);
        var percent1:number = Util.getNumberByLevel(DataCenter.percent, 1);
        var percent2:number = Util.getNumberByLevel(DataCenter.percent, 2);
        var score1Bit:egret.Bitmap = Util.getNumPicByNum(score1);
        score1Bit.x = this._bg.width / 2 + 13;
        score1Bit.y = this._bg.height / 3 - 30;
        this.addChild(score1Bit);
        this._bitmapNums.push(score1Bit);
        if(score2 != 0)
        {
            var score2Bit:egret.Bitmap = Util.getNumPicByNum(score2);
            score2Bit.x = score1Bit.x - 40;
            score2Bit.y = score1Bit.y;
            this.addChild(score2Bit);
            this._bitmapNums.push(score2Bit);
        }
        var percent1Bit:egret.Bitmap = Util.getNumPicByNum(percent1);
        percent1Bit.x = score1Bit.x - 23;
        percent1Bit.y = score1Bit.y + 100;
        this.addChild(percent1Bit);
        this._bitmapNums.push(percent1Bit);
        if(percent2 != 0)
        {
            var percent2Bit:egret.Bitmap = Util.getNumPicByNum(percent2);
            percent2Bit.x = percent1Bit.x - 40;
            percent2Bit.y = percent1Bit.y;
            this.addChild(percent2Bit);
            this._bitmapNums.push(percent2Bit);
        }
        var str:string = Util.getResultContent(DataCenter.score);
        this._remarkTxt.text = str;
        this._remarkTxt.x = (this._bg.width - this._remarkTxt.width) / 2;
    }
    /*
     * 清理游戏信息
     */
    private clearGameInfo():void
    {
        var len:number = this._bitmapNums.length;
        var tempBit:egret.Bitmap;
        while (len > 0)
        {
            len --;
            tempBit = this._bitmapNums.pop();
            tempBit.parent.removeChild(tempBit);
        }

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