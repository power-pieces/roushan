/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class LoadingUI extends AView{

    private _role: Role;

    private _mc: egret.Bitmap;
    private _mcTS: egret.Texture[];
    private _mcIndex: number = 0;
    private _progressBar: egret.Bitmap;

    private _timer: egret.Timer = new egret.Timer(200,0);

    public constructor(){
        super();
        this.createView();
    }

    private createView(): void {
        this.graphics.beginFill(0x9fd9f6);
        this.graphics.drawRect(0, 0, ViewManager.stage.stageWidth, ViewManager.stage.stageHeight);
        this.graphics.endFill();

        this._role = new Role(1);
        this._role.x = 210;
        this._role.y = 470;
        this.addChild(this._role);

        var loading: egret.DisplayObject = this.addChild(Texture.create("loading_png"));
        loading.x = 280;
        loading.y = 450;

        this._mcTS = [];
        for (var i: number = 1; i <= 3; i++) {
            this._mcTS.push(Texture.createTexture("loading_" + i + "_png"));
        }
        this._mc = new egret.Bitmap(this._mcTS[this._mcIndex]);
        this._mc.x = 424;
        this._mc.y = 450;
        this.addChild(this._mc);

        var loadingBG: egret.DisplayObject = this.addChild(Texture.create("progress_bg_png"));
        loadingBG.x = 280;
        loadingBG.y = 500;
        this.addChild(loadingBG);
        this._progressBar = Texture.create("progress_bar_png");
        this.addChild(this._progressBar);

        this._progressBar.x = loadingBG.x;
        this._progressBar.y = loadingBG.y;


        this._timer.start();
    }

    public addListeners(): void {
        //this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
    }

    public removeListeners(): void {
        //this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
    }

    private timerHandler(e: egret.TimerEvent): void {
        this._role.update();

        this._mcIndex++;
        if (this._mcIndex >= this._mcTS.length) {
            this._mcIndex = 0;
        }
        this._mc.texture = this._mcTS[this._mcIndex];
    }

    public setProgress(current, total):void {
        this._progressBar.scrollRect = new egret.Rectangle(0, 0, current / total * this._progressBar.width, this._progressBar.height);
    }
}
