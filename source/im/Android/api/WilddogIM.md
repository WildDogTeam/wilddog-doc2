title: WilddogIM
---
WilddogIM SDK 入口对象。进行登IM的一系列操作。



## 方法

### connect ()

**定义**

```java
public static WilddogIM connect()
```

**说明**

与服务器创建连接，可在在断开连接后与服务器再次建立连接。

**返回值**

`WilddogIM`返回当前WilddogIM对象。

---

### disconnect()

**定义**

```java
 public static WilddogIM disconnect()
```

**说明**

与服务端断开连接，将不再收到任何信息，除非重新连接
  



**返回值**

`WilddogIM`返回当前WilddogIM对象。

---
</br>

---  

### addConnectionListener(WilddogIMConnectionListener listener)

**定义**

```java
  public static WilddogIM addConnectionListener(WilddogIMConnectionListener listener)
```

**说明**

添加与服务端建立连接的监听，当断开连接或者建立连接的时候会触发方法。

**参数**

参数名 | 描述
--- | ---
listener | 连接状态的监听对象。


**返回值**

`WilddogIM`返回当前WilddogIM对象。
</br>

---  

### removeConnectionListener (WilddogIMConnectionListener listener)

**定义**

```java
  public static WilddogIM removeConnectionListener(WilddogIMConnectionListener listener)
```

**说明**

移除与服务端建立连接的监听，当断开连接或者建立连接的时候会触发方法。

**参数**

参数名 | 描述
--- | ---
listener | 连接状态的监听对象。

**返回值**

`WilddogIM`返回当前WilddogIM对象。
</br>

---  


### addMessageListener（listener）

**定义**

```java
 public  static WilddogIM addMessageListener(WilddogIMMessageListener listener)
```

**说明**

添加消息的监听，所有到来的消息都会触发这个方法，需要用户自己决定接受到消息后的处理。

**参数**

参数名 | 描述
--- | ---
listener | 监听聊天消息的接口。

**返回值**

`WilddogIM`返回当前WilddogIM对象。
</br>

--- 
### removeMessageListener(listener)

**定义**

```java
public  static WilddogIM removeMessageListener(WilddogIMMessageListener listener)
```

**说明**

移除消息监听。所有发来的消息将都不会触发。

**参数**

参数名 | 描述
--- | ---
listener | 监听聊天消息的接口。

**返回值**

`WilddogIM`返回当前WilddogIM对象。
</br>

--- 

### addGroupChangeListener（listener）

**定义**

```java
 public  static WilddogIM addGroupChangeListener(WilddogIMGroupChangeListener listener)
```

**说明**

添加群成员变化的监听，所有群成员变化都会触发这个方法。

**参数**

参数名 | 描述
--- | ---
listener | 监听群成员变化的接口。

**返回值**

`WilddogIM`返回当前WilddogIM对象。
</br>

--- 
### removeGroupChangeListener(listener)

**定义**

```java
public  static WilddogIM removeGroupChangeListener(WilddogIMGroupChangeListener listener)
```

**说明**

移除群成员变化的监听，所有群成员变化都会触发这个方法。

**参数**

参数名 | 描述
--- | ---
listener | 监听群成员变化的接口。

**返回值**

`WilddogIM`返回当前WilddogIM对象。
</br>

--- 

### newConversation (members，completionListener)

**定义**

```java
public static void newConversation(List<String> members,CompletionListener completionListener)
```

**说明**

会话的成员，默认不带自己，创建中我们会将本人放进去 如果成员数大于1位讨论组，等于1是单聊。

**参数**

参数名 | 描述
--- | ---
members | 创建会话的成员。
completionListener | 操作完成的回调。

</br>

--- 
### getConversation( id)

**定义**

```java
public static Conversation getConversation(String id)
```

**说明**

通过会话ID获取本地的会话对象。

**参数**

参数名 | 描述
--- | ---
id | 要获取会话的Id。

**返回值**

`Conversation`对象。
</br>

---
### getConversations()

**定义**

```java
public static List<Conversation> getConversations()
```

**说明**

获取会话列表的集合的方法。




**返回值**

`List<Conversation>`会话列表对象。
</br>

--- 
### getCurrentUser()

**定义**

```java
public static WilddogUser getCurrentUser()
```

**说明**

返回当前登录的用户的信息；



**返回值**

`WilddogUser`包含用户信息的对象。
</br>

---
### getWilddogIM ()

**定义**

```java
public static WilddogIM newInstance()
```

**说明**

获取当前WilddogIM对象。



**返回值**

`WilddogIM`返回当前WilddogIM对象。
</br>

---
### getVersion ()

**定义**

```java
public static String getVersion()
```

**说明**

获取当前SDK的版本号。
</br>

---  