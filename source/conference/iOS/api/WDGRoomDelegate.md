title: WDGRoomDelegate
---

`WDGRoom` 的代理方法，用于通知 Room 相关的事件。

## 方法 

### - wilddogRoomDidConnect:

**定义**

```objectivec
- (void)wilddogRoomDidConnect:(WDGRoom *)wilddogRoom;
```

**说明**

加入 Room 成功后的回调。

**参数**

参数名             | 说明 
------------------|------------------
wilddogRoom       | 调用该方法的 `WDGRoom` 实例。请参考 [WDGRoom](/conference/iOS/api/WDGRoom.html)。

</br>

---

### - wilddogRoomDidDisconnect:

**定义**

```objectivec
- (void)wilddogRoomDidDisconnect:(WDGRoom *)wilddogRoom;
```

**说明**

离开 Room 后的回调。

**参数**

参数名             | 说明 
------------------|------------------
wilddogRoom       | 调用该方法的 `WDGRoom` 实例。请参考 [WDGRoom](/conference/iOS/api/WDGRoom.html)。

</br>

---

### - wilddogRoom: didStreamAdded: 

**定义**

```objectivec
- (void)wilddogRoom:(WDGRoom *)wilddogRoom didStreamAdded:(WDGRoomStream *)roomStream;
```

**说明**

Room 中有远端媒体流加入。回调中的 `WDGRoomStream` 对象只包含描述流的基本信息，不包含媒体数据，需要调用 `-[WDGRoom subscribeRoomStream:]` 方法获取媒体数据。

**参数**

参数名             | 说明 
------------------|------------------
wilddogRoom       | 调用该方法的 `WDGRoom` 实例。请参考 [WDGRoom](/conference/iOS/api/WDGRoom.html)。
roomStream        | Room 中新加入的远端媒体流，只包含描述流的基本信息，不包含媒体数据。请参考 [WDGRoomStream](/conference/iOS/api/WDGRoomStream.html)。

</br>

---

### - wilddogRoom: didStreamRemoved:

**定义**

```objectivec
- (void)wilddogRoom:(WDGRoom *)wilddogRoom didStreamRemoved:(WDGRoomStream *)roomStream;
```

**说明**

Room 中有远端媒体流停止发布。

**参数**

参数名             | 说明 
------------------|------------------
wilddogRoom       | 调用该方法的 `WDGRoom` 实例。请参考 [WDGRoom](/conference/iOS/api/WDGRoom.html)。
roomStream        | Room 中停止发布的远端媒体流。请参考 [WDGRoomStream](/conference/iOS/api/WDGRoomStream.html)。

</br>

---

### - wilddogRoom: didStreamReceived:

**定义**

```objectivec
- (void)wilddogRoom:(WDGRoom *)wilddogRoom didStreamReceived:(WDGRoomStream *)roomStream;
```

**说明**

收到远端媒体流数据。调用 `-[WDGRoomStream attach:]` 方法在 [VideoView](/conference/iOS/api/WDGVideoView.html) 中预览媒体流。

**参数**

参数名             | 说明 
------------------|------------------
wilddogRoom       | 调用该方法的 `WDGRoom` 实例。请参考 [WDGRoom](/conference/iOS/api/WDGRoom.html)。
roomStream        | 收到数据的远端媒体流。请参考 [WDGRoomStream](/conference/iOS/api/WDGRoomStream.html)。

</br>

---

### - wilddogRoom: didFailWithError:

**定义**

```objectivec
- (void)wilddogRoom:(WDGRoom *)wilddogRoom didFailWithError:(NSError *)error;
```

**说明**

Room 中发生错误。

**参数**

参数名             | 说明 
------------------|------------------
wilddogRoom       | 调用该方法的 `WDGRoom` 实例。请参考 [WDGRoom](/conference/iOS/api/WDGRoom.html)。
error             | 错误信息，通过错误码区分错误类型。请参考 [error-code](/conference/iOS/api/error-code.html)。

</br>

---
