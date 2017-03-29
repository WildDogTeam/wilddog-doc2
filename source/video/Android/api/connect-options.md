title: ConnectOptions
---

发起视频通话或连接到会议时使用的配置选项。

## 构造方法

**定义**   

```java
ConnectOptions（LocalStream localStream,String userData）
```

**说明**

视频通话和视频会议的参数对象，包含参数本地视频流和用户自定义数据。

**参数**

| 参数名 | 描述 |
|---|---|
|localStream|[LocalStream](/api/video/android/local-stream.html),本地参与者通过 `Video.createLocalStream` 获取的本地视频流。|
|userData|用户自定义数据，用户在加入视频通话和视频会议时，可以传递一个自定义字符串数据，其他参与者收到用户加入信息时可以解析此参数。|

</br>

---

## 属性


### getUserData()

**定义**   

```java
String getUserData()
```

**说明**

返回用户自定义数据。

**返回值**

用户自定义数据，字符串类型。

**示例**

```java
	String userData=options.getUserData();
```

</br>

---

### getLocalStream()

**定义**   

```java
LocalStream getLocalStream()
```

**说明**

获取自身的音频和视频流。

**返回值**

[LocalStream](/api/video/android/local-stream.html)

**示例**

```java
	LocalStream localStream=options.getLocalStream();
```
