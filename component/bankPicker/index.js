// component/MyPicker/index.js
import { navigateTo} from '../../utils/util.js'
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
    errImg:'',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    myPickerHide() {
      this.triggerEvent('myPickerHide', '');
    },
    freeBack: function (e) {
      let radioChange_value = e.currentTarget.dataset.data;
      let picker_id = e.currentTarget.dataset.id
      this.setData({
        radioChange_value, picker_id
      })
      // var that = this
      this.triggerEvent('myPickerHide', '');
      // console.log('radioChange_value', this.data.radioChange_value)
      this.triggerEvent('myPickerChange', {
        value:radioChange_value,
        position:picker_id
      });
    },
    onClick:function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('inputClick', myEventDetail, myEventOption)
    },
    cardImgErr:function(e){
      this.setData({
        errImg:'../../assets/images/src_pages_mine_home_banki.png'
      })
    },
    addCard:function(){
      this.myPickerHide()
      navigateTo("/pages/mine/card/cardForm")
    }
  }
})