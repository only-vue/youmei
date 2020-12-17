// pages/user/updataPassword.js
import { postRequest } from '../../utils/http.js'
import { api } from '../../service/index.js'
import { navigateTo } from '../../utils/util.js'
import { checkNull } from '../../utils/rule.js'
Page({
  data: {
    mobile:'',
    password: ''
  },
  onLoad(options){
    this.setData({
      mobile:options.mobile
    })
  },
  //提交登录
  bindSubmit() {
    if (!checkNull(this.data.password, '请输入新密码')) {
      return false;
    }
    let params = {
      mobile: this.data.mobile,
      password: this.data.password
    }
    postRequest(this, api.newPw, params, (data) => {
      navigateTo('/pages/login/index');
    })
  },
  //获取表单输入值
  bindInput(e) {
    let key = e.target.dataset.key;
    this.setData({
      [key]: e.detail.value
    });
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