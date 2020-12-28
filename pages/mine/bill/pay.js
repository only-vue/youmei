// pages/mine/bill/pay.js
Page({
  data: {
    payUrl:''
  },
  onLoad: function (options) {
      this.setData({
        payUrl:`https://ll.wunzb.cn?token=${options.token}`
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