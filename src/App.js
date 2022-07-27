import React,{useState, useEffect, useContext, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Pad from './components/Signature/Pad'
import WebServiceContext from './webservice/WebServiceContext'

import {
    BasicBox,
    HospInput,
    HospSelect,
    HospButton,
    HospCircleButton,
    HospBarButton,
    PadModalBox,
    MesgModalBox,
    PrevirwMySign,
    MainBox
} from './components/UI' 

const MyApp = ()=> {
    const webservice = useContext(WebServiceContext)
    const [postData, setPostData] = useState({})
    const [userName, setUserName] = useState("")   
    const [hospName, setHospName] = useState("")   
    const [hospContact, setHospContact] = useState("")   
    const [hospPhone, setHospPhone] = useState("")   
    const [hospCounty, setHospCounty] = useState("")   


    const [openPad, setOpenPad] = useState(false)
    
    const [openMesg, setOpenMesg] = useState(false)
    const [openMesgModal, setOpenMesgModal] = useState(false)
    useEffect(()=>{
        if(openMesg !=""){
            setOpenMesgModal(true)
        }
    },[openMesg])


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
                    <span className='version'>
                        2020-07 v1.0
                    </span>
                </div>
                <h3>此表單將記錄您的名稱，請填入您的名稱。</h3>
                    <HospInput className='w50' value={userName} onChange={event=>{setUserName(event.target.value)} } placeholder='使用者名稱'/>
                    
                <h3>院所基本資料</h3>
                <BasicBox >
                    <div>
                        <HospInput onChange={event=>{setHospName(event.target.value)} }placeholder='院所名稱'/>
                    </div>
                    <div>
                        <HospInput onChange={event=>{setHospContact(event.target.value)} }placeholder='院所聯絡人/窗口'/>
                    </div>
                    <div>
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
                </BasicBox>

                <h3>⾃我評估<br/>是否符合腦膜炎衛教專家認證標準?</h3>
                {
                    qzData.map((value, sn)=>{
                        return(
                            <div key={"qz"+sn}>
                                <p>
                                    {sn+1}. {value.quest}
                                </p>
                                <div className='ansBox'>
                                {
                                    value.type == "yn" ?                            
                                    value.answers.map((ans, index)=>{
                                        return(
                                            <HospCircleButton 
                                                theme="circle"
                                                //style={{color:(ans.on == 1 ?"#f00":"#333")}}
                                                //style={{color:(ans.value == value.result ?"#f00":"#333")}}
                                                key={"qz"+index}
                                                className={(ans.value == value.result ?"on":"off")}
                                                onClick={()=>{   
                                                    let newQzData = [...qzData]
                                                    newQzData[sn].result = ans.value
                                                    setQzData(newQzData)
                                                }}
                                            >{ans.text}</HospCircleButton>
                                        )
                                    })
                                    :
                                    value.type == "muity" ?
                                    <div style={{display:"flex", flexDirection: "column"}}>
                                        {
                                        value.answers.map((ans, index)=>{
                                            return(
                                                <HospBarButton                                             
                                                    //style={{color:(ans.on == 1 ?"#f00":"#333")}}
                                                    theme="bar"
                                                    key={"qz"+index}
                                                    className={(ans.on == 1 ?"on":"off")}
                                                    onClick={ event =>{

                                                        if(event.target.type == "text") return

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
                                                >
                                                    {ans.text}
                                                    {
                                                        qzData[sn].result.match("other") &&
                                                        ans.value == "other" &&
                                                        <HospInput 
                                                            className='otherInput'
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
                                                </HospBarButton>
                                                )
                                            })
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


                <div style={{ display:"flex", justifyContent:"flex-end" }}>
                    <HospButton
                        className='sign' 
                        onClick={()=>{ setOpenPad(true) }}
                    >                        
                        {  
                            !openPad && sign !="" ?
                            <div>
                                <div className='label'>簽名</div>
                                <PrevirwMySign src={sign} />
                            </div>
                            :
                            <span>請點我簽名</span>
                        }

                    </HospButton>
                </div>
                <div className='discription'>簽名代表您代表貴院所同意向李慶雲兒童感染暨疫苗發展醫學文教基金會申請腦膜炎衛教專家，並同意可於基金會網站上被搜尋</div>
                
                <PadModalBox style={{ display:(openPad?"flex":"none") }}>
                    <div className="modal">
                    <Pad
                        isOpen={openPad}     
                        sendData={(data, tempData)=>{
                            setSign(data)
                        }}
                        completeButton={(
                            <HospButton 
                                className='signComplete' 
                                onClick={()=>{ 
                                    setOpenPad(false)
                                }}>
                                完成
                            </HospButton>
                        )}
                    />
                        
                    </div>
                </PadModalBox>

                <MesgModalBox style={{ display:(openMesgModal?"flex":"none") }}>
                    <div className="modal">
                        {openMesg}                   
                        <HospButton className='signComplete' 
                            onClick={()=>{ 
                                setOpenMesg("")
                                setOpenMesgModal(false) 
                            }}>
                            關閉
                        </HospButton>                       
                    </div>
                </MesgModalBox>
                
                {
                    sign != "" && 
                    <div style={{ display:"flex", justifyContent:"center" }}>
                        <HospButton
                            className="submit" 
                            onClick={()=>{
                                setPostData("{}")
                                if(sign==""){ 
                                    return
                                }

                                if(userName ==""){
                                    //alert("您還沒有填寫 名字")
                                    setOpenMesg("您還沒有填寫 名字")
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
                        </HospButton>
                    </div>
                }
                {
                    /*
                        <h2>JSON資料</h2>
                        <div style={{width:"100%", maxWidth:300, overflowX:"scroll"}}>
                            {JSON.stringify(postData)}
                        </div>
                    */
                }
            </div>
        </div>
    </MainBox>
  );
}

export default MyApp