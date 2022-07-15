class WebService {
    constructor() {
        console.log("Construct WebService")
        //configs
        this.WSurl = "../../Ashx/NewSales.ashx";

        this.mobileToken = ""//行動投保的token
        this.basicInfo = ""//基本表單資料
        this.userData = ""//使用者資料        
        this.userUnit = ""//單位名稱
        this.departmentName = ""//單位名稱

        const _url = new URL(document.location.href)

        /* if(_url.searchParams.get('NSID')){
             this.NSID = _url.searchParams.get('TempFileUid')
         }else{
             console.log("TempFileUid尚未設定")
         }*/
    }

    //*基本登入*//
    asyncLogin = async () => {
        return await this.login()
    }

    asyncCheckNewSeller = async (ID) => {
        return await this.checkNewSeller(ID)
    }

    //*取得暫存資料*//
    asyncTempFileUid = async (tempID) => {
        let resultData = await this.getTempFile(tempID)
        resultData[1] = await this.getTempImg(tempID)
        return resultData
    }

    //*儲存暫存資料*//
    asyncSaveTempFile = async (data) => {
        const photos = [];
        /*  20210312
            data.PDFuid =="" 
            如果已經是壓印PDF資料送出後，不處理圖片上傳的的動作
            減少網路傳輸卡住的機率。
            -----------------------
            20210315 廢棄
            目前因為後台審核者須要看到圖片資料，還是得上傳圖片
        */        
        // if(data.PDFuid ==""){
        if (data.mode == "makePDF" && data.sign_1) {
            photos.push({
                ...this.photosObject,
                ImgType: "簽名",
                FileID: await this.saveImg(data.sign_1)
            })
        }

        if (data.basicInfo.employeePhoto && data.basicInfo.employeePhotoIsChange == 1) {
            photos.push({
                ...this.photosObject,
                State:data.state,
                ImgType: "大頭照",
                FileID: await this.saveImg(data.basicInfo.employeePhoto)
            })
        }

        if (data.IDcardFront && data.IDcardFrontIsChange == 1) {
            photos.push({
                ...this.photosObject,
                State:data.state,
                ImgType: "身分證正面",
                FileID: await this.saveImg(data.IDcardFront)
            })
        }
        if (data.IDcardBack && data.IDcardBackIsChange == 1 ) {
            photos.push({
                ...this.photosObject,
                State:data.state,
                ImgType: "身分證背面",
                FileID: await this.saveImg(data.IDcardBack)
            })
        }

        if (data.bankFront && data.bankFrontIsChange == 1) {
            photos.push({
                ...this.photosObject,
                State:data.state,
                ImgType: "存摺封面",
                FileID: await this.saveImg(data.bankFront)
            })
        }

        if (data.premium.premiumAttachment && data.premium.premiumAttachmentIsChange == 1) {
            photos.push({
                ...this.photosObject,
                State:data.state,
                ImgType: "投保單位證明",
                FileID: await this.saveImg(data.premium.premiumAttachment),
                PremiumRemark: data.premium.premiumRemark,
                PrType: data.premium.prType
            })
        }

        //20210924 同業|異業附件標記：記錄現有的附件至後端標記enable=1
        
        for (let i = 0; i < data.exp.length; i++) {
            if(data.exp[i].evidenceIsChange == 1 ){
                photos.push({
                    ...this.photosObject,
                    EID:data.exp[i].EID,
                    ImgType: data.exp[i].rowType == "Sam" ? "同業佐證" : "異業佐證",
                    FileID: await this.saveImg(data.exp[i].evidence),
                    State:data.exp[i].state,
                    CompName: data.exp[i].compName,
                    JobClass: data.exp[i].job,
                    Industry: data.exp[i].industry != "" ? data.exp[i].industry : "",//新增異業經歷
                    JobNature: data.exp[i].jobNature != "" ? data.exp[i].jobNature : "",//新增異業經歷
                    StartDate: this.birthFilter(data.exp[i].sy, data.exp[i].sm, data.exp[i].sd),
                    EndDate: this.birthFilter(data.exp[i].ey, data.exp[i].em, data.exp[i].ed)
                })
            }
        }

        //}
        //end PDFuid==""

        /*
        if(data.exp.length > 0){
            data.exp.map(item =>{
                photos.push({
                    imgType:"同業佐證",
                    FileID: await this.saveImg(item.evidence),
                    CompName:item.compName,
                    JobClass:item.job,
                    StartDate: this.birthFilter( item.sy, item.sm, item.sd),
                    EndData: this.birthFilter( item.ey, item.em, item.ed)
                })
            })
        }
        */

        console.log("photos", photos)
        data.photos = photos;
        return await this.saveTempFile(data)
    }

    photosObject = {
        EID: "",
        ImgType: "",
        FileID: "",
        CompName: "",
        JobClass: "",
        StartDate: "",
        EndDate: "",
        PremiumRemark: "",
        PrType: "",
        State:""
    }


    //*儲存同業經歷資料*//
    asyncSaveExpData = async (data) => {
        return await this.saveExpData(data)
    }

    //*取得圖片資料*//
    asyncGetImg = async (fileID) => {
        return await this.getImg(fileID)
    }

    //*儲存PDF資料*//
    asyncUploadPDF = async (PDF, myData) => {
        //const result = await this.saveTempFile(myData)
        let state = {}

        state.pdf = await this.uploadPDFdata(PDF, myData.basicInfo.employeeID);


        /*PDF處理完成，更新或寫入到temp資料庫(M_NewSales) */
        if (state.pdf.status == "OK") {
            let _d = {
                ...myData,
                PDFuid: state.pdf.fileName,
                status: 1
            }

            return this.asyncSaveTempFile(_d).then(resolve => {
                return resolve
            }).then(result => {
                state.data = result
                return state
            })
        }
    }

    /*
     20210831 更新流程，
     儲存文字以及圖片資料後上傳到server，再由server進行PDF合成作業
     原有的舊流程會造成上傳過多的資料導致卡住
     */
    asyncSaveDataAndMakePDF = async (myData) => {
        let state = {}
        let _d = {
            ...myData,            
            status: 1,
            mode:"makePDF"
            //NSID:myData.NSID,
            //basicInfo:myData.basicInfo,
            //exp:myData.exp,
            //premium:myData.premium,
            //sign_1:myData.sign_1,
        }

        console.log(myData)
        
        return this.asyncSaveTempFile(_d).then(resolve => {
            return resolve
        }).then(result => {
            state.data = result
            return state
        })
    }

    //20210924 完成階段
    goEndStop = NSID =>{
        let formData = new FormData();
        formData.append("RequestType", "GoEndStop");
        formData.append("NSID", NSID);
        return new Promise((resolve, reject) => {
            fetch(this.WSurl, {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                } 
            }).then(result => {
                resolve(result)
            }).catch((error) => {
                console.error(error);
            });
        })
    }

    //*取得鄉鎮代號*//   
    asyncCitiesNumber = async () => {
        let cities = await this.getCitiesNumber();
        let myAry = [];
        for (const item of cities) {
            let sw = false
            for (const obj of myAry) {
                if (item.縣市別 == obj.city) {
                    obj.regions.push({ region: item.鄉鎮市區名稱, postcode: item.郵遞區號, up: item.up })
                    sw = true
                    break;
                }
            }
            if (!sw) {
                myAry.push({ city: item.縣市別, regions: [{ region: item.鄉鎮市區名稱, postcode: item.郵遞區號, up: item.up }] })
            }
        }
        return myAry
    }

    //取得通訊處資訊
    asyncUnitCode = async () => {
        let getDepts = await this.getDepts();
        return getDepts
    }

    //*取得單位代號*//
    asynDepts = async () => {
        let depts = await this.getDepts();
        return depts
    }

    //#endregion 同步區
    getCitiesNumber = () => {
        let formData = new FormData();
        formData.append("RequestType", "GetTaiwanCity");
        return new Promise((resolve, reject) => {
            fetch(this.WSurl, {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("getCitiesNumber連線失敗")
                    return null
                }
            }).then(result => {
                resolve(result)
            }).catch((error) => {
                console.error(error);
            });
        })
    }

    getDepts = () => {
        let formData = new FormData();
        formData.append("RequestType", "GetDept");
        return new Promise((resolve, reject) => {
            fetch(this.WSurl, {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("getCitiesNumber連線失敗")
                    return null
                }
            }).then(result => {
                resolve(result)
            }).catch((error) => {
                console.error(error);
            });
        })
    }

    goToMobAppWithoutData = () => {
        //this.GoToMobApp(this.insurer, this.mobileToken)
    }

    login = () => {
        let formData = new FormData();
        formData.append("RequestType", "PageBasic");
        return new Promise((resolve, reject) => {
            fetch("../../Ashx/Login.ashx", {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert("連線失敗，請聯絡資訊部")
                    window.location = "../../html/DashBoard.html"
                    return null
                }
            }).then(result => {
                this.userData = result
                //console.log(this.userData)
                //resolve(result)
                if (result !== undefined && result.IsLogin == 'Y') {
                    //console.log(result)
                    this.UserUnit = result.UserUnit
                    console.log("logined")
                    //檢查產壽險登錄證號
                    //this.licenseChecker(result)
                    resolve(result)
                } else {
                    alert("您尚未登入!請您先至Portal進行登入，謝謝。")
                    window.location = "../../html/login.html"
                }
            }).catch((error) => {
                console.error(error);
            });
        })
    }

    getTempFile = tempID => {
        let formData = new FormData();
        formData.append("RequestType", "getTempFile");
        formData.append("NSID", tempID);
        return new Promise((resolve, reject) => {
            fetch(this.WSurl, {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("getTempFile 連線失敗，請聯絡資訊部")
                    return null
                }
            }).then(result => {
                this.tempData = result

                if (result !== undefined) {
                    resolve(result)
                } else {
                    console.log("getTempFile 取得temp資料失敗，請聯絡資訊部")
                }
            }).catch((error) => {
                console.error(error);
            });
        })
    }

    //取得同業經歷資料以及其他圖片資料
    getTempImg = tempID => {
        let formData = new FormData();
        formData.append("RequestType", "getExpImg");
        formData.append("NSID", tempID);
        return new Promise((resolve, reject) => {
            fetch(this.WSurl, {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("getTempFile 連線失敗，請聯絡資訊部")
                    return null
                }
            }).then(result => {
                this.tempData = result

                if (result !== undefined) {
                    resolve(result)
                } else {
                    console.log("getTempFile 取得temp資料失敗，請聯絡資訊部")
                }
            }).catch((error) => {
                console.error(error);
            });
        })
    }

    saveExpData = data => {
        //alert("F185274196")
        let formData = new FormData();
        formData.append("RequestType", "SaveExpData");

        formData.append("NSID", data.NSID)//被增者身分證號     
        formData.append("ImgType", data.type)//被增者身分證號     
        formData.append("compName", data.compName);//繼承人手機
        formData.append("jobClass", data.jobClass);//與繼承人姓名之關係
        formData.append("startDate", data.startDate);//職級
        formData.append("endDate", data.endDate);//職級
        formData.append("jobNature", data.jobNature);//工作性質
        formData.append("industry", data.industry);//產業類別
        formData.append("fileID", data.fileID);//職級

        return new Promise((resolve, reject) => {
            fetch(this.WSurl, {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    console.log(response)
                    return response.json()
                } else {
                    console.log("saveExpFile 連線失敗，請聯絡資訊部")
                    return null
                }
            }).then(result => {
                if (result !== undefined) {
                    resolve(result)
                } else {
                    console.log("saveExpFile 取得temp資料失敗，請聯絡資訊部")
                }
            }).catch((error) => {
                console.error(error);
            });
        })
    }

    saveTempFile = (data) => {

        const _basic = data.basicInfo
        const _employeeBirth = this.birthFilter(
            _basic.employeeBirthYear,
            _basic.employeeBirthMonth,
            _basic.employeeBirthDate
        )

        let nowExps=[]//20210924 同業|異業附件標記：記錄現有的附件至後端標記enable=1，使用EID判斷，對應到資料庫的M_NewSalesImg的ID
        data.exp.map(item=>{
            nowExps.push(item.EID)
        })

        let formData = new FormData();
        formData.append("RequestType", "saveTempFile");
        formData.append("NSID", data.NSID);//單位名稱
        formData.append("unitCodeName", _basic.unitCodeName);//單位名稱
        formData.append("EmployeeID", _basic.employeeID)//被增者身分證號
        formData.append("EmployeeName", _basic.employeeName)//被增者姓名
        formData.append("EmployeeEmail", _basic.employeeEmail);//被增者電子信箱
        formData.append("HighestEducation", _basic.highestEducation);//被增者最高學歷
        formData.append("EmployeeBirth", _employeeBirth);//被增者生日
        formData.append("EmployeeHomePhone", _basic.employeeHomePhone);//被增者連絡電話
        formData.append("EmployeeMobile", _basic.employeeMobile);//被增者手機
        formData.append("DomicilePostcode", _basic.domicilePostcode);//被增者戶籍地址郵遞區號
        formData.append("DomicileAddress", _basic.domicileAddress);//被增者戶籍地址
        formData.append("MailingPostcode", _basic.mailingPostcode);//被增者通訊地址郵遞區號
        formData.append("MailingAddress", _basic.mailingAddress);//被增者通訊地址
        formData.append("RemittanceBank", _basic.remittanceBank);//被增者帳戶名稱
        formData.append("RemittanceAccount", _basic.remittanceAccount);//被增者帳戶代碼
        formData.append("HasFamilyName", _basic.hasFamilyName);//是否有其他家屬於本公司報聘
        formData.append("EmergencyName", _basic.emergencyName);//緊急連絡人姓名
        formData.append("EmergencyPhone", _basic.emergencyPhone);//緊急連絡人手機
        formData.append("EmergencyRelationship", _basic.emergencyRelationship);//與緊急連絡人之關係
        formData.append("HeirName", _basic.heirName);//繼承人姓名
        formData.append("HeirPhone", _basic.heirPhone);//繼承人手機
        formData.append("HeirRelationship", _basic.heirRelationship);//與繼承人姓名之關係
        formData.append("MailContract", _basic.mailContract);//PDFID
        //!!!!formData.append("UnitCode", _basic.UnitCode);//單位代碼
        formData.append("JobClass", _basic.jobClass);//職級
        formData.append("PDFuid", data.PDFuid);//PDFID
        
        formData.append("Mode", data.mode);//20210915 新增傳遞簽名到後端合成        
        formData.append("Photos", JSON.stringify(data.photos));        
        formData.append("NowExps", nowExps.toString());

        //formdata產險或壽險表單與 其他資料
        // const _data =  JSON.stringify({})
        //formData.append("PDFjson", _data) 

        return new Promise((resolve, reject) => {
            fetch(this.WSurl, {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    console.log("saveTempFile 連線失敗，請聯絡資訊部")
                    return null
                }
            }).then(result => {
                //console.log(result)
                if (result !== undefined) {
                    resolve(result)
                    //console.log(result)
                    //console.log("resolve")
                } else {
                    console.log("saveTempFile 取得temp資料失敗，請聯絡資訊部")
                }
            }).catch((error) => {
                console.error(error);
            });
        })
    }

    /*儲存圖片資料，回傳代號*/
    saveImg = imgByte => {
        let formData = new FormData();
        formData.append("RequestType", "SaveImg");
        formData.append("ImgData", imgByte);
        return new Promise((resolve, reject) => {
            fetch("../../Ashx/NewSales.ashx", {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert("連線失敗")
                    return null
                }
            }).then(result => {
                console.log(result)
                if (result == "儲存圖片失敗") {
                    reject(result)
                } else {
                    resolve(result)
                }
            }).catch((error) => {
                console.error(error);
                reject(error)
            });
        })
    }

    //取得圖片資料
    getImg = fileID => {
        debugger;
        let formData = new FormData();
        formData.append("RequestType", "GetImg");
        formData.append("fileID", fileID);
        return new Promise((resolve, reject) => {
            fetch("../../Ashx/NewSales.ashx", {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert("連線失敗")
                    return null
                }
            }).then(result => {
                if (result == "取得圖片失敗") {
                    console.log("webservice => GetImg", result)
                    resolve(false)
                } else {
                    const _fType = fileID.split(".")[1];
                    if (_fType == "jpg" || _fType == "png") {
                        resolve("data:image/" + _fType + ";base64," + result)
                    } else {
                        console.log("圖片格式解析錯誤")
                        resolve(false)
                    }
                }
            }).catch((error) => {
                console.error(error);
                reject(error)
            });
        })
    }

    //檢查報聘者是否已經存在於人事資料庫
    /**
     * ExistEmployee 判斷是否已有存在於資料庫或暫存資料
     * ExistType 有資料在何處，回傳值: 基本資料|報聘中
     */
    checkNewSeller = ID => {
        let formData = new FormData();
        formData.append('RequestType', 'checkUser');
        formData.append("EmployeeID", ID);
        return new Promise((resolve, reject) => {
            fetch("../../Ashx/NewSales.ashx", {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert("連線失敗")
                    return null
                }
            }).then(result => {
                let state = {}
                if (result[0].ExistEmployee == 1) {
                    state = { state: false, type: result[0].ExistType }
                } else {
                    state = { state: true }
                }
                resolve(state)
            }).catch((error) => {
                console.error(error);
                reject(error)
            });
        })
    }

    //上傳PDF
    uploadPDFdata = (data, employeeID) => {
        console.log("start uploadPDFdata")
        const rawLog = data;
        let formData = new FormData();

        formData.append("insurer", this.insurer);
        formData.append('RequestType', 'SavePDF');
        //formData.append('TempFileUid', this.tempFileUid);  //PDF uid 
        formData.append('EmployeeID', employeeID);  //應聘者身分證號，作為PDF密碼使用
        formData.append("data", rawLog);//PDF資料

        return new Promise((resolve, reject) => {
            fetch("../../Ashx/NewSales.ashx", {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert("連線失敗")
                    return null
                }
            }).then(result => {
                resolve(result)
            }).catch((error) => {
                console.error(error);
                reject(error)
            });
        })
    }

    //#endregion 同步區結束    
    sexFilter(data) {
        if (data.list[0].checked === true) {
            return "男"
        } else {
            return "女"
        }
    }

    birthFilter(year, month, date) {
        const _y = year.toString().length == 2 ? "0" + year.toString() : year.toString()
        const _m = month.toString().length == 1 ? "0" + month.toString() : month.toString()
        const _d = date.toString().length == 1 ? "0" + date.toString() : date.toString()
        return _y + _m + _d
    }
}

export default WebService