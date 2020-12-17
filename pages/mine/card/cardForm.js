// pages/mine/card/cardForm.js
import { postRequest } from '../../../utils/http.js'
import { api } from '../../../service/index.js'
import { navigateTo,showToast } from '../../../utils/util.js'
import { checkNull } from '../../../utils/rule.js'
Page({
  data: {
    name:'',//姓名
    idCard:'',//身份证号
    bankNo:'',//银行卡号
    mobile:'',//预留手机号
    email:'' //账单邮箱
  },
  onLoad: function (options) {
    this.getLoad();
  },
  //界面初始化
  getLoad(){
    postRequest(this, api.idCardInit, {}, (data) => {
      this.setData({
          mobile:data.mobile,
          name:data.idName,
          idCard:data.idCard
      })
    })
  },
  //查看支持银行
  bindBank(){
    navigateTo('/pages/mine/card/bank')
  },
  //添加银行卡
  bindSubmit() {
    if (!checkNull(this.data.name, '请输入姓名')) {
      return false;
    }
    if (!checkNull(this.data.idCard, '请输入身份证号')) {
      return false;
    }
    if (!checkNull(this.data.bankNo, '请输入银行卡号')) {
      return false;
    }
    if (!checkNull(this.data.mobile, '请输入预留手机号')) {
      return false;
    }
    let params = {
      bankCardMobile: this.data.mobile,
      bankCardNo: this.data.bankNo,
      billEmail:this.data.email
    }
    postRequest(this, api.saveBankCardInfo, params, (data) => {
      showToast('添加成功',()=>{
        navigateTo('/pages/mine/bill/index');
      }) 
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