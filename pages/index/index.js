//index.js
//获取应用实例
import { navigateTo,getQueryVariable } from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    
  },
  
  onLoad () {
   
  },
  scan:function(){
    wx.scanCode({
      success (res) {
        console.log(res)
        if(res.errMsg == "scanCode:ok"){
          var uuid = getQueryVariable(res.result.split("?")[1],"stormUuid")
          navigateTo('billing/productList?uuid='+uuid)
        }
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
