
title: 快速入门
---

本篇文档介绍 Wilddog Sync 微信小程序客户端的使用。


## 项目地址
https://github.com/WildDogTeam/wilddog-weapp


## 前期准备

1.在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html#创建一个野狗应用)。

2.在 [微信公众开放平台管理中心](http://mp.weixin.qq.com/)   设置—开发设置—服务器配置，配置域名白名单。为了简化配置，你需要增加以下 2 个域名到白名单：

- socket 合法域名： wss://sdal-wx-nss-1.wilddogio.com
- request 合法域名： https://auth.wilddog.com


<blockquote class="warning">
  <p><strong>注意：</strong></p>
  微信给开发者设置了每月只能修改 3 次的限制，所以修改时一定要慎重。
</blockquote>


3.在 [微信公众开放平台管理中心](http://mp.weixin.qq.com/)，获取应用的 **AppID** 和 **AppSecret**。
 
4.在控制面板 身份认证—登录方式 中打开微信小程序登录授权开关，配置微信小程序 **AppID** 和 **AppSecret**。



## 安装野狗 SDK 到微信小程序

1.将 Wilddog-weapp-all.js 放到微信小程序的项目中

2.使用commonjs引入
```var wilddog = require('wilddog-weapp-all')```

3.初始化

```var config = {
    syncURL: 'https://<WD-APPID>.wilddogio.com',
    authDomain: '<WD-APPID.wilddog.com>'
}
wilddog.initializeApp(config)
```


## DEMO 演示

该 Demo 是一个简单的 To-do list：[To-do list Demo ](https://github.com/stackOverMind/wilddog-weapp-demotodo)

了解 Wilddog Sync 微信小程序客户端的更多使用方式，请参考 [API 文档](https://docs.wilddog.com/api/sync/web/api.html)。



　
