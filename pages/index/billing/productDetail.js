// pages/billing/productDetail.js
import { navigateTo,showToast } from '../../../utils/util.js'
import { postRequest} from '../../../utils/http.js'
import {api} from '../../../service/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    storeUuid:'',
    storeName:'',
    storeLocation:'',
    productDetailUuid:'',
    serviceAmount:'',//服务金额
    projectName:'',//项目名称
    listService:[],//服务列表
    listServiceData:[],
    listSA:[],//线下业务员

    showListService:false,
    pickerValue:'',
    prePrincipal:'',//每次金额
    preHandlingFee:''//每次服务费
  },
  onMyEvent: function(e){
    e.detail // 自定义组件触发事件时提供的detail对象
    console.log("自定义组件触发事件时提供的detail对象")
  },
  nexttap:function(){
    navigateTo('billing')
  },
  projectNameChange:function(event){
    this.setData({
      projectName:event.detail.value
    })
  },
  serviceAmountChange:function(event){
    this.setData({
      serviceAmount:event.detail.value,
      prePrincipal:'',
      preHandlingFee:'',
      pickerValue:''
    })
  }, 
  servicePickerChange:function(event){
    let {value,position} = event.detail
    let {prePrincipal,preHandlingFee} = this.data.listServiceData[position]
    this.setData({
      pickerValue:value,
      showListService:false,
      prePrincipal:prePrincipal,
      preHandlingFee:preHandlingFee
    })
  },
  pickerHide:function(){
    this.setData({
      showListService:false
    })
  },
  serviceClick:function(){
    if(!this.data.serviceAmount){
      showToast("请输入商品/服务金额");
      return
    }
    let params = {
      isDiscount: false,
      loanAmount: this.data.serviceAmount,
      productDetailUuid: this.data.productDetailUuid,
      storeUuid: this.data.storeUuid
    }
    postRequest(this, api.loanCalculator, params, (data) => {
      let list = data.map(item => item.prePeriod)
        this.setData({
          listService:list,
          listServiceData:data,
          showListService:true
        })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var {name,storeUuid,productDetailUuid,storeName,storeLocation} = options
      this.setData({
        name:name,
        storeUuid:storeUuid,
        productDetailUuid:productDetailUuid,
        storeName:storeName,
        storeLocation:storeLocation,
      })
    
     postRequest(this, api.querySaList, {}, (data) => {
        console.log(data)
        this.setData({
          listSA:data
        })
    })
  },

})