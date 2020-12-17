// pages/mine/index.js
import { postRequest } from '../../utils/http.js'
import { api } from '../../service/index.js'
import { navigateTo,getSession,removeSession } from '../../utils/util.js'
Page({
  data: {
     mobile:'' //手机号
  },
  onLoad(options) {
     this.setData({
       mobile:getSession('mobile')
     })
     this.getLoad();
  },
  //界面初始化
  getLoad(){
    postRequest(this, api.idCardInit, {}, (data) => {
      this.setData({
        mobile:data.mobile
      })
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