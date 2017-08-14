title: LocalStream
---

`Stream` 子类，本地媒体流对象。
通过 `WilddogVideo` 的 `createLocalStream()` 方法获取到此对象实例。

</br>

---

## 方法

### setOnFrameListener()

**定义**
   
```java
void setOnFrameListener(WilddogVideo.CameraFrameListener listener)
```

**说明**

设置相机帧数据获取接口，在回调方法中可以获取视频流的帧数据(目前帧数据格式为 NV21 格式的 byte 数组 )。

**参数**

| 参数名 | 描述 |
|---|---|
|listener| [CameraFrameListener](/conversation/Android/api/camera-frame-listener.html) ,相机帧数据获取接口|

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
void switchCamera()
```

**说明**

用于前后置摄像头切换。


**示例**

```java
localStream.switchCamera();
```

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

### isClosed()

**定义**   

```java
boolean isClosed()
```

**说明**

判断当前视频流是否已经关闭,如果没有关闭,可以关闭,并且释放占用资源。


**示例**

```java
if(!localStream.isClosed()){
localStream.close();}
```

</br>

---
