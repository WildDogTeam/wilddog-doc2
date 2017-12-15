title: 更新日志
---

## Javascript SDK


### v2.2.8 - 2017.12.15

<span class="changelog optimize">优化</span>
- 支持在 `stream` 中设置自定义属性;


### v2.2.7 - 2017.12.14

<span class="changelog fix">修复</span>
- 修复了 stopRecording() 报错的问题


### v2.2.6 - 2017.12.08

<span class="changelog add">新增</span>
- 支持自定义日志打印等级


### v2.2.5 - 2017.12.01

<span class="changelog add">新增</span>
- 新增自定义设置最大码率和最小码率


### v2.2.4 - 2017.11.18

<span class="changelog add">新增</span>
- 新增接口支持选择编解码方式，可选使用H.264或VP8

<span class="changelog fix">修复</span>
- 修复调用本地摄像头时，分辨率过高导致的调用摄像头失败的问题。
- 修复关闭本地摄像头时，偶尔失败的问题。


### v2.2.2 - 2017.11.09

<span class="changelog add">新增</span>
- 新增对120p的支持

<span class="changelog optimize">优化</span>
- 优化了ack和peerconnection的超时处理逻辑

<span class="changelog fix">修复</span>
- 修复 safari firefox 下分辨率、最大帧率设置不生效的问题
- 修复了手机网页切换前后摄像头后没有声音的问题


### v2.2.1 - 2017.11.03

<span class="changelog add">新增</span>

- 新增支持在手机网页中切换手机的前后摄像头

### v2.2.0 - 2017.11.01

<span class="changelog add">新增</span>

- 新增了屏幕共享功能，部分浏览器需使用插件，
- 新增支持同时发布多个流。

### v2.1.3 - 2017.11.01

<span class="changelog fix">修复</span>

-修复了WebSocket重连问题

### v2.1.2 - 2017.10.27

发布为v2.1系列的正式版本

<span class="changelog add">新增</span>

- 新增了WilddogVideoRoom的npm版本，方便开发者集成

<span class="changelog fix">修复</span>

- 修复了同时使用`WilddogVideoCall`和`WilddogVideoRoom`时，不能顺利初始化的问题
- 修复了firefox能收到流但是黑屏的问题
- 修复了取消订阅后又重新订阅时，无法正常订阅的问题


### v2.1.0 Beta - 2017.10.12

<span class="changelog add">新增</span>

- 新增服务端混流录制功能，录制布局可自定义。
- 新增海外节点，支持国内与海外互通。

<span class="changelog fix">修复</span>

- 修复websocket重定向及重连

### v2.0.0 Beta - 2017.09.15

野狗音视频业务原有的一对一视频通话、多人视频通话两大功能在 `v2.0.0` 版本进行了分拆，以优化逻辑、提升集成效率。

`v2.0.0` 在代码效率、稳定性、性能等方面较先前版本都有很大提升。但由于架构调整，本次升级将无法兼容先前版本，望当前正在集成测试V1版本的用户使用新的V2版本测试。已经正式使用了V1版本的用户，服务不会受到影响。

多人视频通话SDK的 `v2.0.0 Beta` 版现已发布，欢迎下载使用。