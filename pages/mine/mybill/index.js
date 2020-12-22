// pages/mine/mybill/index.js
import { postRequest } from '../../../utils/http.js'
import { navigateTo, showToast } from '../../../utils/util.js'
import { api } from '../../../service/index.js'
import { checkNull } from '../../../utils/rule.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = {
      "pageCurrent": 1,
      "pageSize": 100,
    }
    postRequest(this, api.viewByStagesLists, params, (data) => {
      this.setData({
        dataList:data.dataList
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})