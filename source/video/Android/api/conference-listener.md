title: Conference.Listener
---

会议状态回调,当会议连接状态改变和参与者状态改变时会触发回调方法通知使用者会议的状态。

## 方法

### onConnected(Conference)

**定义**   

```java
void onConnected(Conference conference)
```

**说明**

本地参与者与服务端成功建立连接后触发。

**参数**

| 参数名 | 描述 |
|---|---|
|conference|[Conference](/api/video/android/conference.html),连接建立成功后创建的会议对象|

</br>

---

### onConnectFailed(Conference, VideoException)

**定义**   

```java
void onConnectFailed(Conference conference, VideoException exception)
```

**说明**

本地参与者与服务端建立连接失败后触发。本方法仅会在无法与服务端建立连接时调用一次，如果成功建立连接后断开连接，则不会调用此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|conference|[Conference](/api/video/android/conference.html),调用 `WilddogVideoClient.connectToConference()` 方法时创建的会议对象|
|exception|[VideoException](/api/video/android/video-exception.html),会议建立连接失败信息|

</br>

---

### onDisconnected(Conference, VideoException)

**定义**   

```java
void onDisconnected(Conference conference, VideoException exception)
```

**说明**

与服务端连接建立成功后断开连接会触发此方法。此方法仅会在连接建立成功后调用，如果连接建立失败则直接调用 `onConnectFailed` 方法，不会触发此方法。
本地参与者主动断开连接或者其他原因引起的连接中断都会触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|conference|[Conference](/api/video/android/conference.html),调用 `WilddogVideoClient.connectToConference()` 方法时创建的会议对象|
|exception|[VideoException](/api/video/android/video-exception.html),会议建立连接失败信息|

</br>

---

### onParticipantConnected(Conference, Participant)

**定义**   

```java
void onParticipantConnected(Conference conference, Participant participant)
```

**说明**

收到远端参与者加入的信息后触发此方法，此时并未与远端参与者连接成功。

**参数**

| 参数名 | 描述 |
|---|---|
|conference|[Conference](/api/video/android/conference.html),调用 `WilddogVideoClient.connectToConference()` 方法时创建的会议对象|
|participant|[Participant](/api/video/android/participant.html),加入会议的远端参与者|

</br>

---

### onParticipantDisconnected(Conference, Participant)

**定义**   

```java
void onParticipantDisconnected(Conference conference, Participant participant)
```

**说明**

收到远端参与者离开的消息后会触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|conference|[Conference](/api/video/android/conference.html),调用 `WilddogVideoClient.connectToConference()` 方法时创建的会议对象|
|participant|[Participant](/api/video/android/participant.html),会议的远端参与者|

</br>

