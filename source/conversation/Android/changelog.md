title: 更新日志
---

## Android SDK

### v2.0.1 - 2017.08.22

<span class="changelog fix">修复</span>

- 修复特殊情况下取消视频导致崩溃问题


### v2.0.0 - 2017.08.14

自 `v2.0.0` 版本起，视频通话、视频会议两大功能完成分拆。视频通话主要应用于一对一视频，采用 `P2P + NAT穿透`的混合方案；视频会议主要应用于多人视频、连麦直播等场景。

由于架构调整，`v2.0.0` 无法兼容先前版本，请正在集成测试V1视频通话的用户换用V2新版本进行测试。已经正式使用V1版本的用户，服务不受影响。

此更新日志将延续视频通话SDK的更新。`视频通话 v2.0.0` 功能如下：

- 一对一视频通话
- 视频清晰度支持360p、480p、720p、1080p
- 支持获取原始视频流接口，可用于自定义美颜滤镜、人脸识别等视频预处理业务。(例如使用Camera360sdk、TuSDK等第三方美颜滤镜库、KiwiFace人脸识别等)
- 支持本地混流录制。
- 支持视频流统计接口，可用于实时获取帧率、比特率、延迟、流量等信息。

### v1.2.5 - 2017.08.04

<span class="changelog optimize">优化</span>

- 优化视频通话初始化错误处理。

<span class="changelog fix">修复</span>

- 修复特殊情况下视频录制导致崩溃问题


### v1.2.4 - 2017.07.31

<span class="changelog optimize">优化</span>

- 优化视频通话初始化逻辑。

<span class="changelog fix">修复</span>

- 修复统计接口导致崩溃问题


### v1.2.3 Beta - 2017.07.27


<span class="changelog optimize">优化</span>

- 优化邀请逻辑，增加了邀请状态判断，防止出现多次连接的情况。
- 优化网络请求接口，减少网络请求流量。

<span class="changelog fix">修复</span>

- 修复断网等情况对方无法收到离线通知bug。


### v1.2.2 Beta - 2017.07.25

<span class="changelog fix">修复</span>

- 修复信令交换过程中一方退出导致的 NPE 问题。

### v1.2.1 Beta - 2017.07.22

<span class="changelog add">新增</span>

- 新增音频录制功能。

<span class="changelog optimize">优化</span>

- 优化本地视频流录制功能，增强录制功能兼容性。

<span class="changelog fix">修复</span>

- 修复邀请加入会话时视频通话开关判断bug。


### v1.2.0 Beta - 2017.07.14

<span class="changelog add">新增</span>

- 新增本地视频混流录制功能。

### v1.1.0 Beta - 2017.06.26

<span class="changelog optimize">优化</span>

- 优化了接口设置以及内部执行逻辑;
- 优化邀请机制，提高稳定性。


### v1.0.2 Beta - 2017.06.20

<span class="changelog optimize">优化</span>

- 优化接口以及内部逻辑控制，提升SDK稳定性。
- 升级网络通信库为 OKHttp 3.5.0

### v1.0.0 Beta - 2017.05.25

<span class="changelog add">新增</span>

- 新增获取原始视频流接口，可用于自定义美颜滤镜等(例如使用Camera360、TuSDK等第三方滤镜库)视频预处理业务。
- 视频通话新增视频流统计接口，可用于实时获取帧率、比特率、延迟、流量等信息。
- 视频通话新增`WDGVideoInviteStatusBusy`状态，表示对方正在通话。

<span class="changelog optimize">优化</span>

- 优化`WDGVideoConstraints`类型，改用清晰度表示更直观，包括360p、480p、720p、1080p。
- 默认帧率更改为16fps，节省电量和流量。
- 视频通话CPU占用降低，性能提升20%。

<span class="changelog fix">修复</span>

- 视频会议偶现画面连接失败，已修复。
- 快速重复开关摄像头导致再次开启困难，已修复

