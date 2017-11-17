title: wilddogVideo
---

用于初始化 WilddogVideoCall SDK 和 WilddogVideoRoom SDK。
`wilddogVideo.room` 是 WilddogVideoRoom SDK 的主入口，通过wilddogVideo可以初始化，创建 `WilddogVideoRoom` 实例及创建本地媒体流等操作。

## 方法

### initialize

**定义**

```javascript
	wilddogVideo.initialize({'appId':<videoAppId>,'token': <token>});
```

**说明**

初始化 `WilddogVideoRoom`。

**参数**

| 参数名 | 描述 |
|---|---|
| appId | 在野狗控制面板创建 App 后分配的 Video AppID。 |
| token | 通过 `WilddogAuth` 验证登录后获取的 [Wilddog ID token](/auth/Web/guide/concept.html#身份认证令牌)。 |

</br>

---

### room(roomId)

**定义**

```javascript
	wilddogVideo.room(roomId);
```

**说明**

使用 roomId 初始化 Room，同时指定接收 Room 事件的监听。

如果 Room 不存在，则服务端创建新 Room；否则加入已有 Room。

**参数**

| 参数名 | 描述 |
|---|---|
| roomId | Room的唯一标识。 |

**返回值**

`WilddogVideoRoom`实例

</br>

---

### room(roomId,url)

**定义**

```javascript
	wilddogVideo.room(roomId,url);
```

**说明**

使用 roomId 初始化 Room，同时指定接收 Room 事件的监听。

如果 Room 不存在，则服务端创建新 Room；否则加入已有 Room。

**参数**

| 参数名 | 描述 |
|---|---|
| roomId | Room的唯一标识。 |
| url | 字符串类型，代表连接的服务器海内外节点地址。|

**返回值**

`WilddogVideoRoom`实例

</br>

---

### createLocalStream(options)

**定义**

```js
createLocalStream(options)
```

**说明**

创建本地媒体流。

**参数**

| 参数名 | 说明 |
|---|---|
| captureAudio |`Boolean` 类型。必选参数<br>如果为 `true`，则媒体流中包含声音。<br>如果为 `false`，则媒体流中不包含声音。|
| captureVideo |`Boolean` 类型。必选参数<br>如果为 `true`，则媒体流中包含视频。<br>如果为 `false`，则媒体流中不包含视频。|
| dimension |`String` 类型。类型。必选参数<br>只能设置的值以及对应的分辨率如下：<br>`120p` - 160X120<br>`240p` - 320X240<br>`360p` - 480X360<br>`480p` - 640X480<br>`720p` - 1280X720<br>`1080p` - 1920X1080 |
| maxFPS|`Integer` 类型。可选参数<br>自定义传输视频的最大帧率，最大值为30。|

</br>

**示例**

```js
//创建本地媒体流
wilddogVideo.createLocalStream({
        captureAudio: true,
        captureVideo: true,
        dimension: '480p',
    })
    .then(function(localStream){
        //获取到localStream
    })
    .catch(function(err){
        console.log("Catch error! Error code is " + err);
    })
```

</br>

---

### createScreenStream()

**定义**

```js
createLocalStream()
```

**说明**

创建本地桌面或窗口媒体流，用于进行屏幕共享。注意：该媒体流只有视频流，无音频流，且视频流分辨率有窗口大小决定。

**示例**

```js
//创建本地桌面或窗口媒体流（无声音，固定画质）
wilddogVideo.createScreenStream()
    .then(function(screenStream){
        //获取到 screenStream
    })
    .catch(function(err){
        console.log("Catch error! Error code is " + err);
    })
```

</br>

<blockquote class="notice">
  <p><strong>提示：</strong></p>

chrome 内核浏览器会在页面上方提示下载扩展程序，下载后将文件拖拽到扩展程序管理的界面中，刷新页面即可使用。

</blockquote>

---
