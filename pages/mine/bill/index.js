// pages/mine/bill/index.js
import { postRequest } from '../../../utils/http.js'
import { api } from '../../../service/index.js'
import { navigateTo } from '../../../utils/util.js'
import { checkNull } from '../../../utils/rule.js'
Page({
  data: {
    replayStatus:false, //还款弹框状态
    bankStatus:false //选择银行弹框状态
  },
  onLoad: function (options) {

  },
  //立即还款提交
  bindRepaySubmit(){

  },
  //添加银行卡提交
  bindBankSubmit(){
    navigateTo("/pages/mine/card/cardForm");
  },
  //选择全部账单月份
  bindMonthChange(e){
    this.setData({
      index: e.detail.value
    })
  },
  //跳转全部账单
  bindAllBill(){
    navigateTo("/pages/mine/bill/allBill");
  },
  //跳转详情
  bindDetail(e){
    navigateTo("/pages/mine/bill/detail");
  },
  //开启立即还款弹框
  openReplay(){
    this.setData({
      replayStatus: true
    })
  },
  //关闭弹框
  onClose(){
    this.setData({
      replayStatus: false,
      bankStatus: false
    })
  },
  //开启银行卡选择
  openBank(){
    this.setData({
      replayStatus: false,
      bankStatus: true
    })
  },
  //选择银行卡
  bindSelBank(){
    this.setData({
      bankStatus: false
    })
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