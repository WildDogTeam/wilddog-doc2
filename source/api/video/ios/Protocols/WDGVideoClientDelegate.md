title: WDGVideoClientDelegate
---

[WDGVideoClient](../Classes/WDGVideoClient.html) 的代理方法。

## 方法

### -wilddogVideoClient:didReceiveInvite:

**定义**

```objectivec
- (void)wilddogVideoClient:(nonnull WDGVideoClient *)videoClientdidReceiveInvite:(nonnull WDGVideoIncomingInvite *)invite;
```

**说明**

[WDGVideoClient](../Classes/WDGVideoClient.html) 通过调用该方法通知当前用户收到新的视频会话邀请。

**参数**

 参数名 | 说明 
---|---
videoClient|调用该方法的 [WDGVideoClient](../Classes/WDGVideoClient.html) 实例。
invite|代表收到的邀请的 [WDGVideoIncomingInvite](../Classes/WDGVideoIncomingInvite.html) 实例。

</br>

---

### -wilddogVideoClient:inviteDidCancel:

**定义**

```objectivec
- (void)wilddogVideoClient:(nonnull WDGVideoClient *)videoClientinviteDidCancel:(nonnull WDGVideoIncomingInvite *)invite;
```

**说明**

[WDGVideoClient](../Classes/WDGVideoClient.html) 通过调用该方法通知当前用户之前收到的某个邀请被邀请者取消。

**参数**

 参数名 | 说明 
---|---
videoClient|调用该方法的 [WDGVideoClient](../Classes/WDGVideoClient.html) 实例。
invite|代表被取消的邀请的 [WDGVideoIncomingInvite](../Classes/WDGVideoIncomingInvite.html) 实例。
