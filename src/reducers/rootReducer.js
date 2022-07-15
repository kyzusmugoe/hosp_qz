import BasicInfo from './fromReducers/BasicInfo'
import Premium from './fromReducers/Premium'
import SameIndustry from './fromReducers/SameIndustry'

const getInsurerID = ()=>{
    const _url = new URL(document.location.href)
    return _url.searchParams.get('insurer')
}

const getNowDate = ()=>{
    const _d = new Date();
    return {
        year:_d.getFullYear()-1911,
        month:_d.getMonth()+1,
        date:_d.getDate()
    }
}

const initState = {
    NSID:"new",
    insurer:getInsurerID(),//
    loginInfo:{},
    useInsStateForm:false,//使用/取消投資型產品確認書
    //------PDF data
    basicInfo:BasicInfo,
    //person:Person,
    //此區為PNG簽名圖片資料
    IDcardFront:"",
    IDcardFrontIsChange:0,
    IDcardBack:"",
    IDcardBackIsChange:0,
    bankFront:"",
    bankFrontIsChange:0,
    exp:[],//同業經歷與佐證資料
    sameIndustry:SameIndustry,//同業增員佐證資料
    premium:Premium,//免扣取補充保費聲明書
    //此區為PNG簽名圖片資料
    sign_1:"",
    //此區為array簽名圖片資料
    sign_1_temp:"",
    checker:true,//預設true有錯誤 
    checkers:{
        basicInfo:true,
        propRep:true,
        lifeRep:true,
        person:true,
    },
    nowDate:getNowDate(),
    licenses:{
        life:"",
        prop:"",
    },
    PDFuid:"",//製作完成後的PDF檔名，預設是空的
    postCodeList:[],
}

let rootReducer = (state = initState, action)=>{          
    switch(action.type){
      case "SET_NSID"://同業經歷
            return {...state, NSID:action.NSID}
        //初始設定
        //紀錄登入後的相關資訊
        case "SET_LOGIN_INFO":
            return {
                ...state,
                loginInfo:action.loginInfo,
                basicInfo:{
                    ...initState.basicInfo,
                    //unitCode:action.loginInfo.unitCode,
                    unitCodeName:action.loginInfo.UserUnit,
                }
            }
        //PDF資料
        case "SET_TEMP_DATA"://基本資料
            //console.log(action)
            return {
                ...state,
                basicInfo:action.basicInfo,
                IDcardFront:action.IDcardFront,
                IDcardBack:action.IDcardBack,
                bankFront:action.bankFront,
            }
        case "SET_BASIC_INFO"://基本資料
            return {...state, basicInfo:action.basicInfo}
        //取得照片區
        case "GET_BASIC_PHOTO"://取得基本資料大頭照
            return {...state, basicInfo:{...state.basicInfo, employeePhoto:action.employeePhoto }}
        case "ATTACHMENTS_ID_F"://附件資料，身分證正面
            return {...state, IDcardFront:action.IDcardFront}            
        case "ATTACHMENTS_ID_F_IS_CHANGE"://身分證正面變動需要更新上傳
            return {...state, IDcardFrontIsChange:action.IDcardFrontIsChange}
        case "ATTACHMENTS_ID_B"://附件資料，身分證背面
            return {...state, IDcardBack:action.IDcardBack}
        case "ATTACHMENTS_ID_B_IS_CHANGE"://身分證背面變動需要更新上傳
            return {...state, IDcardBackIsChange:action.IDcardBackIsChange}
        case "ATTACHMENTS_BANK"://附件資料，存摺影本
            return {...state, bankFront:action.bankFront}
        case "ATTACHMENTS_BANK_IS_CHANGE"://存摺影本變動需要更新上傳
            return {...state, bankFrontIsChange:action.bankFrontIsChange}
        case "SET_EXP"://同業經歷
            return {...state, exp:action.exp}
        case "ADD_EXP"://加入單項同業經歷
            return {...state, exp:[...state.exp, action.exp]}
        case "SET_PREMIUM"://
            return {...state, premium:action.premium}
        case "SET_SAMEINDUSTRY"://同業增員
            return {...state, sameIndustry:action.sameIndustry}
        //PDF簽名圖檔
        case "SET_SIGN_1":         
            return {...state, sign_1:action.sign_1, sign_1_temp:action.sign_1_temp}
        case "SET_POST_CODE_LIST":
            return {...state, postCodeList:action.postCodeList}
       //檢查狀態
       case "CHECKER":
           // const data = {...state.checker, {action.checke}
           //console.log(state.checker)
           const _d = action.checker
           //console.log(_d)           
           const data = {...state.checkers,[_d.id]:_d.value}
           //console.log(data)
           return {...state, checker:action.checker}
        default :
            return state
    }
}

export default rootReducer