title: WDGRemoteStream
---

表示通过 [WDGConversation](/conversation/iOS/api/WDGConversation.html) 传来的远端音频和视频流。

## 属性

### videoEnabled

**定义**

```objectivec
@property (nonatomic, assign) BOOL videoEnabled;
```

**说明**

表示是否播放远端媒体流的视频，默认为 YES。

</br>

---

### audioEnabled

**定义**

```objectivec
@property (nonatomic, assign) BOOL audioEnabled;
```

**说明**

表示是否播放远端媒体流的视频，默认为 YES。

</br>

---

## 方法

### - close

**定义**

```objectivec
- (void)close;
```

**说明**

关闭媒体流，媒体流被关闭后不能继续使用。

</br>

---

### - attach:

**定义**

```objectivec
- (void)attach:(WDGVideoView *)view;
```

**说明**

绑定媒体流与视图，使媒体流的视频在指定的 [WDGVideoView](/conversation/iOS/api/WDGVideoView.html) 中显示。

**参数**

 参数名 | 说明 
---|---
view | [WDGVideoView](/conversation/iOS/api/WDGVideoView.html) 实例，媒体流在该视图中播放。

</br>

---

### - detach:

**定义**

```objectivec
- (void)detach:(WDGVideoView *)view;
```

**说明**

解除媒体流与指定的 [WDGVideoView](/conversation/iOS/api/WDGVideoView.html) 的绑定，停止播放。

**参数**

 参数名 | 说明 
---|---
view | [WDGVideoView](/conversation/iOS/api/WDGVideoView.html) 实例，流在该视图中播放。
