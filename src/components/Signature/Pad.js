import React,{useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { makeStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import { useSelector, useDispatch } from 'react-redux';

import SignatureCanvas from 'react-signature-canvas';



const SignaturePad = ({defalutValue, sendData})=>{
    

    const sign_1 = useSelector(state => state.sign_1)
    const dispatch = useDispatch()
    const sigCanvas= {}
    //const classes = useStyles();
   // const [open, setOpen] = useState(false)
    const [myPad, setMyPad] = useState()
    
    //const [defValue] = useState(defalutValue)
    useEffect(() => {
        
        if(myPad && defalutValue){
           myPad.fromData(defalutValue) 
        }

    },[myPad]);
    
    return(
       <div>
            <div  >
                <div style={{backgroundColor:"#fff",width:600, height:400, margin:"0 auto"}}>
                    <SignatureCanvas 
                        maxWidth={8}
                        ref={(ref) => { setMyPad(ref) }}
                        penColor='black'
                        //backgroundColor="white"
                        canvasProps={{width: 600, height: 400, className: 'sigCanvas'}} 
                        fromDataURL={sign_1}
                        onEnd={()=>{
                            const data = myPad.toDataURL("image/png");
                            sendData(data, myPad.toData())
                        }}
                    />
                </div>
                <div>
                    <button style={{margin:10}} onClick={()=>{
                        myPad.clear()
                        sendData("", "")//reducer的地方清除    
                    }}>清除</button>
                    <button style={{margin:10}}  onClick={()=>{
                        const data = myPad.toData();
                        if (data) {
                            data.pop(); // remove the last dot or line
                            myPad.fromData(data);
                            sendData(myPad.toDataURL("image/png"),  data)//reducer紀錄上一步的動作
                        }
                    }}>復原</button>
                                 
                </div>
            </div>
        </div>
    )
    
}

export default SignaturePad