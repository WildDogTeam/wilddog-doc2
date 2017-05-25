title: LocalStream
---

`Stream` 子类，本地媒体流对象。
通过 `WilddogVideo` 的 `createLocalStream()` 方法获取到此对象实例。

</br>

---

## 方法
### setOnFrameListener()

**定义**   

void setOnFrameListener(WilddogVideo.CameraFrameListener listener)

**说明**

设置相机帧数据获取接口，在回调方法中可以获取视频流的帧数据(目前帧数据格式为 NV21 格式的 byte 数组 )。

**参数**

| 参数名 | 描述 |
|---|---|
|listener| [CameraFrameListener](/video/Android/api/camera-frame-listener.html) ,相机帧数据获取接口|

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
