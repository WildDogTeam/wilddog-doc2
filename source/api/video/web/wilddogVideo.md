
title: wilddog.Video
---

Video 对象负责创建本地视频流和实例化 Client，它不能直接创建，只能通过 `wilddog.App` 实例的 `wilddog.Video()` 方法来获取它。

## 构造器

**定义**

```js
wilddog.Video()
```
**说明**

获取 `wilddog.Video` 实例。

**示例**

```js
var config = {
  syncURL: "https://<appId>.wilddogio.com",
  authDomain: "<appId>.wilddog.com"
};
wilddog.initializeApp(config);
//获取当前 app 的 video 实例 
var video = wilddog.video();
```

</br>

---

## 方法

### client

**定义**

```js
client()
```

**说明**

获取 [wilddog.video.Client](/api/video/web/wilddogVideoClient.html) 实例。

**返回**

[wilddog.video.Client](/api/video/web/wilddogVideoClient.html)

**示例**

```js
//获取 Client 对象
var client = wilddog.video.client();
```

</br>

---

### createStream

**定义**

```js
createStream(options)
```

**说明**

创建本地媒体流。

**参数** 

| 参数名 | 说明 |
|---|---|
| options | [StreamConstraints](/api/video/web/wilddogVideo.html#StreamConstraints) 类型，设置将要创建的本地媒体流属性。 |

**返回**

Promise.<[wilddog.video.LocalStream](/api/video/web/localStream.html)>

**示例**

```js
//创建本地媒体流（有声音，低画质）
videoInstance.createStream({
        audio: true,
        video: 'low'
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

## 常量

### StreamConstraints

**类型**

```js
Object
```

**说明**

设置将要创建的本地媒体流属性。

**参数**

| 参数名 | 说明 |
|---|---|
| audio | `Boolean` 类型。<br>如果为 `true`，则媒体流中包含声音。<br>如果为 `false`，则媒体流中不包含声音。|
| video | `Boolean` 或 `String` 类型。<br>如果为 `String` 类型，可以设置的值及对应分辨率如下：<br>`low` - 320X240<br>`low-16:9` - 320X180<br>`standard` - 640X480<br>`standard-16:9` - 640X360<br>`high-16:9` - 1280X720<br>如果为 `true`，则媒体流中包含视频且为 `standard` 格式。<br>如果为 `false`，则媒体流中不包含视频。 |

