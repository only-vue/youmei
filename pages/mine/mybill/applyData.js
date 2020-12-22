// pages/mine/mybill/applyData.js
import { postRequest } from '../../../utils/http.js'
import { navigateTo } from '../../../utils/util.js'
import { api } from '../../../service/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loanData:undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var {  loanOrderUuid } = options
    this.setData({
      loanOrderUuid:loanOrderUuid
    })
    postRequest(this, api.loanData, {loanOrderUuid: '9d46376962fa40ce934c8511f495d8fe'}, (data) => {
      this.setData({
        loanData: data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindView:function(e){
    navigateTo(e.currentTarget.dataset.url);
  }
})