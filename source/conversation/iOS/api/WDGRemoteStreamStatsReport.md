title: WDGRemoteStreamStatsReport
---

远端视频流的统计信息。

## 属性

### userID

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger userID;
```

**说明**

通话对方用户的 uid。

</br>

---

### width

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger width;
```

**说明**

远端媒体流中视频的宽度，以像素为单位。

</br>

---

### height

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger height;
```

**说明**

远端媒体流中视频的高度，以像素为单位。

</br>

---

### FPS

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger FPS;
```

**说明**

远端媒体流中视频的帧率。

</br>

---

### bytesReceived

**定义**

```objectivec
@property (nonatomic, assign, readonly) int64_t bytesReceived;
```

**说明**

已接收远端媒体流的字节数，以 byte 为单位。

</br>

---

### bitsReceivedRate

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger bitsReceivedRate;
```

**说明**

接收远端媒体流的速率，以 kbps 为单位。

</br>

---

### delay

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger delay;
```

**说明**

远端媒体流的传输延迟，以 ms 为单位。

</br>