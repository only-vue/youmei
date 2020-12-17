// pages/mine/card/index.js
import { postRequest,getRequest } from '../../../utils/http.js'
import { api } from '../../../service/index.js'
import { navigateTo } from '../../../utils/util.js'
Page({
  data: {
     list:[]   
  },
  onLoad: function (options) {
    this.getLoad();
  },
  //初始化加载
  getLoad(){
    postRequest(this, api.getBankCardInfo, {}, (data) => {
       this.setData({
         list:data
       })
    })
  },
  //添加银行卡
  bindAdd() {
    navigateTo('/pages/mine/card/cardForm');
  },
  //下拉复位
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  //分享
  onShareAppMessage() {
    return {
    }
  }
})