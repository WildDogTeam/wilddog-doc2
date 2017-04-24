title: 消息收发
---

本篇文档介绍 Wilddog IM SDK 的消息收发和会话操作。


## 发送消息
发送消息前需要先创建会话和消息体。

###  创建会话

会话是指面向一个人或者一个群组的对话，发消息时需要先获取会话。
使用 `-newConversationWithMembers:completion` 方法获取会话，比如创建一个单聊会话：

```objc
[[WDGIM im] newConversationWithMembers:@[@"User Id"] completion:^(WDGIMConversation * _Nullable conversation, NSError *__autoreleasing  _Nullable * _Nullable error) {
   //...
}];

```

### 创建文本消息

`-messageWithText:` 方法用于创建文本消息：

```objc
WDGIMMessageText *textMsg = [WDGIMMessage messageWithText:@"Hi, Wilddog!"];
```

### 创建图片消息

`-messageWithImage:` 方法用于创建图片消息：
 
```objc
// 创建图片消息
WDGIMMessageImage *imageMsg = [WDGIMMessage messageWithImage:image];
```

### 创建语音消息

`-messageWithVoiceData:duration:` 方法用于创建语音消息：
 
```objc
// 创建语音消息
WDGIMMessageVoice *voiceMsg = [WDGIMMessage messageWithVoiceData:voiceData duration:voiceDuration];
```

### 发送消息

`-sendMessage:completion:` 方法用于发送一条消息：

```objc
// 回调中可以获取消息的发送状态
WDGIMMessageText *textMessage = [WDGIMMessage messageWithText:@"Hi, Wilddog!"];
[conversation sendMessage:textMessage completion:^(WDGIMMessage * _Nullable msg, NSError * _Nullable err) {
     //...       
}];
```

## 接收消息

新消息通知会在 `-wilddogIM:didRecieveMessages:` 方法中回调给用户。

### 注册监听

在 SDK 初始化时设置消息接收代理：

```objc 
// 设置代理
[[WDGIM im] setDelegate:self];

```
	
### 消息解析

WDGIMDelegate 的 `-wilddogIM:didRecieveMessages:` 方法用于获取 messages 中所有新的聊天消息：
```objc
- (void)wilddogIM:(WDGIM *)im didRecieveMessages:(NSArray<WDGIMMessage *> *)messages
{
    for (WDGIMMessage *msg in messages) {
        switch (msg.messageType) {
            //文本消息
            case WDGIMMessageTypeText:
                break;
                
            //图片消息
            case WDGIMMessageTypeImage:
                break;
                
            //语音消息
            case WDGIMMessageTypeVoice:
                break;
                
            default:
                break;
        }
    }
}
```

### 消息删除

`-deleteMessage` 方法用于删除本地消息：

```objc
   - (BOOL)deleteMessage;
```

## 消息属性

### 消息状态

WDGIMMessage 的 messageStatus 属性用于获取当前消息的状态，如发送中、发送成功、发送失败和删除等。

四种状态在 WDGIMMessageStatus 枚举中：

```
/**
 *  消息发送状态
 */
typedef NS_ENUM(NSInteger, WDGIMMessageStatus) {
    /**
     *  正在发送中
     */
    WDGIMMessageStatusSending = 1,
    /**
     *  发送成功
     */
    WDGIMMessageStatusSuccess,
    /**
     *  发送失败
     */
    WDGIMMessageStatusFailed,
    /**
     *  消息已被删除
     */
    WDGIMMessageStatusDelete
};

```

### 消息时间

 `sentAt` 方法用于获取到消息的发送时间：

```objc
@property (nonatomic, readonly) long long sentAt
```
<blockquote class="notice">
  <p><strong>提示：</strong></p>
  该时间是服务器时间，而非本地时间。
</blockquote>


### 消息 ID

消息 ID 是由服务器统一生成的有序 ID:
```objc
	@property (nonatomic, readonly) NSString *messageId
```
	
### 消息发送者

消息发送者是消息的发送方的 ID:
```objc
	@property (nonatomic, readonly) NSString *sender
```


##  会话操作

### 获取所有会话

`-getConversations` 方法用于获取本地所有会话列表:
```objc
	NSArray *conversations = [[WDGIM im] getConversations];
```
	
### 获取会话本地消息

`WDGIMConversation` 中的 `- getMessageFromLast:limit:` 方法用于获取本地历史消息，并可以实现分页拉取(从后往前获取)：
```obj
	NSArray *messages = [conversation getMessageFromLast:lastMsg limit:20];
```
	
### 删除会话

`WDGIMConversation` 中的 `- deleteConversation` 方法用于删除会话：
```objc
	BOOL result = [conversation deleteConversation];
 ```
 <blockquote class="notice">
  <p><strong>提示：</strong></p>
  删除会话的同时，默认会删除本地会话的相关消息。
</blockquote>
 