// pages/billing/productList/index.js
import { navigateTo } from '../../../utils/util.js'
import { postRequest} from '../../../utils/http.js'
import {api} from '../../../service/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid:'',
    productList: [],
    store:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uuid: options.uuid,
      hideModal: true, //模态框的状态  true-隐藏  false-显示
    })
    console.log(this.data.uuid)
    let params = {
      isDiscount: false,
      storeUuid: options.uuid
    }
    postRequest(this, api.getStoreAndProduct, params, (data) => {
        console.log(data)
        this.setData({
          productList:data.productList,
          store:data.store
        })
    })
  },
  bigGift: function () {
    this.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快 
      timingFunction: 'ease', //动画的效果 默认值是linear 
    })
    this.animation = animation
    var that = this;
    setTimeout(function() {
      that.fadeIn(); //调用显示动画 
    }, 200)

  },
  btnGet: function (options) {
    let product = options.currentTarget.dataset.product
    navigateTo(`productDetail?name=${product.name}&productDetailUuid=${product.productDetailUuid}&storeUuid=${this.data.store.storeUuid}
    &storeName=${this.data.store.storeName}&storeLocation=${this.data.store.businessAddressGpsLoction}`)
  },
  // 隐藏遮罩层 
  hideModal: function() {
    var animation = wx.createAnimation({
      duration: 800, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快 
      timingFunction: 'ease', //动画的效果 默认值是linear 
    })
    this.animation = animation
    var that = this;
    this.fadeDown(); //调用隐藏动画 
    setTimeout(function() {
      that.setData({
        hideModal: true
      })
    }, 720) //先执行下滑动画，再隐藏模块 
  },
  //动画集 
  fadeIn: function() {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性 
    })
  },
  fadeDown: function() {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
 
})