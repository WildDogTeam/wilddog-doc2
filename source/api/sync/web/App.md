
title: App
---

App 对象是野狗 Web SDK 的核心，它维护着应用的全局上下文数据，不同模块之间需要通过它来进行交互。同时 App 实例也是我们访问野狗各个功能模块的入口，所以初始化 App 实例是我们使用其他任何 API 接口的前提。
要使用野狗实时通信引擎服务，你的初始化参数中必须包含 `syncURL`， 代码如下：

```js
var config = {
  syncURL: "https://<appId>.wilddogio.com",
  authDomain: "<appId>.wilddog.com"
};
wilddog.initializeApp(config);

```

初始化多个 App 实例：

```js
//上面的代码相当于如下初始化动作
var wilddog = wilddog.initializeApp(config);
//我们还可以使用不同配置声明多个不同的 App 实例
var configA = {
  synURL: "https://<appId-a>.wilddogio.com",
  authDomain: "<appId-a>.wilddog.com"
};
var a = wilddog.initializeApp(configA, "APP_A");
//通过 a 或 wilddog.APP_A 来获取已有的 wilddog.App 实例
```

</br>

------

## 属性

### name

**类型**

```js
String
```

**说明**

当前 app 的名字（只读）。在初始化 wilddog.App 的时候定义，缺省的 app 的名字为 "DEFAULT"。

**示例**

```js
// The default app's name is "[DEFAULT]"
wilddog.initializeApp(defaultAppConfig);
console.log(firebase.app().name);  // "DEFAULT"
```
```js
// A named app's name is what you provide to initializeApp()
var otherApp = wilddog.initializeApp(otherAppConfig, "other");
console.log(otherApp.name);  // "other"
```

------

### options

**类型**

```js
non-null Object
```

**说明**

当前 app 配置所的信息（只读）。在调用 wilddog.initializeApp 来初始化 wilddog.App 时传入的参数。

**示例**

```js
var app = wilddog.initializeApp(config);
console.log(app.options.authDomain === config.authDomain);  // true
console.log(app.options.synURL === config.synURL);  // true
```

</br>

------

## 方法

### auth

**定义**

auth()

**说明**

获取 wilddog.Auth 实例，wilddog.Auth 实例只能通过此方法获取。

**返回值**

[wilddog.Auth](/api/auth/web/Auth.html)

**示例**

```js
var auth = app.auth();
```

------

### sync

**定义**

sync()

 **说明**

获取 wilddog.Sync 实例，wilddog.Sync 实例只能通过此方法获取。

 **返回值**

[wilddog.Sync](/api/sync/web/Sync.html)

**示例**

```js
var sync = app.sync();
```
