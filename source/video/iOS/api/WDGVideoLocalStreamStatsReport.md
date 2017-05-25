title: WDGVideoLocalStreamStatsReport
---

本地视频流统计返回对象。

## 属性

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

### bytesSent

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger bytesSent;
```

**说明**

 本地视频流已发送的字节数。

</br>

---

### bitsSentRate

**定义**

```objectivec
@property (nonatomic, assign, readonly) NSUInteger bitsSentRate;
```

**说明**

本地视频流的发送速率，以 kbps 为单位。

</br>

---