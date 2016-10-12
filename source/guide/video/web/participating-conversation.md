title: 加入会话相关
---

本篇文档介绍如何预览本地视频画面、接受或拒绝邀请，以及离开会话。

### 预览本地视频画面

Wilddog Video SDK 都提供了在加入会话前预览本地的视频画面。 

例如，创建一个同时有音频和视频的媒体流并展示出来：

```javascript
var localElement = document.getElementById('local'); 
//创建一个同时有音频和视频的媒体流
wilddog.video().createStream({audio:true,video:true}, function(localstream){
    localStream.attach(localElement);
});
```

### 接受或拒绝邀请

初始化 Client 后，可以通过监听邀请事件接收其他 Client 发起的会话邀请，收到邀请后可以选择接受或拒绝邀请。

例如，收到邀请时展示弹窗让用户选择是否接受：

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

离开一个正在进行的会话并释放媒体资源。可以直接释放媒体资源或通过监听离开会话事件在成功离开会话后释放媒体资源。

例如，断开会话并释放不使用的资源：

```javascript
conversation.disconnect();
conversation.on('disconnected', function(conversationId){
    //释放资源
})
```
