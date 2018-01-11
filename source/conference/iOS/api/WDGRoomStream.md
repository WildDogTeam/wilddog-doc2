title: WDGRoomStream
---

表示远端媒体流描述信息及媒体流数据。继承自 [WDGStream](/conference/iOS/api/WDGStream.html) ，具有父类所有的属性和方法。

## 属性

### streamId

**定义**

```objectivec
@property (nonatomic, retain) NSNumber *streamId;
```

**说明**

远端媒体流的唯一标识。

</br>

---

### streamOwners

**定义**

```objectivec
@property (nonatomic, strong) NSArray *streamOwners;
```

**说明**

远端媒体流的发布者。

</br>

---

### attributes

**定义**

```objectivec
@property (nonatomic, strong, readonly) NSDictionary *_Nullable attributes;
```

**说明**

接收到的媒体流中携带的自定义信息，字典类型。

</br>

---
