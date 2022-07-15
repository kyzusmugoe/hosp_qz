import React, {useState, useEffect } from 'react'
import { Button,  Modal,  styled, Paper, Fade, Collapse} from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const WelcomeDialog = styled(Dialog)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    "& ol":{
        padding:10
    }
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
    
    const [scroll, setScroll] = React.useState('paper');
  
    const handleClickOpen = (scrollType) => () => {
      setOpen(true);
      setScroll(scrollType);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open])

    return(
        <WelcomeDialog
            open={open}
            onClose={()=>{
                setOpen(false)
            }}
            closeAfterTransition
            disableBackdropClick={true}           
        >
            {
                bType == "welcome" && 
                <div>
                    <DialogContent dividers={scroll === 'paper'}>
                               
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
                                <span style={{fontSize:12}}>v1.1</span>
                            </div>
                    </DialogContent>

                    <DialogActions style={{display:"flex", flexDirection:"column"}}>
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
                    </DialogActions>
                </div>
            }
            {
                bType == "send" && 
                <div>
                    <Collapse in={!access}>
                        <DialogContent dividers={scroll === 'paper'}>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                            >            
                                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                        <CircularProgress/>
                                        <p style={{color:'#3f51b5', marginLeft:20}}>{mesg}</p>
                                    </div>
                            </DialogContentText>
                        </DialogContent>
                    </Collapse>

                    <Collapse in={access}>
                        <DialogActions style={{display:"flex", flexDirection:"column"}}>
                                <div style={{padding:10}}>{mesg}</div>
                                <Button  variant="contained" 
                                    color="primary"
                                    onClick={()=>{ 
                                        window.location.href = "../../html/NewSales.html";
                                    }}
                                > 返回列表
                                </Button>
                        </DialogActions>
                    </Collapse>
                </div>
            }
        </WelcomeDialog>
    )
}
