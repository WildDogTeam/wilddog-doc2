
title: 实战教程
---

本文档将给出一些详尽的示例教程。

## 示例说明

本教程以一对一视频通话为例，讲解如何通过 Wilddog Video SDK 实现实时视频通话功能。

在此之前需要开启控制面板中的“实时视频通话”功能。

示例的最终的展示效果如下图：

<img src='/images/video_resources_web_final.png' alt="video_resources_web_final" width="300">

## 具体步骤

### 1. 引入 SDK

<figure class="highlight html"><table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/<span class="js-version"></span>/wilddog.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table>
<table><tbody><tr><td class="code"><pre><div class="line"><span class="tag">&lt;<span class="name">script</span> <span class="attr">src</span>=<span class="string">&quot;<span>ht</span>tps://cdn.wilddog.com/sdk/js/0.3.3/wilddog-video.js&quot;</span>&gt;</span><span class="undefined"></span><span class="tag">&lt;/<span class="name">script</span>&gt;</span></div></pre></td></tr></tbody></table></figure>

### 2. 用户身份认证

视频通话的前提条件是要有可识别的用户身份。在这里使用 Auth SDK 的匿名登录实现身份认证。认证后会为每个用户分配唯一的 Wilddog ID。

```js
// 创建数据库引用。最好自己创建一个应用，把 `appId` 换成你自己的应用 ID
var config = {
    authDomain: "appId.wilddog.com",
    syncURL: "https://appId.wilddogio.com"
};
wilddog.initializeApp(config);
wilddog.auth().signInAnonymously().then((user) => {
    //身份认证成功，可以进行 Video SDK 初始化
	//该用户的 Wilddog ID : user.uid
}
```

### 3. 初始化 Video SDK

用户身份认证成功后，可以初始化 Video SDK 。

```js
//获取Video对象
var videoInstance = wilddog.video();
//获取Client对象
var clientInstance = videoInstance.client();
//指定交互路径，可以自定义，如果是服务器中转方式，
//需要保证该路径和控制面板中的交互路径一致
wilddogref = wilddog.sync().ref().child('你的自定义路径');
//初始化 Client，
// wilddogref 即上面交互路径的 Sync 引用，
// user 为身份认证成功后回调中的参数
clientInstance.init({
    ref: wilddogref,
    user: user
    }, () => {
    //初始化成功
});
```

### 4. 实现用户列表

邀请对方加入视频通话，需要获取对方的在线状态。Video SDK 本身不提供获取在线用户列表功能，因此需要开发者使用 Sync SDK 来自己实现。用户登陆系统后将自己的 Wilddog ID 保存到用户列表中。

```js
// 用户列表的存储路径，可以自定义，但不要和 Video 的交互路径相同，防止数据冲突
var ref = wilddog.sync().ref().child('用户列表存储路径');
// 将自己的 Wilddog ID 加入到数据库中，离线时自动删除
ref.child('users/' + user.uid).set(true);
ref.child('users/' + user.uid).onDisconnect().remove();

//监听在线用户列表，并展示除自己之外的用户
ref.child('users').on('child_added', (snap) => {
    //不是自己，就展示出来
    if (snap.key() != user.uid) {
        var newUser = userModel.cloneNode(true);
        newUser.id = snap.key();
        newUser.children[0].textContent = snap.key();
        newUser.hidden = false;
        //追加到 'user-list' 元素中
        userList.appendChild(newUser);
    }
});
//有用户离开，在 'user-list' 元素中取消该用户
ref.child('users').on('child_removed', (snap) => {
    if (snap.key() != user.uid) {
        var removeEl = document.getElementById(snap.key());
        userList.removeChild(removeEl);
    }
})
```

数据库中的数据结构就是这个样子的：

<img src='/images/video_resources_web_dataTree.png' alt="video_resources_web_dataTree" width="300">

### 5. 获取和预览本地视频

通过 Video SDK 获取本地视频流，并在视频展示控件中预览。

```js
//获取本地媒体流（有声音，低画质），并绑定到页面
videoInstance.createStream({
    audio: true,
    video: 'low'
}, function(err,wdStream) {
    console.log(err);
    localStream = wdStream;
    localStream.attach(localEl);
})
```

### 6. 发起会话

选择用户列表中的用户，发起会话。

```js
//选择p2p模式，uid 即选中的用户的 Wilddog ID，localStream 为之前获取的本地视频流
var outInvite = clientInstance.inviteToConversation({
    'mode': 'p2p',
    'participantId': uid,
    'localStream': localStream,
})
//如果会话建立，在outInvite的.then中能获取到 conversation
outInvite.then((conversation) => {
    //会话建立成功
});
```

### 7. 接受或拒绝邀请

发起会话后，被邀请人会收到邀请事件，被邀请人可以选择接受或拒绝该邀请，接受邀请则会话建立。

```js
//初始化 Client 成功后，监听邀请事件，显示在网页上
clientInstance.on('invite', (incomingInvite) => {
    currentInvite = incomingInvite;
    inviteEl.hidden = false;
    invitInfo.textContent = incomingInvite.from + '向你发出会话邀请';
);

//用户点击接受后的触发，localStream为之前获取的本地视频流
var accept = function() {
    //接受邀请
    currentInvite.accept(localStream).then((conversation) => {
        //会话建立成功
    });
}
//用户点击拒绝后的触发
var reject = function() {
    //拒绝邀请
    currentInvite.reject();
}
```

### 8. 展示对方视频

会话建立成功后，在会话中能够获取到对方视频流，在视频展示控件中展示。

```js
//监听 conversation 的 participant_connected 事件，回调的参数中携带对方的视频流。
conversation.on('participant_connected', (participant) => {
    //展示到 remote 元素中
    participant.stream.attach(remoteEl);
});
```
### 9. 离开会话

会话过程中，调用下面方法离开会话。

```js
//取消对方视频流的展示
remoteStream.detach(remoteEl);
//离开会话
currentConversation.disconnect();
```

## 获取示例源码

点此获取完整的[示例源码](https://github.com/WildDogTeam/video-quickstart-web)
