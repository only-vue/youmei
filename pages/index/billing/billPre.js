// pages/index/billing/billResult.js
import { navigateTo, showToast,formatTime } from '../../../utils/util.js'
import { postRequest } from '../../../utils/http.js'
import { api } from '../../../service/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showListService:false,
    showListDate:false,
    isexpand:false,

    //测试信息
    // loanAmount: 100000,
    // productDetailUuid:'a0f7ff136b5348daa57816721795d71d',
    // storeUuid:"5565faa3039c400e98c1dea560e88df9",
    // productDetailConfigUuid:'e7d24f23ec934874a3e15f5c8a8f9661',
    // projectName:'ddsdsd'

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { storeUuid, productDetailUuid, productDetailConfigUuid, projectName, loanAmount } = options;
    //console.log(storeUuid, productDetailUuid, productDetailConfigUuid, projectName, loanAmount)
    this.setData({
      storeUuid, productDetailUuid, productDetailConfigUuid, projectName, loanAmount
    }, () => {
      this.getStoreAndProduct()
      this.loanFQItem()
    })
    let dateList=[]
    for (let i = 1; i <= 28; i++) {
        dateList.push({
          date:i
        })
    }
    this.setData({
      dateList
    })
  },
  getStoreAndProduct: function () {
    let params = {
      isDiscount: false,
      storeUuid: this.data.storeUuid
    }
    postRequest(this, api.getStoreAndProduct, params, (data) => {
      const product = data.productList.find(item => {
        return item.productDetailUuid === this.data.productDetailUuid
      })
      this.setData({
        product: product,
        store: data.store
      })
    })
  },
  loanFQItem: function () {
    let params = {
      isDiscount: false,
      loanAmount: this.data.loanAmount,
      productDetailUuid: this.data.productDetailUuid,
      storeUuid: this.data.storeUuid
    }
    postRequest(this, api.loanCalculator, params, (data) => {
      const selectedFQItem = data.find(item => {
        return item.productDetailConfigUuid === this.data.productDetailConfigUuid
    })
      this.setData({
        selectedFQItem
      })
      this.repayPlanCalculator(selectedFQItem.productDetailConfigUuid)
    })
  },
  loanCalculator: function () {
    let params = {
      isDiscount: false,
      loanAmount: this.data.loanAmount,
      productDetailUuid: this.data.productDetailUuid,
      storeUuid: this.data.storeUuid
    }
    postRequest(this, api.loanCalculator, params, (data) => {
     
      this.setData({
        loanList:data,
        showListService:true
      })
    })
  },
  serviceClick: function () {
    this.loanCalculator()
  },
  servicePickerChange:function(event){
    let { value } = event.detail
    this.setData({
      showListService: false,
      selectedFQItem:value
    })
    this.repayPlanCalculator(value.productDetailConfigUuid)
  },
  pickerHide:function(){
    this.setData({
      showListService:false
    })
  },
  dateClick: function () {
    this.setData({
      showListDate:true
    })
  },
  datePickerChange:function(event){
    let { value } = event.detail
    let date= this.getYearMonth()+"/"+ ('00'+value.date).slice(-2)
    console.log(date)
    this.setData({
      selectDate:{
        date:date,
      },
      apiDate:value.date
    },()=>{
      this.repayPlanCalculator(this.data.selectedFQItem.productDetailConfigUuid)
    })
   
  },
  expandAll:function(){
   
    let list = !this.data.isexpand?this.data.repayPlanList:this.data.repayPlanList.slice(0,3)
      this.setData({
        isexpand:!this.data.isexpand,
        repayPlan:list
      })
  },
  loanAmountChange:function(e){
    let amount = e.detail.value
    let maxQuota = parseInt(this.data.product.maxQuota)
    if(amount > maxQuota){
      amount = maxQuota
    }
    this.setData({
      loanAmount:amount,
    },()=>{
      this.repayPlanCalculator(this.data.selectedFQItem.productDetailConfigUuid)
    })
  },
  datepickerHide:function(){
    this.setData({
      showListDate:false
    })
  },
  //费率
  repayPlanCalculator: function (productDetailConfigUuid) {
    let params = {
      isDiscount:false,
      loanAmount:this.data.loanAmount,
      productDetailUuid:this.data.productDetailUuid,
      storeUuid:this.data.storeUuid,
      repaymentDate:this.data.apiDate,
      productDetailConfigUuid:productDetailConfigUuid,
    }
    postRequest(this, api.repayPlanCalculator, params, (data) => {
      data.forEach( (item) => {
       item.payDate = formatTime(new Date(parseInt(item.lastPayDate,10)))
       item.payAmount = (item.handlingFee+item.principal).toFixed(2)
      });

      this.setData({
        repayPlan:data.slice(0,3),
        repayPlanList:data
      })
    })
  },
  next:function(){
    this.submitApply()
  },
  submitApply: function () {
    let {loanAmount,productDetailUuid,apiDate} = this.data
    if(!apiDate){
      showToast('请选择首期还款时间')
      return false
    }
    let params = {
      loanAmount:loanAmount,
      repaymentDate:apiDate,
      productDetailUuid:productDetailUuid,
    }
    postRequest(this, api.submitApply, params, (data) => {
      navigateTo('productResult')
    })
  },
  //获取下月年月时间
  getYearMonth:function () {
    let myDate = new Date();
    let tYear = myDate.getFullYear();
    let tMonth = myDate.getMonth()+2;//下月
    if (tMonth == 13) {
        tMonth=1;
        tYear+=1;
    }
    let m= tMonth.toString();
    if (m.length == 1) {
        m = "0" + m;
    }
    return tYear +'/'+ m;
},
})