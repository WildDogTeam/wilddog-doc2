title: 视频录制
---

WilddogRoom SDK 提供服务端视频录制功能。使用视频录制 API 保存通话内容为 .mp4 格式文件。
### 开启视频录制
使用 [startRecording](/conference/Android/api/wilddog-room.html#startRecording-listener) 方法开启视频录制。

```java
   room.startRecording(new RecordingListener() {
           @Override
           public void onComplete(String s, WilddogVideoError wilddogVideoError) {
           // 录制开启后，服务端返回文件地址，如发生错误，error不为空。           
           }
   });
```
### 录制布局

开启录制前,可以使用默认录制布局(日字格,田字格,或者九宫格),也可以自定义设置录制布局,具体如下

```java
    Map options = new HashMap();
    // 设置总画布大小 录制帧率 录制码率和背景颜色
        options.put(RecordOptionKeys.FPS,10);
        options.put(RecordOptionKeys.BITRATE,100);
        options.put(RecordOptionKeys.CANVAS_WIDTH,1000);
        options.put(RecordOptionKeys.CANVAS_HEIGHT,1000);
        options.put(RecordOptionKeys.BACKGROUD_COLOR,16725815);
    Map streams = new HashMap();
    Map stream = new HashMap();
    //设置每个流的位置和 层级
        stream.put(RecordOptionKeys.STREAM_LEFT,0);
        stream.put(RecordOptionKeys.STREAM_TOP,0);
        stream.put(RecordOptionKeys.STREAM_WIDTH,100);
        stream.put(RecordOptionKeys.STREAM_HEIGHT,100);
        stream.put(RecordOptionKeys.STREAM_ZORDER,254);
        streams.put(localStream.getStreamId(),stream);

    options.put(RecordOptionKeys.STREAMS,streams);
    room.startRecording(options,new RecordingListener() {
       @Override
       public void onComplete(String s, WilddogVideoError wilddogVideoError) {
       // 录制开启后，服务端返回文件地址，如发生错误，error不为空。
       }
    });
```

|选项                                                | 类型   | 说明                   |示例         |
|---------------------------------------------------|--------|------------------------|------------|
|RecordOptionKeys.FPS               | int    |视频帧率(fps)            |15          |
|RecordOptionKeys.BITRATE           | int    |比特率(bps)              |100         |
|RecordOptionKeys.CANVAS_WIDTH      | int    |视频宽度(<=1920)         |960         |
|RecordOptionKeys.CANVAS_HEIGHT     | int    |视频高度(<=1080)         |640         |
|RecordOptionKeys.BACKGROUD_COLOR   | int    |背景颜色的十六进制码(argb)|0x00ffffff   |
|RecordOptionKeys.STREAMS           | Map    |媒体流布局               |streams         |

录制每个流的参数配置:

|选项                                             | 类型 |说明                                |示例|
|-------------------------------------------------|-----|------------------------------------|---|
|RecordOptionKeys.STREAM_LEFT    | int |此路视频流相对左侧坐标                 |0  |
|RRecordOptionKeys.STREAM_TOP    | int |此路视频流相对顶部坐标                 |0  |
|RecordOptionKeys.STREAM_WIDTH   | int |此路视频宽度                          |100|
|RecordOptionKeys.STREAM_HEIGHT  | int |此路视频高度                          |150|
|RecordOptionKeys.STREAM_ZORDER  | int |此路视频流绘制优先级,从小到大绘制(0-255) |8  |


### 结束视频录制

使用 [stopRecording](/conference/Android/api/wilddog-room.html#stopRecording-listener) 方法结束视频录制。

```java
  room.stopRecording(new RecordingListener() {
       @Override
       public void onComplete(String s, WilddogVideoError wilddogVideoError) {
       // 录制结束后，如发生错误，error不为空。         
       }
  });
```
