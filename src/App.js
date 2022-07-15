import React,{useState, useEffect, useContext, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

//import AttachmentForm from './components/HIB-forms/AttachmentForm'
//import Pay60Form from './components/HIB-forms/Pay60Form'
//import ContractForm from './components/HIB-forms/ContractForm'
//import SpecificationForm from './components/HIB-forms/SpecificationForm'
//import ExpForm from './components/HIB-forms/ExpForm'
//import PremiumForm from './components/HIB-forms/PremiumForm'
//import SameIndustryForm from './components/HIB-forms/SameIndustryForm'
import SignPad from './components/Signature'
import Pad from './components/Signature/Pad'
import WebServiceContext from './webservice/WebServiceContext'


import { makeStyles } from '@material-ui/core/styles';
import {Stepper, Step, StepLabel, StepContent, Button, Fade, Modal, Backdrop , styled, Collapse} from '@material-ui/core/';





const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        paddingBottom:50
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



const MyApp = ()=> {
    const classes = useStyles()
    //const dispatch = useDispatch()
    //const myData = useSelector(state => state)
    const webservice = useContext(WebServiceContext)
    const [postData, setPostData] = useState({})

    const [userName, setUserName] = useState("")   
    const [hospName, setHospName] = useState("")   
    const [hospContact, setHospContact] = useState("")   
    const [hospPhone, setHospPhone] = useState("")   


    const [sign, setSign] = useState("")   
    const [qzData, setQzData] = useState(
    [
        {
            qid:1,
            type:"yn",
            quest:"題目1",
            answers:[
                {text:"是", value:"Y", on:0},
                {text:"否", value:"N", on:0}
            ],
            result:""
        },
        {
            qid:2,
            type:"yn",
            quest:"題目2",
            answers:[
                {text:"是", value:"Y", on:0},
                {text:"否", value:"N", on:0}
            ],
            result:""
        },
        {
            qid:3,
            type:"muity",
            quest:"多選題1",
            answers:[
                {text:"1", value:"1", on:0},
                {text:"2", value:"2", on:0},
                {text:"3", value:"3", on:0},
                {text:"其他", value:"other" , on:0}
            ],
            other:"",
            result:""
        },
        {
            qid:4,
            type:"muity",
            quest:"多選題1",
            answers:[
                {text:"1", value:"1", on:0},
                {text:"2", value:"2", on:0},
                {text:"3", value:"3", on:0},
                {text:"其他", value:"other" , on:0}
            ],
            other:"",
            result:""
        }
    ]
    )
    /*
    useEffect(()=>{
        //console.log("change", qzData)
    },[qzData])
    */
    return (      
    <div className={classes.root}>
        <div style={{width:300, display:"flex", flexDirection: "column"}}>
            <input onChange={event=>{setUserName(event.target.value)} }placeholder='使用者名稱'/>
            <input onChange={event=>{setHospName(event.target.value)} }placeholder='院所名稱'/>
            <input onChange={event=>{setHospContact(event.target.value)} }placeholder='院所聯絡人/窗口'/>
            <input onChange={event=>{setHospPhone(event.target.value)} }placeholder='院所聯絡人/連絡電話'/>
        </div>
         hosp_county:"院所所在縣市",
        {
            qzData.map((value, sn)=>{
                return(
                    <div>
                        <span>
                            {value.quest}
                        </span>
                        <div>
                        {
                            value.type == "yn" ?                            
                            value.answers.map((ans, index)=>{
                                return(
                                    <button 
                                        //style={{color:(ans.on == 1 ?"#f00":"#333")}}
                                        style={{color:(ans.value == value.result ?"#f00":"#333")}}
                                        onClick={()=>{   
                                            let newQzData = [...qzData]
                                            newQzData[sn].result = ans.value
                                            setQzData(newQzData)
                                        }}
                                    >{ans.value}{ans.text}</button>
                                )
                            })
                            :
                            value.type == "muity" ?
                            <div>
                                {
                                value.answers.map((ans, index)=>{
                                    return(
                                        <button 
                                            
                                            style={{color:(ans.on == 1 ?"#f00":"#333")}}
                                            onClick={()=>{
                                                let newQzData = [...qzData]
                                                if(newQzData[sn].answers[index].on == 0){
                                                    newQzData[sn].answers[index].on = 1
                                                }else{
                                                    newQzData[sn].answers[index].on = 0
                                                }
                                                
                                                let result=""
                                                newQzData[sn].answers.map(ans2=>{
                                                    if(ans2.on==1){
                                                        if(result ==""){
                                                            result+=ans2.value
                                                        }else{
                                                            result+=","+ans2.value
                                                        }
                                                    }
                                                })
                                                newQzData[sn].result = result
                                                setQzData(newQzData)
                                            }}
                                        >{ans.text}</button>
                                        )
                                    })
                                }
                                {
                                    qzData[sn].result.match("other") &&
                                    <input 
                                        value={qzData[sn].other}
                                        placeholder='請填寫資料'
                                        onChange={event=>{
                                            let newQzData = [...qzData]
                                            newQzData[sn].other = event.target.value 
                                            setQzData(newQzData)
                                        }
                                    }/> 
                                }
                            </div>
                            :
                            "unset" 
                        }
                        </div>
                    </div>
                )
            })
        }

        <Pad                
            sendData={(data, tempData)=>{
                setSign(data)
            }}
        />

        <Button 
            variant="contained"
            color="primary"
            onClick={()=>{
                let newPostData = {
                    user_name: userName,
                    hosp_name: hospName,
                    hosp_contact: hospContact,
                    hosp_phone: hospPhone,
                    hosp_county:"院所所在縣市",
                    signBase64:sign,
                    qzs:[(
                        qzData.map(qz=>{
                            let newQz ={
                                qid:qz.qid,
                                ans:qz.result,
                            }
                            return newQz
                        })
                    )]
                }
                setPostData(newPostData)
            }}
        >
            送出
        </Button>
        
        <div style={{width:600}}>
            {JSON.stringify(postData)}
        </div>
    </div>
  );
}

export default MyApp