// pages/mine/mybill/billDetail.js
import { postRequest } from '../../../utils/http.js'
import { navigateTo } from '../../../utils/util.js'
import { api } from '../../../service/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loanDatail:undefined,
    loanOrderUuid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var {  loanOrderUuid } = options
    this.setData({
      loanOrderUuid:loanOrderUuid
    })
    postRequest(this, api.loanDatail, {loanOrderUuid: loanOrderUuid}, (data) => {
      this.setData({
        loanDatail: data
      })
    })
  },
  bindView:function(e){
    navigateTo(e.currentTarget.dataset.url);
  }

})