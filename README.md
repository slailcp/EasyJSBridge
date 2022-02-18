# EasyJSBridge
简易版JSBridge的实现

# 用法
 ```js
import jsBridge from 'easy-js-bridge';

jsBridge.bridgeNameList = {
  // 自定义的映射名,方便后面调用
  "Location": {
    JsCallApp: "getCurrentLocation", // JS调用native的方法
    AppCallJs: "setCurrentLocation" // native调js的方法
  },
  "pushWindow": {
    JsCallApp: "pushWindow", // JS调用native的方法
  }
}

// 调用
jSBridge.callfn('pushWindow');

// 传参
jSBridge.callfn('pushWindow',  { text: '我是参数哦' });

// 回调
jSBridge.callfn('Location', (result) => {               
   console.log(result);    
 });
 
// 传参,回调
jSBridge.callfn('Location',  { callbackInterval: 5000 } ,(result) => {               
     console.log(result);    
});
 ```
 

 
