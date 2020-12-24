// component/cameraList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maxLength:Number,//最大长度
    imgList:Array,//图片列表
    type:Number,//图片类型，1 logo  2 手术情况通知书  0 其它
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
    takeImg:function(){
      var that = this
      wx.chooseImage({
        count: this.properties.maxLength-this.properties.imgList.length,
        sizeType: ['original', 'compressed'],
        sourceType: ['album','camera'], 
        success(res) {
          const tempFilePaths = res.tempFilePaths
          let list = tempFilePaths.map((item)=> { 
            return {
              imageUrl:item,
              type:that.properties.type,
            }
           })
          var myEventDetail = {
            value:list
          } 
          var myEventOption = {} 
          that.triggerEvent('cameraChange', myEventDetail, myEventOption)
        }
      })
    },
    deleteImg:function(e){
        var myEventDetail = {
          position:e.currentTarget.dataset.position
        } 
        var myEventOption = {} 
        this.triggerEvent('cameraDelete', myEventDetail, myEventOption)
    }
  }
})
