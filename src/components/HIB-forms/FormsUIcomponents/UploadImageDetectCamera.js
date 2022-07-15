import React, {useEffect} from 'react';
import { useState } from 'react';

import {Button ,Modal, Fade ,styled  } from '@material-ui/core';

//import {PhotoCameraIcon} from '@material-ui/icons';
//import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';

const MyUpload = styled("div")({
    minWidth:320,
    minHeight:200,
    margin:"10px",
    padding:"10px",
    border:"1px solid #ccc",
    borderRadius:10,
    textAlign:"center",
    position:"relative",
    color:"#666",
    '& img':{
        transition:".4s",
        maxWidth:200,
        maxHeight:200 
    },
    '& .title, .content, input':{ position:"absolute", transition:".4s"},
    '& .title, .content':{
        left:"50%",
        transform: "translateX(-50%)",        
        backgroundColor:"white"
    },
    '& .title':{ top:"20%" },
    '& .title.on':{
        fontSize:16,
        top:-24,
        left:60,
    },    
    '& .content':{ whiteSpace:"nowrap", bottom:"35%" },
    '& .content.on':{
        bottom:-28,
        right:15,
    },
    '& button.clean':{display:"none" },
    '& button.on':{ display:"block" },
    '& input':{display:"none"}, 
    '& Button':{margin:5}, 

});

const  getUserMedia = (constrains, success, error) =>{
    if(window.navigator.mediaDevices.getUserMedia){
        //最新標準API
        window.navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
    } else if (window.navigator.webkitGetUserMedia){
        //webkit核心瀏覽器
        window.navigator.webkitGetUserMedia(constrains).then(success).catch(error);
    } else if (window.navigator.mozGetUserMedia){
        //Firefox瀏覽器
        window.navigator.mozGetUserMedia(constrains).then(success).catch(error);
    } else if (window.navigator.getUserMedia){
        //舊版API
        window.navigator.getUserMedia(constrains).then(success).catch(error);
    }
}


const UploadImage=({label, helperText})=>{
    

    const [uploadImg, setUploadImg] = useState("")
    const [imgInput,setImgInput] = useState()
    const [imgInputWithCamera, setImgInputWithCamera] = useState(false)
    const [open, setOpen] = useState(false);
    const [hasCamera, setHasCamera] = useState(false)

    const getIDfront = (event)=>{
        const file = event.target.files[0]
        if(file != undefined){
            const reader = new FileReader();
            reader.addEventListener("load", (event)=>{
                const buffer = event.target.result;
                setUploadImg(buffer)
            }) 
            reader.readAsDataURL(file);
        }
    }

    const clearImg = (event) =>{
        imgInput.value="";
        setUploadImg(undefined)
    }

    const handleClose = ()=>{
        setOpen(false)
    }

    //偵測使用者是否有相機裝置
    useEffect(()=>{
        if (window.navigator.mediaDevices.getUserMedia || window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia){
            getUserMedia({
                video:{width:480,height:320}
            },(success)=>{
                setHasCamera(true)
                console.log("success:", success)
            },(error)=>{ 
                setHasCamera(false)
                console.log("error:", error)
            })
        } else {
            console.log("none")
        }
        return
    },[])

    return (
        
        <MyUpload> 
            <h2 class={(uploadImg?"on":"")+" title"}>{label}</h2>
            <p class={(uploadImg?"on":"")+" content"}>{helperText}</p>
          
            <input ref={(item)=>{setImgInput(item)}} onChange={getIDfront} type="file" accept="image/*"/>
            <input ref={(item)=>{setImgInputWithCamera(item)}} onChange={getIDfront} type="file" accept="image/*" capture="camera"/>
            
            
            <img src={uploadImg} onClick={(event)=>{setOpen(true)}}/>
            <div style={{display:"flex", justifyContent:"center"}}>
                <Button variant="contained" color="primary" onClick={()=>{ imgInput.click()}} >{uploadImg?"重新上傳":"圖片上傳"}</Button>
                {
                    hasCamera == true &&
                    <Button variant="contained" color="primary" onClick={()=>{ imgInputWithCamera.click()}}>拍照上傳</Button>
                }
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Fade in={open}>
                    <img style={{ maxWidth:"90%",  maxHeight:"90%",padding:"5%"}} src={uploadImg} />
                </Fade>
            </Modal>
        </MyUpload>    
    );
}

export default UploadImage;

