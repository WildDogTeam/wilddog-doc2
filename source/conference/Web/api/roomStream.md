title: RoomStream
---
远端流媒体描述信息及流媒体书剧

## 属性

### streamId
**定义**
```
roomStream.streamId
```

**说明**
远端媒体流的唯一标识

---

### streamOwners
**定义**
```
roomStream.streamOwners
```

**说明**
远端媒体流的发布者。

---
## 方法

### attach

**定义**

```js
roomStream.attach(element)
```

**说明**

将远端媒体流绑定到页面中的元素上。

**参数** 

| 参数名 | 说明 |
|---|---|
| element | `document.Element` 类型。页面中的元素。 |

**示例**

```js
//将远端的媒体流绑定到id为'remoteStream'的页面元素上
remoteStream.attach(document.getElementById('remoteStream'));
```

</br>

---

### detach

**定义**

```js
detach()
```

**说明**

将远端媒体流从页面中的元素上解绑。

**示例**

```js
//将远端媒体流从页面中的元素上解绑
remoteStream.detach();
```

</br>

---

### enableAudio

**定义**

```js
enableAudio(enabled)
```

**说明**

开启或禁用音频。

**参数** 

| 参数名 | 说明 |
|---|---|
| enabled | `Boolean` 类型。 `true` 为启用音频，`false` 为禁用音频。 |

**示例**

```js
//开启参与者的音频
remoteStream.enableAudio(true);
```

</br>

---

### enableVideo

**定义**

```js
enableVideo(enabled)
```

**说明**

开启或禁用视频。

**参数** 

| 参数名 | 说明 |
|---|---|
| enabled | `Boolean` 类型。`true` 为启用视频，`false` 为禁用视频。 |

**示例**

```js
//开启参与者的视频
remoteStream.enableVideo(true);
```
</br>
