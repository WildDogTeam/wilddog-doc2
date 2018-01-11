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
Builder dimension(Dimension dimension)
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

### defaultCameraSource(defaultCameraSource)

**定义**   

```java
defaultCameraSource(CameraSource defaultCameraSource)
```

**说明**

设置默认使用摄像头选项,默认为前置。

**参数**

| 参数名 | 描述 |
|---|---|
|defaultCameraSource|当前使用摄像头。|

**返回值**

当前媒体采集参数构建对象。

</br>

---

### maxFps(int)

**定义**   

```java
Builder maxFps(int maxFps)
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

### minBitrateBps(int)

**定义**   

```java
Builder minBitrateBps(int minBitrateBps)
```

**说明**

表示最小码率，不设置则使用系统默认值。最小值为 50bps，且不能大于最大码率。

**参数**

| 参数名 | 描述 |
|---|---|
|minBitrateBps|最小码率，单位：bps。|

**返回值**

当前媒体采集参数构建对象。

</br>

---


### maxBitrateBps(int)

**定义**   

```java
Builder maxBitrateBps(int maxBitrateBps)
```

**说明**

表示最大码率，不设置则使用系统默认值。最大值为 2Mbps，且不能小于最小码率。

**参数**

| 参数名 | 描述 |
|---|---|
|maxBitrateBps|最大码率，单位：bps。|

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

