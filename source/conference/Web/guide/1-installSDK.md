title：安装与初始化

本篇文档介绍如何安装 SDK 并初始化 WilddogVideo。


### 安装 SDK
#### 安装 Video SDK
<figure class="highlight html"><table style='line-height:0.1'><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="media_web_v">2.0.0</span>/wilddog-room.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

#### 获取 Token
Token（身份认证令牌）是用户在 WilddogRoom SDK 中的唯一身份标识，用于识别用户身份并控制访问权限。

野狗提供了两种方式获取 Token ：
1. 在客户端通过 WilddogAuth SDK 获取。请参考：[WilddogAuth 快速入门](/auth/Web/quickstart.html)，
开发者可以根据需要选择匿名登录、邮箱密码、第三方或自定义认证等方式进行身份认证。
2. 在服务端通过 REST API 获取。请参考：[生成 Custom Token](/auth/Server/server.html#生成-Custom-Token)。

### 初始化 SDK

使用 [wilddogVideo.initialize(options)](/conference/Web/guide/0-install-sdk.html) 方法初始化 WilddogRoom SDK。

```javascript
// 初始化 Video 之前，要先经过身份认证。这里采用匿名登录的方式。
var config = {
    authDomain: "<appId>.wilddog.com"
};
// 初始化Wilddog auth
wilddog.initializeApp(config);
wilddog.auth().signInAnonymously()
    .then(function(user){
        //认证成功后，初始化 wilddogVideo
        wilddogVideo.initialize({'appId':<appId>,'token':<token>});
//获取room对象
var roomInstance = wilddogVideo.room(roomId);
    }).catch(function (error) {
        // Handle Errors here.
        console.log(error);
    });
```
```






  
