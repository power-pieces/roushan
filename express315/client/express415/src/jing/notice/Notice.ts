class Notice{
    private _type: string;
	
	public get type():string{
		return this._type;
    }

    private _data: any;
    public get data(): any {
        return this._data;
    }

    private _args: any;
    public get args(): any {
        return this._args;
    }
		
	public constructor(type:string, data:any = null, args:any = null){
        this._type = type;
        this._data = data;
        this._args = args;
    }

    //«–ªªΩÁ√Ê
    public static CHANGE_VIEW: string = "change_view";
}
