import React,{useState, useEffect} from 'react';
import {  
    Typography,
    TextField,
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, 
    makeStyles,
    Select
} from '@material-ui/core';

const useStyles = makeStyles({
    button:{
        margin:5
    }
 });

export default ({postID, style, label, targetCode, postCodeList, sendData, setValue})=>{
    const classes = useStyles();
    const [postCodeData, setPostCodeData] = useState("讀取中")
    const [postCodeInputValue, setPostCodeInputValue] = React.useState('');//欄位顯示的名稱
    const [list, setList] = useState(postCodeList)
    const [cityName, setCityName] = useState("")
    const [nowCode, setNowCode] = useState()

    const [canUse, setCanUse] = useState(true)
    const [open, setOpen] = useState(false)
    const [goCity, setGoCity] = useState(true)//縣市選擇按鈕的開關
    

    /*init */
    useEffect(()=>{
        if(open){
            setCities()
        }
        return 
    
    },[open])

    
    useEffect(()=>{
        setCanUse(false)
    },[postCodeList])
    
    useEffect(()=>{
        if(targetCode !="" && targetCode != undefined && list.length>0){
            for(const areaList of postCodeList){
                setNowCode(areaList)               
                for(const item of areaList.regions){
                    if(targetCode == item.postcode){
                        const _n = "("+item.postcode+")"+areaList.city+item.region
                        setCityName(_n)
                        setPostCodeInputValue(_n)
                        //sendData(item.postcode, _n)
                        break;
                    }
                  
                }
            }   
        }
    },[targetCode, postCodeList])

    useEffect(()=>{        
        if(list.length > 0){
            
        }        
    },[list])

    const openPanel =()=>{
        if(!canUse){
            setOpen(true)
        }
    }

    const handleClose = ()=>{
        setOpen(false)
        setGoCity(false)
       // setCities()
    }

    const setCities = ()=>{
        let ary = []
        postCodeList.map((value, index)=>{
            ary.push({name:value.city, value:value.city})                     
        })
        setList(ary)
        console.log(list)
        setGoCity(true)
    }

    const setRegions = (regions)=>{
        let ary = []
        regions.map((value, index)=>{
            ary.push({name:value.region, value:value.postcode})                     
        })
        setList(ary)
        setGoCity(false)
    }

    const clickHander = (event)=>{
        const _value = event.currentTarget.value;      
        for(const item of postCodeList){
            if(item.city == _value){
                //setCityName(""+_value)
                setRegions(item.regions)
                setPostCodeInputValue(_value)               
                return
            }
        }
        let _n="";
        /*處理TextFeild上顯示的文字*/
        setPostCodeInputValue(()=>{
            for(const item of list){
                if(item.value == _value){
                   _n = "("+_value+")"+postCodeInputValue+item.name
                    setCityName(_n)
                    return _n
                }
            }
        })
        
        /*完成送出*/
        sendData(_value, _n)//傳送郵遞區號到外部接收
        setNowCode(_value)//傳送郵遞區號到外部接收
        handleClose()
    }

    return(
        <div style={style}>
            <TextField
                label={label}
                value={postCodeInputValue}
                variant="outlined" 
                disabled={canUse}
                onClick={openPanel} 
                error={nowCode?false:true}
                helperText="請選擇城市以及地區"
                style={{margin:10}}
                size="small"
            />
            
            <Dialog 
                disableBackdropClick={true}
                disableEscapeKeyDown 
                open={open} 
                onClose={handleClose}
            >
            {/*
            <DialogTitle>您現在選擇的是：<span style={{color:"#f30"}}>{cityName}</span></DialogTitle>
             */}
            <DialogTitle>請選擇縣市地區</DialogTitle>
            <DialogContent>       
                {
                    list.map((value, index)=>{
                        return(<Button key={"btn_"+index} className={classes.button} variant="contained" onClick={clickHander} value={value.value}>{value.name}</Button>)                            
                    })
                }
            </DialogContent>
                <DialogActions>
                {/*
                <Button onClick={setCities} variant="contained" disabled={goCity} >選擇縣市</Button>                
                <Button onClick={handleClose} variant="contained" color="secondary">取消</Button>
                */}
            </DialogActions>
        </Dialog>
      </div>
    )
}