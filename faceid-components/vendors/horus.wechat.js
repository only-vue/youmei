"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Serialize(e){return"object"===(void 0===e?"undefined":_typeof(e))&&(e=JSON.stringify(e)),_base.Base64.encode(e)}function log(){var e;"object"===("undefined"==typeof console?"undefined":_typeof(console))&&console.log&&(e=console).log.apply(e,arguments)}function randAccounttId(){return"wx.anonym."+((new Date).getTime()/1e3+Math.random())}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_base=require("./base64.js"),USER_ID="__HORUS_USER_ID",Horus=function(){function e(t){var o=this;_classCallCheck(this,e),this.opt=Object.assign({url:"",project:"Empty",accountId:"",debug:!1},t),this.opt.accountId||wx.getStorage({key:USER_ID,success:function(e){o.opt.accountId=e.data},fail:function(){var e=randAccounttId();wx.setStorage({key:USER_ID,data:e,success:function(t){o.opt.accountId=e}})}})}return _createClass(e,[{key:"decorator",value:function(e,t){var o=t||{};"object"!==(void 0===o?"undefined":_typeof(o))&&(o={msg:String(t)});var n={time:(new Date).getTime(),project:this.opt.project,event_id:(new Date).getTime()+"-"+Math.random().toString().substr(2),event:e,properties:Object.assign({cookie:"",account_id:this.opt.accountId,biz_token:this.opt.biz_token,ocr_type:this.opt.ocr_type,user_id:""},{user_brand:"",user_explorer:"Wechat Applet",user_model:"",user_os:""}),custom:o};if(n.custom.mark){var r=n.custom.mark.split(":");r[0]&&(n.event_type=r[0])}return this.opt.debug&&(log("Horus reporting: ",n),log(n.custom&&n.custom.xpath)),n}},{key:"occur",value:function(e,t){this._report(e,t)}},{key:"_report",value:function(e,t){var o=this.opt.url;o.indexOf("?")<0&&(o+="?"),o+="&data="+Serialize(this.decorator(e,t)),o+="&_="+(new Date).getTime(),wx.request({url:o})}}]),e}();exports.default=Horus;