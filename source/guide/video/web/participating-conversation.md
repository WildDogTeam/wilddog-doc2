title: 加入会话相关
---

以下展示了如何预览本地画面，处理会话邀请和离开当前会话。

### 预览本地视频画面

有时你想在加入会话前预览本地的视频画面。没问题，每个端的 SDK 都提供了预览本地视频画面的方法。 

示例：

```javascript
var localElement = document.getElementById('local'); 
//创建一个同时有音频和视频的媒体流
wilddog.video().createStream({audio:true,video:true}, function(localstream){
    localStream.attach(localElement);
});
```

### 接受或拒绝邀请

初始化 Client 后，可以通过监听邀请事件接收其他 Client 发起的会话邀请，收到邀请后可以选择接受或拒绝邀请。

示例：

```javascript
var client = wilddog.video().client();
client.init({ref:ref, user:user}, function(err){
    //监听邀请事件
    client.on('invite', function(incomingInvite){
        //接受邀请
        incomingInvite.accept(localStream, function(conversation){
            //接受邀请成功，加入会话
            ...
        });
    });
})
```

### 离开会话

离开一个正在进行的会话。可以直接释放资源或通过监听离开会话事件在离开会话成功后释放。

示例：

```javascript
conversation.disconnect();
conversation.on('disconnected', function(conversationId){
    //释放资源
})
```
