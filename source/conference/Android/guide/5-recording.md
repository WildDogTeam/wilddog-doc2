title：视频录制
---
WilddogRoom SDK 提供服务端视频录制功能。使用视频录制 API 保存通话内容为 .mp4 格式文件。
### 开启视频录制
使用 [startRecording](/conference/Android/api/wilddog-room.html#startRecording-localStream) 方法开启视频录制。
```java
	room.startRecording();
```
### 结束视频录制

使用 stopRecording 方法结束视频录制。

```java
room.stopRecording();
```
