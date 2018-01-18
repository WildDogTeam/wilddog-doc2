
title: 快速入门
---

你可以通过一个简单的 [评论墙示例](https://github.com/WildDogTeam/sync-quickstart-javascript) 来快速了解 Sync 的用法。

<div class="env">

    <p class="env-title">环境准备</p>
    <ul>
        <li> 支持 Chrome、IE 10 +、Firefox、Safari 等主流浏览器环境 </li>
    </ul>
</div>

## 1. 创建应用

首先，你需要在控制面板中创建应用。

## 2. 安装 SDK

Web SDK 有直接引用和 `npm` 安装两种方式可供选择。直接引用时任选以下两种方式之一：

* **安装完整 Wilddog SDK (推荐，包含 Sync 和 Auth)**

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag"><<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="sync_web_v">2.5.6</span>/wilddog.js&quot;</span>></span><span class="undefined"></span><span class="tag"></<span class="name">script</span>></span></div></pre></td></tr></tbody></table></figure>

* **独立安装 Sync SDK**

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag"><<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="sync_web_v">2.5.6</span>/wilddog-sync.js&quot;</span>></span><span class="undefined"></span><span class="tag"></<span class="name">script</span>></span></div></pre></td></tr></tbody></table></figure>

如果是 `NodeJS` 或者 `ReactNative` 项目，请使用 `npm` 安装

```
npm install wilddog --save
```

通过commonjs导入

```
var wilddog = require('wilddog')

```

如果是typescript,可以通过import导入

```
import * as wilddog from 'wilddog'

```


## 3. 创建 Sync 实例

```javascript
var config = {
  syncURL: "https://<SyncAppID>.wilddogio.com" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>

 Wilddog Sync 允许同时创建多个实例。

</blockquote>

## 4. 写入数据

`set()` 方法用于向指定节点写入数据。Sync的数据存储格式采用 [JSON](http://json.org/json-zh.html)。

例如，在应用的根节点下写入评论数据：

```javascript
ref.set({
  "messageboard":{
    "message1":{
        "content" : "Wilddog, Cool!",
        "presenter" : "Jack"
    }
  }
});
```

写入的数据如下图：

 <img src="/images/saveapp.png" alt="yourApp" width="400">



## 5. 监听数据
 `on()` 或 `once()` 方法用于监听节点的数据。

例如，从应用中获得评论数据：

```javascript
// snapshot 里面的数据会一直和云端保持同步
ref.on("value", function(snapshot) {
    console.log(snapshot.val());
});
// 如果你只想监听一次，那么你可以使用 once()
ref.once("value").then(function(snapshot){
    console.info(snapshot.val());
}).catch(function(err){
    console.error(err);
})
```



## 6.数据安全

你可以在 Sync 中使用规则表达式进行数据访问权限的控制。规则表达式可以实现以下功能：

- 数据访问权限控制
- 用户访问权限控制
- 数据格式校验
- 数据索引

规则表达式的具体使用，请参考 [安全性与规则](/sync/Web/rules/introduce.html)。

<blockquote class="warning">
  <p><strong>注意：</strong></p>

初始配置下，所有人都能读写你的应用数据，请及时在 实时通信引擎-读写权限 中更改规则表达式。

</blockquote>

## 7.更多使用

- 了解 Sync 更多使用方式，请参考 [完整指南](/sync/Web/guide/save-data.html) 和 [API 文档](/sync/Web/api/App.html)。
- 了解如何设计数据结构，请参考 [组织数据](/sync/Web/guide/bestpractice/structure-data.html)。





　
