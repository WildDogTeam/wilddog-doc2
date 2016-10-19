
title: App
---

wilddog.App 对象是野狗 Web SDK 的核心，它维护着应用的全局上下文数据，不同模块之间需要通过它来进行交互。同时 App 实例也是我们访问野狗各个功能模块的入口，所以初始化 App 实例是我们使用其他任何 API 接口的前提。
要使用野狗的身份认证功能，你的初始化参数中必须包含 `authDomain`， 代码如下：

```js
var config = {
  authDomain: "<appId>.wilddog.com"
};
wilddog.initializeApp(config);

```

初始化多个 App 实例

```js
//上面的代码相当于如下初始化动作
var wilddog = wilddog.initializeApp(config,"DEFAULT");
//我们还可以使用不同配置声明多个不同的 App 实例
var configA = {
  authDomain: "<appId-a>.wilddog.com"
};
var a = wilddog.initializeApp(configA, "APP_A");
//通过 a 来访问 auth
//a.auth().signInXxx().then(...)
```

## 方法

### auth

**定义**

```js
auth()
```

**说明**

获取 wilddog.Auth 实例，wilddog.Auth 实例只能通过此方法获取。

**返回值**

[wilddog.Auth](/api/auth/web/Auth.html)

</br>

------

### sync

**定义**

```js
sync()
```

 **说明**

获取 wilddog.Sync 实例，wilddog.Sync 实例只能通过此方法获取。

 **返回值**

[wilddog.Sync](/api/sync/web/Sync.html)