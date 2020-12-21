// pages/mine/bill/allBill.js
import { postRequest } from '../../../utils/http.js'
import { api } from '../../../service/index.js'
import { navigateTo,formatTime } from '../../../utils/util.js'
Page({
  data: {
     list:[]
  },
  onLoad: function (options) {
     this.getLoad();
  },
  //初始化加载
  getLoad(){
    let params={
      pageCurrent:1,
      pageSize:1000
    }
    postRequest(this, api.getBillPage, params, (data) => {
       let list = data.dataList;
        list.forEach(item=>{
            item.year= formatTime(new Date(parseInt(item.lastPayDate,10)),'y')
            item.month=formatTime(new Date(parseInt(item.lastPayDate,10)),'m');
            item.subList=[];
            list.forEach(subItem=>{
              if(item.year==formatTime(new Date(parseInt(subItem.lastPayDate,10)),'y')){
                item.subList.push({
                  month:formatTime(new Date(parseInt(subItem.lastPayDate,10)),'m'),
                  billDate:subItem.lastPayDate,
                  overdueState:subItem.overdueState,
                  principal:subItem.principal,
                  payState:subItem.principal
                });
              }
            })
        })
        //去重
        let array=list;
        for(let i=0;i<array.length;i++){
          for(let j=i+1;j<array.length;j++){
             if(array[i].year==array[j].year){
              array.splice(j,1);
               j--;
             }
          }
        }
      this.setData({
        list:array
      })
    })
  },
  //跳转账单页
  bindBill(e){
    let billDate=e.currentTarget.dataset.billdate;
    navigateTo(`/pages/mine/bill/index?billDate=${billDate}`);
  },
  //下拉复位
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  //分享
  onShareAppMessage() {
    return {
    }
  }
})