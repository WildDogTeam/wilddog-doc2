title: 视频录制
---

WilddogVideoRoom SDK 提供服务端视频录制功能。使用视频录制 API 保存通话内容为 .mp4 格式文件。
### 开启视频录制
使用 [startRecording](/conference/Web/api/wilddogRoom.html#startRecording) 方法开启视频录制。
```javascript
room.startRecording(function(url,error){
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
fps               | number         | 视频帧率 (fps)    | 15
bitrate           | number         | 比特率 (bps)      | 300
canvasWidth       | number         | 视频宽度 (<=1920) | 960
canvasHeight      | number         | 视频高度 (<=1080) | 640
bgColor           | string         | 背景颜色 (十六进制) | xffffff
streams           | object         | 媒体流布局         | { "627620748239984100": {"left": 0 , "top": 100, "width": 100, "height": 100, "zOrder": 0-255}

对于每路需要录制的流的参数配置:

|选项                                             | 类型 |说明                                |示例|
|-------------------------------------------------|-----|------------------------------------|---|
|streamId  | string |流ID，在一个room中，每一路流都有一个唯一流ID            |627620748239984100 |
|left      | number |此路视频流相对左侧坐标                   |0  |
|top       | number |此路视频流相对顶部坐标                   |0  |
|width     | number |此路视频宽度                           |100|
|height    | number |此路视频高度                           |150|
|zOrder    | number |图像叠放层次顺序，高层次将遮挡低层次图像。该值越小，则叠放层次越低，该值越大，则叠放层次越高,从小到大绘制(0-255)  | 8  |




### 结束视频录制

使用 [stopRecording](/conference/Android/api/wilddogRoom.html#stopRecording) 方法结束视频录制。
```javascript
room.stopRecording(function(url,error){
	if(error == null){
    	console.log('停止录制，录制的文件地址：'+ url);
    }
});
```