
title: 快速入门
---

你可以通过一个简单的 [示例](https://github.com/WildDogTeam/video-demo-web-conversation) 来快速了解 WilddogVideoCall SDK 的用法。

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li> Chrome 49及以后、Firefox 47及以后、Safari 11及以后浏览器 </li>
        <li> 由于浏览器安全策略的限制，所以必须使用https（本地开发环境例外） </li>
    </ul>
</div>

## 1. 创建应用

### 1.1 创建野狗应用

在控制面板中创建野狗应用。

<img src='/images/video_quickstart_create.png' alt="video_quickstart_create">

### 1.2 配置应用

- 在 `身份认证` 标签页中，选择 `登录方式` 标签，开启 `匿名登录` 功能（或者选择其他登录方式，例如：`QQ登录`、`邮箱登录` 等）；

<img src='/images/openanonymous.png' alt="video_quickstart_openanonymous">

- 在 `实时视频通话` 标签页中，点击 `开启视频通话` 按钮。

<img src='/images/video_quickstart_openVideo.png' alt="video_quickstart_openVideo">

## 2. 安装 SDK

### 2.1 WilddogVideoCall SDK

Web SDK 可以通过标签直接引用：

**通过标签引用**

<figure class="highlight html"><table style='line-height:0.1'><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="media_web_v">2.0.0</span>/wilddog-video-call.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

### 2.2 初始化 WilddogAuth SDK

Token（身份认证令牌）是用户在 WilddogVideoCall SDK 中的唯一身份标识，用于识别用户身份并控制访问权限。
WilddogVideoCall SDK 使用 Auth SDK 获取合法的 TOKEN。

**使用标签引用 Wilddog Auth SDK**

<figure class="highlight html"><table style='line-height:0.1'><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="sync_web_v">2.5.6</span>/wilddog-auth.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre><br></td></tr></tbody></table></figure>

## 3. 初始化 SDK

### 3.1 初始化WilddogAuth SDK

```javascript
//初始化 Wilddog Auth
var config = {
    authDomain: "<appId>.wilddog.com"
};
wilddog.initializeApp(config);
```

### 3.2 初始化WilddogVideoCall SDK

使用 WilddogAuth SDK 进行身份认证，身份认证成功后，在使用 WilddogVideoCall SDK前，必须对wilddogVideoCall进行初始化。

```javascripte
// 初始化 WilddogVideoCall 之前，要先经过身份认证。这里采用匿名登录的方式。推荐使用其他登录方式。
wilddog.auth().signInAnonymously()
    .then(function(user){
        //认证成功后，初始化 WilddogVideoCall
        wilddogVideo.initialize({'appId':<videoAppId>,'token':user.getToken()})
        //获取 `WilddogVideoCall` 实例
        videoInstance = wilddogVideo.call();
    }).catch(function (error) {
        // Handle Errors here.
        console.log(error);
    });
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>
 videoAppId 为应用实时一对一视频通话标签页中的 videoAppID 字段值，请勿与实时通信引擎 AppID 混淆。
 videoAppID 为 wd 开头的随机字符串，例如：wd1234567890abcdef。

</blockquote>

## 4. 配置一对一视频通话
初始化 `WilddogVideoCall SDK` 后，通过 `wilddogVideo.call()` 获取 `WilddogVideoCall` 对象，设置监听用于监听通话请求：
 
```javascript
//监听收到的邀请
videoInstance.on('called',function(conversation) {
  console.log(conversation);
})
videoInstance.on('token_error',function() {
  console.log('token不合法或过期');
})

```

## 5. 开始一对一视频通话

使用 WilddogAuth 登录成功后，用户会获得唯一的 uid，在 WilddogVideoCall SDK 中，使用 uid 作为用户的身份标识。

### 5.1 邀请一对一视频通话

使用 `call()` 来发起一对一视频通话请求

```javascript

mConversation = videoInstance.call(remoteUid,localStream,'conversationDemo');
```

### 5.2 接受一对一视频通话

被邀请的用户通过 `videoInstance.on('called',callback)` 事件收到 `Conversation` 实例，使用 `accept（）` 方法接收一对一视频通话：

```javascript

videoInstance.on('called',function(conversation){
    mConversation = conversation;
    mConversation.accept();
})

```

### 5.3 播放媒体流 

一对一视频通话链接成功后，通话双方会通过 `mConversation.on('stream_received',callback)` 事件收到 RemoteStream 实例，使用 attach() 方法将远端媒体流放入 `video` 标签中播放：

```javascript

mConversation.on('stream_received',function(remoteStream) {
    //将远端流放入video标签中
    remoteStream.attach(remoteEl);
})

```

## 6. 更多应用

- 了解 WilddogVideoCall 更多使用方式，请参考 [完整指南](/conversation/Web/guide/0-concepts.html) 和 [API 文档](/conversation/Web/api/wilddogVideoInitializer.html)。