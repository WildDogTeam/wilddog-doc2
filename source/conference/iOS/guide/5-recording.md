title: 媒体流录制
---

WilddogRom SDK 提供服务端视频录制功能。使用视频录制 API 保存通话内容为 `.mp4` 格式文件。

## 开始录制

使用 `-[WDGRoom startRecordingWithCompletionBlock:]` 方法开启视频录制：

```objectivec
[self.room startRecordingWithCompletionBlock:(void (^)(NSString *url, NSError *error))block {
    // 录制开启后，服务端返回文件地址，如发生错误，error不为空。
}]
```

## 录制布局

使用 `-[WDGRoom startRecordingWithOptions:completionBlock:]` 方法使用自定义布局开始视频录制：

```objectivec
NSDictionary *options = @{@"fps":@10, @"canvasWidth":@1000, @"canvasHeight":@1000, @"streams":{ 
    @"627620748239984100":@{@"left":@0, @"top":@100, @"width":@100, @"height":@100, @"zOrder":@1}, 
    @"627620748239984101":@{@"left":@0, @"top":@100, @"width":@100, @"height":@100, @"zOrder":@2}}};
[self.room startRecordingWithOptions:options completionBlock:(void(^)(NSString *url, NSError *error))block {
    // 录制开启后，服务端返回文件地址，如发生错误，error不为空。
}]
```

选项               | 类型              | 说明                    | 示例
------------------|------------------|------------------|------------------
fps               | NSNumber         | 视频帧率 (fps)    | @15
bitrate           | NSNumber         | 比特率 (bps)      | @300
canvasWidth       | NSNumber         | 视频宽度 (<=1920) | @960
canvasHeight      | NSNumber         | 视频高度 (<=1080) | @640
bgColor           | NSNumber         | 背景颜色 (十六进制) | 0xffffff
streams           | NSDictionary     | 媒体流布局         | { "627620748239984100": {"left": 0 , "top": 100, "width": 100, "height": 100, "zOrder": 0-255}


对于每路需要录制的流的参数配置:

|选项                                             | 类型 |说明                                |示例|
|-------------------------------------------------|-----|------------------------------------|---|
|streamId  | NSString |流ID，在一个room中，每一路流都有一个唯一流ID            |627620748239984100 |
|left      | NSNumber |此路视频流相对左侧坐标                   |0  |
|top       | NSNumber |此路视频流相对顶部坐标                   |0  |
|width     | NSNumber |此路视频宽度                           |100|
|height    | NSNumber |此路视频高度                           |150|
|zOrder    | NSNumber |图像叠放层次顺序，高层次将遮挡低层次图像。该值越小，则叠放层次越低，该值越大，则叠放层次越高,从小到大绘制(0-255)  | 8  |


## 结束录制

使用 `-[WDGRoom stopRecordingWithCompletionBlock:]` 方法结束视频录制：

```objectivec
[self.room stopRecordingWithCompletionBlock:(void (^)(NSError *error))block {
    // 录制结束后，如发生错误，error不为空。
}]
```
