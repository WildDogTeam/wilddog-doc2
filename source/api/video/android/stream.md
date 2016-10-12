title: Stream
---


视频流对象。

## 属性

所有属性均有get/set方法。

### mediaStream

视频流对象中的 MediaStream 视频流

### uid

表示流发送者身份的 uid,即 Wilddog ID

### senderId

标识流身份的 senderId,由用户自定义生成,建议使用野狗mRef.push.getKey()方法获取

**** 

## 方法

### attach



**定义**   

void attach(VideoRenderer.Callbacks callbacks)

**说明**

在传入的展示控件中展示当前视频流。

**参数**

| 参数名 | 描述 |
|---|---|
|callbacks|VideoRenderer.Callbacks,用户定义的 `VideoRenderer.Callbacks` 对象,在此范围内显示视频流|


**示例**

```java
	//VideoRenderer.Callbacks localCallbacks=VideoRendererGui
		.createGuiRenderer(0, 0, 50, 100, RendererCommon.ScalingType.SCALE_ASPECT_FILL, true);
	//为视频流绑定播放控件
	stream.attach(localCallbacks);
```

**** 

### detach()



**定义**   

void detach()

**说明**

将视频流从展示控件中解绑,停止在控件中显示当前视频流。

**示例**

```java
	//解绑视频控件
	stream.detach();
```

****
