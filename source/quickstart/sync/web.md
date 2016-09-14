
title: 快速入门
---

你可以通过编写一个简单的天气应用例子来了解实时数据同步的用法。

## 1. 创建应用

首先，你需要在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

根据需要选择以下一种方式安装：

* **安装完整 Wilddog SDK (推荐，包含 Sync 和 Auth)**

```html
<script src = "https://cdn.wilddog.com/sdk/js/2.0.0/wilddog.js"></script>
```

* **独立安装 Sync SDK**

```html
<script src = "https://cdn.wilddog.com/sdk/js/2.0.0/wilddog-sync.js"></script>
```

* **`NodeJS` 或者 `ReactNative` 项目请使用 `npm` 方式**

```
npm install wilddog
```

## 3. 创建 Wilddog Sync 实例

```javascript
var config = {
  syncDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();
```


## 4. 写入数据

`Set()`方法可以写入数据。Sync的数据存储格式采用 [JSON](http://json.org)。

例如，在应用的根节点下写入天气数据

```javascript
ref.set({
  "weather":{
    "beijing" : "rain",
    "shanghai" : "sunny"    
  }
});
```

写入的数据如下图

 <img src="/images/saveapp.png" alt="yourApp" width="300">

## 5. 读取与监听数据
`on()`方法可以读取并监听节点的数据。

例如，从应用中获得天气数据

```javascript
ref.on("value", function(snapshot) {
console.log(snapshot.val());
}
```

`snapshot` 里面的数据会一直和云端保持同步。如果你只想读取一次，不监听数据变化，那么你可以使用`once()`方法替代`on()`方法。

更多的数据读取方式，请参考 [完整指南](/guide/sync/web/save-data.html) 和 [API 文档](/api/sync/web/api.html)。 





　
