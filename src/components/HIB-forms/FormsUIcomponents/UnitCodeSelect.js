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
        margin:5,
        width:90
    }
 });

export default ({ label, targetCodeName, unitCodeList, sendData, setValue})=>{
    const classes = useStyles();
    const [postCodeData, setPostCodeData] = useState("讀取中")
    const [unitCodeInputValue, setUnitCodeInputValue] = React.useState('');//欄位顯示的名稱
    const [list, setList] = useState(unitCodeList)
    const [cityName, setCityName] = useState("")
    //const [nowCode, setNowCode] = useState()
    const [nowName, setNowName] = useState()

    const [canUse, setCanUse] = useState(true)
    const [open, setOpen] = useState(false)
    const [goCity, setGoCity] = useState(true)//縣市選擇按鈕的開關
    

    /*init */
    /*useEffect(()=>{
        if(open){
            setCities()
        }
        return 
    
    },[open])
  

    useEffect(()=>{        
        if(list.length > 0){
            
        }        
    },[list])
    */

    useEffect(()=>{
        if(targetCodeName !="" && targetCodeName != undefined){
           unitCodeList.forEach(unit =>{
                /*if(unit.dept_no == targetCode){
                    setUnitCodeInputValue(unit.name_s)
                    setNowCode(unit.dept_no)
                    return;
                }*/
                if(unit.name_s == targetCodeName){
                    setUnitCodeInputValue(unit.name_s)
                    setNowName(unit.name_s)
                    return;
                }
           });  
        }
    },[targetCodeName, unitCodeList])

    /*確認讀取資料完成*/
    useEffect(()=>{
        setCanUse(false)
        setList(unitCodeList)
    },[unitCodeList])

    const openPanel =()=>{
        if(!canUse){
            setOpen(true)
        }
    }
    
    const handleClose = ()=>{
        setOpen(false)
    }

    const clickHander = (event)=>{        
        const _value = event.currentTarget.value; 
        setUnitCodeInputValue(_value.split("@")[1])
        //*完成送出
        sendData(_value.split("@")[0], _value.split("@")[1])//傳送郵遞區號到外部接收
        //setNowCode(_value.split("@")[0])//
        setNowName(_value.split("@")[1])
        //handleClose()
        
        setOpen(false)
    }

    return(
        <div>
            <TextField
                label={label}
                value={unitCodeInputValue}
                variant="outlined" 
                disabled={canUse}
                onClick={openPanel} 
                error={nowName?false:true}
                helperText="如需變更通訊處請在此做修正"
                style={{margin:10}}
            />
            
            <Dialog 
                disableBackdropClick={true}
                disableEscapeKeyDown 
                open={open} 
                onClose={handleClose}
            >
            <DialogTitle>請選擇通訊處</DialogTitle>
            <DialogContent>  
                {
                    list.map((value, index)=>{
                        return(
                            <Button key={"btn_"+index} className={classes.button} variant="contained" onClick={clickHander} value={value.dept_no+"@"+value.name_s}>
                                {value.name_s}
                            </Button>
                        )                            
                    })
                }
            </DialogContent>
            <DialogActions>               
               <Button onClick={handleClose} variant="contained" color="secondary">取消</Button>
            </DialogActions>
        </Dialog>
      </div>
    )
}