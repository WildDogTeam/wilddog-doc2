title : 安装和初始化
---

本篇文档介绍如何安装和初始化 SDK。


### 安装 SDK
Wilddog Video SDK 的实现依赖于 Wilddog Sync SDK 和 Wilddog Auth SDK，所以在使用 Widdog Video SDK 前需要引入 Sync 和 Auth SDK。

#### 安装 Sync 和 Auth SDK

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

#### 安装 Video SDK

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="video-web-version"></span>/wilddog-video.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

### 初始化 SDK

客户端在使用 Video SDK 前需要初始化一个 Client 来连接客户端和野狗服务器。

初始化 Client 之前，要先经过 [野狗身份认证](/overview/auth.html)。开发者可以根据需要选择匿名登录、邮箱密码、第三方或自定义认证等方式进行身份认证。

例如，以匿名方式登录后创建 Client ：

**需要修改为最新代码！！！**

```javascript
var config = {
    authDomain: "<appId>.wilddog.com",
    syncURL: "https://<appId>.wilddogio.com"
};
// 初始化Wilddog Sync
wilddog.initializeApp(config);
// 创建交互路径的 Wilddog Sync 引用，该路径可以自定义
var ref = wilddog.sync().ref("你的自定义路径");
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



