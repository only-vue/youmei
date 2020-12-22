// pages/user/login.js
import {
  postRequest
} from '../../utils/http.js'
import {
  api
} from '../../service/index.js'
import {
  reLaunch,
  navigateTo,
  setSession,
  getSession,
  removeSession
} from '../../utils/util.js'
import {
  checkNull
} from '../../utils/rule.js'

Page({
  data: {
    userName: "",
    password: ""
  },
  onLoad() {
    removeSession('role');
  },
  //提交登录
  bindSubmit() {
    if (!checkNull(this.data.userName, '请输入登录账号')) {
      return false;
    }
    if (!checkNull(this.data.password, '请输入登录密码')) {
      return false;
    }
    let params = {
      mobile: this.data.userName,
      password: this.data.password,
      jgPushId:'151832220571608036011119'
    }
    postRequest(this, api.pwLogin, params, (data) => {
      setSession('token', data.token);
      setSession('mobile', this.data.userName);
      reLaunch('/pages/index/index');
    })
  },
  //获取表单输入值
  bindInput(e) {
    let key = e.target.dataset.key;
    this.setData({
      [key]: e.detail.value
    });
  },
  //修改密码
  bindPassword() {
    navigateTo("/pages/user/forget");
  },
  //验证码登录
  bindPhoneLogin() {
    navigateTo("/pages/user/phoneLogin");
  },
  //跳转注册
  bindRegister(){
    navigateTo("/pages/user/register");
  },
  //删除表单内容
  bindRemove(e) {
    let key = e.currentTarget.dataset.key;
    this.setData({
      [key]: ""
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