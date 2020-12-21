// pages/mine/bill/detail.js
import { postRequest } from '../../../utils/http.js'
import { api } from '../../../service/index.js'
import {
  reLaunch,
  navigateTo,
  setSession,
  getSession,
  removeSession,
  formatTime
} from '../../../utils/util.js'
Page({
  data: {
     obj:{
     }
  },
  onLoad: function (options) {
    this.getLoad(options)
  },
  //初始化加载
  getLoad(options){
    postRequest(this, api.getBillDetail, {userBillUuid:options.id}, (data) => {
      data.month=formatTime(new Date(parseInt(data.lastPayDate,10)),'m');
      data.day=formatTime(new Date(parseInt(data.lastPayDate,10)),'md').split('-')[0]+'月'+formatTime(new Date(parseInt(data.lastPayDate,10)),'md').split('-')[1]+'日';
         this.setData({
          obj:data
         }) 
    })
  },
  //立即还款
  bindSubmit(){

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