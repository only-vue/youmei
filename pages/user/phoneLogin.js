// pages/user/phoneLogin.js
import { postRequest } from '../../utils/http.js'
import { api } from '../../service/index.js'
import { reLaunch, navigateTo, setSession } from '../../utils/util.js'
import { checkNull, checkPhone } from '../../utils/rule.js'
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
   
  },
  //提交登录
  bindSubmit() {
    if (!checkNull(this.data.userName, '请输入账号')) {
      return false;
    }
    if (!checkNull(this.data.code, '请输入短信验证码')) {
      return false;
    }
    let params = {
      mobile: this.data.userName,
      verCode: this.data.code,
      jgPushId: "182803250591608111391136",
    }
    postRequest(this, api.smsLogin, params, (data) => {
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
    if (!checkNull(this.data.userName, '请输入手机号')) {
      return false;
    }
    if (!checkPhone(this.data.userName, '手机号格式错误')) {
      return false;
    }
    let params = { 
       mobile: this.data.userName,
       type:'2'
     }
    postRequest(this, api.sendValidate, params, (data) => {
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
  //跳转注册
  bindRegister(){
    navigateTo("/pages/user/register");
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
  