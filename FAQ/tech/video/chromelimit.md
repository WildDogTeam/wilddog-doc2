title: 使用 VideoSDK 的时候 Chrome 浏览器 console 中报警告：`getUserMedia() no longer works on insecure origins. `是什么原因？
tag: 实时视频通话
---
这是因为 Chrome 浏览器限制，获取摄像头的接口在非 https 环境下会报错。解决方法就是配置 https 证书。

感谢野狗用户：maoyeye@qq.com 贡献