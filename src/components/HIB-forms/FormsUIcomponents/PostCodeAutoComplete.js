import React,{useState, useEffect} from 'react';
import {TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default ({postID, label, targetCode, postCodeList, sendData, setValue})=>{

    const [postCodeData, setPostCodeData] = useState("讀取中")
    const [postCodeInputValue, setPostCodeInputValue] = React.useState('');
    const [list, setList] = useState(postCodeList)
    const [nowCode, setNowCode] = useState(targetCode)
    
    useEffect(()=>{
        setList(postCodeList)
    },[postCodeList])

    useEffect(()=>{
        setNowCode(targetCode)
    },[targetCode])

    useEffect(()=>{        
        if(list.length > 0){
            setPostCodeInputValue("")
            list.map((value, index)=>{
                if(value.郵遞區號 == nowCode){
                    setPostCodeData(value)
                    setPostCodeInputValue(value.縣市別+value.鄉鎮市區名稱)
                }
            })            
        }        
    },
    [list, nowCode, targetCode])
    return(
        <Autocomplete
            value={postCodeData}
            freeSolo
            onChange={(event, newValue) => {
                console.log(newValue)
                /*陣列或者是物件資料 */
                // setPostCodeData(newValue)   
                let _cName=""
                let _postCode="" 
                if(newValue !=null){ 
                    _cName = newValue.縣市別+newValue.鄉鎮市區名稱 
                    _postCode = newValue.郵遞區號                                    
                }
                setPostCodeInputValue(_cName)
                
                sendData(newValue);
            }}
            inputValue={postCodeInputValue}                                
            onInputChange={(event, newInputValue) => {
                /*input文字資料 */
                setPostCodeInputValue(newInputValue)
            }}
            id={postID}
            options={list}
            getOptionLabel={(option) => {
                let _label = ""
                if(typeof option == "string") _label=""
                if(typeof option == "object") _label=option.縣市別+option.鄉鎮市區名稱
                return _label
            }}    
            style={{ width: 400 }}
            renderInput={(params) => 
                <TextField 
                    {...params} 
                    label={label} 
                    variant="outlined"
                    error={postCodeInputValue==""?true:false} 
                />
            }
        />
    )
}