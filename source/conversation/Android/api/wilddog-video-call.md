
title: WilddogVideoCall
---

`WilddogVideoCall` 对象是 Wilddog Video SDK 的核心,负责创建 `Conversation` 对象以及创建本地视频流。

`WilddogVideoCall` 对象为单例,维护着视频 SDK 全局上下文数据,每次通过 `getInstance()` 方法返回同一实例对象。在使用 Wilddog Video Call SDK 前,需要对 `WilddogVideoCall` 对象进行初始化。

## 方法

### getInstance()

**定义**   

```java
static WilddogVideoCall getInstance()
```

**说明**

负责创建 `WilddogVideoCall` 对象,如已存在实例对象则直接返回,如不存在则创建一个新的 `WilddogVideoCall` 对象。

**返回值**

[WilddogVideoCall](/conversation/Android/api/wilddog-video-call.html)

**示例**

```java
	WilddogVideoCall video = WilddogVideoCall.getInstance();
```

</br>

---

### setListener(Listener)

**定义**   

```java
void setListener(Listener listener)
```

**说明**

用于设置通话请求的监听和连接服务器Token错误的回调.

**参数**

| 参数名 | 描述 |
|---|---|
|listener|[WilddogVideoCall.Listener](/conversation/Android/api/wilddog-video-call-listener.html),一对一视频通话邀请监听,监听当前邀请状态|

**示例**

```java
	WilddogVideoCall video = WilddogVideoCall.getInstance();
	video.setListener(listener);
```

</br>

---

###  call(String, LocalStream, WilddogVideoCallOption)

**定义**   

```java
Conversation call(String uid, LocalStream localStream, WilddogVideoCallOption option)
```



**说明**

呼叫其他人加入一对一视频通话,对方接受邀请将创建一个新一对一视频通话。

**参数**

| 参数名 | 描述 |
|---|---|
|uid|String类型,用户身份的唯一标示|
|localStream|本地创建的媒体流对象|
|option|通话时附加信息操作对象|

**返回值**

[Conversation](/conversation/Android/api/conversation.html)


---

###  start()

**定义**   

```java
void start()
```

**说明**

与服务器建立连接，会进行token验证，常在调用stop()之后调用，默认初始化会自动调用。


**示例**

```java
    video.start();
```

</br>

---

###  stop()

**定义**   

```java
void stop()
```

**说明**

与服务器断开连接，不再收到一对一视频通话邀请。

**示例**

```java
    video.stop();
```

</br>


