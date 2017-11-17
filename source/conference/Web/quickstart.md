
title: 快速入门
---

你可以通过一个简单的 [示例](https://github.com/WildDogTeam/video-demo-web-conference) 来快速了解 WilddogVideoRoom SDK 的用法。


<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li> 最低支持 Chrome 22、Firefox 23、Safari 11、Edge 15 等主流浏览器环境 </li>
        <li> 由于浏览器安全策略的限制，所以必须使用https（本地开发环境例外）</li>
    </ul>
</div>

## 1. 创建应用

### 1.1 创建野狗应用
在控制面板中创建野狗应用。

### 1.2 配置应用

- 1 在 `身份认证` 标签页中，选择 `登录方式` 标签，开启 `匿名登录` 功能（或者选择其他登录方式，例如：`QQ登录`、`邮箱登录` 等）；
- 2 在 `实时视频通话` 标签页中，点击 `开启视频通话` 按钮。

## 2. 安装 SDK

#### 2.1 安装 WilddogVideoRoom SDK

WilddogVideoRoom 有直接引用和 npm 安装两种方式可供选择。直接引用时任选以下两种方式之一：

**通过标签引用**

<figure class="highlight html"><table style='line-height:0.1'><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="room_web_v">2.0.0.beta</span>/wilddog-video-room.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

**通过 npm 方式引用**

```
npm install wilddog-video-room --save
```

#### 2.2 安装 Auth SDK

Token（身份认证令牌）是用户在 WilddogVideoRoom SDK 中的唯一身份标识，用于识别用户身份并控制访问权限。
WilddogVideoRoom SDK 使用 Auth SDK 获取合法的 TOKEN。

**使用标签引用 Wilddog Auth SDK**
<figure class="highlight html"><table style='line-height:0.1'><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="sync_web_v">2.5.6</span>/wilddog-auth.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre><br></td></tr></tbody></table></figure>


## 3. 初始化 SDK

### 3.1 初始化 WilddogAuth SDK

```javascript
//初始化 Wilddog Auth
var config = {
    authDomain: "<videoAppId>.wilddog.com"
};
wilddog.initializeApp(config);
```

### 3.2 初始化 WilddogVideoRoom SDK

使用 WilddogAuth SDK 进行身份认证，身份认证成功后，在使用 WilddogVideoRoom SDK前，必须对wilddogVideo进行初始化。

```javascripte
// 初始化 WilddogVideoRoom 之前，要先经过身份认证。这里采用匿名登录的方式。
wilddog.auth().signInAnonymously()
    .then(function(user){
        //认证成功后，初始化 WilddogVideoRoom
        wilddogVideo.initialize({appId:<videoAppId>,token:user.getToken()})
        //获取WilddogVideoRoom实例
        var roomInstance = wilddogVideo.room(roomId);
    }).catch(function (error) {
        // Handle Errors here.
        console.log(error);
    });
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>
 videoAppId 为应用实时视频通话标签页中的 VideoAppID 字段值，为 wd 开头的随机字符串，例如：wd1234567890abcdef。

</blockquote>

## 4. 加入 Room

创建 `WilddogVideoRoom` 实例并加入到 Room 中。

```javascript
//room_id 由客户端生成一个随机字符串
roomInstance = wilddogVideo.room(room_id);
roomInstance.connect();
```

## 5. 发布／订阅媒体流
本地客户端会触发 `roomInstance.on('connected',callback)` 事件通知用户已成功加入 Room 。
加入后即可发布或订阅当前 Room 中的媒体流。

### 发布本地媒体流
使用 `wilddogVideo.createLocalStream(options)` 方法创建本地媒体流。

```javascript
//创建一个同时有音频和视频的媒体流
wilddogVideo.createLocalStream(
    {
        captureAudio:true,
        captureVideo:true,
        dimension:'480p',
        maxFPS: 15
    })
    .then(function(localStream){
        // 获取到localStream,将媒体流绑定到页面的video类型的标签上
        // 如果没有获得摄像头权限或无摄像头，则无法展示。
        localStream.attach(localElement);
    });
```

使用`roomInstance.publish(localStream)` 方法发布本地媒体流。

```javascript
roomInstance.on('connected',function(){
    console.log('connected success');
    roomInstance.publish(localStream);
});
```
### 订阅媒体流
SDK 通过 `roomInstance.on('stream_added',callback) ` 事件通知用户当前 Room 中已发布的媒体流，可以根据需要订阅感兴趣的媒体流。

```javascript
roomInstance.on('stream_added',function(roomStream){
    roomInstance.subscribe(roomStream,function(err){
        if(err == null){
            console.log('subscribe success');
        }
    })
})
```
订阅成功后会触发客户端 `roomInstance.on('stream_received',callback)` 事件,事件返回远端媒体流。

使用 `attach()` 方法播放远端媒体流

```javascript
roomInstance.on('stream_received',function(roomStream){
    //将远端流放入相应的远端video标签上
    roomStream.attach(remoteRemote);
});
```

<blockquote class="notice">
  <p><strong>提示：</strong></p>
 发布媒体流需要在 `roomInstance.on('connected',callback)` 回调方法被触发后进行。
</blockquote>


## 7. 更多使用

- 了解 WilddogVideoRoom 更多使用方式，请参考 [完整指南](/conference/Web/guide/0-concepts.html) 和 [API 文档](/conference/Web/api/wilddogVideoInitializer.html)。
