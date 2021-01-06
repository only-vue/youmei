// pages/verify/verify.js
import {
  showToast
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {token} = options;
    const eventChannel = this.getOpenerEventChannel()
    let that = this
    eventChannel.on('sign', function(data) {
      that.setData({token, sign:data});
    })
  },
  // 定义验证流程结束的回调函数
  onFinish: function (res) {
    console.log(res.detail);
    if(res.errMsg == "request:ok" && (res.data.result_code=="1001"||res.data.result_code=="1002")){
      let data = res.data
      eventChannel.emit('acceptDataFromOpenedPage', data);
    }else{
      // showToast('识别失败，请重试 :'+res.data.result_message)
    }
    wx.navigateBack();
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