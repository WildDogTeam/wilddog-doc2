title: 更新日志
---


## Android SDK



### v2.3.0 - 2017.12.29

<span class="changelog add">新增</span>
- 手机摄像头默认配置方法
- 手机闪光灯等摄像头相关设备的控制方法
- 数据统计接口

<span class="changelog optimize">优化</span>
- 在更多安卓手机上支持了H.264软解码，提高编解码兼容性



### v2.2.5 - 2017.12.15

<span class="changelog optimize">优化</span>
- 支持在 `stream` 中设置自定义属性



### v2.2.4 - 2017.12.15

<span class="changelog optimize">优化</span>
- 提高 `IPv6` 网络支持的通用性



### v2.2.3 - 2017.12.08

<span class="changelog optimize">优化</span>
- `WebSocket` 重连超过30秒将触发超时

<span class="changelog fix">修复</span>
- 修复了断网重连时重新订阅本地媒体流的问题
- 修复了 `publish` 成功回调但却无法获取本地流id的问题
- 修复了使用默认参数无法进行录制的问题



### v2.2.2 - 2017.12.01

<span class="changelog optimize">优化</span>
- 优化超时处理逻辑


### v2.2.1 - 2017.11.18

<span class="changelog add">新增</span>

- 新增接口支持选择编解码方式，可选使用H.264或VP8。

<span class="changelog optimize">优化</span>

- 默认开启扬声器。

### v2.2.0 - 2017.11.11

<span class="changelog add">新增</span>

- 新增对120p、240p的支持。

<span class="changelog optimize">优化</span>

- 升级到 WebRTC M62 版本。

<span class="changelog fix">修复</span>

- 修复创建 LocalStreamOption 设置完最大 fps 无法返回Builder对象bug。

### v2.1.2 - 2017.10.26

发布为v2.1系列的正式版本

<span class="changelog fix">修复</span>

- 修复重定向问题，提高视频通话连通率及稳定性。

### v2.1.1 beta - 2017.10.19

<span class="changelog optimize">优化</span>

- 支持 Android SDK API Level 16 以上系统。
- 增加 vp8/vp9 动态码率支持，优化传输码率。

### v2.1.0 beta - 2017.10.12

<span class="changelog add">新增</span>

- 新增服务端混流录制功能，录制布局可自定义。
- 新增海外节点，支持国内与海外互通。

<span class="changelog optimize">优化</span>

- 支持会议恢复功能,网络断开恢复后一定时间内能恢复视频。

<span class="changelog fix">修复</span>

- 修复 ICE 状态变化导致断开连接回调频繁 bug。

### v2.0.0 beta - 2017.09.15

野狗音视频业务原有的一对一视频通话、多人视频通话两大功能在 `v2.0.0` 版本进行了分拆，以优化逻辑、提升集成效率。

`v2.0.0` 在代码效率、稳定性、性能等方面较先前版本都有很大提升。但由于架构调整，本次升级将无法兼容先前版本，望当前正在集成测试V1版本的用户使用新的V2版本测试。已经正式使用了V1版本的用户，服务不会受到影响。

多人视频通话SDK的 `v2.0.0 Beta` 版现已发布，欢迎下载使用。