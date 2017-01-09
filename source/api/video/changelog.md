
title: 更新日志
---

## Javascript SDK

### v0.5.4 - 2016.12.22

<span class="changelog fix">修复</span>

- 修复 `outGoingInvite.on('rejected')` 失败的问题。

### v0.5.3 - 2016.12.16

<span class="changelog optimize">优化</span>

- 更新错误码。
- participant 中 去掉'error'事件，增加 'disconnected' 和 'connectFailed' 事件。

<span class="changelog fix">修复</span>

- 修复meetingCast.onStateChanged 失败的问题。

### v0.5.2 - 2016.12.15

<span class="changelog add">新增</span>

- 增加对 npm 下载的方式。

<span class="changelog fix">修复</span>

- 修复conference.disconnect()失败的问题。

### v0.5.1 - 2016.12.07

<span class="changelog add">新增</span>

- 增加对 IE 11 浏览器的支持。

### v0.5.0 - 2016.11.30

<span class="changelog add">新增</span>

- conversation 呼叫模型可以在发出邀请时携带自定义额外信息给对方。
- 新增 conference 多人视频会议呼叫模型，使用服务器中转方式通信。
- 新增自定义视频会议 ID 功能。

<span class="changelog optimize">优化</span>

- 使用两种呼叫模型：conversation 和 conference 代替 P2P 和 Server-based 模式。
- 修改 conversation 为一对一视频通话呼叫模型，使用点对点方式通信。并使用固定交互路径 `/wilddogVideo` ，降低使用难度。

### v0.4.5 - 2016.11.02

<span class="changelog add">新增</span>

- 新增对Safari浏览器的支持。

### V0.4.4 - 2016.10.27

<span class="changelog optimize">优化</span>

- 优化代码结构。

### v0.4.3 - 2016.10.22

<span class="changelog add">新增</span>

- 新增错误码以及相应的错误事件。

<span class="changelog optimize">优化</span>

- 优化meetingCast 类的接口名称。

### V0.4.2 - 2016.10.13

<span class="changelog fix">修复</span>

- video.createStream 传入 video 参数为 true 时，不能获取视频流
- 修复后传入 video 参数为 true 时，视频流规格自动设为 standard 标准

### V0.4.1 - 2016.10.10

<span class="changelog optimize">优化</span>

- 压缩 SDK 大小，从 300+K 压缩为 100+K。
- 被邀请方接受邀请后，邀请方的 OutgoingInvite 会触发 promise，得到 Conversation 对象。

### V0.4.0 - 2016.10.08

<span class="changelog optimize">优化</span>

- 将回调修改为 promise。

### V0.3.3 - 2016.09.30

<span class="changelog fix">修复</span>

- 修复同一用户退出会话后重新加入会话会读取过期信令的 bug。

### V0.3.2 - 2016.09.29

<span class="changelog fix">修复</span>

- 修复 server_based 模式下，每当新用户加入 conversation，已有用户都会重复发布视频流的 bug。
- 修复离开 conversation 后还会监听 conversation 中消息的 bug。

</br>

---
## Android SDK

### v0.5.5 - 2017.01.06
<span class="changelog optimize">优化</span>
- NAT 穿越服务器选择算法策略。
<span class="changelog fix">修复</span>
- Conference中获取Participants为空的bug。
- Conversation中获取LocalParticipant为空的bug。


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

</br>

---
## iOS SDK

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

### V0.4.2 - 2016.11.04

<span class="changelog fix">修复</span>

- MeetingCastAddon中castingParticipantID属性始终为nil的问题。

<span class="changelog optimize">优化</span>

- WDGVideoStream不再强引用WDGVideoView，二者可以分别销毁，detach会在销毁前自动执行。

### V0.4.1 - 2016.10.27

<span class="changelog optimize">优化</span>

- 将 SDK 更新为静态库。
- 升级 WebRTC 库版本为 M55。

### V0.4.0 - 2016.10.19

<span class="changelog optimize">优化</span>

- 更新错误码。
- 发起会议等部分接口变更。

### V0.3.4 - 2016.10.14

<span class="changelog fix">修复</span>

- 增加边界条件限制，API 调用参数错误时会给出提示。

### V0.3.3 - 2016.10.12

<span class="changelog fix">修复</span>

- `WDGVideoClient` 被销毁后，之前创建的本地流未关闭，重新创建 `WDGVideoClient` 并创建本地流耗时过长。
- iOS10 下，当应用未在 Info.plist 添加麦克风权限导致的崩溃问题。
- 更新 API 文档注释。

### V0.3.2 - 2016.09.29

<span class="changelog fix">修复</span>

- 视频流的开启、关闭接口改为属性，以使其可查询。
- 接受邀请时增加可指定本地视频流的 API 接口。
- 代理标记为  `nullable` 。
- 增加部分 API 注释。
- 修复 WDGVideoView 的 size 被设为 0 时引发的布局计算问题。

### V0.3.1 - 2016.09.22

<span class="changelog fix">修复</span>

- ConversationMode 的字符串表示改为 `p2p` 与 `server_based`。
- 本地视频流目前只支持 352x288 640x480 和 1280x720 三种，因此在对外公开的枚举量中去除无效的选项。
- 邀请接口，userID 输入空字符串或 nil ，localStream 输入已关闭的流和 nil 的情况下都回直接返回错误信息，不会将邀请发出去。因此接口的返回值改为 nullable。

### V0.3.0 - 2016.09.22

<span class="changelog add">新增</span>

- 新增 Server based 模式。
- 新增 MeetingCast 模块。

<span class="changelog fix">修复</span>

- 改进本地流创建及销毁策略。
- RTCPeerconnectionFactory 设为单例以避免其早于 LocalStream 等对象销毁。
- WDGVideoView 适用 contentMode 选项，支持 AspectFit 、 AspectFill 和 Fill 三种显示模式。
- WDGVideoConversation 中的邀请API返回值改为 BOOL。
- 修复 WDGVideoConversation 中 participants 只增不减的问题。
