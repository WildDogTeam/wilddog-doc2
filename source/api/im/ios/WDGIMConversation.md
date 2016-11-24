title: WDGIMConversation 
---
WDGIMConversation 是 Wilddog IM SDK 会话类。

## 属性

### conversationId

**定义**

```objectivec
@property (nonatomic, readonly) NSString *conversationId;
```

**说明**

会话 ID。

</br>

------

### members

**定义**

```objectivec
@property (nonatomic, readonly) NSArray <NSString *>*members;
```

**说明**

会话成员 ID 数组。

</br>

------

### createAt

**定义**

```objectivec
@property (nonatomic, readonly) NSDate *createAt;
```

**说明**

会话创建时间(只有三个人以上聊天的会话，才有会话创建时间)。

</br>

------

### lastMessage

**定义**

```objectivec
@property (nonatomic, readonly) WDGIMMessage *lastMessage;
```

**说明**

会话的最后一条消息。

</br>

------

### totalNumberOfUnreadMessages

**定义**

```objectivec
@property (nonatomic, readonly) NSUInteger totalNumberOfUnreadMessages;
```

**说明**

该会话未读消息数。

</br>

------

## 方法

### - sendMessage:completion:

**定义**

```objective-c
- (BOOL)sendMessage:(WDGIMMessage *)message completion:(void (^) (WDGIMMessage *_Nullable msg, NSError *_Nullable err))completion
```

**说明**

发送消息主要方法。

**参数**

参数名 | 描述
-----|------
message | 要发送的消息
completion | 结果回调

**返回值**

发送是否成功，YES 为成功

</br>

------

### - addMembers:completion:

**定义**

```objective-c
- (BOOL)addMembers:(NSArray<NSString *> *)members completion:(void (^) (NSError *_Nullable error))completion;
```
 
**说明**

增加会话成员。
 
**参数**

参数名 | 描述
-----|------
members | 要增加的成员
error | 错误信息 

**返回值**

是否添加成功，YES 为成功

</br>

------

### - removeMembers:completion:

**定义**

```objective-c
- (BOOL)removeMembers:(NSArray<NSString *> *)members completion:(void (^) (NSError *_Nullable error))completion;
```

**说明**

移除会话成员。
  
**参数**

参数名 | 描述
-----|------
members | 要删除的成员
error | 错误信息 

**返回值**

是否移除成功，YES 为成功

</br>

------

### - deleteConversation

**定义**

```objective-c
- (BOOL)deleteConversation;
```

**说明**

移除本地会话，默认会删除本地的该会话所有消息。

**返回值**

是否移除成功，YES 为成功
  
</br>

------

### - getMessageFromLast:limit:

**定义**

```objective-c
- (nullable NSArray *)getMessageFromLast:(nullable WDGIMMessage *)message limit:(int)limit
```
  
**说明**

获取消息主要方法。

**参数**

参数名 | 描述
-----|------
message | 锚点消息
limit | 要取的条数

**返回值**

根据制定条数，所取到的早于锚点消息的消息数组
	
</br>

------

### - markAllMessagesAsRead:

**定义**

```objective-c
- (BOOL)markAllMessagesAsRead:(NSError * _Nullable * _Nullable)error
```
  
**说明**

标记该会话消息已读。

**参数**

参数名 | 描述
-----|------
error | 错误信息
		
**返回值**

标记是否成功，YES 为成功

