import React,{useState, useEffect, useContext, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Pad from './components/Signature/Pad'
import WebServiceContext from './webservice/WebServiceContext'



const MainBox = styled('div')`
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: center;
`

const PadModalBox = styled('div')`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .container{
        z-index: 1;
    }
    &::before{
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.7);
    }
`
const PrevirwMySign = styled('img')`
    width: 100%;
    max-width: 200px;
`

const MyApp = ()=> {
    const webservice = useContext(WebServiceContext)
    const [postData, setPostData] = useState({})

    const [userName, setUserName] = useState("")   
    const [hospName, setHospName] = useState("")   
    const [hospContact, setHospContact] = useState("")   
    const [hospPhone, setHospPhone] = useState("")   


    const [openPad, setOpenPad] = useState(false)

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
    <MainBox>
        <div>
        <div style={{width:300, display:"flex", flexDirection: "column"}}>
            <input style={{borderWidth:1, borderColor:(userName==""?"#f00":"#666")}} value={userName} onChange={event=>{setUserName(event.target.value)} } placeholder='使用者名稱'/>
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
        <button onClick={()=>{ setOpenPad(true) }}>
            開啟簽名
        </button>
        {  
            sign !="" &&
            <PrevirwMySign src={sign} />
        }
        <PadModalBox style={{display:(openPad?"flex":"none")}}>
            <div className="container">
            <Pad                
                sendData={(data, tempData)=>{
                    setSign(data)
                }}
                />
                <button onClick={()=>{ setOpenPad(false) }}>
                    完成
                </button>
            </div>
        </PadModalBox>

        <button 
            onClick={()=>{

                if(userName ==""){
                    alert("您還沒有填寫名字")
                    return
                } 


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
        </button>
        
        <div style={{width:600}}>
            {JSON.stringify(postData)}
        </div>
        </div>
    </MainBox>
  );
}

export default MyApp