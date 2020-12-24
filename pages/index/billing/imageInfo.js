// pages/index/billing/imageInfo.js
import { navigateTo,showLoad,hideLoad, } from '../../../utils/util.js'
import { postRequest } from '../../../utils/http.js'
import { api } from '../../../service/index.js'
const qiniuUploader = require("../../../utils/qiniuUploader");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoList: [],
    infoList: [],
    otherList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let params = {
      // isDiscount: false,
      // storeUuid: options.uuid
    }
    postRequest(this, api.getContractImages, params, (data) => {
      let logoList = [];
      let infoList = [];
      let otherList = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (item.type == 1) {
          logoList.push(item)
        } else if (item.type == 2) {
          infoList.push(item)
        } else if (item.type == 0) {
          otherList.push(item)
        }
      }
      this.setData({
        logoList,
        infoList,
        otherList
      })
    });
    this.getQiniuToken();
  },
  logoChange: function (e) {
    this.setData({
      logoList: e.detail.value
    })
  },
  infoChange: function (e) {
    let list = [...this.data.infoList, ...e.detail.value]
    this.setData({
      infoList: list
    })
  },
  otherChange: function (e) {
    let list = [...this.data.otherList, ...e.detail.value]
    this.setData({
      otherList: list
    })
  },

  logoDelete: function (e) {
    let list = this.data.logoList
    list.splice(e.detail.position, 1)
    this.setData({
      logoList: list
    })
  },
  infoDelete: function (e) {
    let list = this.data.infoList
    list.splice(e.detail.position, 1)
    this.setData({
      infoList: list
    })
  },
  otherDelete: function (e) {
    let list = this.data.otherList
    list.splice(e.detail.position, 1)
    this.setData({
      otherList: list
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
  //上传七牛云
  upQiniu: function (imgPath) {
    return new Promise((resolve, reject) => {
      qiniuUploader.upload(imgPath, (res) => {
        console.log("上传成功"+res.key)
        resolve(res)
      }, (error) => {
        console.error('error: ' + JSON.stringify(error));
        reject(error)
      }, {
        region: 'SCN',	//华南
        uptoken: this.data.uptoken, // 由其他程序生成七牛 uptoken
      },
        (progress) => {
        }, cancelTask => {
        }
      );
    });
    
  },
  async next () {
    showLoad();
    let { logoList, infoList, otherList } = this.data;
    let dataList = [...logoList, ...infoList, ...otherList]
    let keyList = [];
    let nokeyList = [];//需要上传的照片
    for (let i = 0; i < dataList.length; i++) {
      let item = dataList[i];
      if (item.key) {
        keyList.push(item)
      } else {
        nokeyList.push(item)
      }
    }
    //上传图片
    for (let i = 0; i < nokeyList.length; i++) {
      let item = nokeyList[i];
      let res = await this.upQiniu(item.imageUrl)
      console.log(res)
      item.key = res.key
      keyList.push(item)
    }
    // console.log(keyList)

    let paramsList = keyList.map((item)=>{
      return {
        key:item.key,
        type:item.type
      }
    })
    let params = {
      contractImageList:paramsList
    }
    postRequest(this, api.saveContractImages, params, (data) => {
      wx.navigateBack({
        delta: 1
      })
    })
  }
})