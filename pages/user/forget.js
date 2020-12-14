// pages/user/forget.js
import {
  postRequest
} from '../../utils/http.js'
import {
  api
} from '../../service/index.js'
import {
  navigateTo
} from '../../utils/util.js'
import {
  checkNull,
  checkPhone
} from '../../utils/rule.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    password: "",
    code: "",

    //设置初始的状态、包含字体、颜色、还有等待事件 
    sendTime: '获取验证码',
    snsMsgWait: 60
  },
  //提交登录
  bindSubmit() {
    if (!checkNull(this.data.userName, '请输入登录手机号')) {
      return false;
    }
    if (!checkPhone(this.data.userName, '手机号格式错误')) {
      return false;
    }
    if (!checkNull(this.data.password, '请输入新密码')) {
      return false;
    }
    if (!checkNull(this.data.code, '请输入验证码')) {
      return false;
    }

    let params = {
      mobile: this.data.userName,
      pwd: this.data.password,
      vifCode: this.data.code
    }
    postRequest(this, api.findPassword, params, (data) => {
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
  // 获取验证码
  sendCode: function (mobile) {
    if (!checkNull(this.data.userName, '请输入登录手机号')) {
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
    }
  }

})