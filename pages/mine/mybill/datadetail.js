// pages/mine/mybill/datadetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var {  img } = options
    this.setData({
      img:img
    })
  },

})