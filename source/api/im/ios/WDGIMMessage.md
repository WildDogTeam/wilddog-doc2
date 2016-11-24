title: WDGIMMessage 
---
WDGIMMessage 是 Wilddog IM SDK 消息类。

## 属性

### messageId

**定义**

```objectivec
@property (nonatomic, readonly) NSString *messageId;
```

**说明**

消息 ID。

</br>

------

### messageStatus

**定义**

```objectivec
@property (nonatomic, readonly) WDGIMMessageStatus messageStatus;
```

**说明**

消息状态。

</br>

------

### messageType

**定义**

```objectivec
@property (nonatomic, readonly) WDGIMMessageType messageType;
```

**说明**

消息类型。

</br>

------

### conversation

**定义**

```objectivec
@property (nonatomic, readonly) WDGIMConversation *conversation;
```

**说明**

消息所属会话。

</br>

------

### sentAt

**定义**

```objectivec
@property (nonatomic, readonly) long long sentAt;
```

**说明**

消息发送时间。

</br>

------

### sender

**定义**

```objectivec
@property (nonatomic, readonly) NSString *sender;
```

**说明**

消息的发送方的 ID。

</br>

------

## 方法

### + messageWithText:

**定义**

```objective-c
+ (WDGIMMessageText *)messageWithText:(nonnull NSString *)text
```

**说明**

构造文字消息。

**参数**

参数名 | 描述
-----|------
text | 要发送的文字

**返回值**

文字消息对象

</br>

------

### + messageWithImagePath:

**定义**

```objective-c
+ (WDGIMMessageImage *)messageWithImagePath:(nonnull NSString *)path;
```
 
**说明**

构造图片消息。
 
**参数**

参数名 | 描述
-----|------
path | 图片本地路径

**返回值**

图片消息对象

</br>

------

### - messageWithVoiceData:duration:

**定义**

```objective-c
+ (WDGIMMessageVoice *)messageWithVoiceData:(nonnull NSData *)data duration:(long)duration;
```

**说明**

构造语音消息。
  
**参数**

参数名 | 描述
-----|------
data | 语音数据
duration | 语音时长 

**返回值**

语音消息对象

</br>

------

### - deleteMessage

**定义**

```objective-c
- (BOOL)deleteMessage;
```

**说明**

删除本条信息。

**返回值**

删除消息成功，YES 为删除成功
  
</br>

------
