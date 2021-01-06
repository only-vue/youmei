// pages/verify/verify.js
import {
  showToast
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {token} = options;
    const eventChannel = this.getOpenerEventChannel()
    let that = this
    eventChannel.on('sign', function(data) {
      that.setData({token, sign:data});
    })
  },
  // 定义验证流程结束的回调函数
  onFinish: function (res) {
    console.log(res.detail);
    this.getVerifyResult()
  },
//获取验证结果
getVerifyResult:function(){
  const {token,sign} = this.data;
  const eventChannel = this.getOpenerEventChannel()
 
  wx.request({
    url: 'https://openapi.faceid.com/lite/v1/get_result',
    method: 'GET',
    data: {
      sign: sign,
      sign_version: 'hmac_sha1',
      biz_token: token,
      verbose:0
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {                       //返回结果
      console.log(res)
      if(res.errMsg == "request:ok" && res.data.result_code=="1000"){
        let data = res.data
        eventChannel.emit('acceptKYC', data);
      }else{
        showToast('人脸识别失败，请重试 :'+res.data.result_message)
      }
      wx.navigateBack();
      // wx.showModal({
      //   title: '验证流程结束',
      //   content: JSON.stringify(res),
      //   success: function () {
      //     wx.navigateBack();
      //   }
      // });
    },
    fail(err) {
      console.log(err)
    },
    complete: function (res) {
      
    }
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})