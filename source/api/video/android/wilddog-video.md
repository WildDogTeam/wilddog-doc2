
title: WilddogVideo
---

`WilddogVideo` 对象是 Wilddog Video SDK 的核心,负责创建 `ConversationClient` 对象以及创建本地视频流。

`WilddogVideo` 对象为单例,维护着视频 SDK 全局上下文数据,每次通过 `getInstance()` 方法返回同一实例对象。在使用 Wilddog Video SDK 前,需要对 `WilddogVideo` 对象进行初始化。

## 方法

### initializeWilddogVideo(Context)

**定义**   

```java
static void initializeWilddogVideo(Context context)
```

**说明**

使用 `WilddogVideo` 类之前需要对其进行初始化操作,调用 `initializeWilddogVideo` 方法初始化 `WilddogVideo`。若使用前未调用初始化则抛出 `IllegalArgumentException`。

**参数**

| 参数名 | 描述 |
|---|---|
|context|Android 应用 `Application Context`,通常使用 `getApplicationContext()` 方法获取|

**示例**

```java
	WilddogVideo.initializeWilddogVideo(getApplicationContext());
```

</br>

---

### getInstance()

**定义**   

```java
static WilddogVideo getInstance()
```

**说明**

负责创建 `WilddogVideo` 对象,如已存在实例对象则直接返回,如不存在则创建一个新的 `WilddogVideo` 对象。

**返回值**

[WilddogVideo](/api/video/android/wilddog-video.html)

**示例**

```java
	WilddogVideo video = WilddogVideo.getInstance();
```

</br>

---

### getClient()

**定义**   

```java
ConversationClient getClient()
```

**说明**

通过本方法获取全局 `ConversationClient` 对象。

**返回值**

[ConversationClient](/api/video/android/conversation-client.html)

**示例**

```java
	//WilddogVideo video = WilddogVideo.getInstance();
	//获取client对象
	client = video.getClient();
```

</br>

---

### createLocalStream(LocalStreamOptions,EglBase.Context,CompleteListener)

**定义**   

```java
public LocalStream createLocalStream(LocalStreamOptions options, EglBase.Context context, CompleteListener listener)
```

**说明**

通过本方法获取本地视频流对象。

| 参数名 | 描述 |
|---|---|
|options|LocalStreamOptions 对象，视频流参数|
|context|WebRTC EglBase.Context 对象|
|listener|CompleteListener 对象|

**返回值**

[LocalStream](/api/video/android/local-stream.html)

**示例**

```java
localStream = video.createLocalStream(LocalStreamOptions.DEFAULT_OPTIONS, eglBase.getEglBaseContext(), new CompleteListener() {
    @Override
    public void onSuccess() {

    }

    @Override
    public void onError(VideoException e) {

    }
});
```

