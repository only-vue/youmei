// pages/mine/index.js
import { navigateTo } from '../../utils/util.js'
Page({
  data: {
  },
  onLoad(options) {

  },
  //跳转登录
  bindLogin(){
    navigateTo('/pages/user/login');
  },
  // 跳转到操作页
  bindView(e){
    navigateTo(e.currentTarget.dataset.url);
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