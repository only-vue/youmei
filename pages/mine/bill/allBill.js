// pages/mine/bill/allBill.js
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
         year:'2020',
         list:[
           {
             name:'02月账单',
             money:'0.35',
             status:'已出账'
           },
           {
            name:'03月账单',
            money:'0.35',
            status:'已出账'
          }
         ]
       },
       {
        year:'2019',
        list:[
          {
            name:'12月账单',
            money:'20',
            status:'已逾期'
          }
        ]
      }
     ]
  },
  onLoad: function (options) {

  },
  //跳转账单页
  bindBill(){
    navigateTo("/pages/mine/bill/index");
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