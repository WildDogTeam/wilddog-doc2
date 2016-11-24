title: 消息收发
---

本篇文章主要介绍 Wilddog IM SDK 的消息收发和会话操作。

* 1.发送消息
* 2.接收消息
* 3.消息属性
* 4.会话操作

### 发送消息

####  会话获取

会话是指面向一个人或者一个群组的对话，发消息时首先需要先获取会话，会话的获取通过 `-newConversationWithMembers:completion` 方法来实现，比如创建一个单聊会话：

```objc
[[WDGIMClient defaultClient] newConversationWithMembers:@[@"WilddogUserId"] completion:^(WDGIMConversation * _Nullable conversation, NSError *__autoreleasing  _Nullable * _Nullable error) {
   //...
}];

```

#### 创建文本消息

WDGIMConversation 会话创建成功后，可以通过 `-sendMessage:completion:` 方法来发送消息。例如，发送一个文本消息：

```objc
WDGIMMessageText *textMsg = [WDGIMMessage messageWithText:@"Hi, Wilddog!"];
```

#### 创建图片消息

图片消息由 WDGIMMessageImage 定义，它是 WDGIMMessage 的一个子类。
 
```objc
// 创建图片消息
WDGIMMessageImage *imageMsg = [WDGIMMessage messageWithImagePath:picPath];
```

#### 创建语音消息

语音消息由 WDGIMMessageVoice 定义，它是 WDGIMMessage 的一个子类。
 
```objc
// 创建语音消息
WDGIMMessageVoice *voiceMsg = [WDGIMMessage messageWithVoiceData:voiceData duration:voiceDuration];
```

#### 发送消息：

结合以上方法，就可以发送信息：

```objc
// 回调中可以获取消息的发送状态
WDGIMMessageText *textMessage = [WDGIMMessage messageWithText:@"Hi, Wilddog!"];
[conversation sendMessage:textMessage completion:^(WDGIMMessage * _Nullable msg, NSError * _Nullable err) {
     //...       
}];
```

### 接收消息

接收消息需要调用 WDGIMClientDelegate 中的代理方法 `- wilddogClient:didRecieveMessages:` ，如果用户是登录状态，SDK 会通过此回调方法收到新消息。

#### 注册监听

设置代理之后，用实例方法注册监听

```objc 
- (void)wilddogClient:(WIMClient *)client didRecieveMessages:(NSArray<WIMMessage *> *)messages
{
	//消息解析
}
```
	
#### 消息解析

实现 WDGIMClientDelegate 的 `- wilddogClient:didRecieveMessages:` 方法，从 messages 集合中能获取所有的新的聊天消息。

```objc
- (void)wilddogClient:(WDGIMClient *)client didRecieveMessages:(NSArray<WDGIMMessage *> *)messages
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

### 消息属性

#### 消息状态

通过 WDGIMMessage 的 messageStatus 属性可以获取当前消息的状态，如发送中、发送成功、发送失败和删除，对于删除的消息，需要 UI 判断状态并隐藏。

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

##### 消息时间

通过 `sentAt` 方法可以获取到消息的发送时间。该时间是服务器时间，而非本地时间。

```
@property (nonatomic, readonly) long long sentAt
```

#### 消息 ID

消息 ID 是由服务器统一生成的有序 ID。

	@property (nonatomic, readonly) NSString *messageId
	
#### 消息发送者

消息的发送方的 ID。

	@property (nonatomic, readonly) NSString *sender
	
#### 消息删除

删除消息只支持本地消息删除，调用 `-deleteMessage` 方法来删除。

	- (BOOL)deleteMessage;

###  会话操作

#### 获取所有会话

调用 `-getConversations` 方法可以获取本地所有会话列表，例如：

	NSArray *conversations = [[WDGIMClient defaultClient] getConversations];
	
#### 获取会话本地消息

通过 WDGIMConversation 中的 `- getMessageFromLast:limit:` 方法可以获取本地历史消息，可以实现分页拉取。此方法为同步方法，例如:

	NSArray *messages = [conversation getMessageFromLast:lastMsg limit:20];
	
#### 删除会话

通过 WDGIMConversation 中的 `- deleteConversation` 方法删除会话。删除会话的同时，默认会删除本地会话的相关消息。

	BOOL result = conversation.deleteConversation;
 
 
 