title: 未读消息计数
---
本篇文档介绍如何处理未读消息。

### 未读消息

未读消息是指用户没有读过的消息。消息已读状态是和设备绑定的，未读消息需要本地处理。
例如，当用户进入一个会话，可以设置整个会话的消息已读。

### 获取当前未读消息数量

`WDGIMConversation` 的 `totalNumberOfUnreadMessages` 方法用于获取一个会话的未读消息数量：

```objc
NSUInteger num = conversation.totalNumberOfUnreadMessages;
```
 
### 标记为已读

当用户阅读某个会话的消息后，需要对会话消息的进行已读处理。SDK 会将会话中最后一条已读消息之前所有消息设置为已读。
	
```objc
NSError **error;
BOOL success = [conversation markAllMessagesAsRead:&error];
```