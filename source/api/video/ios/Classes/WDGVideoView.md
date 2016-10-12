title: WDGVideoView
---

`WDGVideoView`是`UIView`的子类。
[WDGVideoStream](../Classes/WDGVideoStream.html)只能与`WDGVideoView`绑定，若要展示[WDGVideoStream](../Classes/WDGVideoStream.html)，请创建`WDGVideoView`加入到您的视图层级中，再调用[WDGVideoStream](../Classes/WDGVideoStream.html)的`- attach:`方法 。

通过为 `WDGVideoView` 设置继承自 `UIView` 的 `contentMode`方法为 `UIViewContentModeScaleToFill`、`UIViewContentModeScaleAspectFit`和`UIViewContentModeScaleAspectFill`，可指定视频的显示模式为`拉伸模式`、`等比缩放适应模式` 和 `等比缩放填充`。
