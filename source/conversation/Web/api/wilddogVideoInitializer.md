title: wilddogVideo
---

`wilddogVideo.call()` 是WilddogVideoCall SDK 的主入口，通过wilddogVideo可以初始化，创建 `WilddogVideoCall` 实例及创建本地媒体流等操作。

## 方法

### initialize({'appId':<videoAppId>,'token': <token>})

**定义**

```javascript
	wilddogVideo.initialize({'appId':<videoAppId>,'token': <token>});
```

**说明**

初始化 `wilddogVideo`。

**参数**

| 参数名 | 描述 |
|---|---|
| appId | 在野狗控制面板创建 App 后分配的 Video AppID。 |
| token | 通过 `WilddogAuth` 验证登录后获取的 [Wilddog ID token](/auth/Web/guide/concept.html#身份认证令牌)。 |

</br>

---

### call()

**定义**

```javascript
	wilddogVideo.call();
```

**说明**

创建 `WilddogVideoCall`实例对象

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
| captureAudio | `Boolean` 类型。<br>如果为 `true`，则媒体流中包含声音。<br>如果为 `false`，则媒体流中不包含声音。|
| captureVideo | `Boolean` 类型。<br>如果为 `true`，则媒体流中包含视频。<br>如果为 `false`，则媒体流中不包含视频。|
| dimension | `String` 类型。<br>可以设置的值及对应分辨率如下：<br>`360p` - 480X360<br>`480p` - 640X480<br>`720p` - 1280X720<br>`1080p` - 1920X1080 |
| maxFPS| `Integer` 类型 。 自定义传输视频的最大帧率。|

</br>

**示例**

```js
//创建本地媒体流（有声音，低画质）
wilddogVideo.createLocalStream({
        captureAudio: true,
        captureVideo: true,
        dimension: '480p'
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

### setToken(token)

**定义**

```java
    wilddogVideo.setToken(token)
```
**说明**

重新设置 token 。

**参数**
<style>
table th:first-of-type {
    width: 100px;
}
</style>

| 参数名 | 描述 |
|---|---|
| token | 通过 `WilddogAuth` 验证登录后获取的 [Wilddog ID token](/auth/Web/guide/concept.html#身份认证令牌)。 |

</br>

---
