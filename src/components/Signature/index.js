import React,{useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import Pad from './Pad'

import SignatureCanvas from 'react-signature-canvas';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    padContainer: {
      border: '1px solid #666',
      backgroundColor:"#aaa",
      textAlign:"center",
      padding:10  
    },
    pad:{
        margin:"0 auto"
    },
    root: {
        width: '100%',
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
      title:{
          textAlign:"center"
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }));

const SignaturePads = ({checkSign})=>{
    
    const sign_1 = useSelector(state => state.sign_1)
    const sign_1_temp = useSelector(state => state.sign_1_temp)
    /*
    const sign_2 = useSelector(state => state.sign_2)
    const sign_2_temp = useSelector(state => state.sign_2_temp) 
    */
   const dispatch = useDispatch()
    const sigCanvas= {}
    const classes = useStyles()
    const [myPad, setMyPad] = useState()
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [open, setOpen] = React.useState(true);
    
    
    //表單檢查區    
    useEffect(()=>{
        if(sign_1 !=""){
            checkSign(true)
        }else{
            checkSign(false)
        }
    },[
        /*需檢查的值*/
        sign_1,
    ])


   // const [parentSign, setParentSign] = useState(false)
    const [formPages, setFormPages] = useState([
        {
            id:"sign1",
            title:"新進人員簽章",
            signTemp:sign_1_temp,
            dispatcher:(data, tempData)=>{dispatch({type:"SET_SIGN_1", sign_1:data, sign_1_temp:tempData })},
            discription:"此簽章將會使用在【客戶履行個人資料保護法蒐集處理利用告知書】【產險書面分析報告書】【壽險書面分析報告書】【投資型商品投保內容確認書】"
        }
    ])
    
    
    return(
        <div>
            {
                formPages.map((value, index)=>{
                    return(
                        <Collapse key={"pad"+index} in={activeStep == index}>
                            <Typography className={classes.title}  gutterBottom>{value.title}</Typography>            
                            <Typography className={classes.title}  gutterBottom>{value.description}</Typography>            
                            <Pad                
                                defalutValue={value.signTemp}
                                sendData={(data, tempData)=>{
                                    value.dispatcher(data, tempData)
                                }}
                            />
                        </Collapse>
                    )
                })
            }
        {/*
        
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={()=>{
                setOpen(false)
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
            <div className={classes.paper}>
                <h2 id="transition-modal-title">簽章說明</h2>
                <p id="transition-modal-description">
                    請提供【簽章聲明】的相關提示文字
                </p>
                <Button variant="contained" 
                        color="primary" 
                        onClick={()=>{
                            setOpen(false)
                        }}
                >確定</Button>
            </div>

            </Fade>
        </Modal>
         */}
        </div>
    )
    
}

export default SignaturePads