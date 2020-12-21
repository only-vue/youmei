import {
  showLoad,
  hideLoad,
  showToast,
  showModal,
  getSession,
  setSession,
  reLaunch
} from './util.js'
import {
  api
} from '../service/index.js'
import {
  base
} from '../public/config.js'
const app = getApp()

/**
 * get请求
 */
export function getRequest(that, api, data, callback) {
  showLoad();
  wx.request({
    url: base + api + data,
    method: 'GET',
    header: {
      'token': getSession('token') ? getSession('token') : '',
      'Authorization':getSession('token') ? getSession('token'):'',
      'content-type': 'application/json'
    },
    success: (res) => {
      if (callRequest(res.data) == '10000') {
        if (callback) {
          callback(res.data.data);
        }
      }
    },
    fail: (res) => {
      callError();
    },
    complete: () => {
       hideLoad();
    }
  })

}

/**
 * post请求
 */
export function postRequest(that, api, data, callback, completeBack) {
  showLoad();
  wx.request({
    url: base + api,
    data: data,
    method: 'POST',
    header: {
      'token': getSession('token') ? getSession('token'):'',
      'Authorization':getSession('token') ? getSession('token'):'',
      'content-type': 'application/json'
    },
    success: (res) => {
      if (callRequest(res.data) == '10000') {
        if (callback) {
          callback(res.data.data);
        }
      }
    },
    fail: (res) => {
      callError();
    },
    complete: () => {
      if (completeBack) {
        completeBack()
      }
       hideLoad();
    }
  })

}

/**
 * delete请求
 */
export function deleteRequest(that, api, data, callback) {
  showLoad();
  wx.request({
    url: base + api,
    data: data,
    method: 'DELETE',
    header: {
      'token': getSession('token'),
      'Authorization':getSession('token') ? getSession('token'):'',
      'content-type': 'application/json'
    },
    success: (res) => {
      if (callRequest(res.data) == '10000') {
        if (callback) {
          callback(res.data.data);
        }
      }
    },
    fail: (res) => {
      callError();
    },
    complete: () => {
       hideLoad();
    }
  })

}

/**
 * 统一处理网络提示
 * 
 */
export function callError(){
  setTimeout(()=>{
    showToast('网络加载失败，请稍候再试');
  },1000);
}


/**
 * 统一处理回调事件
 * 
 */

export function callRequest(val) {
  switch (val.code) {
    case '10000':
      return '10000';
      break;
    case 'S0018':
      showModal('提示', '登录已过期，请重新登录', '取消', '确定', true,(val)=>{
        reLaunch('/pages/user/login');
      })
      break;
    default:
      setTimeout(() => {
        showToast(val.msg);
      }, 1000);
      break;
  }
}