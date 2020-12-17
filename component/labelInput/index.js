// component/labelInput/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label:String,
    placeholder:String,
    disabled:Boolean,
    value:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    label:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindKeyInput:function(event){
      // console.log(event.detail.value)
       // detail对象，提供给事件监听函数
       var myEventDetail = {
        value:event.detail.value
      } 
      // 触发事件的选项
      var myEventOption = {} 
      // 使用 triggerEvent 方法触发自定义组件事件，指定事件名、detail对象和事件选项
      this.triggerEvent('inputChange', myEventDetail, myEventOption)
    }
  },
  
})
