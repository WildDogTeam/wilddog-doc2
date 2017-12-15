title: RoomStream
---
远端流媒体描述信息及媒体流数据

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
roomStream.attach(document.getElementById('remoteStream'));
```

</br>

---

### detach

**定义**

```js
detach(element)
```

**说明**

将远端媒体流从页面中的元素上解绑。

**参数**

| 参数名 | 说明 |
|---|---|
| element | `document.Element` 类型。页面中的元素。 |

**示例**

```js
//将远端媒体流从页面中的元素上解绑
roomStream.detach(element);
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
//开启远端音频
roomStream.enableAudio(true);
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
//开启远端视频
roomStream.enableVideo(true);
```
</br>

---

### close

**定义**

```js
close()
```

**说明**

关闭媒体流，关闭后不能继续使用。

**示例**

```js
//开启参与者的视频
roomStream.close();
```


</br>

---

### setAttributes

**定义**

```js
setAttributes(attributes);
```

**说明**

用户设置媒体流的自定义属性，自定义属性只有在发布时才会同步到远端。

**参数**

| 参数名 | 说明 |
|---|---|
| attributes | `json` 类型。大小限制：json 字符串长度不大于 2048 位。 |

**示例**

```js
//开启参与者的视频
localStream.setAttributes({id：123456});
```

</br>

---

### getAttributes

**定义**

```js
getAttributes();
```

**说明**

获取媒体流的自定义属性。

**示例**

```js
//开启参与者的视频
var atts = localStream.getAttributes();
// atts == {id：123456}  true
```
