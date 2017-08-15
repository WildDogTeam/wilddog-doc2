title: 美颜功能
---

本篇文档介绍如何处理本地视频流，用户可以调用第三方 SDK 来处理将要上传的本地媒体流。


### 获取原始视频流接口

设置 [LocalStream](/conversation/Android/api/local-stream.html) 的 [LocalStream.CameraFrameListener](/conversation/Android/api/camera-frame-listener.html) 来获取本地视频流，可以对视频流做美颜处理再返回给野狗 SDK。

```java
localStream = video.createLocalStream(localStreamOptions);
localStream.setOnFrameListener(new LocalStream.CameraFrameListener() {
            @Override
            public void onByteFrame(byte[] bytes, int i, int i1,int var4, long var5) {
                // TODO 设置美颜效果
                frameProcess(bytes, 0, mFirstFrame, true, i, i1, var4 );//data 可以传空 根据TextureId进行美颜

            }
        });
```
