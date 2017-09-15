title: RecordingListener
---

服务端录制接口完成回调。

录制开启成功返回 fileName，否则返回错误信息

## 方法

### onComplete(fileName,videoError)

**定义**   

```java
	void onComplete(String fileName,WilddogVideoError videoError)
```

**说明**

相机生成预览帧时触发。

**参数**

| 参数名 | 描述 |
|---|---|
| fileName |录制文件名|
| videoError |错误信息|



