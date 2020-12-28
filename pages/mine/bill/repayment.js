// pages/mine/bill/repayment.js
import { postRequest } from '../../../utils/http.js'
import { api } from '../../../service/index.js'
import { navigateTo,getSession,showToast } from '../../../utils/util.js'
import { checkNull } from '../../../utils/rule.js'
Page({
  data: {
    billUuid:'',//账单id
    imgurl:'../../../assets/images/code.jpg',//图片路径
    replayStatus:true, //还款弹框状态
    bankStatus:false, //选择银行弹框状态
    obj:{},
    bankName:'',//银行卡名称
    bankRows:{userBankCardUuid:''},//银行卡选中行内容
    bankList:[] //还款银行列表
  },
  onLoad: function (options) {
    this.data.billUuid=options.id;
    this.setData({
      obj:getSession('objData')
    })
    this.getBankCardInfo();
  },
  //获取银行卡列表
  getBankCardInfo(){
    postRequest(this, api.getBankCardInfo, {}, (data) => {
      data.forEach(item=>{
        item.tips=item.bankCardNo.substring(item.bankCardNo.length-4,item.bankCardNo.length);
      })
      this.setData({
        bankList:data
      })
   })
  },
  //立即HK
  bindRepaySubmit(){
    if (!checkNull(this.data.bankRows.userBankCardUuid, '请选择卡')) {
      return false;
    }
    wx.getSystemInfo({
      success :(res)=> {
        let params={
          billUuid:this.data.billUuid,
          money:this.data.obj.remainPayAmount,
          type:'LIANLIAN',
          userBankCardUuid:this.data.bankRows.userBankCardUuid,
          platform:res.system,
          iMeiId:res.model
        }
        postRequest(this, api.repayBillOnline, params, (data) => {
          
        })    
      }
    })
  },
  //添加卡提交
  bindBankSubmit(){
    navigateTo("/pages/mine/card/cardForm");
  },
  //hk
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
  bindSelBank(e){
    this.setData({
      bankRows:e.currentTarget.dataset.bankrows,
      bankName:`${e.currentTarget.dataset.bankrows.bankName} (${e.currentTarget.dataset.bankrows.tips})`,
      bankStatus: false,
      replayStatus: true
    })
  },
  //保存图片
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