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
  saveIdCardInfo: '/api/78dk/app/process/saveIdCardInfo', //保存身份证识别保留信息
  queryQiNiuToken: '/api/78dk/app/common/queryQiNiuToken', //获取七牛token
  saveHoldKey: '/api/78dk/app/process/saveHoldKey', //保存手持身份证照7牛key
  saveOrcInfo: '/api/78dk/app/process/saveOrcInfo', //保存人脸识别信息
  // getBankCardInfo: '/api/78dk/app/process/getBankCardInfo', //获取银行卡列表
  choiceBankCard: '/api/78dk/app/process/choiceBankCard', //选择银行卡
  // idCardInit: '/api/78dk/app/common/idCardInit', //？？？？拿取基本信息中的手机号
  getNewestPersonInfo: '/api/78dk/app/process/getNewestPersonInfo', //获取个人信息
  viewByStagesLists: '/api/78dk/app/perCenter/viewByStagesLists', //订单列表
  loanDatail: '/api/78dk/app/perCenter/loanDatail', //订单详情
  loanData: 'api/78dk/app/perCenter/loanData', //申请资料
  renounceApplication: 'api/78dk/app/perCenter/renounceApplication', //放弃申请
  getDictionaries: 'api/78dk/app/common/getDictionaries', //选择信息
  getAllCites: 'api/78dk/app/common/getAllCites', //城市信息
  savePersonInfo: 'api/78dk/app/process/savePersonInfo', //保存基本信息
  getNewestWorkInfo: 'api/78dk/app/process/getNewestWorkInfo', //获取工作信息
  saveWorkInfo: 'api/78dk/app/process/saveWorkInfo', //保存工作信息
  getContractImages: 'api/78dk/app/process/getContractImages', //获取影像资料
  saveContractImages: 'api/78dk/app/process/saveContractImages', //保存影像资料
  repayPlanCalculator: 'api/78dk/app/process/repayPlanCalculator', //计算费用 首期还款时间
  submitApply: 'api/78dk/app/process/submitApply', //提交订单
  // getStoreAndProduct: 'api/78dk/app/process/getStoreAndProduct', //
  // getStoreAndProduct: 'api/78dk/app/process/getStoreAndProduct', //
}