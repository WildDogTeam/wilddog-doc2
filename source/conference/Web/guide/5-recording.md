title: 视频录制
---

WilddogVideoRoom SDK 提供服务端视频录制功能。使用视频录制 API 保存通话内容为 .mp4 格式文件。
### 开启视频录制
使用 [startRecording](/conference/Web/api/wilddogRoom.html#startRecording) 方法开启视频录制。
```javascript
room.stopRecording(function(url,error){
	if(error == null){
    	console.log('开始录制，录制的文件地址：'+ url);
    }
});
```

### 录制布局
使用 [startRecording](/conference/Web/api/wilddogRoom.html#startRecording) 方法开启视频录制。
```javascript
var options = {
    "fps":10,
    "canvasWidth":1000,
    "canvasHeight":1000,
    "streams":{
        "627620748239984100":{"left":0,"top":100,"width":100,"height":100,"zOrder":1},
        "627620748239984101":{"left":0,"top":100,"width":100,"height":100,"zOrder":2}
    }
}
room.startRecording(options,function(url,error){
	if(error == null){
    	console.log('开始录制，录制的文件地址：'+ url);
    }
});
```
**参数**

选项               | 类型              | 说明                    | 示例
------------------|------------------|------------------|------------------
fps               | NSNumber         | 视频帧率 (fps)    | 15
bitrate           | NSNumber         | 比特率 (bps)      | 300
canvasWidth       | NSNumber         | 视频宽度 (<=1920) | 960
canvasHeight      | NSNumber         | 视频高度 (<=1080) | 640
bgColor           | NSNumber         | 背景颜色 (十六进制) | xffffff
streams           | NSDictionary     | 媒体流布局         | { "627620748239984100": {"left": 0 , "top": 100, "width": 100, "height": 100, "zOrder": 0-255}


### 结束视频录制

使用 [stopRecording](/conference/Android/api/wilddogRoom.html#stopRecording) 方法结束视频录制。
```javascript
room.stopRecording(function(url,error){
	if(error == null){
    	console.log('停止录制，录制的文件地址：'+ url);
    }
});
```