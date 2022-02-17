/**
 * @Description: Simple jsbridge
 * @Author: shenlanlan
 * @Date: 2019-08-12 15:37:11
 * @LastEditTime: 2019-08-12 16:44:00
 * @LastEditors:  2019-08-12 16:44:00
 */

export class EasyJSBridge {

  ISANDROID = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;

  ISIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  bridgeNameList = {}; // 配置映射的方法名字:

  JsCallAppFunction(functionName, data) {
    if (this.ISANDROID) {
      if (data) {
        window['android'] && window['android'][functionName](JSON.stringify(data));
      } else {
        window['android'] && window['android'][functionName]();
      }
    }
    if (this.ISIOS) {
      window.webkit.messageHandlers[functionName].postMessage(data);
    }
  }

  appUseInFn(functionName, callback) {
    window[functionName] = function (val) {
      callback(val);
    };
  }

  SJSBridge(setJsbridgeName, getJsbridgeName, jsbridgeParams, callback) {
    if (getJsbridgeName) {
      this.JsCallAppFunction(getJsbridgeName, jsbridgeParams);
    }

    if (setJsbridgeName) {
      this.appUseInFn(setJsbridgeName, (ret) => {
        let params = ret;
        if (callback) {
          callback(params)
        }
      });
    }
  }

  callfn(bridgeName, params, callbackFunction) {
    params = params || '';
    callbackFunction = callbackFunction || null;
    const setJsbridgeName = this.bridgeNameList[bridgeName] && this.bridgeNameList[bridgeName].AppCallJs || null;
    const getJsbridgeName = this.bridgeNameList[bridgeName] && this.bridgeNameList[bridgeName].JsCallApp || null;

    if (typeof params === 'function') {
      this.SJSBridge(setJsbridgeName, getJsbridgeName, "", params);
      return;
    }
    this.SJSBridge(setJsbridgeName, getJsbridgeName, params, callbackFunction);
  }
}

export default new EasyJSBridge()
