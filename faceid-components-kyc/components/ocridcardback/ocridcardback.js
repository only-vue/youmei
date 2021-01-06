"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var _request=require("../_utils/request"),request=_interopRequireWildcard(_request),_const=require("../_utils/const");Component({properties:{token:{type:String,value:null},editable:{type:Boolean,value:!0},validDateEditable:{type:Boolean,value:!0},issuedByEditable:{type:Boolean,value:!0}},data:{valid_date:"",issued_by:"",idcardback_image:"",edit:!1,disabled:!1},ready:function(){var e=wx.getStorageSync("valid_date"),t=wx.getStorageSync("issued_by"),a=(0,_const.validator)("valid_date",e)&&(0,_const.validator)("issued_by",t);this.letter_count_in_line=Math.floor(156.875/14),this.setData({disabled:!a,valid_date:e,issued_by:t,idcardback_image:wx.getStorageSync("image_ref_ocridcardback")?wx.getStorageSync("image_ref_ocridcardback"):"../../images/ocridcard/front.png",idcard_back_retry_time:wx.getStorageSync("idcard_back_retry_time"),issued_by_is_single_line:t.length<=this.letter_count_in_line}),this.base=this.selectComponent("#base")},methods:{onNexStep:function(){var e=this;request.ocrConfirm({data:{side:1,biz_token:this.data.token,issued_by:this.data.issued_by,valid_date:this.data.valid_date}}).then(function(){e.triggerEvent("nextstep",{nextStep:_const.STEP_TO["liveness-video"]})}).catch(function(t){["FINISHED","PROCESS_ERROR"].indexOf(t.result_code)>-1?e.base.callExitLite(t.result_code):e.base.showModal(t.result_code)})},onTakePhotoBack:function(e){var t=this,a=this;request.getOCRVerifyResult(Object.assign({},e.detail,{data:{side:1,biz_token:a.data.token}}),a.base).then(function(e){var i=e.valid_date_start+"-"+e.valid_date_end,d=(0,_const.validator)("valid_date",i)&&(0,_const.validator)("issued_by",e.issued_by);a.setData({disabled:!d,issued_by:e.issued_by,valid_date:i,idcardback_image:"data:image/jpeg;base64,"+e.idcard_cropped_back,issued_by_is_single_line:e.issued_by.length<=t.letter_count_in_line,idcard_back_retry_time:e.idcard_back_retry_time})}).catch(function(e){["FINISHED","PROCESS_ERROR"].indexOf(e.result_code)>-1?a.base.callExitLite(e.result_code):e&&e.data.idcard_back_retry_time<=0?a.base.callExitLite():a.triggerEvent("nextstep",{nextStep:_const.STEP_TO["ocr-landing"],side:"back",error_code:e.result_code})})},onTakePhoto:function(e){this.base.onTakePhoto(e)},enableEdit:function(e){var t=e.currentTarget.dataset.field;this.setData(_defineProperty({},"edit_"+t,!0))},bindinput:function(e){var t,a=e.currentTarget.dataset.field,i=e.detail.value,d=(0,_const.validator)(a,i);d="issued_by"===a?d&&(0,_const.validator)("valid_date",this.data.valid_date):d&&(0,_const.validator)("issued_by",this.data.issued_by),this.setData((t={},_defineProperty(t,""+a,i),_defineProperty(t,"disabled",!d),_defineProperty(t,a+"_is_single_line",i.length<=this.letter_count_in_line),t))},onBlur:function(e){var t=e.currentTarget.dataset.field;this.setData(_defineProperty({},"edit_"+t,!1))}}});