title : 安装和初始化 SDK
---

本篇文档介绍如何安装和初始化 SDK。

### 安装 SDK

Video SDK 提供标签引用和 npm 下载两种方式安装。

**通过标签引用**

<figure class="highlight html"><table style='line-height:0.1'><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre><br><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="video-web-version"></span>/wilddog-video.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

**通过 npm 下载**

1.安装依赖

    npm install wilddog wilddog-video

2.在代码中注册 video 服务

```js
var wilddog = require('wilddog');
var Video = require('wilddog-video');

wilddog.regService('video', function(app) {
  if (app == null) {
    throw new Error('application not initialized!Please call wilddog.initializeApp first');
    return;
  };
  return new Video(app);
});
```

3.在 html 中引用 video 适配器

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/0.5.2/wilddog-video-adapter.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

### 初始化 Video SDK

客户端在使用 Video SDK 前需要初始化 Client 来连接客户端和野狗服务器。

初始化 Client 之前，要先经过 [野狗身份认证](/auth/Web/index.html)。开发者可以根据需要选择匿名登录、邮箱密码、第三方或自定义认证等方式进行身份认证。

例如，以匿名方式登录后初始化 Client ：

```javascript
var config = {
    authDomain: "<appId>.wilddog.com",
    syncURL: "https://<appId>.wilddogio.com"
};
// 初始化Wilddog Sync
wilddog.initializeApp(config);
var videoInstance = wilddog.video();
var client;
// 初始化 Video Client 之前，要先经过身份认证。这里采用匿名登录的方式。
wilddog.auth().signInAnonymously()
    .then(function(user){
        //认证成功后，初始化 Client
        client = wilddog.video().client()
    }).catch(function (error) {
        // Handle Errors here.
        console.log(error);
    });
```
