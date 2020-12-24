// pages/billing/productDetail.js
import { navigateTo, showToast } from '../../../utils/util.js'
import { postRequest } from '../../../utils/http.js'
import { api } from '../../../service/index.js'
import {  checkNull} from '../../../utils/rule.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    storeUuid: '',
    storeName: '',
    storeLocation: '',
    productDetailUuid: '',
    productDetailConfigUuid:'',//选择服务次数后的uuid
    serviceAmount: '',//服务金额
    projectName: '',//项目名称
    listService: [],//服务列表
    listSA: [],//线下业务员
    saUuid: '',
    showListService: false,
    pickerValue: '',
    prePrincipal: '',//每次金额
    preHandlingFee: ''//每次服务费
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var { name, storeUuid, productDetailUuid, storeName, storeLocation } = options
    this.setData({
      name: name,
      storeUuid: storeUuid,
      productDetailUuid: productDetailUuid,
      storeName: storeName,
      storeLocation: storeLocation,
    })

    postRequest(this, api.querySaList, {}, (data) => {
      // console.log(data)
      this.setData({
        listSA: data
      })
    })
  },

  onSaChange: function (e) {
   console.log(  )
   let index = e.detail.value
   this.setData({
     saUuid:this.data.listSA[index].saUuid
   })
   
  },
  nexttap: function () {
    if (!checkNull(this.data.projectName, '请输入项目名称')) {
      return false;
    }
    if (!checkNull(this.data.serviceAmount, '请输入商品\服务金额')) {
      return false;
    }
    if (!checkNull(this.data.productDetailConfigUuid, '请选择服务次数')) {
      return false;
    }
    if (!checkNull(this.data.saUuid, '请选择线下业务员')) {
      return false;
    }
    
    let params = {
      "isDiscount": false,
      "projectName": this.data.projectName,
      "loanAmount": this.data.serviceAmount,
      "productDetailUuid": this.data.productDetailUuid,
      "storeUuid": this.data.storeUuid,
      "productDetailConfigUuid": this.data.productDetailConfigUuid,
      "selectRepayDiscount": "select_repay_discount_yes",//select_repay_discount_no
      "saUuid": this.data.saUuid
    }
    postRequest(this, api.createContract, params, (data) => {
      // console.log(data)
      navigateTo(`billing?productDetailUuid=${this.data.productDetailUuid}&storeUuid=${this.data.storeUuid}&productDetailConfigUuid=${this.data.productDetailConfigUuid}&projectName=${this.data.projectName}&loanAmount=${this.data.serviceAmount}`)
    })
  },
  projectNameChange: function (event) {
    this.setData({
      projectName: event.detail.value
    })
  },
  serviceAmountChange: function (event) {
    this.setData({
      serviceAmount: event.detail.value,
      prePrincipal: '',
      preHandlingFee: '',
      pickerValue: ''
    })
  },
  servicePickerChange: function (event) {
    let { value, position } = event.detail
    let {prePeriod, prePrincipal, preHandlingFee,productDetailConfigUuid } = value
    this.setData({
      pickerValue: prePeriod,
      showListService: false,
      productDetailConfigUuid:productDetailConfigUuid,
      prePrincipal: prePrincipal,
      preHandlingFee: preHandlingFee
    })
  },
  pickerHide: function () {
    this.setData({
      showListService: false
    })
  },
  serviceClick: function () {
    if (!this.data.serviceAmount) {
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
      this.setData({
        listService: data,
        showListService: true
      })
    })
  },
  
})