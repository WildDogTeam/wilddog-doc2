
title: 快速入门
---

你可以通过编写一个简单的天气应用例子来了解实时数据同步的用法。

## 1. 创建应用

首先，你需要在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

Web SDK 有直接引用和 `npm` 安装两种方式可供选择。直接引用时任选以下两种方式之一

* **安装完整 Wilddog SDK (推荐，包含 Sync 和 Auth)**

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

* **独立安装 Sync SDK**

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog-sync.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

如果是 `NodeJS` 或者 `ReactNative` 项目，请使用 `npm` 安装

```
npm install wilddog --save
```

## 3. 创建 Wilddog Sync 实例

```javascript
var config = {
  syncURL: "https://<appId>.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();
```


## 4. 写入数据

[set()](/api/sync/web/api.html#set) 方法可以写入数据。Sync的数据存储格式采用 [JSON](http://json.org/json-zh.html)。

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
使用 [on()](/api/sync/web/api.html#on) 或 [once()](/api/sync/web/api.html#once) 方法可以读取并监听节点的数据。

例如，从应用中获得天气数据

```javascript
// snapshot 里面的数据会一直和云端保持同步
ref.on("value", function(snapshot) {
    console.log(snapshot.val());
});
// 如果你只想读取一次，不监听数据变化，那么你可以使用 once()
ref.once("value").then(function(snapshot){
    console.info(snapshot.val());
}).catch(function(err){
    console.error(err);
})
```


更多的数据读取方式，请参考 [完整指南](/guide/sync/web/save-data.html) 和 [API 文档](/api/sync/web/api.html)。 





　
