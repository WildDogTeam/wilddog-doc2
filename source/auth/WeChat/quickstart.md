
title: 快速入门
---

本篇文档介绍 Wilddog Sync 微信小程序客户端的使用。


## 1.下载地址
https://github.com/WildDogTeam/wilddog-weapp


## 2.前期准备

1.在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。

2.在 [微信公众开放平台管理中心](http://mp.weixin.qq.com/)   设置—开发设置—服务器配置，配置域名白名单。为了简化配置，你需要增加以下 2 个域名到白名单：

- socket 合法域名： wss://s-dalwx-nss-1.wilddogio.com
- request 合法域名：https://auth.wilddog.com


<blockquote class="warning">
  <p><strong>注意：</strong></p>
  微信给开发者设置了每月只能修改 3 次的限制，所以修改时一定要慎重。
</blockquote>


3.在 [微信公众开放平台管理中心](http://mp.weixin.qq.com/)，获取应用的 **AppID** 和 **AppSecret**。
 
4.在控制面板 身份认证—登录方式 中打开微信小程序登录授权开关，配置微信小程序 **AppID** 和 **AppSecret**。



## 3.安装 SDK 到微信小程序

1.将 Wilddog-weapp-all.js 放到微信小程序的项目中

2.使用 commonjs 引入

```
var wilddog = require('wilddog-weapp-all')
```

3.初始化


```
var config = {
    syncURL: 'https://<WD-APPID>.wilddogio.com',
    authDomain: '<WD-APPID.wilddog.com>'
}
wilddog.initializeApp(config)
```

## 4.API

微信小程序平台与一般的开放平台不同之一是它有默认的用户，所以我们提供了一个可以使用一个api进行auth的方法：

#### auth.signInWeapp(opt_callback)

* opt_callback: function(err,user) 可选回调函数，认证成功后被调用，如果认证过程一切正常`err`为`null`,user是一个包含用户`id`和`provider`等信息的对象。否则 `err` 是一个Error对象，user为null

return Promise 对象

```js
var config = {
    syncURL: 'https://<WD-APPID>.wilddogio.com',
    authDomain: '<WD-APPID.wilddog.com>'
}
wilddog.initializeApp(config)
wilddog.auth().signInWeapp(function(err,user){
    // do your logic
})

//或者使用Promise

wilddog.auth().signInWeapp().then(function(user){

}).catch(function(err){

})

```

## 5.更多使用
更多使用方式，请参考 [完整指南](/guide/auth/core/concept.html) 和  [API 文档](/api/auth/web/User.html)。




　
