// pages/user/phoneLogin.js
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
    password: "",
    code: "",
    //设置初始的状态、包含字体、颜色、还有等待事件 
    sendTime: '获取验证码',
    snsMsgWait: 60
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
    if (!checkNull(this.data.userName, '请输入账号')) {
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
    navigateTo("/pages/user/login");
  },
  //删除表单内容
  bindRemove(e) {
    let key = e.currentTarget.dataset.key;
    this.setData({
      [key]: ""
    });
  },
  // 获取验证码
  sendCode: function (mobile) {
    if (!checkNull(this.data.userName, '请输入账号')) {
      return false;
    }
    if (!checkPhone(this.data.userName, '手机号格式错误')) {
      return false;
    }
    let params = { mobile: this.data.userName }
    postRequest(this, api.sendMsg, params, (data) => {
      // 60秒后重新获取验证码
      var inter = setInterval(function () {
        this.setData({
          smsFlag: true,
          sendTime: this.data.snsMsgWait + 's后重试',
          snsMsgWait: this.data.snsMsgWait - 1
        });
        if (this.data.snsMsgWait < 0) {
          clearInterval(inter)
          this.setData({
            sendTime: '获取验证码',
            snsMsgWait: 60,
            smsFlag: false
          });
        }
      }.bind(this), 1000);
    })
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
  