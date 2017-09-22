title: WDGVideoView
---

`WDGVideoView` 是 `UIView` 的子类。
视频流只能与 `WDGVideoView` 绑定，若要播放视频流，请创建 `WDGVideoView` 加入到您的视图层级中，再调用 [WDGLocalStream](/conference/iOS/api/WDGLocalStream.html) 或 [WDGRoomStream](/conference/iOS/api/WDGRoomStream.html) 的 `- attach:` 方法。

通过为 `WDGVideoView` 设置继承自 `UIView` 的 `contentMode` 方法为 `UIViewContentModeScaleToFill`、`UIViewContentModeScaleAspectFit` 和 `UIViewContentModeScaleAspectFill`，可指定视频的显示模式为`拉伸模式`、`等比缩放适应模式` 和 `等比缩放填充`。

## 属性

### mirror

**定义**

```objectivec
@property (nonatomic, assign) BOOL mirror;
```

**说明**

是否镜像显示视频流，默认为 NO。使用前置摄像头时，可以开启该设置。
