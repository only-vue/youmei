
import { showToast } from './util.js'

/**
 * 为空校验
 * @value 传值
 * @msg 提示说明
 * @returns {*}
 */
export function checkNull(value,msg) {
  if (value == "" || value.length == 0) {
    showToast(msg);
    return 0;
  }
  return value;
}

/**
 * 验证字数长度校验
 * 不限制类型
 * @min 最小值
 * @max 最大值
 * @msg 提示说明
 * @returns {*}
 */
export function checkLength(value, min, max, msg) {
  if (value.length >= min && value.length <= max) {
    return value;
  }
  showToast(msg);
  return 0;
}

/**
 * 验证字数长度校验
 * 限制类型
 * @max 最大值
 * @msg 提示说明
 * @returns {*}
 */
export function checkTypeLength(value, max, msg) {
  var reg = new RegExp('^[0-9A-Za-z]{0,' + max + '}$');
  if (value == "") {
    showToast("输入不能为空");
    return 0;
  }
  if (!reg.test(value)) {
    showToast(msg);
    return 0;
  }
  return value;
}

/**
 * 邮箱校验
 * @value 值
 */
export function checkEmail(value) {
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (value == "") {
    showToast("请输入邮箱");
    return 0;
  }
  if (!reg.test(value)) {
    showToast("请输入正确邮箱");
    return 0;
  } 
  return value;
}

/**
 * 身份证号校验
 * @value 值
 */
export function checkIDCard(value) {
  // 判断如果传入的不是一个字符串，则转换成字符串
  value = typeof value === 'string' ? value : String(value);
  //正则表达式验证号码的结构
  let regx = /^[\d]{17}[0-9|X|x]{1}$/;
  if (regx.test(value)) {
    // 验证前面17位数字，首先定义前面17位系数
    let sevenTeenIndex = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 截取参数前17位
    let front_seventeen = value.slice(0, 17);
    // 截取第18位
    let eighteen = value.slice(17, 18);
    // 这里如果是X要转换成小写，如果是数字在这里是字符串类型,则转换成数字类型，好做判断
    eighteen = isNaN(parseInt(eighteen)) ? eighteen.toLowerCase() : parseInt(eighteen);
    // 定义一个变量计算系数乘积之和余数
    let remainder = 0;
    //利用循环计算前17位数与系数乘积并添加到一个数组中
    // charAt()类似数组的访问下标一样，访问单个字符串的元素,返回的是一个字符串因此要转换成数字
    for (let i = 0; i < 17; i++) {
      remainder = (remainder += parseInt(front_seventeen.charAt(i)) * sevenTeenIndex[i]) % 11;
    }
    //余数对应数字数组
    let remainderKeyArr = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    // 取得余数对应的值
    let remainderKey = remainderKeyArr[remainder] === 'X' ? remainderKeyArr[remainder].toLowerCase() : remainderKeyArr[remainder];
    // 如果最后一位数字对应上了余数所对应的值，则验证合格，否则不合格,
    // 由于不确定最后一个数字是否是大小写的X，所以还是都转换成小写进行判断
    if (eighteen === remainderKey) {
      return value;
    } else {
      showToast("请输入正确的身份证号");
      return 0;
    }
  } else {
    showToast("请输入正确的身份证号");
    return 0;
  }
}



/**
 * 手机号码校验
 * @value
 * @returns {*}
 */
export function checkPhone(value,message) {
  if (value == "") {
    showToast("请输入正确的手机号");
    return 0;
  }
  var patterns = /^1[3,4,5,6,7,8,9]\d{9}$/;
  if (!patterns.test(value)) {
    showToast(message);
    return 0;
  }
  return value;

}



/**
 * 4位验证码校验
 * @value
 * @returns {*}
 */
export function checkCode(value) {
  var reg = /^[0-9A-Za-z]{4}$/;
  if (value == "") {
    showToast("请输入验证码");
    return 0;
  }
  if (!reg.test(value)) {
    showToast("请输入正确验证码");
    return 0;
  } else {
    return value;
  }
}

/**
 * 数字和英文限制
 * @value
 * @returns {*}
 */
export function checkFormat(value,msg) {
  var reg = /^[0-9A-Za-z]$/;
  if (!reg.test(value)) {
    showToast(msg);
    return 0;
  } 
  return value;
}
