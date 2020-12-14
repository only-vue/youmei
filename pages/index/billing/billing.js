// pages/billing/billing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step:6,
  },
  nexttap:function(){
    this.setData({
      step:this.data.step+1
    })
  },
  lasttap:function(){
    this.setData({
      step:this.data.step-1
    })
  },
  
})