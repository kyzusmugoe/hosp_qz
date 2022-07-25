import React,{useState, useEffect, useContext, useRef} from 'react';
import styled from 'styled-components';

export const MainBox = styled('div')`
    background-image: url('./images/bg.jpg');
    background-size: 100%;    
    .bubbles{      
        background-image: url('./images/bg_bubbles.png');
        background-repeat: no-repeat;
        background-position: center;
    }

    .header, .container{
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;        
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
            margin-top: 30px;
        }    
    }
    
    .container{
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;      
        border-radius: 4px;
        
        width: calc(100% - 90px);
        max-width: 910px;
        padding: 45px;
        @media screen and (max-width:678px){
            width: calc(100% - 30px);
            padding: 15px;
        }
        .title{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 1px solid #ccc;
            padding-bottom: 21px;
        }
    }
`
export const HospInput = styled('input')`
    font-size:1em;
    padding: 5px 15px;
    margin: 5px;
`
export const HospSelect = styled('select')`
    font-size:1em;
    padding: 5px 15px;
    margin: 5px;
`

export const HospButtom = styled('button')`
    font-size:1em;
    margin: 5px;
    padding:5px 15px;
    color:#333;
    background-color:#0cf;
    border: none;
    border-radius: 5px;
    
    &.large{
        font-size:1.2em;
        padding:8px 20px;    
    }
    &.on{
        color: #333;
        background-color:#fc0;
    }
    &.disable{
        color:#aaa;
        background-color:#ccc;
    }

    &.off{
        color:#333;
        background-color:#ccc;
    }
`

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
    .container{
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
`
export const PrevirwMySign = styled('img')`
    width: 100%;
    max-width: 200px;
`
