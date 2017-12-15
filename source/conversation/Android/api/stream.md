title: Stream
---

视频流对象。



## 方法

### attach()

**定义**   

```java
void attach(WilddogVideoView videoView)
```

**说明**

在传入的展示控件中展示当前视频流。

**参数**

| 参数名 | 描述 |
|---|---|
|videoView|[WilddogVideoView](/conversation/Android/api/wilddog-video-view.html),用户创建的视频展示控件,讲当前流在视频展示控件上播放。|


**示例**

```java
	WilddogVideoView local_video_view=(WilddogVideoView)findViewById(R.id.local_video_view);
	local_video_view.init(eglBaseContext, null);
        localRenderLayout.setPosition(0, 0, 50, 50);
        local_video_view.setZOrderMediaOverlay(true);
        local_video_view.setScalingType(RendererCommon.ScalingType.SCALE_ASPECT_FIT);
        local_video_view.setMirror(true);
        local_video_view.requestLayout();
	//为视频流绑定播放控件
	localStream.attach(local_video_view);
```

</br>

---

### detach()

**定义**

```java
void detach()
```

**说明**

将视频流从展示控件中解绑,停止在控件中显示当前视频流。

**示例**

```java
	//解绑视频控件
	stream.detach();
```
</br>

---
### enableAudio(boolean)

**定义**

```java
void enableAudio(boolean isEnable)
```

**说明**

代表流中的音频是否开启。

**示例**

```java
	//关闭流中的音频
	stream.enableAudio(false);
```
</br>

---
### enableVideo(boolean)

**定义**

```java
void enableVideo(boolean isEnable)
```

**说明**

代表流中的视频是否开启。

**示例**

```java
	//关闭流中的视频
	stream.enableVideo(false);
```
</br>

---


### setAttributes(attributes)

**定义**
   
```java
public void setAttributes(Map<String, String> attributes)
```
**说明**

用户可以在发流之前设置 localStream 的 attributes，远端用户可以在收到的 remoteStream 中拿到。
注意：此方法以 json 格式传输,传输长度限制在 2048 个字符以内,并且 remoteStream 设置 attributes 只本地生效。

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

得到 Stream 的自定义属性，数据类型为 map。

**返回值**
Stream 对应的自定义属性，数据类型为 map。

</br>

---

