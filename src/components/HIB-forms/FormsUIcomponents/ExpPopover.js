import React,{useState, useEffect} from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';

export default ({setData, sendData})=> {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [jobNature, setJobNature] =useState(setData?setData:"行政");
    const [placeholder, setPlaceholder] =useState("");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const getDefValue = event =>{
        setAnchorEl("")
        if(event.currentTarget.dataset.id !="其他"){
            setJobNature(event.currentTarget.dataset.id )
        }else{
            setJobNature("")
            setPlaceholder("請輸入其他工作性質類型")
        }
    }

    useEffect(()=>{
        if(sendData){
            sendData(jobNature)
        }
    },[jobNature])


    const MyButton = ({myVal}) =>{
        return(
            <Button 
                style={{margin:3}}
                variant="contained"
                color="primary"
                onClick={getDefValue}
                data-id={myVal}
            >{myVal}</Button>
        )
    }

    return (
        <div>
            <TextField
                label="工作性質"
                aria-describedby={id}
                variant="outlined" 
                size="small"
                value={jobNature}    
                onClick={handleClick}
                placeholder={placeholder}
                onChange={event=>{
                    setJobNature(event.target.value)
                }}
                error={jobNature==""?true:false}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                
            >
                <Box p={1}>
                    <MyButton myVal="行政"/>
                    <MyButton myVal="業務/行銷"/>
                    <MyButton myVal="研發"/>
                    <MyButton myVal="其他"/>
                </Box>
            </Popover>
        </div>
    );
}