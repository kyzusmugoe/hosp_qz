import React,{useState, useEffect, useContext, useRef} from 'react';
import styled from 'styled-components';

const borderColor = "#D9D9D9";

export const MainBox = styled('div')`
    background-image: url('./images/bg.jpg');
    background-size: 100%  100%;    
    .bubbles{      
        background-image: url('./images/bg_bubbles.png');
        background-repeat: no-repeat;
        background-position: center;
        padding-bottom: 85px;
    }

    .header, .container{
        width: 100%;
        max-width: 1000px;
        margin-left: auto;        
        margin-right: auto;        
    }

    .header{
        height: 90px;
        overflow-y: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left img{
            width: 100%;
            max-width: 375px;
        }
        .right img{
            margin-top: 40px;
        }    
    }
    
    .container{
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;      
        border-radius: 4px;
        box-shadow: 0px 4px 10px rgb(0 0 0 / 25%);
        width: calc(100% - 90px);
        max-width: 910px;
        padding: 45px;
        margin-bottom: 100px;
        h3{
            margin-top: 40px;
        }
        .ansBox{
            margin: 0 15px 20px 15px;
        }

        @media screen and (max-width:678px){
            width: calc(100% - 40px);
            padding: 30px 15px;
            margin: 0 5px;
        }
        .title{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 1px solid #ccc;
            padding-bottom: 21px;
            .version{
                text-align: right;
                font-size:12px;
                color: #666;
            }
            @media screen and (max-width:512px){
               flex-direction: column-reverse;
               .version{
                   align-self: flex-end;
                }
            }
            
        }
        .discription{
            margin: 15px 0;
            text-align: center;
            color:#666;
            font-size: 12px;
        }
    }
`
export const BasicBox = styled('div')`
    display:grid;
    gap: 20px 20px;
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    > div{
        
    }
`

export const HospInput = styled('input')`
    border:1px solid ${borderColor};
    border-radius: 4px;
    width: 100%;
    font-size:1em;
    padding: 10px 15px;
    &.w50{
        width: calc(50% - 10px);
    }
    &.otherInput{
        margin-top: 10px;
        animation-name: fadeIn;
        animation-duration: .6s;
        @keyframes fadeIn {
            from {opacity:0}
            to {opacity:1}
        }
    }
`

export const HospSelect = styled('select')`
    border:1px solid ${borderColor};
    border-radius: 4px;
    width: 100%;
    font-size:1em;
    padding: 10px 15px;
`

export const HospButton = styled('button')`
    cursor: pointer;
    font-size:1em;
    margin: 5px;
    font-weight: 400;
    color:#333;
    border: 1px solid #aaa;
    line-height: 1.5em;
    transition: .4s;

   
    
    &.on{
        color: #fff;
        border-color: #F259A6;
        background-color:#F259A6;

        &:hover{
            background-color: #f574b5;
        }
    }
    &.disable{
        color:#aaa;
        background-color:#ccc;
    }

    &.off{
        color:#333;
        background-color:#fff;
        &:hover{
            background-color: #fde5f1;
        }
    }

    &.sign{
        width:100%;
        max-width:180px;
        min-height:100px;
        color: #F259A6;
        background-color: #fff;
        border: none;
        border-bottom:1px solid #aaa;
        .label{
            color:#333;
            text-align: left;
            font-size: 15px;        
        }
        @media screen and (max-width:678px){
            margin: 0 auto;
        }
    }

    &.submit{        
        color:#fff;
        border-color: #F259A6;
        background-color:#F259A6;
        font-size:1.2em;
        padding:8px 20px; 
        width:100%;
        max-width:180px;
        border-radius: 25px;
       
    }

    &.clearAll, &.backStep, &.signComplete{
        color:#fff;
        border-color: #F259A6;
        background-color:#F259A6;
        border-radius: 25px;
        padding:8px 20px;
        min-width: 150px;
        &:hover{
            color:#F259A6;
            background-color: #fff;
        }
        @media screen and (max-width:600px){        
            width:100%;
        }
    }
    
    &.clearAll{
        border-color: #625DF0;
        background-color:#625DF0;
        &:hover{
            color:#625DF0;
            background-color: #fff;
        }
    }
    &.backStep{      
    }
    &.signComplete{
        border-color: #EE1E87;
        background-color:#EE1E87;
        &:hover{
            color:#EE1E87;
            background-color: #fff;
        }
        @media screen and (max-width:600px){
            width: calc(100% - 10px);
        }
    }
    

    
`


export const HospCircleButton = styled(HospButton)`
    border-radius : 50%; 
    width: 55px;
    height: 55px;
`

export const HospBarButton = styled(HospButton)`
    border-radius : 10px; 
    padding: 12px;
    text-align: left;
`

export const SignPad = styled('div')`
    .btnBox{
        margin-top:10px;
        display: flex;
        justify-content: space-between;
        
    }
    .leftBtnBox{
        display: flex;
        flex:1 0 73%;
        justify-content: space-between;
    }
    .rightBtnBox{
        flex:0 0 27%;
    }
    @media screen and (max-width:600px){
        .btnBox{
            width:100%;
            margin: 10px auto;
            max-width: 370px;
            flex-direction: column;
            align-items: center;
        }
        .leftBtnBox, .rightBtnBox{
            width: 100%;
            flex:0 0 100%;
        }
    }
`

/*

export const HospButton = styled('button')`
    cursor: pointer;
    font-size:1em;
    margin: 5px;
    font-weight: 400;
    color:#333;
    background-color:#0cf;
    border: 1px solid #aaa;        
    border-radius : ${ props =>{ if(props.theme == "circle"){ return "50%"  } else if(props.theme == "bar"){ return "10px" } }};  
    padding       : ${ props =>{ if(props.theme == "circle"){ return "auto" } else if(props.theme == "bar"){ return "12px" }}};
    width         : ${ props =>{ if(props.theme == "circle"){ return "55px" } else { return "auto" } }};  
    height        : ${ props =>{ if(props.theme == "circle"){ return "55px" } else { return "auto" } }};  
    text-align    : ${ props =>{ if(props.theme == "bar"   ){ return "left" } else { return "center" } }};  
    line-height: 1.5em;
    &.large{
        font-size:1.2em;
        padding:8px 20px;    
    }
    &.on{
        color: #fff;
        border-color: #F259A6;
        background-color:#F259A6;
    }
    &.disable{
        color:#aaa;
        background-color:#ccc;
    }

    &.off{
        color:#333;
        background-color:#fff;
    }
    &.sign{
        color: #F259A6;
        background-color: #fff;
        border: none;
        
    }
`
*/
export const PadModalBox = styled('div')`
    
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .modal{
        width: 100%;
        max-width: 600px;
        z-index: 1;        
    }

    &::before{
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.7);
        pointer-events: none;
    }
    animation-name: fadeIn;
    animation-duration: .4s;
    @keyframes fadeIn {
        from {opacity:0}
        to {opacity:1}
    }
`

export const MesgModalBox = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .modal{
        background-color: #fff;
        width: calc(100% - 50px);
        padding: 20px;
        border-radius: 10px;
        max-width: 600px;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center; 
        .alertTxt{
            color: #f20;
            margin: 20px;
            font-size: 1.4em;
        }       
    }

    &::before{
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.7);
        pointer-events: none;
    }
    animation-name: fadeIn;
    animation-duration: .4s;
    @keyframes fadeIn {
        from {opacity:0}
        to {opacity:1}
    }
`

export const UploadModalBox = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .modal{
        background-color: #fff;
        width: calc(100% - 50px);
        padding: 20px;
        border-radius: 10px;
        max-width: 600px;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center; 
        .alertTxt{
            color: #f20;
            margin: 20px;
            font-size: 1.4em;
        }       
    }

    .uploading{
        animation-name: rotationLoading;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        @keyframes rotationLoading {
            from { transform: rotate(0deg);}
            to   { transform: rotate(360deg);}
        }
    }

    &::before{
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.7);
        pointer-events: none;
    }
    animation-name: fadeIn;
    animation-duration: .4s;
    @keyframes fadeIn {
        from {opacity:0}
        to {opacity:1}
    }
`

export const PrevirwMySign = styled('img')`
    width: 100%;
    object-fit: cover;   
`
