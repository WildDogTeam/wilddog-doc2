title: WDGRoomStreamDelegate
---

`WDGRoomStream` 的代理方法，用于通知远端媒体流的变化。

## 方法

### - wilddogRoomStream: haveOwnersJoined:

**定义**

```objectivec
- (void)wilddogRoomStream:(WDGRoomStream *)roomStream haveOwnersJoined:(NSArray *)owners;
```

**说明**

`WDGRoomStream` 通过调用该方法通知代理有参与者加入媒体流，只在 MCU 模式下有效。

**参数**

参数名             | 说明 
------------------|------------------
roomStream        | 调用该方法的 `WDGRoomStream` 实例。
owners            | 加入房间的参与者列表。

</br>

---

### - wilddogRoomStream: haveOwnersLeaved:

**定义**

```objectivec
- (void)wilddogRoomStream:(WDGRoomStream *)roomStream haveOwnersLeaved:(NSArray *)owners;
```

**说明**

`WDGRoomStream` 通过调用该方法通知代理有参与者离开媒体流，只在 MCU 模式下有效。

**参数**

参数名             | 说明 
------------------|------------------
roomStream        | 调用该方法的 `WDGRoomStream` 实例。
owners            | 离开房间的参与者列表。

</br>

---
