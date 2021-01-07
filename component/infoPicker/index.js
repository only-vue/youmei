// component/MyPicker/index.js
//基本信息选择弹框
import { postRequest } from '../../utils/http.js'
import { api } from '../../service/index.js'
var datumType={
  properties:"datum_type_properties",//单位性质
  scale:"datum_type_scale",//单位规模
  workyear:"datum_type_workyear",//工作年限
  income:"datum_type_income",//薪资
  marry:"datum_type_marry",//婚姻状况
  education:"datum_type_education",//学历
  housing:"datum_type_housing",//住房类型
  relatives:"datum_type_contact_relatives",//亲属联系人
  urgent:"datum_type_contact_urgent",//紧急联系人
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //配置页面传过来的值,key值要一一对应
    label:String,
    placeholder:String,
    value:String,
    datumType:String //类型 必传
  },
 
  data: {
    pickerValue:'',
    picker_id:0,
    showDialog:false
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
    },
   
    freeBack: function () {
      if(!this.data.radioChange_value&&this.data.picker_id==0){
        this.setData({
          radioChange_value:this.data.list[0]
        })
      }
      this.triggerEvent('myPickerChange', {
        value:this.data.radioChange_value,
      });
      this.myPickerHide()
    },
    onClick:function(){
      if(!this.data.list){
        this.initData()
      }else{
        this.setData({
          showDialog:true
        })
      }
    },
    myPickerHide:function(){
      this.setData({
        showDialog:false
      })
    },
    //获取数据
    initData:function(){
      postRequest(this, api.getDictionaries, {
        datumType: datumType[this.properties.datumType]
      }, (data) => {
        this.setData({
          list:data,
          showDialog:true
        })
      })
    }
  }
})