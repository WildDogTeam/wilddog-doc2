title: WilddogVideoClient.Listener
---

`WilddogVideoClient` 邀请状态回调,当 `WilddogVideoClient` 邀请状态改变时会触发相应的方法。

## 方法

### onIncomingInvite(WilddogVideoClient, IncomingInvite)

**定义**   

```java
void onIncomingInvite(WilddogVideoClient client, IncomingInvite incomingInvite)
```

**说明**

`WilddogVideoClient` 接收到视频通话邀请时触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|client|[WilddogVideoClient](/api/video/android/wilddog-video-client.html) 对象|
|incomingInvite|等待接受的[IncomingInvite](/api/video/android/incoming-invite.html)视频通话邀请对象|

</br>

---

### onIncomingInviteCanceled(WilddogVideoClient, IncomingInvite)

**定义**   

```java
void onIncomingInviteCanceled(WilddogVideoClient client, IncomingInvite incomingInvite)
```

**说明**

视频通话发起者取消邀请时触发此方法。

**参数**

| 参数名 | 描述 |
|---|---|
|client|[WilddogVideoClient](/api/video/android/wilddog-video-client.html) 对象|
|incomingInvite|被取消的[IncomingInvite](/api/video/android/incoming-invite.html)视频通话邀请对象|
