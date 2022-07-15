import React, {useEffect, useRef} from 'react';
import { useState } from 'react';
import {Button ,Dialog,DialogActions,DialogContent, Fade ,styled  } from '@material-ui/core';

const MyUpload = styled("div")({
    //minWidth:320,
    //minHeight:200,
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
        maxHeight:200,
        marginBottom: 50
    },
    '& .title, .content, input, .upload':{ position:"absolute", transition:".3s"},
    '& .title, .content, .upload':{
        left:"50%",
        transform: "translateX(-50%)"
    },
    '& .title, .content':{ backgroundColor:"white" },
    '& .upload':{ bottom:"20%" },
    '& .upload.on':{ bottom:"6%" },
    '& .title':{ 
        top:"20%", 
        borderRadius:3,
        padding:3
    },
    '& .title.on':{
        fontSize:16,
        top:-30,
        left:60
    },    
    '& .content':{ whiteSpace:"nowrap", bottom:"15%" },
    '& .content.on':{
        bottom:-28,
        right:15,
    },
    '& input':{display:"none"}, 
});

export default ({label, defaultValue, helperText="", sendData, setImg, canvasWitdh=300, canvasHeight=400, Orientation="landscape", onclick=()=>{ console.log("not set!")}})=>{
    const [uploadImg, setUploadImg] = useState(defaultValue)
    const [imgInput, setImgInput] = useState("")
    const [open, setOpen] = useState(false);

    const [cWitdh, setCWitdh] = useState(canvasWitdh)
    const [cHeight, setCHeight] = useState(canvasHeight)
    const photo = useRef()

    //const _limitWidth=limitWidth
    //const _limitHeight=limitHeight
    
    const [ctx, setCtx] = useState()
    const image = new Image();
    image.onload = function() {       
        console.log('load start') 
        ctx.clearRect(0, 0, cWitdh, cHeight);//清空畫布
         
        let _x=0;
        let _y=0;
        let _w=0;
        let _h=0;

        //方向優先橫向或直向，當圖片長寬都一樣的時候，選擇其中一項作為優先
        const _orientation = Orientation=="portrait"?false:true

        if(this.width > this.height ||  _orientation ){
            //landscape
            _w = cWitdh
            _h = this.height * (cWitdh/this.width)
        }else{
            //portrait
            _w = this.width * (cHeight/this.height)
            _h = cHeight
        }
        setCWitdh(_w)
        setCHeight(_h)
        ctx.drawImage(image, _x, _y , _w , _h)
        photo.current.toDataURL()
        setUploadImg(photo.current.toDataURL())
    };

    
    const reader = new FileReader();
    reader.addEventListener("load", (event)=>{
        const buffer = event.target.result;
        console.log(buffer)
        image.src = buffer;   
    }) 
    
    
    const loadImage = (event)=>{
        const file = event.target.files[0]
        if(file != undefined){
            reader.readAsDataURL(file);   
        } 
    }

    const handleClose = ()=>{
        setOpen(false)
    }

    useEffect(() => {
        if(photo){
            setCtx(photo.current.getContext("2d"))
        }else{
            console.log("canvas尚未設置")
        }
    }, [photo])
    
    useEffect(()=>{
        sendData?sendData(uploadImg):console.log("元件 UploadImg 的 sendData 尚未設定")
    },[uploadImg])

    
    useEffect(()=>{
        if(defaultValue !="" && ctx){
            image.src = defaultValue;
        }else if(defaultValue =="" && ctx){
            //沒有資料的時候手動清除Canvas並清空UploadImg，避免顯示錯誤
            setUploadImg("")
            ctx.clearRect(0, 0, cWitdh, cHeight);
        }
    },[defaultValue, ctx])

    return (
        
        <MyUpload> 
            <h5 className={(uploadImg?"on":"")+" title"}>{label}</h5>
            <p className={(uploadImg?"on":"")+" content"}>{helperText}</p>          
            <input ref={(item)=>{setImgInput(item)}} onChange={loadImage} type="file" accept="image/*"/>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>                    
                <div 
                    style={{backgroundColor:"#aaa",width:150, height:150, overflow:"hidden", display:"flex", alignItems:"center"}}  
                    onClick={(event)=>{
                        if( uploadImg !="") setOpen(true)
                    }}>
                    <canvas ref={photo} width={cWitdh} height={cHeight} style={{width:"100%"}}/>
                </div>
            </div>            
            <Button size="small" className={(uploadImg?"on":"")+" upload"} variant="contained" color="primary" onClick={()=>{ 
                imgInput.click();
                onclick();
            }} >{uploadImg?"重新上傳":"圖片上傳"}</Button>            
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="lg"
                style={{textAlign:"center"}}
            >
                <DialogContent>
                     <img style={{ maxWidth:"100%",  maxHeight:"100%"}} src={uploadImg} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        關閉
                    </Button>
                </DialogActions>
            </Dialog>            
        </MyUpload>    
    );
}
