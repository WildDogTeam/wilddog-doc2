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

