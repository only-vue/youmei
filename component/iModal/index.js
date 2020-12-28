// component/iModal/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示
    isShow: {
      type: Boolean,
      value: false
    },
    // 弹框标题
    title: {
      type: String,
      value: ''
    },
   
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      value: true
    },
   
    // 确认按钮的open-type
    open_type: {
      type: String,
      value: ''
    },
    receivingAgreementInfo:{
      type:Object,
      value:{}
    }
    // bindSuccess 在HTML使用该属性可将 使用页面 的函数绑定到确认按钮的事件当中去
    // bindCancel 在HTML使用该属性可将 使用页面 的函数绑定到取消按钮的事件当中去
  },
 
  /**
   * 组件的初始数据
   */
  data: {
 
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close: function() {
      this.setData({
        isShow: false
      });
    },
    sure: function(e) {
      console.log('Success');
      var myEventDetail = e // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('Success', myEventDetail, myEventOption)
      this.close();
    },
    Cancel: function(e) {
      var myEventDetail = e // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('Cancel', myEventDetail, myEventOption)
      this.close();
    },
  }

})
