title: 使用 VideoSDK 的时候 Chrome 浏览器 console 中报警告：`getUserMedia() no longer works on insecure origins. `是什么原因？
tags:
- 实时视频通话
---
这是因为 Chrome 浏览器限制，获取摄像头的接口在非 https 环境下会报错。解决方法就是配置 https 证书。

*注意：*
在`localhost`环境下，即使不适用`https`协议也能获得本地的视频流和音频流（仅仅是本地的视频流和音频流）。这是因为Chrome默认`localhost`是安全的。当在有域名情况下（例如a.com）,Chrome无法判断该域名是否安全，这个时候必须使用`https`来保证。如果不适用`https`在网站上是获取不到本地的视频流和音频流的。

感谢野狗用户：maoyeye@qq.com 贡献
