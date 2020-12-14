// pages/billing/productList/index.js
import { navigateTo } from '../../../utils/util.js'
import { postRequest} from '../../../utils/http.js'
import {api} from '../../../service/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid:'',
    list: ["1","2","2","2","2"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uuid: options.uuid,
    })
    console.log(this.data.uuid)
    let params = {
      isDiscount: false,
      storeUuid: options.uuid
    }
    postRequest(this, api.productList, params, (data) => {
      
    })
  },
  bigGift: function () {

  },
  btnGet: function () {
    navigateTo('productDetail')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.getLocation({
    //   type: 'wgs84',
      // success (res) {
      //   console.log(res)
      //   const latitude = res.latitude
      //   const longitude = res.longitude
      //   const speed = res.speed
      //   const accuracy = res.accuracy
      // }
    //  })
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