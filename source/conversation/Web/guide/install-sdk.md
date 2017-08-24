title : 安装和初始化 SDK
---

本篇文档介绍如何安装和初始化 SDK。

### 安装 SDK

Video SDK 提供标签引用和 npm 下载两种方式安装。

**通过标签引用**

<figure class="highlight html"><table style='line-height:0.1'><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="sync_web_v">2.5.6</span>/wilddog.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre><br><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="media_web_v">0.5.18</span>/wilddog-video.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

**通过 npm 下载**

安装依赖

    npm install wilddog wilddog-video

### 初始化 Video SDK

客户端在使用 Video SDK 前需要初始化 Video 来连接客户端和野狗服务器。

初始化 Video 之前，要先经过 [野狗身份认证](/auth/Web/index.html)。开发者可以根据需要选择匿名登录、邮箱密码、第三方或自定义认证等方式进行身份认证。

如仅使用Video SDK，以匿名方式登录后初始化 Video（推荐使用非匿名登录方式登录），示例代码如下 ：

```javascript
var config = {
    authDomain: "<appId>.wilddog.com"
};
// 初始化Wilddog auth
wilddog.initializeApp(config);
//获取video对象
var videoInstance = wilddogVideo.getInstance()

// 初始化 Video 之前，要先经过身份认证。这里采用匿名登录的方式。
wilddog.auth().signInAnonymously()
    .then(function(user){
        //认证成功后，初始化 Video
        video = videoInstance.initialize('<appId>',user.getToken());
    }).catch(function (error) {
        // Handle Errors here.
        console.log(error);
    });
```
