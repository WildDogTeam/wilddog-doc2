title: WDGVideoRemoteStreamStatsReport
---

远程视频流统计返回对象。

## 属性

### userID

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger userID;
```

**说明**

 统计信息对应的用户信息。

</br>

---

### width

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger width;
```

**说明**

 视频的宽度，以像素为单位。

</br>

---

### height

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger height;
```

**说明**

 视频的高度，以像素为单位。

</br>

---

### FPS

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger FPS;
```

**说明**

  视频的帧率。

</br>

---

### bytesReceived

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger bytesReceived;
```

**说明**

 远程视频流已接收的字节数。

</br>

---

### bitsReceivedRate

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger bitsReceivedRate;
```

**说明**

 远程视频流的接收速率，以 kbps 为单位。

</br>

---

### delay

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger delay;
```

**说明**

 远程视频流的延迟，以毫秒为单位。

</br>