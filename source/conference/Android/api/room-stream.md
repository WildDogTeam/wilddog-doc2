title: RoomStream
---

远端媒体流描述信息及媒体流数据。

## 属性

### getStreamId()

**定义**

```java
public long getStreamId()
```

**说明**

远端媒体流的唯一标识。

</br>

---

### getStreamOwners()

**定义**

```java
public List<String> getStreamOwners()
```

**说明**

远端媒体流的发布者。

</br>

---

### attach(videoView)

**定义**
   
```java
public void attach(WilddogVideoView videoView)
```
**说明**

在指定的 [WilddogVideoView](/conference/Android/api/wilddog-video-view.html) 中显示媒体流。

**参数**

| 参数名 | 描述 |
|---|---|
| videoView | 请参考：[WilddogVideoView](/conference/Android/api/wilddog-video-view.html)。|

</br>

---

### detach()

**定义**
   
```java
public void detach()
```
**说明**

解除媒体流与 [WilddogVideoView](/conference/Android/api/wilddog-video-view.html) 的绑定，停止播放。

**参数**

| 参数名 | 描述 |
|---|---|
| videoView | 请参考：[WilddogVideoView](/conference/Android/api/wilddog-video-view.html)。|

</br>

---