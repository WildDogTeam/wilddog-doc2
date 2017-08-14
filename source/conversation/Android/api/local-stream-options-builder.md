title: LocalStreamOptions.Builder
-------------------------

设置多媒体采集参数的对象。

## 方法

### captureVideo(boolean)

**定义**   

```java
Builder captureVideo(boolean enable)
```

**说明**

设置本地视频流的视频开关,默认为开。

**参数**

| 参数名 | 描述 |
|---|---|
|enable|本地视频流的视频开关。|

**返回值**

当前媒体采集参数构建对象。

</br>

---

### captureAudio(boolean)

**定义**   

```java
Builder captureAudio(boolean enable)
```

**说明**

设置本地视频流的音频开关,默认为开。

**参数**

| 参数名 | 描述 |
|---|---|
|enable|本地视频流的音频开关。|

**返回值**

当前媒体采集参数构建对象。

</br>

---

### dimension(Dimension)

**定义**   

```java
public Builder dimension(Dimension dimension)
```

**说明**

设置视频质量选项,默认为480P。

**参数**

| 参数名 | 描述 |
|---|---|
|dimension|当前视频质量。|

**返回值**

当前媒体采集参数构建对象。

</br>

---

### maxFps(int)

**定义**   

```java
void maxFps(int maxFps)
```

**说明**

设置视频传输的最大帧率。

**参数**

| 参数名 | 描述 |
|---|---|
|maxFps|当前视频传输的最大帧率。|

**返回值**

当前媒体采集参数构建对象。

</br>

---

### build()

**定义**   

```java
LocalStreamOptions build()
```

**说明**

当前媒体采集对象的构造方法。

**返回值**

媒体采集参数对象。

</br>

---

