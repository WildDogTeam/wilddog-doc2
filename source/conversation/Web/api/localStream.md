title: LocalStream
---

## 方法

### attach

**定义**

```js
attach(element)
```

**说明**

将本地媒体流绑定到页面中的元素上。

**参数**

| 参数名 | 说明 |
|---|---|
| element | `document.Element` 类型。页面中的元素。 |

**示例**

```js
//将本地的媒体流绑定到id为'localStream'的页面元素上
localStream.attach(document.getElementById('localStream'));
```

</br>

---

### detach

**定义**

```js
detach(element)
```

**说明**

将本地媒体流从页面中的元素上解绑。

**参数**

| 参数名 | 说明 |
|---|---|
| element | `document.Element` 类型。页面中的元素。 |

**示例**

```js
//将本地媒体流从页面中的元素上解绑
localStream.detach(document.getElementById('localStream'));
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
localStream.enableAudio(true);
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
localStream.enableVideo(true);
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
localStream.close();
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

---

### switchCamera

**定义**

```javascript
roomInstance.switchCamera()
```

**说明**

切换摄像头。

**返回值**

Promise<isSupportSwitch>

**示例**

```js
localStream.switchCamera().then(function (isSupportSwitch) {
    if (isSupportSwitch === true) {
        // 支持通话中动态切换
    } else {
        // 不支持通话中动态切换，需重新发布该流（```roomInstance.unpublish(localStream); roomInstance.publish(localStream)```）
    }
}).catch(function () {

})
```

</br>

<blockquote class="notice">
  <p><strong>提示：</strong></p>

在多人通话的场景中，由于存在兼容性问题，远端的浏览器只有iOS11和Mac下的的safari、PC下的Firefox能平滑的收到本地切换摄像头后的流。

</blockquote>
