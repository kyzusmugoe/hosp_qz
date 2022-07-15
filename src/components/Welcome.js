import React, {useState, useEffect } from 'react'
import { Button,  Modal,  styled, Paper, Fade, Collapse} from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';

const WelcomeModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const Red = styled('span')({
    color:"#f30",
    fontWeight:"bolder"
})


export default ({ boardType="welcome", loadingAccess=true, boardMesg="請稍後..."})=> {
      
    const [bType, setBType] = useState(boardType)
    const [access, setAccess] = useState(true)
    const [open, setOpen] = useState(true)
    const [mesg, setMesg] = useState(boardMesg)

    useEffect(() => {
        setAccess(loadingAccess)
    }, [access, loadingAccess])
 
    useEffect(() => {
        setOpen(true)

        setBType(boardType)
        setMesg(boardMesg)
    }, [boardType, boardMesg])
    
    
    return(
        <WelcomeModal
            open={open}
            onClose={()=>{
                setOpen(false)
            }}
            TransitionComponent	
            closeAfterTransition
            disableBackdropClick={true}           
        >

        <Fade in={open} timeout={500}>       
            <div>
                {
                    bType == "welcome" && 
                    <Paper style={{padding:20}}>
                        <div style={{textAlign:"center"}}>
                            <img style={{width:250, height:60}} src="./assets/logo.svg"/>
                            <h2 id="transition-modal-title" style={{color:"#ff8405"}}>歡迎使用大誠行動報聘系統</h2>
                        </div>
                        <div id="transition-modal-description" style={{color:"#666", lineHeight:2 ,maxWidth:550}}>
                            <p>使用本系統之前請注意以下事項：</p>
                            <ol>
                                <li>以下流程皆使用電子簽章，簽約者以及承攬人員皆同意使用此方式，視同紙本簽約。</li>
                                <li>本系統不會儲存簽章資料至他處使用，僅使用於本次行動報聘簽約。</li>
                                <li>簽約流程會使用到<Red>簽約者大頭照(必要)</Red>、<Red>身分證正反面影本(必要)</Red>、<Red>存摺封面(必要)</Red>、<Red>同業增員佐證資料</Red>及<Red>免扣取補充保費聲明書證明附件</Red>的圖片/照片資料，請盡可能準備上述文件以利進行報聘流程。</li>
                                <li>簽約完成後請留意本次簽約進度，進度流程將會使用Line通知。</li>
                            </ol>
                        </div>
                        <div style={{textAlign:"center"}}>

                            <Collapse in={access}>
                                <Button  variant="contained" 
                                    color="primary"
                                    onClick={()=>{ setOpen(false) }}
                                >確定</Button>
                            </Collapse>
                            
                            <Collapse in={!access}>
                                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                    <CircularProgress/>
                                    <p style={{color:'#3f51b5', marginLeft:20}}>請稍後，正在準備您的暫存資料</p>
                                </div>
                            </Collapse>
                            {/*
                            <Button 
                                variant="outlined"
                                color="secondary"
                                onClick={()=>{
                                    setOpen(false)
                                    next("test")
                                }}
                            >確定(填入測試資料，測試用)</Button>
                            */}
                        </div>
                    </Paper> 
                }
                {
                    bType == "send" && 
                    <Paper style={{padding:20}}>                       
                        <div style={{textAlign:"center"}}>
                            <Collapse in={!access}>
                                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                    <CircularProgress/>
                                    <p style={{color:'#3f51b5', marginLeft:20}}>{mesg}</p>
                                </div>
                            </Collapse>
                            <Collapse in={access}>
                                <div>{mesg}</div>
                                <Button  variant="contained" 
                                    color="primary"
                                    onClick={()=>{ 
                                        window.location.href = "../../html/NewSales.html";
                                    }}
                                > 返回列表
                                </Button>
                            </Collapse>
                        </div>
                    </Paper> 
                }
            </div>
                   
        </Fade>
    </WelcomeModal>
    )
}
