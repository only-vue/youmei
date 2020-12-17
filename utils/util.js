/**
 * 时间戳转化时间
 */
export const formatTime = (date, isInfo) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (isInfo) {
    return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute].map(formatNumber).join(':')
  } else {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }

}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')
}


/**
 * 拨打电话
 */
export function bindPhone(val) {
  wx.makePhoneCall({
    phoneNumber: val //仅为示例，并非真实的电话号码
  })
}

/**
 * 分享
 */
export function bindShare(title, path, imageUrl, callBack, that) {
  return {
    title: title,
    path: path,
    imageUrl: imageUrl == undefined ? '' : imageUrl,
    success: (res) => {
      if (callBack) {
        callBack();
      }
    },
    fail: (res) => {
      console.log("转发失败", res);
    }
  }
}

/**
 * 弹出框
 */
export function showModal(name, value, cancelText, confirmText, hasCancel, callback) {
  if (!name) {
    name = '提示'
  }
  if (!cancelText) {
    cancelText = "取消"
  }
  if (!confirmText) {
    confirmText = "确定"
  }
  wx.showModal({
    title: name,
    content: value,
    cancelText: cancelText,
    confirmText: confirmText,
    showCancel: hasCancel,
    success: function(res) {
      if (res.confirm) {
        if (callback) {
          callback(true);
        }
      }else{
        if (callback) {
          callback(false);
        }
      }
      
    }
  })
}

/**
 * 相册
 * 
 */
export function showPreviewImage(current, list) {
  if (current) {
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  } else {
    showToast('当前暂无图片，无法打开相册！')
  }

}

/**
 * 获取ip
 */

export function getIp(that) {
  wx.request({
    url: 'http://ip-api.com/json',
    success: (e) => {
      that.setData({
        ip: e.data.query
      })
      wx.setStorageSync('ip', e.data.query)
    }
  })
}

/**
 * 获取金额处理
 * value 金额值
 * num 保留几位小数
 */

export function moneyFixed(value, num = 2) {
  if (value) {
    return parseFloat(value).toFixed(2);
  }else{
    return '0.00';
  }
 
}


/**
 * 存储缓存数据
 * key 
 * val 存储的值
 */
export function setSession(key, val) {
  wx.setStorageSync(key, val);
}


/**
 * 得到缓存数据
 * val 获取缓存数据key
 */

export function getSession(val) {
  let str = wx.getStorageSync(val);
  if (str) {
    try {
      var obj = JSON.parse(str);
      return obj;
    } catch (e) {
      return str;
    }
  } else {
    return null;
  }
}

/**
 * 删除缓存数据
 * val 删除缓存数据key
 */
export function removeSession(val) {
  wx.removeStorageSync(val);
}



/**
 * 扫一扫
 */
export function scanCode() {
  wx.scanCode({
    success: (res) => {
      wx.reLaunch({
        url: '/' + res.path
      })

    }
  })
}



/**
 * 网络请求, 实现加载
 */

export function showLoad(value) {
  wx.showNavigationBarLoading();
  wx.showLoading({
    title: value ? value : '加载中...',
    mask: true
  })
}
/**
 * 网络请求, 隐藏加载
 */

export function hideLoad() {
  wx.hideNavigationBarLoading();
  wx.hideLoading();
}

/**
 * 错误信息提示
 */
export function showToast(value,callback) {
  wx.showToast({
    title: value ? value : '请求失败',
    icon: 'none',
    duration: 2000,
    success:function(){
      if(callback){
        callback();
      }
    }
  })
}

/**
 * 跳转
 * 重新定向，左上角有返回
 */
export function navigateTo(value) {
  wx.navigateTo({
    url: value
  })
}


/**
 * 跳转
 * 重新定向，无返回
 */
export function redirectTo(value) {
  wx.redirectTo({
    url: value
  })
}

/**
 * 跳转
 * 跳转导航切换
 */
export function reLaunch(value) {
  wx.reLaunch({
    url: value
  })
}

/**
 * 列表
 * 清除后端返回null数据
 * data 为列表返回数据
 * arry 为需要处理的金额数据，处理为.00格式
 */
export function clearNull(data,arry) {
  data.forEach(item=>{
    item.name = item.name ? item.name:'';
    if (arry){
      for (let key in arry){
        item[arry[key]] = moneyFixed(item[arry[key]]);
      }
    }
  })
  return data;
}
/**
 * 审核状态
 * data 返回数据
 * that 执行当前界面
 */
export function changeDataValue(data, that) {
  that.data.formData[0].list.forEach(item  =>  {         
    const  val  =  data[item.key]            
    if  (val)  {                
      item.value  =  val            
    }
    if (getSession('role') === 'merchant' && item.role){
      item.hiddren = true;
    }
    if (getSession('role') !== 'merchant' && item.merchant) {
      item.hiddren = true;
    }            
    return  item;        
  })
}

/**
 * 逾期状态
 * value 状态值
 */
export function getOverdueState(value) {
  switch (value) {
    case 'doing':
      return '逾期中';
      break;
    case 'end':
      return '结束逾期';
      break;
    case 'no':
      return '未逾期';
      break;
    default:
      return '';
      break;
  }
}

/**
 * 还款状态
 * value 状态值
 */
export function getRepayState(value) {
  switch (value) {
    case 'pay_state_part':
      return '部分还款';
      break;
    case 'pay_state_nopay':
      return '未还';
      break;
    case 'pay_state_settle':
      return '已结清';
      break;
    case 'contract_valid':
      return '已失效';
      break;
    default:
      return '';
      break;
  }
}

/**
 * 放款状态
 * value 状态值
 */
export function getLoanState(value) {
  switch (value) {
    case 'loan_state_pending':
      return '待放款';
      break;
    case 'loandown_first':
      return '已放款(部分)';
      break;
    case 'loan_state_pass':
      return '已放款(全部)';
      break;
    case 'contract_valid':
      return '已失效';
      break;
    default:
      return '';
      break;
  }
}

/** 
 * 审核状态  
 * audit_state 状态值
 */
export function getAuditValue(audit_state) {
  switch (audit_state) {
    case 'audit_state_unknown':
      return '审核失败';
      break;
    case 'audit_state_pending':
      return '待审核';
      break;
    case 'audit_state_pass':
      return '审核通过';
      break;
    case 'audit_state_fail':
      return '审核失败';
      break;
    default:
      return '';
      break;
  }
}


/**
 * 审核状态
 * audit_state 状态值
 */
export function getAuditState(audit_state) {
  switch (audit_state) {
    case 'imperfect':
      return '待完善';
      break;
    case 'audit_state_unknown':
      return '审核失败';
      break;
    case 'pending_review':
      return '待审核';
      break;
    case 'pass':
      return '审核通过';
      break;
    case 'fail':
      return '审核拒绝';
      break;
    default:
      return '';
      break;
  }
}
/**
 * sha1加密
 */
export function sha1(s) {
  var s = s; //数据内容+当前时间戳
  var data = new Uint8Array(encodeUTF8(s))
  var i, j, t;
  var l = ((data.length + 8) >>> 6 << 4) + 16,
    s = new Uint8Array(l << 2);
  s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
  for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
  s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
  s[l - 1] = data.length << 3;
  var w = [],
    f = [
      function() {
        return m[1] & m[2] | ~m[1] & m[3];
      },
      function() {
        return m[1] ^ m[2] ^ m[3];
      },
      function() {
        return m[1] & m[2] | m[1] & m[3] | m[2] & m[3];
      },
      function() {
        return m[1] ^ m[2] ^ m[3];
      }
    ],
    rol = function(n, c) {
      return n << c | n >>> (32 - c);
    },
    k = [1518500249, 1859775393, -1894007588, -899497514],
    m = [1732584193, -271733879, null, null, -1009589776];
  m[2] = ~m[0], m[3] = ~m[1];
  for (i = 0; i < s.length; i += 16) {
    var o = m.slice(0);
    for (j = 0; j < 80; j++)
      w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
      t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
      m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
    for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0;
  };
  t = new DataView(new Uint32Array(m).buffer);
  for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);

  var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function(e) {
    return (e < 16 ? "0" : "") + e.toString(16);
  }).join("");

  return hex;
};

//把base64转换成图片
export function getBase64ImageUrl(data) {
  // 获取到base64Data
  var base64Data = data;
  /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
  base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
  /// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
  const base64ImgUrl = "data:image/png;base64," + base64Data;
  /// 刷新数据
  // console.log(base64ImgUrl)
  return base64ImgUrl;
}

//解析url中参数
export function getQueryVariable(query,variable){
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          if(pair[0] == variable){return pair[1];}
  }
  return(false);
}