// component/MyPicker/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //配置页面传过来的值,key值要一一对应
    'list': {
      type: Array, //必填，目前接受的类型包括：String,Number,Boolean, Object, Array, null（表示任意类型）
      value: [] //可选，默认值，如果页面没传值过来就会使用默认值 
    },
    'showDialog': {
      type: Boolean, //必填，目前接受的类型包括：String,Number,Boolean, Object, Array, null（表示任意类型）
      value: false //可选，默认值，如果页面没传值过来就会使用默认值 
    },
    label:String,
    placeholder:String,
    value:String
  },
 
  data: {
    pickerValue:'',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    radioChange: function (e) {
      let radioChange_value = e.currentTarget.dataset.data;
      let picker_id = e.currentTarget.dataset.id
      this.setData({
        radioChange_value, picker_id
      })
      console.log('value值为：', radioChange_value, 'picker_id值为：', picker_id)
    },
    myPickerHide() {
      this.triggerEvent('myPickerHide', '');
    },
    freeBack: function () {
      if(!this.data.radioChange_value){
        return
      }
      var that = this
      this.triggerEvent('myPickerHide', '');
      console.log('radioChange_value', this.data.radioChange_value)
      this.triggerEvent('myPickerChange', {
        value:this.data.radioChange_value,
        position:this.data.picker_id
      });
    },
    onClick:function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('inputClick', myEventDetail, myEventOption)
    }
  }
})