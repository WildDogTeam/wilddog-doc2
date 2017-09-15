title: 视频录制
---

WilddogRom SDK 提供服务端视频录制功能。使用视频录制 API 保存通话内容为 `.mp4` 格式文件。

## 开始视频录制

使用 `-[WDGRoom startRecordingWithCompletionBlock:]` 方法开启视频录制：

```objectivec
[self.room startRecordingWithCompletionBlock:(void (^)(NSString *fileName, NSError *error))block {
    // 录制开启后，服务端返回文件名称，如发生错误，error不为空。
}]
```

## 结束视频录制

使用 `-[WDGRoom stopRecordingWithCompletionBlock:]` 方法结束视频录制：

```objectivec
[self.room stopRecordingWithCompletionBlock:(void (^)(NSError *error))block {
    // 录制结束后，如发生错误，error不为空。
}]
```
