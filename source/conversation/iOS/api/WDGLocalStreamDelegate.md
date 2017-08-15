title: WDGLocalStreamDelegate
---

[WDGLocalStream](/conversation/iOS/api/WDGLocalStream.html) 的代理方法，用于获取并处理视频流。

## 方法

### -processPixelBuffer:

**定义**

```objectivec
- (CVPixelBufferRef)processPixelBuffer:(CVPixelBufferRef)pixelBuffer;
```

**说明**

逐帧处理媒体流并返回处理后的帧。视频流格式为 `kCVPixelFormatType_420YpCbCr8BiPlanarFullRange`。如果返回空，则丢弃当前帧。

**参数**

 参数名 | 说明 
---|---
pixelBuffer | 当前视频帧。

</br>

---
