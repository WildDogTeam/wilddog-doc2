
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
    authDomain: '<WD-APPID>.wilddog.com'
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

#### ref.bindAsArray(page,varName)

将一个reference或query 与page.data中某个Array绑定，绑定后这个reference指向的数据发生任何变化都将实时同步到绑定到的变量上，从而实时同步到页面。使用bindAsArray 相当于已经监听了 所有 child_* 事件。

bindAsArray 可以很方便列表展示

* page 小程序的page对象
* varName 与页面绑定的变量名

例子

app.js

```js
var config = {
    syncURL: 'https://<WD-APPID>.wilddogio.com',
    authDomain: '<WD-APPID.wilddog.com>'
}
App({
    onLaunch:function () {
        wilddog.initializeApp(config)
        this.todoRef = wilddog.sync().ref('todo').orderByPriority().limitToFirst(20)
    }
})
```

page (假设是 index)

index.js
```
var app = getApp()
Page({
    ...
    onLoad: function () {
        app.todoRef.bindAsArray(this,'todo')
    }
    ...
})
```

index.wxml

```html
...
<view wx:for = "{{todo}}">{{item[".key"]}}-{{item[".value"]}}--{{item[".priority"]}}</view>
...
```

** 注意： **
数据绑定的过程中，野狗数据与微信小程序的数据是一一对应的，但形式发生了变化

```json
{
    "1234": "hello",
    "1235": "hello again"
}
```
会映射如下 Array

```json
[
    {
        ".key": "1234",
        ".value": "hello",
        ".priority": null
    },
    {
        ".key": "1235",
        ".value": "hello again",
        ".priority": null
    }
]
```

#### ref.bindAsObject(page,varName)

与bindAsArray 类似，不过是绑定到一个Object，而不是Array。
bindAsObject 可以很方便的展示结构化数据，比如某种配置信息。

index.js
```
var app = getApp()
Page({
    ...
    onLoad: function () {
        app.userInfoRef.bindAsObject(this,'userInfo')//userInfoRef 在app中提供，在这个例子中不再重复出现
    }
    ...
})
```

index.wxml

```html
<view>
    userName: {{userInfo[".value"]["userName"]}}
</view>

```

在这里，同样数据会发生映射
比如原始数据：

```json
key: "1234"
value:{
    "userName": "Jack"
}

```
将会被映射为：

```json
{
    ".key": "1234",
    ".value": {
        "userName": "Jack"
    },
    ".priority": null
}

```

#### ref.unbind(page,varName)

取消数据绑定

## 5.更多使用
- 了解更多使用方式，请参考 [完整指南](/guide/sync/web/save-data.html) 和 [API 文档](/api/sync/web/api.html)。


　
