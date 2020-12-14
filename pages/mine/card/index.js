// pages/mine/card/index.js
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
     list:[
       {
         name:'招商银行',
         no:'5638'
       },
       {
         name: '农业银行',
         no: '9697'
       }
     ]    
  },
  onLoad: function (options) {
 
  },
  //立即还款
  bindSubmit() {

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