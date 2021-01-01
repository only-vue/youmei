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
        "frontKey": this.data.idCardInfo.frontKey,
        "frontNote": this.data.idCardInfo.frontNote,
        "oppositeKey": this.data.idCardInfo.oppositeKey,
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
        // console.log(res)
        // console.log('提示: wx.chooseImage 目前微信官方尚未开放获取原图片名功能(2020.4.22)');
        // console.log('file url is: ' + res.fileURL);
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
          // console.log('已经上传的数据长度', progress.totalBytesSent);
          // console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend);
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

      if (marryData == undefined) {
        showToast('请选择婚姻状况')
        return false;
      }
      if (educationData == undefined) {
        showToast('请选择学历')
        return false;
      }
      if (housingData == undefined) {
        showToast('请选择住房类型')
        return false;
      }
      if (region == undefined) {
        showToast('请选择居住地址')
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
  startFace: function () {
    this.getToken();
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
  //生成 faceId sign
  getSign: function () {

    let api_key = "5P4ZC5tDnRsk6G4PU0yYJtQGLHZT1ohq";
    let api_Secret = "g4hP0P77CBcbPh25M3pbpRSvRhMsPLTf";
    let current_time = parseInt((new Date().getTime()) / 1000);
    let expire_time = current_time + 100;
    let random = Math.random().toString(36).substr(2, 10);
    // var api_key= "ICVvC_xUs6177WEtyUNwIH8J6NfGu50t";
    // var api_Secret= "UjYGdN9CBZKsDBLB5-5v3DykPXY6dw3q";
    // var current_time= 1530762118;
    // var expire_time= current_time+100;
    // var random= "0799687066";
    // var raw =`a=${api_key}&b=${expire_time}&c=${current_time}&d=${random}`;
    var raw = "a=5P4ZC5tDnRsk6G4PU0yYJtQGLHZT1ohq&b=1608082375&c=1608082275&d=545547482"
    var CryptoJS = require('../../../utils/hmac-sha1.js');
    var sign_temp = CryptoJS.HmacSHA1(raw, api_Secret);
    console.log(raw)
    console.log(this.stringToByte(sign_temp.toString()));
    console.log(this.stringToByte(raw));
    var base64 = require('../../../utils/base64.js');
    var sign = base64.encode(sign_temp.toString() + raw)
    // const crypto = require('crypto');
    // console.log(crypto)
    // var hmac = crypto.createHmac('sha1', api_Secret);
    // hmac.update(raw); // write in to the stream
    // var digest = hmac.digest();
    // var buffer = Buffer.from(raw);
    // var result = Buffer.concat([digest, buffer]).toString('base64')
    return sign;
  },

  stringToByte: function (str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    return bytes;


  },
  // 跳转到操作页
  bindView(e) {
    navigateTo(e.currentTarget.dataset.url);
  },
  onShow:function(){
    this.getImageInfo()
  }


})