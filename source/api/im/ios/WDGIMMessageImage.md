title: WDGIMMessageImage 
---
WDGIMMessageImage 是 Wilddog IM SDK 图片消息类。

## 属性

### path

**定义**

```objectivec
@property (nonatomic, strong) NSString *path;
```

**说明**

图片本地路径，只用于存储时。收到的图片消息，path 不提供。

</br>

------

### originalURL

**定义**

```objectivec
@property (nonatomic, strong) NSURL *originalURL;
```

**说明**

原图的 URL。

</br>

------

### thumbnailURL

**定义**

```objectivec
@property (nonatomic, strong) NSURL *thumbnailURL;
```

**说明**

缩略图的 URL。

</br>

------

### width

**定义**

```objectivec
@property (nonatomic, assign) NSUInteger width;
```

**说明**

图片宽度。

</br>

------

### height

**定义**

```objectivec
@property (nonatomic, assign) NSUInteger height;
```

**说明**

图片高度。

