title: 更新日志
---

## Android SDK

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



**由于数据结构变更，从`v1.0.0 Beta` 起，将无法与之前的历史版本互通，为保证您的业务正常运行，建议选用`v1.0.0 Beta`及之后版本。下面列出了历史版本号，仅供参考：**

- v0.5.12 - 2017.03.23
- v0.5.10 - 2017.03.08
- v0.5.8 - 2017.02.24
- v0.5.7 - 2017.02.20
- v0.5.6 - 2017.02.17
- v0.5.5 - 2017.01.06
- v0.5.4 - 2016.12.23
- v0.5.3 - 2016.12.16
- v0.5.2 - 2016.12.07
- v0.5.1 - 2016.12.02
- v0.5.0 - 2016.11.30
- v0.4.1 - 2016.10.27
- v0.4.0 - 2016.10.19
- v0.3.1 - 2016.09.29
- v0.3.0 - 2016.09.22
