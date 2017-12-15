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

### setAttributes(attributes)

**定义**
   
```java
public void setAttributes(Map<String, String> attributes)
```
**说明**

用户可以在发流之前设置 localStream 的 attributes，远端用户可以在收到的 remoteStream 中拿到。
注意：remoteStream 设置 attributes 只有本地生效。

**参数**

| 参数名 | 描述 |
|---|---|
| attributes | key 和 value 都为字符串的 Map。|

</br>

---

### getAttributes()

**定义**
   
```java
public Map<String, String> getAttributes()
```
**说明**

得到 remoteStream 的自定义属性，数据类型为 map。

**返回值**
remoteStream 对应的自定义属性，数据类型为 map。

</br>

---