title: Message
---
WilddogIM消息基类。其他消息继承于本类。



## 方法

### getMessageType（）

**定义**

```java
public int getMessageType()
```

**说明**

获取消息类型。

**返回值**

`int`返回指定消息类型。

</br>

---

### delete()

**定义**

```java
 public void delete()
```

**说明**

删除本地缓存的这条消息。
  

</br>

---  

### getMessageId()

**定义**

```java
 public String getMessageId()
```

**说明**

获取每条消息的唯一标识Id。

**返回值**

`String`返回消息标识的字符串。

</br>

---  

### getConversation()

**定义**

```java
 public Conversation getConversation()
```

**说明**

获取这条消息属于那个会话，发送的时候为空，收到的消息可以获取到。

**返回值**

`Conversation`返回当前消息的会话。

</br>

---  

### status()

**定义**

```java
public String status()
```

**说明**

获取这条消息的发送状态，状态有：1表示发送中SENDING，2表示发送成功SUCCESS，3表示发送失败FAILED 收到的消息默认为发送成功的状态



**返回值**

`String`返回消息状态的字符串。
</br>

---  
###  getSendAt()

**定义**

```java
public long getSendAt()
```

**说明**

获取发送或者接收消息的时间戳。

**返回值**

`long`返回时间戳。
</br>

--- 

###  getSender()

**定义**

```java
public String getSender()
```

**说明**

获取发送这条消息的发送人。





**返回值**

`String`返回发送消息的uid。
</br>

---  
###  newMessage(type,path)

**定义**

```java
public static ImageMessage newMessage(int type, String path)
```

**说明**

创建一个图片消息。

**参数**

参数名 | 描述
--- | ---
type | 消息类型
path | 图片存放路径


**返回值**

`ImageMessage`获取当前创建的图片消息对象。
</br>

--- 
### newMessage(duration,data)

**定义**

```java
public static VoiceMessage newMessage(int duration,byte[] data)
```

**说明**

创建一个语音消息。

**参数**

参数名 | 描述
--- | ---
duration | 语音消息长度
byte | 语音消息二进制数据

**返回值**

`VoiceMessage`获取当前创建的语音消息对象。

</br>

--- 
### newMessage(text)

**定义**

```java
public static TextMessage newMessage(String text)
```

**说明**

创建一个文字消息。

**参数**

参数名 | 描述
--- | ---
text | 要发送的文本信息


</br>

--- 
