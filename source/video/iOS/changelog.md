
title: 更新日志
---

## iOS SDK

### v1.0.0 Beta - 2017.05.25

**由于数据结构变更，自该版本起，将无法与 `v1.0.0 Beta` 之前的版本互通，为保证您的业务正常运行，建议选用新版本。**

**新增**

- 新增获取原始视频流接口，可用于自定义美颜滤镜等(例如使用Camera360、TuSDK等第三方滤镜库)视频预处理业务。
- 视频通话新增视频流统计接口，可用于实时获取帧率、比特率、延迟、流量等信息。
- 视频通话新增`WDGVideoInviteStatusBusy`状态，表示对方正在通话。

**优化**

- 优化`WDGVideoConstraints`类型，改用清晰度表示更直观，包括360p、480p、720p、1080p。
- 默认帧率更改为16fps，节省电量和流量。
- 视频通话CPU占用降低，性能提升20%。

**修复**

- 视频会议偶现画面连接失败，已修复。
- 快速重复开关摄像头导致再次开启困难，已修复。
- 本地邀请方偶现无法显示远端流，已修复。

### v0.5.13 - 2016.03.24

<span class="changelog add">新增</span>

- 欠费错误码信息。

<span class="changelog optimize">优化</span>

- 程序行进中的具体的错误提示信息。

### v0.5.12 - 2017.03.17

<span class="changelog add">新增</span>

- 统计上报信息中 RTCIceConnectionStatus 和本地 IP。

### v0.5.11 - 2017.03.14

<span class="changelog fix">修复</span>

- 在 socket 连接成功之前返回的 WDGVideoOutgoingInvite 对象属性不全的问题。

### V0.5.10 - 2016.03.10

<span class="changelog optimize">优化</span>

- 视频会话和视频会议网络注册的流程。

<span class="changelog fix">修复</span>

- 新版统计数据中部分字段无用的问题，移除旧版统计。

### v0.5.9 - 2017.03.07

<span class="changelog add">新增</span>

- 视频会话和视频会议的数据统计。

### v0.5.8 - 2017.02.24

<span class="changelog optimize">优化</span>

- 增加 gateway 超时错误处理。

### v0.5.7 - 2017.02.17

<span class="changelog fix">修复</span>

- 修复 conference 中媒体流断开后不通知服务器的bug；

### v0.5.6 - 2017.01.06

<span class="changelog optimize">优化</span>

- 优化 NAT 穿越服务器选择算法策略。

### v0.5.5 - 2016.12.30

<span class="changelog add">新增</span>

- conversation 增加 NAT 穿越服务器选择算法。

### v0.5.4 - 2016.12.16

<span class="changelog optimize">优化</span>

- 当 `videoOption` 为 `WDGVideoConstraintsOff` 时，不再创建视频流。
- 为 `WDGVideoConnectOptions` 增加输入参数检查。
- 更新错误码。

### v0.5.3 - 2016.12.08

<span class="changelog fix">修复</span>

- 修复当 `WDGVideoLocalStream` 创建失败后，再次创建不会返回的问题。
- 修复 MeetingCast 的执行回调不会被调用的bug。

### v0.5.2 - 2016.12.07

<span class="changelog optimize">优化</span>

- 部分接口增加了输入参数检查。

<span class="changelog fix">修复</span>

- 修复一个会导致与 Web 端 Conversation 建连失败的问题。
- 修复了一个导致统计接口请求失败的参数名错误。

### v0.5.1 - 2016.12.02

<span class="changelog fix">修复</span>

- 修复邀请者离线时，即使邀请已经被接收，被邀请者仍然会收到邀请取消的代理回调问题。

### v0.5.0 - 2016.11.30

<span class="changelog add">新增</span>

- conversation 呼叫模型可以在发出邀请时携带自定义额外信息给对方。
- 新增 conference 多人视频会议呼叫模型，使用服务器中转方式通信。可以自定义视频会议 ID。
- 新增 WDGVideoLocalParticipant 对象代表本地会议参与者。
- WDGVideoParticipant 在未拿到音视频流时候就能返回，额外增加 WDGVideoParticipant 用于处理获取音视频流的事件。
- 可通过 WDGVideoClientOptions 指定回调及代理执行的队列。

<span class="changelog optimize">优化</span>

- 使用两种呼叫模型：conversation 和 conference 代替 P2P 和 Server-based 模式。
- 修改 conversation 为一对一视频通话呼叫模型，使用点对点方式通信。并使用固定交互路径 `/wilddogVideo` ，降低使用难度。

### v0.4.2 - 2016.11.04

<span class="changelog fix">修复</span>

- MeetingCastAddon中castingParticipantID属性始终为nil的问题。

<span class="changelog optimize">优化</span>

- WDGVideoStream不再强引用WDGVideoView，二者可以分别销毁，detach会在销毁前自动执行。

### v0.4.1 - 2016.10.27

<span class="changelog optimize">优化</span>

- 将 SDK 更新为静态库。
- 升级 WebRTC 库版本为 M55。

### v0.4.0 - 2016.10.19

<span class="changelog optimize">优化</span>

- 更新错误码。
- 发起会议等部分接口变更。

### v0.3.4 - 2016.10.14

<span class="changelog fix">修复</span>

- 增加边界条件限制，API 调用参数错误时会给出提示。

### v0.3.3 - 2016.10.12

<span class="changelog fix">修复</span>

- `WDGVideoClient` 被销毁后，之前创建的本地流未关闭，重新创建 `WDGVideoClient` 并创建本地流耗时过长。
- iOS10 下，当应用未在 Info.plist 添加麦克风权限导致的崩溃问题。
- 更新 API 文档注释。

### v0.3.2 - 2016.09.29

<span class="changelog fix">修复</span>

- 视频流的开启、关闭接口改为属性，以使其可查询。
- 接受邀请时增加可指定本地视频流的 API 接口。
- 代理标记为  `nullable` 。
- 增加部分 API 注释。
- 修复 WDGVideoView 的 size 被设为 0 时引发的布局计算问题。

### v0.3.1 - 2016.09.22

<span class="changelog fix">修复</span>

- ConversationMode 的字符串表示改为 `p2p` 与 `server_based`。
- 本地视频流目前只支持 352x288 640x480 和 1280x720 三种，因此在对外公开的枚举量中去除无效的选项。
- 邀请接口，userID 输入空字符串或 nil ，localStream 输入已关闭的流和 nil 的情况下都回直接返回错误信息，不会将邀请发出去。因此接口的返回值改为 nullable。

### v0.3.0 - 2016.09.22

<span class="changelog add">新增</span>

- 新增 Server based 模式。
- 新增 MeetingCast 模块。

<span class="changelog fix">修复</span>

- 改进本地流创建及销毁策略。
- RTCPeerconnectionFactory 设为单例以避免其早于 LocalStream 等对象销毁。
- WDGVideoView 适用 contentMode 选项，支持 AspectFit 、 AspectFill 和 Fill 三种显示模式。
- WDGVideoConversation 中的邀请API返回值改为 BOOL。
- 修复 WDGVideoConversation 中 participants 只增不减的问题。
