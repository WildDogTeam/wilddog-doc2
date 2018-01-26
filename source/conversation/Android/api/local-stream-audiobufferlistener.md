title: LocalStream.AudioBufferListener
-------------------------

本地音频流回调监听。

## 方法

### onAudioBuffer(audioSamples, numberOfFrames, bytesPerSample, numberOfChannels, sampleRate)

**定义**   

```java
void onAudioBuffer(byte[] audioSamples, int numberOfFrames, int bytesPerSample, int numberOfChannels, int sampleRate)
```

**说明**

本地音频流回调方法。

**参数**

| 参数名 | 描述 |
|---|---|
|audioSamples|音频数据。|
|numberOfFrames|帧数。|
|bytesPerSample|采样深度。|
|numberOfChannels|声道数。|
|sampleRate|采样率。|

</br>

