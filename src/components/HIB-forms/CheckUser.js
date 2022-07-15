import React,{useState, useEffect, useContext} from 'react';
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux';
import {TextField, CircularProgress, Fab , makeStyles, Collapse, Button } from '@material-ui/core';

import CheckIcon from '@material-ui/icons/Check';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';
import {red, green } from '@material-ui/core/colors';
import Family from '../../assets/family.png'

import WebServiceContext from '../../webservice/WebServiceContext'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme)=>({    
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    buttonFail: {
        backgroundColor: red[500],
        '&:hover': {
          backgroundColor: red[700],
        },
      },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
}));

export default ({userChecker, checkMessage})=>{
    const classes = useStyles();
    const dispatch = useDispatch()
    const basicInfo = useSelector(state => state.basicInfo)//reducer資料中心
    const webService = useContext(WebServiceContext)//api中心

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(0);

    const [showLoad, setShowLoad] = useState(false)
    const timer = React.useRef();
    
    const [myID, setMyID]=useState("") 
    const [myError, setMyError]=useState("") 
    
    const id_reg = /^[a-zA-Z]{1}[1-2]{1}[0-9]{8}$/

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success == 1,
        [classes.buttonFail]: success == 2,
    });

    
    const mobile = useMediaQuery("(max-width:640px)");
    const md = useMediaQuery("(max-width:768px)");

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);
    
    const checkID = () => {
        if (!loading) {
            setSuccess(0);
            setLoading(true);
            webService.asyncCheckNewSeller(myID).then((res)=>{
                if(res.state == true){
                    setPColor("#009900")
                    setSuccess(1);
                    setLoading(false);
                    timer.current = setTimeout(() => {
                        userChecker(true)
                    }, 1000);
                }else{
                    if(res.type == "報聘中"){
                        setMyError("此身份證字號正報聘中，無法進行報聘")
                    }else if(res.type == "黑名單"){
                        setMyError("此身份證字號無法進行報聘")
                    }else{
                        setMyError("此身份證字號無法進行報聘")
                    }
                    setPColor("#F30")
                    setSuccess(2);
                    setLoading(false);
                    timer.current = setTimeout(() => {
                        setShowLoad(false)
                        userChecker(false)
                    }, 1000);
                }
           })
        }
    };

    useEffect(() => {
        if(myID.length == 10 ){
            if(id_reg.test(myID)  ){    
                setShowLoad(true)
                setMyError("")
                checkID()
            }else{
                setMyError("身分證格式錯誤")
            }
        }
    }, [myID]); 
    
    const [pColor, setPColor] = useState("#aaa")
    
    const checkIDFormat = (idStr)=>{
        // 依照字母的編號排列，存入陣列備用。
        const letters = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'W', 'Z', 'I', 'O');
        // 儲存各個乘數
        const multiply = new Array(1, 9, 8, 7, 6, 5, 4, 3, 2, 1);
        var nums = new Array(2);
        var firstChar;
        var firstNum;
        var lastNum;
        var total = 0;
        // 撰寫「正規表達式」。第一個字為英文字母，
        // 第二個字為1或2，後面跟著8個數字，不分大小寫。
        var regExpID=/^[a-z](1|2)\d{8}$/i; 
        // 使用「正規表達式」檢驗格式
        if (idStr.search(regExpID)==-1) {
            // 基本格式錯誤
            alert("請仔細填寫身份證號碼");
            return false;
        } else {
            // 取出第一個字元和最後一個數字。
            firstChar = idStr.charAt(0).toUpperCase();
            lastNum = idStr.charAt(9);
        }
        // 找出第一個字母對應的數字，並轉換成兩位數數字。
        for (var i=0; i<26; i++) {
            if (firstChar == letters[i]) {
                firstNum = i + 10;
                nums[0] = Math.floor(firstNum / 10);
                nums[1] = firstNum - (nums[0] * 10);
                break;
            } 
        }
        // 執行加總計算
        for(var i=0; i<multiply.length; i++){
            if (i<2) {
                total += nums[i] * multiply[i];
            } else {
                total += parseInt(idStr.charAt(i-1)) * 
                multiply[i];
            }
        }
        // 和最後一個數字比對
        if ((10 - (total % 10))!= lastNum) {
            console.log("身分證號格式錯誤")
            return false;
        }else{
            return true
        }
    }

    return(
        <div style={{display:"flex", alignItems:"center"}}>
        
            <img style={{
                display:md?"none":"block",
                width:"100%",
                maxWidth:750
            }} src={Family}/>   
        
            <div style={{display:"flex",flexDirection:"column" , alignItems:"center" ,backgroundColor:"#fff",padding:20, borderRadius:10}}> 
                <h2 style={{color:"#76a90a"}}>請輸入簽約者身份證字號</h2>
                <PersonIcon style={{fontSize:200, color:pColor}}/>
                <TextField 
                    label="身份證字號"
                    variant="outlined"
                    value={myID}
                    error={myError==""?false:true}
                    helperText={myError}
                    style={{width:250}}
                    onChange={(event)=>{                                    
                        if(event.target.value.length<=10){   
                            
                            //轉大寫
                            event.target.value = event.target.value.toUpperCase()
                            setMyID(event.target.value)
                            dispatch({
                                type:"SET_BASIC_INFO",
                                basicInfo:{
                                    ...basicInfo,
                                    employeeID:event.target.value
                                }
                            })
                        }
                    }}                                     
                />
                <Collapse in={showLoad}>
                    <div className={classes.wrapper}>
                        <Fab
                            aria-label="save"
                            color="primary"
                            className={buttonClassname}
                        >
                            {success == 0 && <PersonIcon /> }
                            {success == 1 && <CheckIcon/>}
                            {success == 2 && <CloseIcon />}
                        </Fab>
                        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                    </div>     
                </Collapse>
            </div>
        </div>
    )
}
