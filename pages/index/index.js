//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  
  },
  
  onLoad () {
   
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
