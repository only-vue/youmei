// pages/index/billing/productResult.js
import { redirectTo ,reLaunch} from '../../../utils/util.js'
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

  },
  next:function(){
    reLaunch('/pages/index/index');
  }

  
})