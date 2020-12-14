// component/labelSelect/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label:String,
    placeholder:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    index: undefined,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selected:function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    bindPickerChange: function (e) {
      console.log('picker下拉项发生变化后，下标为：', e.detail.value)
      this.setData({
          index: e.detail.value
      })
  },
  }
})
