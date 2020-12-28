// pages/mine/mybill/index.js
import { postRequest } from '../../../utils/http.js'
import { navigateTo, showToast, formatTime } from '../../../utils/util.js'
import { api } from '../../../service/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: undefined,
    isShowModal:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getList: function () {
    let params = {
      "pageCurrent": 1,
      "pageSize": 100,
    }
    postRequest(this, api.viewByStagesLists, params, (data) => {
      if (data.dataList) {
        data.dataList.forEach(function (item, index) {
          item.date = formatTime(new Date(parseInt(item.created, 10)), 'ymd')
        })
        this.setData({
          dataList: data.dataList
        })
      }else{
        this.setData({
          dataList: undefined
        })
      }

    })
  },
  toDetail: function (e) {
    navigateTo(e.currentTarget.dataset.url);
  },
  giveUp: function (e) {
    let data = e.currentTarget.dataset.data
    let params = {
      "loanOrderUuid": data.loanOrderUuid
    }
    postRequest(this, api.renounceApplication, params, (data) => {
      this.getList()
    })
  },
  getTakeGoodsContent:function(e){
    let selectedData = e.currentTarget.dataset.data
    let params = {
      "contractUuid": selectedData.loanOrderUuid
    }
    postRequest(this, api.getTakeGoodsContent, params, (data) => {
      this.setData({
        isShowModal:true,
        receivingAgreementInfo:data,
        selectedData:selectedData
      })
    })
  },
  onTakeGoods:function(){
    this.goodsCheck()
  },
  goodsCheck:function(){
    let params = {
      "contractUuid": this.data.selectedData.loanOrderUuid
    }
    postRequest(this, api.takeGoods, params, (data) => {
      this.getList()
    })
  }


})