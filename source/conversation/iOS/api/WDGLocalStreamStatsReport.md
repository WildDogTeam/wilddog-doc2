title: WDGLocalStreamStatsReport
---

本地视频流的统计信息。

## 属性

### width

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger width;
```

**说明**

本地媒体流中视频的宽度，以像素为单位。

</br>

---

### height

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger height;
```

**说明**

本地媒体流中视频的高度，以像素为单位。

</br>

---

### FPS

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger FPS;
```

**说明**

本地媒体流中视频的帧率。

</br>

---

### bytesSent

**定义**

```objectivec
@property (nonatomic, assign, readonly) int64_t bytesSent;
```

**说明**

已发送本地媒体流的字节数，以 byte 为单位。

</br>

---

### bitsSentRate

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger bitsSentRate;
```

**说明**

发送本地媒体流的速率，以 kbps 为单位。

</br>

---