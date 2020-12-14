// pages/mine/card/cardForm.js
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
     form:{
       name:'',//姓名
       idCard:'',//身份证号
       bankNo:'',//银行卡号
       mobile:'',//预留手机号
       email:'' //账单邮箱
     }
  },
  onLoad: function (options) {
 
  },
  //查看支持银行
  bindBank(){
    navigateTo('/pages/mine/card/bank')
  },
  //添加银行卡
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