class Extend {

    /**
    * 调用外部方法
    */
    public static callWindow(funName: string): any {
        if (null == window[funName]) {
            return null;
        }
        var result: any = window[funName]();
        return result;
    }

    public static callReadyShare(record:number): any {
        if (null == window["readyShare"]) {
            return null;
        }
        var result: any = window["readyShare"](record);
        return result;
    }


}