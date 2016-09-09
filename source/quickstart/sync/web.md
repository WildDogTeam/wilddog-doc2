
title: 快速入门
---

快速入门通过编写一个简单的天气应用让你了解实时数据同步如何使用。

## 1. 创建应用

首先在控制面板中创建应用，请参考[控制面板-创建应用](/console/creat.html)。

## 2. 引入 SDK
在应用中引入 Sync SDK，只需在页面中添加一行 Javascript 代码。

野狗为你提供了单独的 Sync SDK 和包含其他模块的完整 SDK，**任选其一引入即可**。

​	1. 单独引入 Sync SDK：

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="comment"><!-- Wilddog Sync SDK --></span></div><div class="line"><span class="tag"><<span class="name">script</span> <span class="attr">src</span> = <span class="string">"<span>htt</span>ps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog-sync.js"</span>></span><span class="undefined"></span><span class="tag"></<span class="name">script</span>></span></div></pre></td></tr></tbody></table></figure>

​	2. 引入完整 SDK：

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="comment"><!-- 完整的 Wilddog SDK --></span></div><div class="line"><span class="tag"><<span class="name">script</span> <span class="attr">src</span> = <span class="string">"<span>htt</span>ps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog.js"</span> ></span><span class="undefined"></span><span class="tag"></<span class="name">script</span>></span></div></pre></td></tr></tbody></table></figure>

`NodeJS` 或者 `ReactNative` 项目可以采用 `npm` 方式来安装最新的 Wilddog Javascript SDK:

```
npm install wilddog
```

**注意**:  `npm` 安装的是完整 SDK 而非单独的 Sync 模块。



## 3. 创建 Wilddog 实例

```javascript
var config = {
  syncDomain: "<appId>.wilddog.com",
  syncURL: "https://<appId>.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wildd og.sync().ref();
```



## 4. 保存数据

set() 方法可以写入数据，野狗的数据是以 [JSON](http://json.org) 格式存储的。

例如在应用中存入北京和上海的天气信息：

```javascript
ref.set({
  "weather":{
    "beijing" : "rain",
    "shanghai" : "sunny"    
  }
});
```

存入的数据如下图：

 <img src="/images/saveapp.png" alt="yourApp" width="300">

**删除数据**和**更新数据**等更多操作数据的用法与此类似，你可以在[完整指南](/guide/sync/web/save-data.html)或者 [API 文档](/api/sync/web.html)中查看具体用法。

## 5. 读取与监听数据
on() 方法可以读取并监听节点的数据。

例如，从应用中获得天气信息:

```javascript
ref.on("value", function(snapshot) {
console.log(snapshot.val());
}
```

取出的数据会一直和云端保持同步。如果你只想读取一次，不监听数据变化，那么你可以使用once()函数替代on()函数。

更多的数据读取方式可以查看[完整指南](/guide/sync/web/save-data.html)。





