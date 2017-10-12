title: WilddogVideoCall.Listener
----------------------------

`WilddogVideoCall` 呼叫状态回调,当 `WilddogVideoCall` 收到呼叫会触发相应的方法。

## 方法

### onCalled(Conversation, String);

**定义**   

```java
void onCalled(Conversation conversation, String data);
```

**说明**

`WilddogVideoCall` 接收到视频通话呼叫时触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|conversation|[Conversation](/conversation/Android/api/conversation.html) 对象|
|data|呼叫方携带附加信息|

</br>

---

### onTokenError(WilddogVideoError);

**定义**   

```java
void onTokenError(WilddogVideoError error);
```

**说明**

视频通话token错误回调,一般由于Token过期等原因导致。

**参数**

| 参数名 | 描述 |
|---|---|
|error|[WilddogVideoError](/conversation/Android/api/wilddog-video-error.html) 对象|
