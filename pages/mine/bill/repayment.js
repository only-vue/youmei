// pages/mine/bill/repayment.js
import { postRequest } from '../../../utils/http.js'
import { api } from '../../../service/index.js'
import { navigateTo,getSession,showToast } from '../../../utils/util.js'
Page({
  data: {
    imgurl:'../../../assets/images/code.jpg',//图片路径
    replayStatus:true, //还款弹框状态
    bankStatus:false //选择银行弹框状态
  },
  onLoad: function (options) {

  },
  //立即还款
  bindRepaySubmit(){

  },
  //添加银行卡提交
  bindBankSubmit(){
    navigateTo("/pages/mine/card/cardForm");
  },
  //开启立即还款弹框
  openReplay(){
    this.setData({
      replayStatus: true
    })
  },
  //关闭弹框
  onClose(){
    this.setData({
      replayStatus: false,
      bankStatus: false
    })
  },
  //开启银行卡选择
  openBank(){
    this.setData({
      replayStatus: false,
      bankStatus: true
    })
  },
  //选择银行卡
  bindSelBank(){
    this.setData({
      bankStatus: false
    })
  },
  saveImage(e) {
    let that = this;
    let url = e.currentTarget.dataset.url;
    wx.showActionSheet({
      itemList: ['保存到相册'],
      success(res) {
        wx.getSetting({
          success: (res) => {
            if (!res.authSetting['scope.writePhotosAlbum']) {   // 未授权
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success: () => {
                  that.saveImgSuccess(url);
                },
                fail: (res) => {
                  console.log(res);
                  wx.showModal({
                    title: '保存失败',
                    content: '请开启访问手机相册的权限',
                    success(res) {
                      wx.openSetting()
                    }
                  })
                }
              })
            } else {  // 已授权
              that.saveImgSuccess(url);
            }
          },
          fail: (res) => {
            showToast('保存失败');
          }
        })
      },
      fail(res) {
        showToast('保存失败');
      }
    })
  },
  // 同意授权保存到相册
  saveImgSuccess(url) {
    wx.getImageInfo({
      src: url,  // 通过getImageInfo将src转换成改图片的本地路径，给saveImageToPhotosAlbum使用
      success: (res) => {
        console.log(res)
        let path = res.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,   // filePath路径不能是网络图片路径
          success: (res) => {
            showToast('已保存到相册');
          },
          fail: (res) => {
            showToast('保存失败');
          }
        })
      },
      fail: (res) => {
        showToast('保存失败');
      }
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