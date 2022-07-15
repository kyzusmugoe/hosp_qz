/*檢查器，使用方式：*/

class Checker{
    //list={}
    constructor(){
        this.list={}
        /*由於建立出來的物件並沒有引用react
        因此要更新reducer的內容必須透過外面執行*/
        
       /* if(sendData!=undefined){
            console.log("init send Data func")
            this.sendData = sendData
            console.log(this.sendData)
        }else{
            console.log("not init send Data func")
            this.sendData =()=>{console.log("not defined")}
            
        }*/
            
    }


    inputCheck = (value)=>{
        const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'？%]") 
        if(value.match(pattern)){            
            console.log("match")
            return value.replace(pattern, "")           
        }else{
            console.log("not match")
            return false
        }
    }

    checkValue = (id, type="", value)=>{
        /**/
        let _d={}
        let token=false
        let mesg=""
        if(this.list[id] == undefined){
            this.list = {...this.list, [id]:_d}
        }else{
            _d =this.list[id]
        }
        //_d={..._d, [type]:value}
        switch(type){
            case "CHECK_ID":
                token = this.checkID(value)
                break;
            case "EMPTY":
                token = this.checkEmpty(value)
                break;
            }
        _d={..._d, [type]:token}
        
        this.list = {...this.list, [id]:_d}
        
        return token;
    }
    
    /*檢查項目*/
    //名字
    checkName(value){
        return true;
    }

    //身分證字號
    checkID(value){
        return value == "A" ? "身分證號格式錯誤":false
    }

    //是否空白
    checkEmpty(value){
       // return value == "" ? true:false
        return value == "" ? "必填欄位":false
    }
    
    viewList(){
        //false表示無任何異常，true代表有出現檢查錯誤
        console.log("check list", this.list)
        let token = false
        for (let key in this.list) {
            const _d = this.list[key]
            for (let key in _d) {                
                if(_d[key])
                token = true                
            }
        }

        //執行外部定義的dispatcher
        if(this.sendData!=undefined){
            this.sendData(token)
        }
    
        console.log("check list result", token)
        return token
    }
    
}

export default Checker

