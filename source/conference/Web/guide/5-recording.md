title：视频录制
---
WilddogRoom SDK 提供服务端视频录制功能。使用视频录制 API 保存通话内容为 .mp4 格式文件。
### 开启视频录制
使用 [`startRecording`](/conference/Web/api/wilddogRoom.html#startRecording()) 方法开启视频录制。
```javascript
room.stopRecording(function(file,error){
	if(error == null){
    	console.log('开始录制，录制的文件地址：'+ file);
    }
});
```
### 结束视频录制

使用 [`stopRecording`](/conference/Android/api/wilddogRoom.html#stopRecording()) 方法结束视频录制。
```javascript
room.stopRecording(function(file,error){
	if(error == null){
    	console.log('停止录制，录制的文件地址：'+ file);
    }
});
```