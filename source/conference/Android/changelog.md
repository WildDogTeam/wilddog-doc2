title: 更新日志
---


## Android SDK

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

野狗音视频业务原有的视频通话、视频会议两大功能在 `v2.0.0` 版本进行了分拆，以优化逻辑、提升集成效率。

`v2.0.0` 在代码效率、稳定性、性能等方面较先前版本都有很大提升。但由于架构调整，本次升级将无法兼容先前版本，望当前正在集成测试V1版本的用户使用新的V2版本测试。已经正式使用了V1版本的用户，服务不会受到影响。

视频会议SDK的 `v2.0.0 Beta` 版现已发布，欢迎下载使用。