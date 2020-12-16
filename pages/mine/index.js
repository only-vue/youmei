// pages/mine/index.js
import { navigateTo,getSession } from '../../utils/util.js'
Page({
  data: {
     mobile:'' //手机号
  },
  onLoad(options) {
     this.setData({
       mobile:getSession('mobile')
     })
  },
  //跳转登录
  bindLogin(){
    removeSession('token');
    removeSession('mobile');
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