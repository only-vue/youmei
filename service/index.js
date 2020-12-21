//请求后端域名地址
export const api = {
  pwLogin: 'api/78dk/app/login/pwLogin', //密码登录
  sendValidate:'api/78dk/app/common/sms/sendValidate', //获取验证码
  smsLogin: 'api/78dk/app/login/smsLogin', //验证码登录
  retrievePw:'api/78dk/app/login/retrievePw', //忘记密码-验证提交
  newPw:'api/78dk/app/login/newPw', //忘记密码-新密码提交
  register:'api/78dk/app/login/register',//注册
  idCardInit:'api/78dk/app/common/idCardInit', //获取登录人信息
  getBankCardInfo:'api/78dk/app/process/getBankCardInfo', //获取银行卡列表
  saveBankCardInfo:'api/78dk/app/process/saveBankCardInfo', //保存银行卡信息
  getMyBill:'api/78dk/app/bill/getMyBill', //获取账单信息
  getBillPage:'api/78dk/app/bill/getBillPage', //获取账单列表
  getBillDetail:'api/78dk/app/bill/getBillDetail',//账单详情
  repayBillOnline:'api/78dk/app/bill/repayBillOnline',//调用连连支付
  loginOut: 'api/78dk/app/login/loginOut', //退出登录


  querySaList: 'api/78dk/app/process/querySaList',//线下业务员
  getStoreAndProduct: 'api/78dk/app/process/getStoreAndProduct',//获取产品列表
  loanCalculator: 'api/78dk/app/process/loanCalculatorV2',//选择服务次数
  createContract: 'api/78dk/app/process/createContract',//创建订单
  getProductDetail: 'api/78dk/app/process/getProductDetail',//订单详情
  getNewestIdCardInfo: 'api/78dk/app/process/getNewestIdCardInfo',//身份证识别保留信息
  // getNewestIdCardInfo: '/api/78dk/app/process/getNewestIdCardInfo' //
}