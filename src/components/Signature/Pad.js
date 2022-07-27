import React,{useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { makeStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import { useSelector, useDispatch } from 'react-redux';

import SignatureCanvas from 'react-signature-canvas';

import { SignPad, HospButton } from '../../components/UI'


const SignaturePad = ({/*defalutValue,*/ isOpen, completeButton, sendData})=>{
    

    const sign_1 = useSelector(state => state.sign_1)
    const dispatch = useDispatch()
    const sigCanvas= {}
    //const classes = useStyles();
   // const [open, setOpen] = useState(false)
    const [myPad, setMyPad] = useState()

    const [padWidth, setPadWidth] = useState(600)
    const [padHeight, setPadHeight] = useState(400)
    //const [defValue] = useState(defalutValue)

    const resizePad = ()=>{
        if(window.matchMedia('(max-width: 600px)').matches){
            setPadWidth(370)
            setPadHeight(500)
        }else{
            setPadWidth(600)
            setPadHeight(400)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", () => {
            resizePad()
        });
        return
    },[])
    
    useEffect(() => {
        resizePad()
    },[isOpen])     
    /*
    useEffect(() => {
        if(myPad && defalutValue){
           myPad.fromData(defalutValue) 
        }
    },[myPad]);
    */
    return(
       <div>
            <SignPad  >
                <div style={{backgroundColor:"#fff",width:padWidth, height:padHeight, margin:"0 auto", borderRadius:20}}>
                    <SignatureCanvas 
                        maxWidth={8}
                        ref={(ref) => { setMyPad(ref) }}
                        penColor='black'
                        //backgroundColor="white"
                        canvasProps={{width: padWidth, height: padHeight, className: 'sigCanvas'}} 
                        fromDataURL={sign_1}
                        onEnd={()=>{
                            const data = myPad.toDataURL("image/png");
                            sendData(data, myPad.toData())
                        }}
                    />
                </div>
                <div className='btnBox'>

                    <div className='leftBtnBox'>
                        <HospButton className='clearAll' onClick={()=>{
                            myPad.clear()
                            sendData("", "")//reducer的地方清除    
                        }}>清除</HospButton>
                        <HospButton className='backStep' onClick={()=>{
                            const data = myPad.toData();
                            if (data) {
                                data.pop(); // remove the last dot or line
                                myPad.fromData(data);
                                sendData(myPad.toDataURL("image/png"),  data)//reducer紀錄上一步的動作
                            }
                        }}>上一步</HospButton>
                    </div>

                    <div className='rightBtnBox'>
                        {
                            completeButton
                        }
                    </div>
                </div>
            </SignPad>
        </div>
    )
    
}

export default SignaturePad