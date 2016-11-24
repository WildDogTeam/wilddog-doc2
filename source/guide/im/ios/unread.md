title: 未读消息计数
---

* 1.未读消息
* 2.获取当前围堵消息数量
* 3.标记为已读


### 未读消息

未读消息是指用户没有读过的消息。例如，当用户进入一个会话，可以设置整个会话的消息已读。目前消息的已读状态是和设备绑定的，因为未读消息数是本地处理的。

### 获取当前未读消息数量

通过 WDGIMConversation 的 `totalNumberOfUnreadMessages` 方法可以获取一个会话的未读消息数量，例如

```objc
NSUInteger num = conversation.totalNumberOfUnreadMessages;
```
 
### 标记为已读

当用户阅读某个会话的消息后，需要对会话消息的进行已读处理。SDK 会根据会话中最后一条阅读的消息，设置会话中之前所有消息为已读。
	
```objc
BOOL success = [conversation markAllMessagesAsRead:nil];
```