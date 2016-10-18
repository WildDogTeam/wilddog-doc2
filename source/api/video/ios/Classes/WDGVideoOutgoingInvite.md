title: WDGVideoOutgoingInvite
---

表示自己发出的会话邀请。

## 属性

### toUserID

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull toUserID;
```

**说明**

被邀请者的用户 Wilddog ID 。

</br>

---

### conversationID

**定义**

```objectivec
@property (readonly, strong, nonatomic) NSString *_Nonnull conversationID;
```

**说明**

表示邀请参加的会议的编号。

</br>

---

### status

**定义**

```objectivec
@property (readonly, assign, nonatomic) WDGVideoInviteStatus status;
```

**说明**

表示当前邀请的状态。

</br>

---

## 方法

### -cancel

**定义**

```objectivec
- (void)cancel;
```

**说明**

调用此方法取消当前邀请。
