import React,{useState, useEffect, useContext, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Pad from './components/Signature/Pad'
import WebServiceContext from './webservice/WebServiceContext'

import {HospInput, HospSelect, HospButtom, PadModalBox, PrevirwMySign, MainBox} from './components/UI'





const MyApp = ()=> {
    const webservice = useContext(WebServiceContext)
    const [postData, setPostData] = useState({})

    const [userName, setUserName] = useState("")   
    const [hospName, setHospName] = useState("")   
    const [hospContact, setHospContact] = useState("")   
    const [hospPhone, setHospPhone] = useState("")   
    const [hospCounty, setHospCounty] = useState("")   


    const [openPad, setOpenPad] = useState(false)

    const [sign, setSign] = useState("")   
    const [qzData, setQzData] = useState(
    [
        {
            qid:1,
            type:"yn",
            quest:"我們院所有放置流⾏性腦脊髓膜炎衛教單張、海報",
            answers:[
                {text:"是", value:"Y", on:0},
                {text:"否", value:"N", on:0}
            ],
            result:""
        },
        {
            qid:2,
            type:"yn",
            quest:"我們院所會主動對⺠眾進⾏流⾏性腦脊髓膜炎預防⽅式衛教",
            answers:[
                {text:"是", value:"Y", on:0},
                {text:"否", value:"N", on:0}
            ],
            result:""
        },
        {
            qid:3,
            type:"yn",
            quest:"利⽤實體或多媒體平台，主動推廣預防流⾏性腦脊髓膜炎的重要性及理念",
            answers:[
                {text:"是", value:"Y", on:0},
                {text:"否", value:"N", on:0}
            ],
            result:""
        },
        {
            qid:4,
            type:"muity",
            quest:"我們院所的醫療⼈員曾經參加過相關教育課程",
            subQuest:"請勾選您曾參加過的相關教育課程 (可複選)",
            answers:[
                {text:"【2022/3/19：2022 新⽣兒科醫學會午間研討會】號召守護者！保護嬰幼兒免於感染性疾病威脅", value:"1", on:0},
                {text:"【2022/3/26：「新⽣兒腎臟泌尿系統問題⼤攻略及疫苗新知」專題研討會】藏在你我⾝邊的隱形殺⼿：奈瑟⽒腦膜炎雙球菌感染", value:"2", on:0},
                {text:"【2022/4/17：2022 兒科醫學會午間研討會】號召守護者！保護嬰幼兒免於感染性疾病威脅", value:"3", on:0},
                {text:"【2022/5/15：台灣兒童感染症醫學會第三屆第三次會員⼤會暨學術研討會 Lunch Symposium】藏在你我⾝邊的隱形威脅：腦膜炎雙球菌感染", value:"4", on:0},
                {text:"【2022/6/5：中華⺠國基層醫療協會】溝通⼤師來了！⾃費醫療及腦膜炎衛教溝通藝術", value:"5", on:0},
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
    <MainBox /*style={{overflow:(openPad?"hidden":"scroll")}}*/>
        <div className='bubbles'>
            <div className='header'>
                <div className='left'>
                    <img src="./images/logo2.png"/>
                </div>
                <div className='right'>
                    <img src="./images/charactor.png"/>
                </div>
            </div>
            <div className='container'>
                <div className='title'>
                    <img src="./images/title.svg"/>
                    <span>
                        2020-07 v1.0
                    </span>
                </div>
                <h2>此表單將記錄您的名稱，請填入您的名稱。</h2>
                    <HospInput value={userName} onChange={event=>{setUserName(event.target.value)} } placeholder='使用者名稱'/>
                    
                <h2>院所基本資料</h2>
                <div style={{width:300, display:"flex", flexDirection: "column"}}>
                    <HospInput onChange={event=>{setHospName(event.target.value)} }placeholder='院所名稱'/>
                    <HospInput onChange={event=>{setHospContact(event.target.value)} }placeholder='院所聯絡人/窗口'/>
                    <HospInput onChange={event=>{setHospPhone(event.target.value)} }placeholder='院所聯絡人/連絡電話'/>
                </div>
            <div>
                <HospSelect onChange={event=>{ setHospCounty(event.target.value) }}>
                    <option value="">院所所在縣市</option>
                    {
                        [
                            {txt:"台北市",txt:"台北市"},
                            {txt:"新北市",txt:"新北市"},
                            {txt:"基隆市",txt:"基隆市"},
                            {txt:"桃園市",txt:"桃園市"},
                            {txt:"新竹縣",txt:"新竹縣"},
                            {txt:"新竹市",txt:"新竹市"},
                            {txt:"苗栗縣",txt:"苗栗縣"},
                            {txt:"台中市",txt:"台中市"},
                            {txt:"彰化縣",txt:"彰化縣"},
                            {txt:"南投縣",txt:"南投縣"},
                            {txt:"雲林縣",txt:"雲林縣"},
                            {txt:"嘉義縣",txt:"嘉義縣"},
                            {txt:"嘉義市",txt:"嘉義市"},
                            {txt:"台南市",txt:"台南市"},
                            {txt:"高雄市",txt:"高雄市"},
                            {txt:"屏東縣",txt:"屏東縣"},
                            {txt:"宜蘭縣",txt:"宜蘭縣"},
                            {txt:"花蓮縣",txt:"花蓮縣"},
                            {txt:"台東縣",txt:"台東縣"},
                            {txt:"澎湖縣",txt:"澎湖縣"},
                            {txt:"金門縣",txt:"金門縣"},
                            {txt:"連江縣",txt:"連江縣"}
                        ].map((item, index)=>{
                            return (<option key={"addr"+index} value={item.value}>{item.txt}</option>)
                        })    
                    }
                </HospSelect>
            </div>

            <h2>⾃我評估 - 是否符合腦膜炎衛教專家認證標準?</h2>
            {
                qzData.map((value, sn)=>{
                    return(
                        <div key={"qz"+sn}>
                            <h3>
                                {sn+1}. {value.quest}
                            </h3>
                            <div>
                            {
                                value.type == "yn" ?                            
                                value.answers.map((ans, index)=>{
                                    return(
                                        <HospButtom 
                                            //style={{color:(ans.on == 1 ?"#f00":"#333")}}
                                            //style={{color:(ans.value == value.result ?"#f00":"#333")}}
                                            key={"qz"+index}
                                            className={(ans.value == value.result ?"on":"off")}
                                            onClick={()=>{   
                                                let newQzData = [...qzData]
                                                newQzData[sn].result = ans.value
                                                setQzData(newQzData)
                                            }}
                                        >{ans.text}</HospButtom>
                                    )
                                })
                                :
                                value.type == "muity" ?
                                <div style={{display:"flex", flexDirection: "column"}}>
                                    {
                                    value.answers.map((ans, index)=>{
                                        return(
                                            <HospButtom                                             
                                                //style={{color:(ans.on == 1 ?"#f00":"#333")}}
                                                key={"qz"+index}
                                                className={(ans.on == 1 ?"on":"off")}
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
                                            >{ans.text}</HospButtom>
                                            )
                                        })
                                    }
                                    {
                                        qzData[sn].result.match("other") &&
                                        <HospInput 
                                            value={qzData[sn].other}
                                            placeholder='請填寫資料'
                                            onChange={event=>{
                                                let newQzData = [...qzData]
                                                newQzData[sn].other = event.target.value 
                                                console.log(newQzData)
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

    {  
                !openPad && sign !="" &&
                <div>
                    <h4>您的簽名</h4>
                    <PrevirwMySign src={sign} />
                </div>
            }

                <HospButtom
                    className='large' 
                    onClick={()=>{ setOpenPad(true) }}
                >
                    開啟簽名
                </HospButtom>
                
                <PadModalBox style={{display:(openPad?"flex":"none")}}>
                    <div className="container">
                    <Pad
                        isOpen={openPad}     
                        sendData={(data, tempData)=>{
                            setSign(data)
                        }}
                        />
                        <HospButtom onClick={()=>{ setOpenPad(false) }}>
                            完成
                        </HospButtom>
                    </div>
                </PadModalBox>

                <HospButtom
                    className={'large '+(sign =="" && "disable")} 
                    onClick={()=>{
                        setPostData("{}")
                        if(sign==""){ 
                            return
                        }

                        if(userName ==""){
                            alert("您還沒有填寫 名字")
                            return
                        }

                        if(hospName ==""){
                            alert("您還沒有填寫 院所名稱")
                            return
                        }

                        if(hospContact ==""){
                            alert("您還沒有填寫 院所聯絡人/窗口")
                            return
                        }

                        if(hospPhone ==""){
                            alert("您還沒有填寫 院所聯絡人/連絡電話")
                            return
                        }
                        
                        if(hospCounty ==""){
                            alert("您還沒有選擇 院所所在縣市")
                            return
                        }
                        

                        for(let qz of qzData ){
                            if(qz.result == ""){
                                alert("您還有題目尚未作答喔!")
                                return
                            }
                        }

                    

                        let newPostData = {
                            user_name: userName,
                            hosp_name: hospName,
                            hosp_contact: hospContact,
                            hosp_phone: hospPhone,
                            hosp_county:hospCounty,
                            signBase64:sign,
                            qz1:qzData[0].result,
                            qz2:qzData[1].result,
                            qz3:qzData[2].result,
                            qz4:qzData[3].result
                            /*qzs:[(
                                qzData.map(qz=>{
                                    let newQz ={
                                        qid:qz.qid,
                                        ans:qz.result,
                                    }
                                    if( qz.result.match("other") && qz.other !=""){
                                        newQz.other = qz.other 
                                    }
                                    return newQz
                                })
                            )]*/
                        }

                        if( qzData[3].result.match("other") && qzData[3].other !=""){
                            newPostData.qz4_other = qzData[3].other
                        }

                        setPostData(newPostData)
                    }}
                >
                    送出
                </HospButtom>
                <h2>JSON資料</h2>
                <div style={{width:"100%", maxWidth:300, overflowX:"scroll"}}>
                    {JSON.stringify(postData)}
                </div>
            </div>
        </div>
    </MainBox>
  );
}

export default MyApp