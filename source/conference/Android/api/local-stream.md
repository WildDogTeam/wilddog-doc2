title: LocalStream
---
用户设备采集的本地媒体流。全局单例，通过 `create()` 方法创建本地媒体流之后，可以通过 `getInstance()` 方法多次获取本地媒体流实例。
 
</br>

---

## 属性

### getStreamId()

**定义**

```java
    public long getStreamId()
```

**说明**

本地媒体流唯一标识，由服务端生成。

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
| options | 本地媒体流创建配置参数，可以使用默认值进行创建。请参考：[LocalStreamOptions](/conference/Android/api/local-stream-options.html) |

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
|listener| 相机帧数据获取接口，请参考：[CameraFrameListener](/conference/Android/api/camera-frame-listener.html)|

**示例**

```java
	localStream.setOnFrameListener(new WilddogVideo.CameraFrameListener() {
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

### attach(videoView)

**定义**
   
```java
public void attach(WilddogVideoView videoView)
```
**说明**

在指定的 [`WilddogVideoView`](conference/Android/api/wilddog-video-view.html) 中显示媒体流。

**参数**

| 参数名 | 描述 |
|---|---|
| videoView | 请参考：[WilddogVideoView]()。|

</br>

---

### detach()

**定义**
   
```java
public void detach()
```
**说明**

解除媒体流与 [`WilddogVideoView`](conference/Android/api/wilddog-video-view.html) 的绑定，停止播放。

**参数**

| 参数名 | 描述 |
|---|---|
| videoView | 请参考：[WilddogVideoView]()。|

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

