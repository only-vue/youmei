// component/MyPicker/index.js
//基本信息选择弹框

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //配置页面传过来的值,key值要一一对应
    label: String,
    placeholder: String,
    value: String,
    list: Array,
    contactTypeNameList: Array,
    position: Number//当前位置
  },

  data: {
    pickerValue: '',
    picker_id: 0,
    showDialog: false,
    filterList: []
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
      let { contactTypeNameList, position } = this.properties
      if (!this.data.radioChange_value && this.data.picker_id == 0) {
        contactTypeNameList[position] = this.data.filterList[0].typeName
        this.setData({
          datumTypeContactId:this.data.filterList[0].id
        })
      } else {
        contactTypeNameList[position] = this.data.radioChange_value.typeName
        this.setData({
          datumTypeContactId:this.data.radioChange_value.id
        })
      }

      this.triggerEvent('myPickerChange', {
        contact: {
          datumTypeContactId:this.data.datumTypeContactId,
          name:this.data.name,
          phone:this.data.phone,
        },
        contactTypeNameList,
        position
      });
      this.myPickerHide()
    },
    onClick: function () {
      let { contactTypeNameList, list } = this.properties
      let filterList = list.filter((item) => {
        return contactTypeNameList.indexOf(item.typeName) == -1
      })
      this.setData({
        filterList,
        showDialog: true
      })
    },

    myPickerHide: function () {
      this.setData({
        showDialog: false
      })
    },
    bindPhoneInput: function (e) {
      this.setData({
        phone: e.detail.value
      },()=>{
        this.triggerEventData()
      })
      
    },
    bindNameInput: function (e) {
      this.setData({
        name: e.detail.value
      },()=>{
        this.triggerEventData()
      })
    },
    triggerEventData:function(){
      let { contactTypeNameList, position } = this.properties
      let {name,phone,datumTypeContactId} = this.data
      if(!datumTypeContactId){//当未选择时给初始值
        let tempPo = position
        if(tempPo>1){
          tempPo = tempPo-2
        }
        datumTypeContactId = this.properties.list[tempPo].id
      }

      this.triggerEvent('myPickerChange', {
        contact: {
          name,phone,datumTypeContactId
        },
        contactTypeNameList,
        position
      });
    }
  }
})