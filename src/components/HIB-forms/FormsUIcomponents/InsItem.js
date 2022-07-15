import React,{Lable, useState, useReducer,useContext, useEffect, forwardRef, useImperativeHandle} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {        
    Box,
    TextField,
    Checkbox,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    styled
} from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import WebServiceContext from '../../../webservice/WebServiceContext'

import Checker from './Checker'
import { set } from 'date-fns';


const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      width:"100%",
      maxWidth:500
    },
    selectLable:{
        backgroundColor:"white",
        marginTop:-5,
        marginLeft:10,
        zIndex:1
    }
}));


export const BasicInfoPanel = ({data})=>{
    return(
        data!="" &&
        <div>
            <div>身份證字號： {data.CustomerID}</div>
            <div>生日： {data.Birth}</div>
            <div>性別： {data.Sex}</div>
            <div>國籍： {data.Country}</div>
            <div>聯絡電話： {data.Phone}</div>
            <div>地址： {data.Address}</div> 
        </div>       
    )
}


export const  AutocompleteTextFeild=({label, defaultValue="", sendData, setValue="123"})=>{
        const [open, setOpen] = React.useState(false);
        const [options, setOptions] = React.useState([]);
        const [defValue, setDefValue] = useState(defaultValue)
        const loading = open && options.length === 0;

        const webService = useContext(WebServiceContext)

        const myData = useSelector(state => state)
        const insurer = useSelector(state => state.insurer)
        const [inputRef, setInputRef] = useState()
        useEffect(() => {
            let active = true;
            if (!loading) {
                return undefined;
            }
            webService.asyncCusList(insurer).then(data => {
               // console.log("取得LIST:",data) 
                setOptions(data)              
            }).catch(response => {
                console.log("取得清單錯誤", response)
            })

            return () => {
                active = false;
            };
        }, [loading]);
      
        useEffect(() => {
            if (!open) {
                setOptions([]);
            }
        }, [open]);
        
        useEffect(() => {
            //console.log("defaultValue", defaultValue)
            setDefValue(defaultValue)
        },[defaultValue]);
        
        
        
        return (
            <Autocomplete
            value={defValue}
            //defaultValue={defValue}       
            id="asynchronous-demo"
            style={{width:"100%"}}
            freeSolo
            open={open}
            onOpen={() => { setOpen(true) }}
            onClose={() => { setOpen(false) }}
            getOptionLabel={(option) => {
                if( option.CustomerName != undefined){
                    return option.CustomerName
                }else{
                    return option
                }
            }}
            options={options}
            loading={loading}
            onChange={(event, item)=> {
                if(item) {
                    sendData({name:item.CustomerName, id:item.CustomerID})                
                }else{
                    sendData({name:""})//清空資料
                }
            }}
            onKeyDown={(event, item)=>{
                if(event.target.value)                
                sendData({name:event.target.value})
            }}
            renderInput={(params) => {
                const pattern = new RegExp("[`~!@#$^&()=|{}':;',\\[\\].<>/?~！@#￥……&（）&;|{}【】‘；：”“'？%]") 
                if(params.inputProps.value.match(pattern)){
                    params.inputProps.value =  params.inputProps.value.replace(pattern, "")                    
                }
                
                return(
                    <TextField
                        {...params}
                        style={{width:"100%"}}
                        inputRef={ref=> setInputRef(ref)}
                        variant="outlined"
                        label={label}
                        error={params.inputProps.value==""?true:false}  
                        helperText={params.inputProps.value==""?"必填欄位":""}
                        onChange={(event)=>{     
                            //setDefValue("d") 
                            //console.log(event.target.value)                     
                            sendData({name:event.target.value})
                        }}
                        InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                            ),
                        }}
                       
                    />
                )
            }}
        />
    );
}

/*具有檢查功能的textfeild*/
export const HibTextFeild = ({id, label, value, sendData, checkList})=>{
    const dispatch = useDispatch()
    const [error, setError]=useState(false)
    const [helper, setHelper]=useState(false)
    /*
    useEffect(()=>{
        console.log("useEffect:", checker.list)
    },[checker.list])    
    */
    return(
        <TextField 
            label={label}
            defaultValue={value}  
            onChange={(event)=>{
                /*輸入限制*/
                let value = event.target.value
                const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'？%]") 
                if(event.target.value.match(pattern)){                    
                    value = value.replace(pattern, "")
                    event.target.value = value
                }else{
                    sendData(value)
                }
            }}
            onBlur={(event)=>{ }}
            error={error}
            helperText={helper}        
        />
    )
}

/*
export const HIBCurrencyTextField = ({label, defaultValue, sendData=(event, value)=>{}})=>{
    const [defVal, setDefVal ]= useState(defaultValue)
    const [currenyVal, setCurrenyVal ]= useState("$0")//轉過的數值
    useEffect(()=>{        
        setCurrenyVal(
            "$"+new Intl.NumberFormat(
                'en-IN', { maximumSignificantDigits: 3 }
            ).format(defVal)
        )
    },[])
    return(
        <TextField
            value={currenyVal}
            label={label}
            type="number"
            variant="outlined"
            onChange={(event)=>{
                const value=""
                sendData(event, value)
            }}
        />
    )
}*/

/*checkbox的集合*/
export const HibCheckboxes = ({id, data, otherText, sendData, error=true})=>{
    const [collects, setCollects] = useState(data)
    const otherTextHandler = (event)=>{
        setCollects({...collects, other:event.target.value})    
        sendData(collects)
    }
    
    const [myError, setMyError] = useState(error)
    
    useEffect(()=>{
        setMyError(error)
    },[error])
    
    const myStyle = {
        position:"relative",
        padding:10,
        borderWidth:1,
        borderStyle:"solid",        
        borderRadius:5,
        transition:".3s"
    }
    
    const titleStyle = {
        fontSize:13,
        position: "absolute",
        color:"#f00",
        backgroundColor:"#fff",
        bottom:-20,
        left:30,
        transition:".3s"
    }

    return(
        <div style={{...myStyle, borderColor:myError?"#fff":"#f30"}}>
            <span style={{...titleStyle, display:myError?"none":"block"}}>必選欄位</span>
            <Box >
                {data.list.map((item, index)=> 
                    <div key={item.id} style={{float:'left'}}>
                        <Checkbox 
                            checked={item.checked}
                            onChange={(event)=>{
                                const _list = data.list
                                _list[index].checked = event.target.checked
                                setCollects({...collects, list:_list})
                                sendData(collects)
                            }} 
                            />{item.name}
                    </div>
                )}
            </Box>
                {
                    otherText != undefined &&
                    <TextField 
                        label={otherText}
                        defaultValue={data.other}
                        onChange={otherTextHandler}
                        onKeyDown={otherTextHandler}
                    />
                }   
        </div>
    )
}

/*下拉式選單 
變更紀錄:
[20200903]BasicInfoForm使用，變更selectData丟出去的參數，
*/
export const HibSelecter = ({label, data,  selectData, defaultValue})=>{ 
    const [currentValue, setCurrentValue] = useState(defaultValue);
    const classes = useStyles();

    useEffect(()=>{
        if(defaultValue) setCurrentValue(defaultValue)
        data.list.map((item, index)=>{
            if(item.checked == true) 
            setCurrentValue(item.value)    
        })
    },[currentValue, defaultValue])
    /*
    useEffect(()=>{
        setCurrentValue(defaultValue)
    },[defaultValue])
    */
    return(
        <div>
            <FormControl 
                className={classes.formControl} 
                style={{margin:0}}
                size="small"
            >
                <InputLabel className={classes.selectLable} >{label}</InputLabel>
                <Select
                    id="demo-simple-select"
                    variant="outlined"
                    value={currentValue}                    
                    onChange={(event)=>{
                        const listData={...data}
                        //let singleData = "";
                        let detail={}
                        let value={}
                        listData.list.map((item, index)=>{
                            if(item.value == event.target.value){
                                item.checked=true
                                setCurrentValue(item.value)
                                //singleData = item.name
                                value = item.value
                                detail=item;
                            }else{
                                item.checked=false
                            }
                        })
                        selectData(value, detail)
                    }}
                >
                {data.list.map((item, index)=>                         
                    <MenuItem
                        key={item.id}
                        value={item.value}
                        control={<Select color="primary" />}
                        label={item.name} 
                        checked={item.checked}                             
                    >
                        {item.name}
                    </MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    )
}

/*多選一*/
export const HibRaidos = ({setData, defaultValue,  sendData})=>{
    const [myData, setMyData] = useState(setData)
    const [myDef, setMyDef] = useState(defaultValue)
    

    useEffect(() => {
        if(myDef){
            let _d=[]
            myData.map((item)=>{
                if(item.value == myDef){
                    item.checked = true;
                }else{
                    item.checked = false;
                }
                _d.push(item)
            })
            setMyData(_d)      
        }
    }, [myDef])

    const doSendData = (event)=>{
        if(event.target.value){  
            setMyDef(event.target.value)               
            sendData(event.target.value)
        }
    }

    return(
        <div>
            <RadioGroup 
                row={true}
                onClick={doSendData}
                style={{justifyContent:"center"}}
                size="small"
            >              
                {myData.map((item, index)=> 
                    <div key={item.id} >
                    <FormControlLabel
                        value={item.value}
                        control={
                            <Radio color="primary" size="small"/>
                        }
                        label={item.name}
                        labelPlacement="start"  
                        checked={item.checked}  
                        labelPlacement="end"                                    
                    />
                    </div>
                )}
            </RadioGroup>
        </div>
    )
}

/*舊的多選一
export const HibRaidos = ({data, selectData})=>{ 

    return(
        <div>
            <RadioGroup 
                row={true}
                //defaultValue={currentValue}
                onClick={(event)=>{
                    const radiosData={...data}
                    radiosData.list.map((item, index)=>{
                        item.value == event.target.value?
                        item.checked=true:
                        item.checked=false
                    })
                    selectData(radiosData)
                }}
            >              
                {data.list.map((item, index)=> 
                    <div key={item.id} >
                    <FormControlLabel
                        value={item.value}
                        control={<Radio color="primary" />}
                        label={item.name}
                        labelPlacement="start"  
                        checked={item.checked}  
                        labelPlacement="end"                                    
                    />
                    </div>
                )}
            </RadioGroup>
        </div>
    )
}*/


/*日期選擇器 */
export const DatePicker = ({id, label, defaultValue , closePicker, featureYear=0, error=false})=>{
    const [, updateState] = React.useState();
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');
  
    /*日期處理*/
    const _d = new Date();
    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [date, setDate] = useState();
    //const [fullBirth, setFullBirth] = useState("民國"+year+"年"+month+"月"+date+"日");
    const [fullBirth, setFullBirth] = useState("");

    const [buttnPass, setButtnPass] = useState(true)

    const [TF, setTF] = useState();
    let  _v;

    useEffect(()=>{
        //console.log(defaultValue)
        /*
        setYear(defaultValue[0]!=""?defaultValue[0]:_d.getFullYear()-1911)
        setMonth(defaultValue[1]!=""?defaultValue[1]:_d.getMonth()+1)
        setDate(defaultValue[2]!=""?defaultValue[2]:_d.getDate())
        */

        setYear(defaultValue[0])
        setMonth(defaultValue[1])
        setDate(defaultValue[2])
       /* console.log(defaultValue)
        if( defaultValue[0] !="" && defaultValue[1] !="" && defaultValue[2] !=""){
            setFullBirth( "民國"+year+"年"+month+"月"+date+"日")                
        }else{
            setFullBirth("")
        }*/

    },[defaultValue])
    
    useEffect(() => {
        //console.log( [year, month, date] )

        if(year !="" && month !="" && date != ""){
            setButtnPass( false )    
            setFullBirth( "民國"+year+"年"+month+"月"+date+"日")              
        }else{
            setButtnPass(true)
            setFullBirth("")
        }
    }, [year, month, date])

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        _v.value = "民國"+year+"年"+month+"月"+date+"日"       
        closePicker([year, month, date])
        setOpen(false);
    };

    const yearList= ()=>{
        let i =0
        let ary = []
        let _y = _d.getFullYear()-1911
        while(i<(100)){
            ary.push({ title:"民國"+ (featureYear+_y-i)+"年", year: (_y-i) },)        
            i++
        }        
        return ary
    }

    const monthList= ()=>{
        let i =0
        let ary = []        
        while(i<12){
            ary.push({ title: (i+1)+"月", month: (i+1) },)        
            i++
        }        
        return ary
    }
    
    const dateList= ()=>{
        let i =0
        let ary = []        
        while(i<31){
            ary.push({ title: (i+1)+"日", date: (i+1) },)        
            i++
        }        
        return ary
    }    

    return (
      <div>
        <TextField
            inputRef={(ref)=>{_v=ref}}
            onClick={handleClickOpen} 
            label={label} 
            value={fullBirth}
            error={error}
            helperText={error?"請選擇出生日期":" "}
            variant="outlined"   
            style={{margin:10, marginTop:33}}              
            size="small"   
        />
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} fullWidth maxWidth="sm" onClose={handleClose}>
          <DialogTitle>請選擇日期</DialogTitle>
          <DialogContent>          
            <Grid container style={{width:"100%", maxWidth:960}}>
                <Grid item xs={12} sm={4} style={{padding:10}}>                    
                    <Autocomplete
                        id="combo-box-year"
                        options={yearList()} 
                        data={year}                
                        getOptionLabel={option => option.title}
                        style={{ width: "100%"}}
                        onChange={(event, item)=> {
                            if(item){
                                setYear(item.year+featureYear)
                            }
                        }}
                        renderInput={params => <TextField {...params} label="年"  variant="outlined" />}
                    />
                </Grid>
                <Grid item xs={12} sm={4} style={{padding:10}}>
                    <Autocomplete
                        id="combo-box-month"
                        options={monthList()}                    
                        getOptionLabel={option => option.title}
                        style={{  width: "100%" }}
                        onChange={(event, item)=> {
                            if(item){
                                setMonth(item.month)
                            }
                        }}
                        renderInput={params => <TextField {...params} label="月" variant="outlined" />}
                    />
                    </Grid>
                <Grid item xs={12} sm={4} style={{padding:10}}>
                    <Autocomplete
                        id="combo-box-date"
                        options={dateList()}                
                        getOptionLabel={option => option.title}
                        style={{ width: "100%" }}  
                        onChange={(event, item)=> {
                            if(item){
                                setDate(item.date)
                            }
                            console.log(item)
                        }}             
                        renderInput={params => <TextField {...params} label="日" variant="outlined"  />}
                    />
                </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
              {/*
            <Button onClick={handleClose} color="primary">
              取消
            </Button>
               */}
            <Button onClick={handleClose} color="primary" disabled={buttnPass}>
              確定
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
