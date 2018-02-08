title: 更新日志
---

## iOS SDK


### v2.3.1 - 2018.02.08

<span class="changelog optimize">优化</span>
- 支持在 publish 时候选择编码格式
- 捕获不同的 token 错误类型

<span class="changelog fix">修复</span>
- 未传参数进行服务端视频录制返回 404 页面的错误
- 重复订阅／取消订阅同一个流导致崩溃的问题



### v2.3.0 - 2017.12.29

<span class="changelog add">新增</span>
- 手机摄像头默认配置方法
- 手机闪光灯等摄像头相关设备的控制方法
- 数据统计接口

<span class="changelog fix">修复</span>
- iPhoneX,iPhone8,iPadPro等新上市设备在VP8编码下，720P的时候花屏或黑屏的问题


### v2.2.5 - 2017.12.15

<span class="changelog optimize">优化</span>
- 支持在 `stream` 中设置自定义属性



### v2.2.4 - 2017.12.15

<span class="changelog optimize">优化</span>
- 提高 `IPv6` 网络支持的通用性



### v2.2.3 - 2017.12.08

<span class="changelog optimize">优化</span>
- 兼容 `Mac` 分享的 `IPv6` 网络



### v2.2.2 - 2017.12.01

<span class="changelog add">新增</span>
- 支持自定义日志打印等级

<span class="changelog fix">修复</span>
- 修复 `WebSocket` 偶尔断网重连失败
- 上传错误 `token` 导致的 `WebSocket` 持续重连



### v2.2.1 - 2017.11.18

<span class="changelog optimize">优化</span>
- 优化超时处理逻辑

<span class="changelog fix">修复</span>
- 修复 `PeerConnection` 偶尔建连不成功的问题


### v2.2.0 - 2017.11.09

<span class="changelog add">新增</span>

- 新增对120p、240p的支持

<span class="changelog optimize">优化</span>

- 升级到 WebRTC M62 版本

### v2.1.2 - 2017.10.27

发布为v2.1系列的正式版本

<span class="changelog optimize">优化</span>

- 优化接入文档部分内容及文案。


### v2.1.1 Beta - 2017.10.25

<span class="changelog optimize">优化</span>

- 修改了Room的一个初始化方法的名称。


### v2.1.0 Beta - 2017.10.12

<span class="changelog add">新增</span>

- 新增服务端混流录制功能，录制布局可自定义。
- 新增海外节点，支持国内与海外互通。

### v2.0.0 Beta - 2017.09.15

野狗音视频业务原有的一对一视频通话、多人视频通话两大功能在 `v2.0.0` 版本进行了分拆，以优化逻辑、提升集成效率。

`v2.0.0` 在代码效率、稳定性、性能等方面较先前版本都有很大提升。但由于架构调整，本次升级将无法兼容先前版本，望当前正在集成测试V1版本的用户使用新的V2版本测试。已经正式使用了V1版本的用户，服务不会受到影响。

多人视频通话SDK的 `v2.0.0 Beta` 版现已发布，欢迎下载使用。

