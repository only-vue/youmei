// pages/billing/billing.js
import { postRequest } from '../../../utils/http.js'
import { navigateTo, showToast } from '../../../utils/util.js'
import { api } from '../../../service/index.js'
import { checkNull } from '../../../utils/rule.js'
const qiniuUploader = require("../../../utils/qiniuUploader");

var ItemIndexMap = {
  idcardDetect: 1,//身份证正反面
  handIdCardPick: 2,//手持身份证拍照
  idLiveDetect: 3, //人脸识别
  bankcard: 4,//银行卡信息
  baseInfo: 5,//基本信息
  workingInfo: 6,//工作信息
  specialInfo: 7//特别信息 影像资料
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 1,
    currentIndex: 0,
    progress: 0,
    verifyList: [],//需验证列表
    productDetailUuid: '',
    uptoken: '',//七牛token
    handCardImg: "",//手持身份证图片
    idCardInfo: undefined,//身份证信息
    bankCardList: [],
    bankInfo: undefined,//当前选中的银行卡
    showBankList: false,
    personInfo: undefined,//基本信息
    personIdCard: undefined,
    region: undefined,
    workRegion: undefined,
    iswork: 1,
    imgInfo: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var { storeUuid, productDetailUuid, productDetailConfigUuid,projectName,loanAmount } = options
    this.setData({
      storeUuid,
      productDetailConfigUuid,
      productDetailUuid: productDetailUuid,
      projectName,
      loanAmount
    })
    postRequest(this, api.getProductDetail, {
      productDetailUuid: productDetailUuid
    }, (data) => {
      const incomingPartsTemplateList = data.incomingPartsTemplateList
      this.getItemNumberList(incomingPartsTemplateList)
    })
    postRequest(this, api.getNewestIdCardInfo, {
      productDetailUuid: productDetailUuid
    }, (data) => {
      console.log(data)
      this.setData({
        idCardInfo: data
      })
    });
    this.getNewestWorkInfo();
  },
  //获取所有进件项
  getItemNumberList: function (incomingPartsTemplateList) {
    const list = []
    if (incomingPartsTemplateList.find(item => {
      return item.itemCode === "incoming_sfrz"
    })) {
      list.push(ItemIndexMap.idcardDetect)
      list.push(ItemIndexMap.handIdCardPick)
    }
    if (incomingPartsTemplateList.find(item => {
      return item.itemCode === "incoming_rlsb"
    })) {
      list.push(ItemIndexMap.idLiveDetect)
    }
    list.push(ItemIndexMap.bankcard)
    if (incomingPartsTemplateList.find(item => {
      return item.itemCode === "incoming_jbxx"
    })) {
      list.push(ItemIndexMap.baseInfo)
    }

    if (incomingPartsTemplateList.find(item => {
      return item.itemCode === "incoming_gzxx"
    })) {
      list.push(ItemIndexMap.workingInfo)
    }

    if (incomingPartsTemplateList.find(item => {
      return item.itemCode === "incoming_tbxx"
    })) {
      list.push(ItemIndexMap.specialInfo)
    }
    this.setData({
      verifyList: list,
      step: list[0],
      progress: ((100 / list.length) * list[0]).toFixed(0)
    })
  },
  //获取七牛token
  getQiniuToken: function () {
    postRequest(this, api.queryQiNiuToken, {}, (data) => {
      this.setData({
        uptoken: data
      })
    })
  },
  //第一步，上传身份证
  //获取sign
  getSign: function () {
    postRequest(this, api.getSign, {}, (data) => {
      this.setData({
        sign: data,
      })
    })
  },
  startFace: function () {
    // this.getToken();
    // navigateTo(`../verify/verify?token=${token}`)
  },
  //获取 face id token
  getToken: function () {
    var sign = this.getSign();
    console.log(sign)
    wx.request({
      url: 'https://openapi.faceid.com/lite_ocr/v1/get_biz_token',
      method: 'POST',
      data: {
        sign: sign,
        sign_version: 'hmac_sha1',
        capture_image: 0,//0:双面，1:人像面
        return_url: 'https://api.megvii.com/faceid/lite/do',
        notify_url: 'https://api.megvii.com/faceid/lite/do',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {                       //返回结果
        // navigateTo(`../../verify/verify?token=${token}`)
        console.log(res.data)
      },
      fail(err) {
        console.log(err)
      },
      complete: function (res) {
        console.log('complete后的res数据：')
      }
    })
  },
  cardNameChange:function(e){
    let data = this.data.idCardInfo
    data.cardScanName = e.detail.value
      this.setData({
        idCardInfo:data
      })
  },
  cardNoChange:function(e){
    let data = this.data.idCardInfo
    data.cardScanIdcardNo = e.detail.value
      this.setData({
        idCardInfo:data
      })
  },
  
  //第二步，上传手持身份证照片
  handCard: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        that.setData({
          handCardImg: tempFilePaths
        })
      }
    })
  },
  //保存手持身份证照7牛key 成功后下一步
  saveHoldKey: function (imgHoldKey) {
    postRequest(this, api.saveHoldKey, {
      holdKey: imgHoldKey
    }, (data) => {
      this.calculateNext()
    })
  },
  //第三步，人脸识别
  faceVerif: function () {

  },
  //第四步，关联银行卡
  getBankCardInfo: function () {
    postRequest(this, api.getBankCardInfo, {}, (data) => {
      // let list = [...data,...data,...data]
      this.setData({
        bankCardList: data,
        showBankList: true
      })
    })
  },
  bankClick: function () {
    this.getBankCardInfo();
  },
  bankChange: function (event) {
    let bankInfo = event.detail.value
    this.setData({
      bankInfo: bankInfo
    })
  },
  //第五步，基本信息
  getNewestPersonInfo: function () {
    postRequest(this, api.getNewestPersonInfo, {}, (data) => {
      this.setData({
        personInfo: data,
        marryData: {
          typeName: data.datumTypeMarryName,
          id: data.datumTypeMarryId
        },
        educationData: {
          typeName: data.datumTypeEducationName,
          id: data.datumTypeEducationId
        },
        housingData: {
          typeName: data.datumTypeHousingName,
          id: data.datumTypeHousingId
        },
        liveDetail: data.liveDetail,
        iswork: data.isWork,
        region: [data.liveProvinceName, data.liveCityName, data.liveRegionName],
        code: [data.liveProvince, data.liveCity, data.liveRegion]

      })
    })
    postRequest(this, api.idCardInit, {}, (data) => {
      this.setData({
        personIdCard: data,
      })
    })
  },
  //婚姻状况

  marryChange: function (event) {
    let { value } = event.detail
    this.setData({
      marryData: value
    })
  },
  //学历
  educationChange: function (event) {
    let { value } = event.detail
    this.setData({
      educationData: value
    })
  },
  //住房类型
  housingChange: function (event) {
    let { value } = event.detail
    this.setData({
      housingData: value
    })
  },

  regionChange: function (event) {
    let { value, code } = event.detail
    this.setData({
      region: value,
      code
    })
  },
  addressInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      liveDetail: e.detail.value
    })
  },


  tapwork: function (e) {
    this.setData({
      iswork: e.currentTarget.dataset.work
    })

  },
  //第六步，工作信息
  getNewestWorkInfo: function () {
    postRequest(this, api.getNewestWorkInfo, {}, (data) => {
      this.setData({
        workName: data.companyName,
        propertiesData: {
          id: data.propertiesId,
          typeName: data.propertiesName
        },
        scaleData: {
          id: data.scaleId,
          typeName: data.scaleName
        },
        workyearData: {
          id: data.datumTypeWorktimeId,
          typeName: data.datumTypeWorktimeName
        },
        position: data.position,
        incomeData: {
          id: data.datumTypeIncomeId,
          typeName: data.datumTypeIncomeName
        },
        workRegion: [data.companyProvinceName, data.companyCityName, data.companyRegionName],
        workCode: [data.companyProvince, data.companyCity, data.companyRegion],
        workAddress: data.companyDetail,
        workPhone: data.workPhone
      })
    })

  },
  propertiesChange: function (event) {
    let { value } = event.detail
    this.setData({
      propertiesData: value
    })
  },
  scaleChange: function (event) {
    let { value } = event.detail
    this.setData({
      scaleData: value
    })
  },
  workyearChange: function (event) {
    let { value } = event.detail
    this.setData({
      workyearData: value
    })
  },
  incomeChange: function (event) {
    let { value } = event.detail
    this.setData({
      incomeData: value
    })
  },
  //工作信息地址
  workRegionChange: function (event) {
    let { value, code } = event.detail
    this.setData({
      workRegion: value,
      workCode: code
    })
  },
  workAddressInput: function (e) {
    this.setData({
      workAddress: e.detail.value
    })
  },
  workNameChange: function (e) {
    this.setData({
      workName: e.detail.value
    })
  },
  position: function (e) {
    this.setData({
      position: e.detail.value
    })
  },
  workPhone: function (e) {
    this.setData({
      workPhone: e.detail.value
    })
  },
  //特殊信息
  getImageInfo: function () {
    postRequest(this, api.getContractImages, {}, (data) => {
      if (data.length > 0) {//已完成
        this.setData({
          imgInfo: true
        })
      } else {
        this.setData({
          imgInfo: false
        })
      }
    });
  },
  pickerHide: function () {
    this.setData({
      showBankList: false
    })
  },
  getProgress: function (step) {
    return ((100 / this.data.verifyList.length) * step).toFixed(0)
  },
  //计算下一步进度
  calculateNext: function () {
    let curStep = this.data.verifyList[this.data.currentIndex + 1]

    if (this.data.step === this.data.verifyList[this.data.verifyList.length - 1]) {
      navigateTo(`billPre?productDetailUuid=${this.data.productDetailUuid}&storeUuid=${this.data.storeUuid}&productDetailConfigUuid=${this.data.productDetailConfigUuid}&projectName=${this.data.projectName}&loanAmount=${this.data.loanAmount}`)
    } else {
      this.setData({
        currentIndex: this.data.currentIndex + 1,
        step: curStep,
        progress: this.getProgress(curStep)
      }, () => {
        if (this.data.step === ItemIndexMap.baseInfo) {
          this.getNewestPersonInfo();
        } else if (this.data.step === ItemIndexMap.handIdCardPick) {
          this.getQiniuToken();
        }else if (this.data.step === ItemIndexMap.workingInfo) {
          this.getNewestWorkInfo();
        } else if (this.data.step === ItemIndexMap.specialInfo) {
          this.getImageInfo();
        }
      })
    }
    

  },
  //点击下一步
  nexttap: function () {
    if (this.data.step === ItemIndexMap.idcardDetect) {
      // if (!checkNull(this.data.idCardInfo.frontKey, '请上传身份证正面')) {
      //   return false;
      // }
      // if (!checkNull(this.data.idCardInfo.oppositeKey, '请上传身份证反面')) {
      //   return false;
      // }
      let params = {
        "cardScanIdcardNo": this.data.idCardInfo.cardScanIdcardNo,
        "cardScanName": this.data.idCardInfo.cardScanName,
        "frontKey": this.data.idCardInfo.frontKey?'':'ggg.jpg',
        "frontNote": this.data.idCardInfo.frontNote,
        "oppositeKey": this.data.idCardInfo.oppositeKey?'':'ggg.jpg',
        "oppositeNote": this.data.idCardInfo.oppositeNote,
      }
      postRequest(this, api.saveIdCardInfo, params, (data) => {
        this.calculateNext();
        
      })
      this.calculateNext();
    } else if (this.data.step === ItemIndexMap.handIdCardPick) {
      if (!checkNull(this.data.handCardImg, '请上传手持身份证照片')) {
        return false;
      }
      // 向七牛云上传
      // console.log(this.data.handCardImg)
      qiniuUploader.upload(this.data.handCardImg, (res) => {

        this.saveHoldKey(res.key)
      }, (error) => {
        showToast('error: ' + JSON.stringify(error))
        console.error('error: ' + JSON.stringify(error));
      }, {
        region: 'SCN',	//华南
        // key: 'customFileName.jpg',
        domain: 'https://umas.qiniu.wunzb.cn', // 
        uptoken: this.data.uptoken, // 由其他程序生成七牛 uptoken
      },
        (progress) => {
          // console.log('上传进度', progress.progress);

        }, cancelTask => {
        // that.setData({ cancelTask })
      }
      );

    } else if (this.data.step === ItemIndexMap.idLiveDetect) {
      this.calculateNext()
    } else if (this.data.step === ItemIndexMap.bankcard) {

      if (this.data.bankInfo == undefined) {
        showToast('请选择关联银行卡')
        return false;
      }
      let params = {
        "userBankCardUuid": this.data.bankInfo.userBankCardUuid,
      }
      postRequest(this, api.choiceBankCard, params, (data) => {
        this.calculateNext();
      })
    } else if (this.data.step === ItemIndexMap.baseInfo) {
      let { educationData, housingData, marryData, region, code, iswork, liveDetail } = this.data
      if (!checkNull(marryData.id, '请选择婚姻状况')) {
        return false;
      }
      if (!checkNull(educationData.id, '请选择学历')) {
        return false;
      }
      if (!checkNull(housingData.id, '请选择住房类型')) {
        return false;
      }
      if (!checkNull(region[0], '请选择居住地址')) {
        return false;
      }
      if (!checkNull(liveDetail, '请输入详情地址')) {
        return false;
      }

      let params = {
        "contactList": [],
        "datumTypeEducationId": educationData.id,
        "datumTypeHousingId": housingData.id,
        "datumTypeMarryId": marryData.id,
        "isWork": iswork,
        "liveCity": code[1],
        "liveCityName": region[1],
        "liveDetail": liveDetail,
        "liveProvince": code[0],
        "liveProvinceName": region[0],
        "liveRegion": code[2],
        "liveRegionName": region[2],
      }
      postRequest(this, api.savePersonInfo, params, (data) => {
        if (iswork == 0) {
          //无工作
          let curStep = this.data.verifyList[this.data.currentIndex + 1]
          this.setData({
            currentIndex: this.data.currentIndex + 1,
            step: curStep,
          }, () => {
            this.calculateNext();
          });
        } else {
          this.calculateNext();
        }
      })
    } else if (this.data.step === ItemIndexMap.workingInfo) {
      let { workName, propertiesData, scaleData, workyearData, position, incomeData, workRegion, workCode, workAddress, workPhone } = this.data
      //工作信息所有非必填
      let params = {
        "companyCity": workCode[1],
        "companyCityName": workRegion[1],
        "companyDetail": workAddress,
        "companyName": workName,
        "companyProvince": workCode[0],
        "companyProvinceName": workRegion[0],
        "companyRegion": workCode[2],
        "companyRegionName": workRegion[2],
        "datumTypeIncomeId": incomeData.id,
        "datumTypeWorktimeId": workyearData.id,
        "position": position,
        "propertiesId": propertiesData.id,
        "scaleId": scaleData.id,
        "workPhone": workPhone,
      }
      postRequest(this, api.saveWorkInfo, params, (data) => {
        this.calculateNext();
      })
    } else if (this.data.step === ItemIndexMap.specialInfo) {
     if(this.data.imgInfo){
      this.calculateNext()
     }else{
       showToast('请完善影像资料')
     }
    }

  },
  lasttap: function () {
    let curStep = this.data.verifyList[this.data.currentIndex - 1]
    this.setData({
      currentIndex: this.data.currentIndex - 1,
      step: curStep,
      progress: this.getProgress(curStep)
    },()=>{
      // if (this.data.step === ItemIndexMap.specialInfo){
      //     this.getImageInfo()
      // }
    })
  },
  
  
 
  // 跳转到操作页
  bindView(e) {
    navigateTo(e.currentTarget.dataset.url);
  },
  onShow:function(){
    this.getImageInfo()
  }


})