title: 媒体流统计
---

本篇文档介绍如何获取本地视频流和远端视频流的统计数据。

使用 [Conversation](/conversation/Web/api/conversation.html)中监听可以实时获取视频的宽、高、帧率、发送接收总大小、比特率、延迟等。

### 统计本地视频数据

实现本地视频数据统计接口。

```javascript
//mConversation是发起或接受邀请后得到的Conversation对象
mConversation.on('local_stats',function(statistic){
    console.log(statistic);
})
```

### 统计远程视频数据

实现远程视频数据统计接口。

```javascript

mConversation.on('remote_stats',function(statistic){
    console.log(statistic);
})
```
