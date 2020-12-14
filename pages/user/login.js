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
    this.setUserInfo();
  },
  //获取保存的账号信息
  setUserInfo() {
    let userName = getSession('userName');
    let pwd = getSession('pwd');
    if (userName) {
      this.setData({
        userName: userName + ""
      });
    }
    if (pwd) {
      this.setData({
        password: pwd + ""
      });
    }
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
      userName: this.data.userName,
      pwd: this.data.password
    }
    postRequest(this, api.login, params, (data) => {
      setSession('token', data.token);
      setSession('role', data.role);
      setSession('user', data.user);
      setSession('userName', this.data.userName);
      setSession('pwd', this.data.password);
      reLaunch('/pages/dateManage/index');
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
      // path: '/pages/index/index',
      // imageUrl: "",
      // success: (res) => {
      //   console.log("转发成功", res);
      // },
      // fail: (res) => {
      //   console.log("转发失败", res);
      // }
    }
  }
})