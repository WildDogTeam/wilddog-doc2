title: 基础概念
---

### VideoCall

VideoCall 即野狗视频的客户端代理（User Agent, UA），通过创建 WilddogVideoCall 实例，用户可以建立一对一视频通话。

### Conversation

Conversation 即一对一视频通话，使用点对点的传输方式，音视频数据直接在客户端之间传输，在支持超高清设备的同时还能极大的节约带宽成本，并保证通话的隐私安全。

### Local Stream

Video 本地媒体流，包括本地音频流和视频流，需要在发起一对一视频通话／接受一对一视频通话邀请前进行配置。

### Remote Stream

一对一视频通话对方客户端的媒体流。本地可以控制其他客户端音／视频流在本地的展示效果。例如，本地可以静音其他客户端的媒体流，但这并不会影响其他客户端音视频数据的传输。

### Video View

Video View 用来显示本地／远端媒体流，Local Stream 和 Remote Stream 只能与 Video View 绑定来显示。

### Stats Report

Stats Report 是封装媒体流的统计数据的对象，客户端可以获取本地／远端媒体流的统计信息，包括视频长宽、帧率、数据传输／接收速率、数据量以及传输延时。
