title: CameraFrameListener
---

相机帧数据获取接口，当开启摄像头进行预览时，相机生成的帧数据会触发 `onByteFrame` 方法将视频帧数据传递给调用者。
生成的帧数据默认为 NV21 格式的 byte 数组。

## 方法

### onByteFrame()

**定义**   

```java
void onByteFrame(byte[] data, int width, int height)
```

**说明**

相机生成预览帧时触发。

**参数**

| 参数名 | 描述 |
|---|---|
|data|byte 数组，当前相机的预览帧数据，通过操作此数组可以对视频画面进行美颜等处理|
|width|int 型，预览帧宽度|
|height|int 型，预览帧高度|



