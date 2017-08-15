title: 美颜滤镜
---

本篇文档介绍如何处理本地视频流，用户可以调用第三方 SDK（如Camera360 SDK、涂图、开为）来处理将要上传的本地视频流，实现美颜、人脸识别等效果。

## 设置代理

设置 [WDGLocalStream](/conversation/iOS/api/WDGLocalStream.html) 的代理 <[WDGLocalStreamDelegate](/conversation/iOS/api/WDGLocalStreamDelegate.html)> 用于处理本地视频流。

```objectivec
self.localStream.delegate = self;
```

## 处理本地视频流

实现代理方法 `-[WDGLocalStreamDelegate processPixelBuffer:]`，获得本地视频流后，会调用该方法处理原始视频流：

```objectivec
- (CVPixelBufferRef)processPixelBuffer:(CVPixelBufferRef)pixelBuffer {
    // 使用第三方 SDK 处理当前视频流。
    return [BeautySDK process:pixelBuffer];
}
```
