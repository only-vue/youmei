// pages/billing/billing.js
import { postRequest} from '../../../utils/http.js'
import { navigateTo } from '../../../utils/util.js'
import {api} from '../../../service/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    step:2,
    //手持身份证图片
    handCardImg:"../../../assets/images/src_pages_home_productapply_handidcardimage_photos.png",
  },
  nexttap:function(){
    this.setData({
      step:this.data.step+1
    })
  },
  lasttap:function(){
    this.setData({
      step:this.data.step-1
    })
  },
  startFace:function(){
    this.getToken();
  },
  //获取 face id token
  getToken:function(){
    var sign = this.getSign();
    console.log(sign)
    wx.request({
      url: 'https://openapi.faceid.com/lite_ocr/v1/get_biz_token', 
      method: 'POST',
      data: {       
        sign: sign,
        sign_version: 'hmac_sha1',
        capture_image: 0,//0:双面，1:人像面
        return_url: 'https://api.megvii.com/faceid/lite/do',
        notify_url: 'https://api.megvii.com/faceid/lite/do',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {                       //返回结果
        // navigateTo(`../../verify/verify?token=${token}`)
        console.log(res.data)
      },
      fail(err){
        console.log(err)
      },
      complete: function(res) {
         console.log('complete后的res数据：')
       }
    })
  },
  //生成 faceId sign
  getSign:function(){

    let api_key= "5P4ZC5tDnRsk6G4PU0yYJtQGLHZT1ohq";
    let api_Secret= "g4hP0P77CBcbPh25M3pbpRSvRhMsPLTf";
    let current_time= parseInt((new Date().getTime())/1000);
    let expire_time= current_time+100;
    let random= Math.random().toString(36).substr(2, 10);
    // var api_key= "ICVvC_xUs6177WEtyUNwIH8J6NfGu50t";
    // var api_Secret= "UjYGdN9CBZKsDBLB5-5v3DykPXY6dw3q";
    // var current_time= 1530762118;
    // var expire_time= current_time+100;
    // var random= "0799687066";
    // var raw =`a=${api_key}&b=${expire_time}&c=${current_time}&d=${random}`;
     var raw = "a=5P4ZC5tDnRsk6G4PU0yYJtQGLHZT1ohq&b=1608082375&c=1608082275&d=545547482"
    var CryptoJS = require('../../../utils/hmac-sha1.js');
    var sign_temp = CryptoJS.HmacSHA1(raw,api_Secret);
    console.log(raw)
    console.log(this.stringToByte(sign_temp.toString()));
    console.log(this.stringToByte(raw));
    var base64 = require('../../../utils/base64.js');
    var sign = base64.encode(sign_temp.toString()+raw)
    // const crypto = require('crypto');
    // console.log(crypto)
    // var hmac = crypto.createHmac('sha1', api_Secret);
    // hmac.update(raw); // write in to the stream
    // var digest = hmac.digest();
    // var buffer = Buffer.from(raw);
    // var result = Buffer.concat([digest, buffer]).toString('base64')
    return sign;
  },
  handCard:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        that.setData({
          handCardImg:tempFilePaths
        })
      }
    })
  },
  stringToByte:function (str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for(var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if(c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if(c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if(c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    return bytes;


  }

  
})