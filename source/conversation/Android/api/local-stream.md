title: LocalStream
---
用户设备采集的本地媒体流。全局单例，通过 `create()` 方法创建本地媒体流之后，可以通过 `getInstance()` 方法多次获取本地媒体流实例。
 
</br>

---

### isClosed()

**定义**   

```java
boolean isClosed()
```

**说明**

判断当前视频流是否已经关闭,如果没有关闭,可以关闭,并且释放占用资源。

</br>

---


## 方法

### create(options)
**定义**
   
```java
public static LocalStream create(LocalStreamOptions options)
```
**说明**

创建本地媒体流。

**参数**

| 参数名 | 描述 |
|---|---|
| options | 本地媒体流创建配置参数，可以使用默认值进行创建。请参考：[LocalStreamOptions](/conversation/Android/api/local-stream-options.html) |

**返回值**

LocalStream 实例对象。

**示例**

```java
	LocalStreamOptions options = new LocalStreamOptions.Builder().build();
	LocalStream localStream = LocalStream.create(options);
```

</br>

---


### getInstance()

**定义**
   
```java
    public static LocalStream getInstance()
```
**说明**

获取已创建的本地媒体流实例对象。

注意：此方法必须在`create()` 方法调用后使用，如当前未调用 `create()` 方法进行创建则抛出 `NullPointerException` 异常。

**返回值**

LocalStream 实例对象。

**示例**

```java
    localStream = LocalStream.getInstance();
```

</br>

---



### setOnFrameListener()

**定义**
   
```java
    public void setOnFrameListener(CameraFrameListener listener)
```

**说明**

设置相机帧数据获取接口，在回调方法中可以获取视频流的帧数据(目前帧数据格式为 NV21 格式的 byte 数组 )。

**参数**

| 参数名 | 描述 |
|---|---|
|listener| 相机帧数据获取接口，请参考：[CameraFrameListener](/conversation/Android/api/camera-frame-listener.html)|

**示例**

```java
	localStream.setOnFrameListener(new LocalStream.CameraFrameListener() {
	    @Override
	    public void onByteFrame(byte[] bytes, int width, int height) {
	        //处理帧数据的方法
	        //frameProcess(bytes);
	    }
	});
```

</br>

---

### switchCamera()

**定义**   

```java
    public void switchCamera()
```

**说明**

用于前后置摄像头切换。


**示例**

```java
    localStream.switchCamera();
```

</br>

---

### capturePicture(listener, isMirroring)

**定义**   

```java
    public void capturePicture(CompleteListener listener, boolean isMirroring)
```

**说明**

实现对本地流的拍照功能。


**参数**

| 参数名 | 描述 |
|---|---|
| listener | 拍照完成回调接口。|
| isMirroring | localview 是否设置了镜像。|


</br>

---

### setFlashMode(flashMode)

**定义**
   
```java
public void setFlashMode(FlashMode flashMode)
```
**说明**

设置闪光灯模式。

**参数**

| 参数名 | 描述 |
|---|---|
| flashMode | 设置闪光灯模式，默认关闭。|

</br>

---

### setAudioBufferListener(listener)

**定义**
   
```java
public void setAudioBufferListener(AudioBufferListener listener)
```
**说明**

设置本地音频流回调，回调方法中获得本地音频数据。

**参数**

| 参数名 | 描述 |
|---|---|
| listener | 本地音频流回调接口。|

</br>

---

### removeAudioBufferListener()

**定义**
   
```java
public void removeAudioBufferListener()
```
**说明**

移除本地音频流回调监听。


</br>

---

### attach(videoView)

**定义**
   
```java
public void attach(WilddogVideoView videoView)
```
**说明**

在指定的 [WilddogVideoView](/conversation/Android/api/wilddog-video-view.html) 中显示媒体流。

**参数**

| 参数名 | 描述 |
|---|---|
| videoView | 请参考：[WilddogVideoView](/conversation/Android/api/wilddog-video-view.html)。|

</br>

---

### detach()

**定义**
   
```java
public void detach()
```
**说明**

解除媒体流与 [WilddogVideoView](/conversation/Android/api/wilddog-video-view.html) 的绑定，停止播放。

**参数**

| 参数名 | 描述 |
|---|---|
| videoView | 请参考：[WilddogVideoView](/conversation/Android/api/wilddog-video-view.html)。|

</br>

---

### close()

**定义**   

```java
void close()
```

**说明**

关闭本地流,释放占用资源。


**示例**

```java
    localStream.close();
```

</br>

---

