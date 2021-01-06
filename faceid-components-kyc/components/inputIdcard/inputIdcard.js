"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var _request=require("../_utils/request"),request=_interopRequireWildcard(_request),_const=require("../_utils/const");Component({properties:{token:{type:String,value:null}},data:{disabled:!0,activeField:"",clear_idcard_name:!1,clear_idcard_number:!1,idcard_name:"",idcard_number:""},methods:{onFieldFocus:function(e){var t=e.currentTarget.dataset.field;this.setData({activeField:t})},onFieldBlur:function(){this.setData({activeField:""})},onInputing:function(e){var t,a=e.currentTarget.dataset.field,r="idcard_name"===a?!(0,_const.validator)("name",e.detail.value):!(0,_const.validator)("idcard_number",e.detail.value);r||(r="idcard_name"===a?!(0,_const.validator)("idcard_number",this.data.idcard_number):!(0,_const.validator)("name",this.data.idcard_name)),this.setData((t={},_defineProperty(t,a,e.detail.value),_defineProperty(t,"clear_"+a,e.detail.value.length>0),_defineProperty(t,"disabled",r),t))},clearField:function(e){var t,a=e.currentTarget.dataset.field;this.setData((t={},_defineProperty(t,a,""),_defineProperty(t,"clear_"+a,!1),t))},onStart:function(){var e=this;request.idcardConfirm({data:{biz_token:this.data.token,idcard_name:this.data.idcard_name,idcard_number:this.data.idcard_number}}).then(function(t){e.triggerEvent("nextstep",{nextStep:_const.STEP_TO["liveness-video"]})}).catch(function(){})},_validate:function(e,t){return"idcard_number"===e?18===t.length&&/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(t):"idcard_name"===e&&t.length>1}}});