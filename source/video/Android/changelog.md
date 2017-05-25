
title: 更新日志
---

## Android SDK

### v1.0.0-beta - 2017.05.25

**由于数据结构变更，自该版本起，将无法与`v1.0.0 Beta`之前的版本互通，为保证您的业务正常运行，建议选用新版本。**

<span class="changelog optimize">新增</span>

- 新增获取原始视频流接口，可用于自定义美颜滤镜等(例如使用Camera360、TuSDK等第三方滤镜库)视频预处理业务。
- 视频通话新增视频流统计接口，可用于实时获取帧率、比特率、延迟、流量等信息。
- 视频通话新增 `busy` 状态，表示对方正在通话。

<span class="changelog optimize">优化</span>

- 优化 `Dimension` 类表示视频分辨率，包括 360p、480p、720p、1080p 四种分辨率级别。
- 默认帧率更改为15fps，节省电量和流量。
- 更新信令交换数据结构，减少数据通信流程，提升连接建立速度。

<span class="changelog optimize">修复</span>

- 修复部分手机进入通话页面黑屏bug
- 修复退出会话时数据残留问题
- 修复反复进入会话以及会话退出偶发性崩溃问题

### v0.5.12 - 2017.03.23

<span class="changelog optimize">优化</span>

- 优化错误码结构。
- 删除多余日志信息。


### v0.5.10 - 2017.03.08

<span class="changelog optimize">优化</span>

- 优化 gateway 协议。


### v0.5.8 - 2017.02.24

<span class="changelog optimize">优化</span>

- 增加 gateway 超时错误处理。

### v0.5.7 - 2017.02.20

<span class="changelog fix">修复</span>

- 修复创建 conference 参数传错bug。

### v0.5.6 - 2017.02.17

<span class="changelog fix">修复</span>

- 修复 conference 中媒体流断开后不通知服务器的bug。

### v0.5.5 - 2017.01.06
<span class="changelog optimize">优化</span>

- NAT 穿越服务器选择算法策略。

<span class="changelog fix">修复</span>

- Conference 中获取 Participants 为空的 bug。
- Conversation 中获取 LocalParticipant 为空的 bug。

### v0.5.4 - 2016.12.23
<span class="changelog add">新增</span>

- conversation 增加 NAT 穿越服务器选择算法。

<span class="changelog fix">修复</span>

- conversation 退出会话 crash bug。
- conference 资源释放 bug。

### v0.5.3 - 2016.12.16

<span class="changelog optimize">优化</span>

- 更新错误码。
- 优化 participantListener 接口的方法。

### v0.5.2 - 2016.12.07

<span class="changelog optimize">优化</span>

- WilddogVideoView 简化初始化操作。
- WilddogVideo createLocalStream 去除参数 EglBase.Context。

<span class="changelog fix">修复</span>

- websocket 长连接复用问题。
- PeerConnection dispose 方法关闭本地视频流导致的 crash 问题。

### v0.5.1 - 2016.12.02

<span class="changelog fix">修复</span>

- 修复调用 WilddogVideoClient.connectToConference 时线程死锁 bug。

### v0.5.0 - 2016.11.30

<span class="changelog add">新增</span>

- conversation 呼叫模型可以在发出邀请时携带自定义额外信息给对方。
- 新增 conference 多人视频会议呼叫模型，使用服务器中转方式通信。
- 新增自定义视频会议 ID 功能。
- 新增 WilddogVideoViewLayout 容器控件，可包裹 WilddogVideoView 实现多窗口播放视频流。
- 新增 LocaoParticipant 类，作为本地视频流容器。

<span class="changelog optimize">优化</span>

- 使用两种呼叫模型：conversation 和 conference 代替 P2P 和 Server-based 模式。
- 修改 conversation 为一对一视频通话呼叫模型，使用点对点方式通信。并使用固定交互路径 `/wilddogVideo` ，降低使用难度。
- 开放 WilddogVideo dispose()接口，释放连接资源。
- 原有 ConversationClient 变更为 WilddogVideoClient。
- 取消 WilddogVideoClient 初始化步骤，只需初始化 WilddogVideo即可使用。
- 简化 CompleteListener 回调方法。
- 优化媒体流返回时机，在 Participant 的回调中返回其他客户端的媒体流。
- 为MeetingCast 直播操作增加操作错误原因回调。
- 简化 MeetingCastStateListener 回调方法。

<span class="changelog fix">修复</span>

- 修复安卓相机释放问题。

### V0.4.1 - 2016.10.27

<span class="changelog add">新增</span>

- 新增视频展示控件 WilddogView。

<span class="changelog optimize">优化</span>

- 升级 WebRTC 库，目前使用 M55 版本。
- 修改 WilddongVideo 类 createLocalStream 方法。
- 增加对视频 H.264 编码的支持。

### V0.4.0 - 2016.10.19

<span class="changelog add">新增</span>

- 新增安卓端错误码,增加错误边界判定以及错误返回。
- 新增 VideoException 类。

<span class="changelog optimize">优化</span>

- Video 类改为 WilddogVideo 类。
- MeetingCastAddon 类中方法重命名为 start、switchParticipant、stop。
- MeetingCastListener 中方法重命名 onStarted、onSwitchParticipant、onStopped。
- 删除 ConversationException 类。

### V0.3.1 - 2016.09.29

<span class="changelog add">新增</span>

- 增加 Conversation.Listener 回调方法触发。

<span class="changelog optimize">优化</span>


- 完善 Video ，完善 flipCamera方法。
- 完善 Stream，修复 enableAudio/enableVideo 方法。

<span class="changelog fix">修复</span>

- 修复 Conversation,修复邀请第三方加入会话连接建立失败 bug。

### V0.3.0 - 2016.09.22

<span class="changelog add">新增</span>

- 新增 SERVER_BASED 模式会话。
- 新增直播接口，实现直播/切流/断开直播功能。

<span class="changelog fix">修复</span>

- 修改原有 BASIC 模式为P2P模式，修改 ADVANCED 模式为 SERVER_BASED。
- 修改 getConfig 功能，增加推流/收流地址。

