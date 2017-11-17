title: 安装和初始化
---

本篇文档介绍如何安装 SDK 并初始化 WilddogVideoCall。

### 安装 SDK

WilddogVideoCall 有直接引用和 npm 安装两种方式可供选择。直接引用时任选以下两种方式之一：

**通过标签引用**

<figure class="highlight html"><table style='line-height:0.1'><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="media_web_v">2.0.0</span>/wilddog-video-call.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

**通过 npm 方式引用**

```
npm install wilddog-video-call --save
```

### 初始化 WilddogVideoCall SDK

客户端在使用 WilddogVideoCall SDK 前需要初始化 WilddogVideoCall 来连接客户端和野狗服务器。

初始化 WilddogVideoCall 之前，要先经过 [野狗身份认证](/auth/Web/index.html)。开发者可以根据需要选择匿名登录、邮箱密码、第三方或自定义认证等方式进行身份认证。

如仅使用WilddogVideoCall SDK，以匿名方式登录后初始化 WilddogVideoCall（推荐使用非匿名登录方式登录），示例代码如下 ：

```javascript
var config = {
    authDomain: "<videoAppId>.wilddog.com"
};
// 初始化Wilddog auth
wilddog.initializeApp(config);

// 初始化 WilddogVideoCall 之前，要先经过身份认证。这里采用匿名登录的方式。
wilddog.auth().signInAnonymously()
    .then(function(user){
        //认证成功后，初始化 WilddogVideoCall
        wilddogVideo.initialize({'appId':'<videoAppId>','token':user.getToken()});
        //获取 WilddogVideoCall 实例
        videoInstance = wilddogVideo.call();
    }).then(function() {
        //监听收到的请求
        videoInstance.on('called',function(conversation) {
            console.log(conversation);
        });
        videoInstance.on('token_error',function() {
            console.log('token不合法或过期');
        });
    }).catch(function (error) {
        // Handle Errors here.
        console.log(error);
    });
```

