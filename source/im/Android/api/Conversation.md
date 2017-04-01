title: Conversation
---
会话对象，进行成员管理和消息发送。



## 方法

### addMember(members)

**定义**

```java
public void addMember(List<String> members)
```

**说明**

添加会话成员的方法，针对讨论组有效。

**参数**

参数名 | 描述
--- | ---
members | 要添加成员uid列表。

</br>

---

### removeMember(members)

**定义**

```java
public void removeMember(List<String> members)
```

**说明**

移除会话成员的方法，针对讨论组有效。
  
**参数**

参数名 | 描述
--- | ---
members | 要移除成员uid列表。

</br>

---  

### delete()

**定义**

```java
 public void delete()
```

**说明**

删除本地会话对象。当来新消息会再次出现。


</br>

---  

### markAllMessagesAsRead()

**定义**

```java
public void markAllMessagesAsRead()
```

**说明**

将当前会话的所有消息置为已读。


</br>

---  

### getMessagesFromLast(lastMessage,limit)

**定义**

```java
 public List<Message> getMessagesFromLast(Message lastMessage, int limit)
```

**说明**

本方法从本地拉取历史记录，limit表示数量。lastMessage表示拉取的最后一条消息，如果为空表示获取最新的一定数量的聊天记录。

**参数**

参数名 | 描述
--- | ---
lastMessage | 获取此消息之前的一定数量的消息
limit | 获取消息的数量

**返回值**

`List<Message>`返回指定数量的消息集。
</br>

---  
###  getLastMessage()

**定义**

```java
public Message getLastMessage()
```

**说明**

获取这个会话的最后一条消息

**返回值**

`Message`返回最后一条消息记录。
</br>

--- 

###  getMembers()

**定义**

```java
 public List<String> getMembers()
```

**说明**

获取会话的所有成员的Id





**返回值**

`List<String>`返回当前会话成员。
</br>

---  
### getTotalUnreadMessageCount()

**定义**

```java
public int getTotalUnreadMessageCount()
```

**说明**

获取当前会话的未读消息记录数。



**返回值**

`int`获取当前会话的未读消息记录数。
</br>

--- 
### getConversationId()

**定义**

```java
 public String getConversationId()
```

**说明**

获取本次会话的Id，可能是群或者单聊

</br>

--- 
### public void sendMessage(message,callback)

**定义**

```java
 public void sendMessage(Message message, final WildValueCallback callback)
```

**说明**

发送各种类型消息的方法。

**参数**

参数名 | 描述
--- | ---
message | 发送的消息对象，类别有文本，图片，语音等
callback | 发送消息成功的回调


</br>

--- 
