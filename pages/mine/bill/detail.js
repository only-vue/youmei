// pages/mine/bill/detail.js
import { postRequest } from '../../../utils/http.js'
import { api } from '../../../service/index.js'
import {
  reLaunch,
  navigateTo,
  setSession,
  getSession,
  removeSession
} from '../../../utils/util.js'
import { checkNull } from '../../../utils/rule.js'
Page({
  data: {
    
  },
  onLoad: function (options) {

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