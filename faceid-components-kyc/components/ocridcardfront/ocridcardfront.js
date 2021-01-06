"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var _request=require("../_utils/request"),request=_interopRequireWildcard(_request),_const=require("../_utils/const");Component({properties:{token:{type:String,value:null},verifyType:{type:Number,value:null},nameEditable:{type:Boolean,value:!0},numberEditable:{type:Boolean,value:!0}},data:{name:"",idcard_number:"",idcardfront_image:"",edit:!1,disabled:!1},ready:function(){var e=wx.getStorageSync("name"),t=wx.getStorageSync("idcard_number"),r=(0,_const.validator)("name",e)&&(0,_const.validator)("idcard_number",t);this.letter_count_in_line=Math.floor(156.875/14),this.setData({disabled:!r,name:e,idcard_number:t,idcardfront_image:wx.getStorageSync("image_ref_ocridcardfront")?wx.getStorageSync("image_ref_ocridcardfront"):"../../images/ocridcard/front.png",idcard_front_retry_time:wx.getStorageSync("idcard_front_retry_time"),name_is_single_line:e.length<=this.letter_count_in_line}),this.base=this.selectComponent("#base")},methods:{onNext:function(){var e=this;request.ocrConfirm({data:{side:0,biz_token:this.data.token,name:this.data.name,idcard_number:this.data.idcard_number}}).then(function(){var t=void 0;t=e.data.verifyType===_const.VERIFY_TYPES.ocridcard?{nextStep:_const.STEP_TO["liveness-video"]}:{nextStep:_const.STEP_TO["ocr-landing"],side:"back"},e.triggerEvent("nextstep",t)}).catch(function(t){["FINISHED","PROCESS_ERROR"].indexOf(t.result_code)>-1?e.base.callExitLite(t.result_code):e.base.showModal(t.result_code)})},onTakePhotoFront:function(e){var t=this,r=this;request.getOCRVerifyResult(Object.assign({},e.detail,{data:{side:0,biz_token:r.data.token}}),r.base).then(function(e){var a=(0,_const.validator)("name",e.name)&&(0,_const.validator)("idcard_number",e.idcard_number);r.setData({disabled:!a,name_is_single_line:e.name.length<=t.letter_count_in_line,name:e.name,idcard_number:e.idcard_number,idcardfront_image:"data:image/jpeg;base64,"+e.idcard_cropped_front,idcard_front_retry_time:e.idcard_front_retry_time})}).catch(function(e){["FINISHED","PROCESS_ERROR"].indexOf(e.result_code)>-1?r.base.callExitLite(e.result_code):e&&e.data.idcard_front_retry_time<=0?r.base.callExitLite():r.triggerEvent("nextstep",{nextStep:_const.STEP_TO["ocr-landing"],side:"front",error_code:e.result_code})})},onTakePhoto:function(){this.base.onTakePhoto()},enableEdit:function(e){var t=e.currentTarget.dataset.field;this.setData(_defineProperty({},"edit_"+t,!0))},bindinput:function(e){var t,r=e.currentTarget.dataset.field,a=e.detail.value,n=(0,_const.validator)(r,a);n="name"===r?n&&(0,_const.validator)("idcard_number",this.data.idcard_number):n&&(0,_const.validator)("name",this.data.name),this.setData((t={},_defineProperty(t,""+r,a),_defineProperty(t,"disabled",!n),_defineProperty(t,r+"_is_single_line",a.length<=this.letter_count_in_line),t))},onBlur:function(e){var t=e.currentTarget.dataset.field;this.setData(_defineProperty({},"edit_"+t,!1))}}});