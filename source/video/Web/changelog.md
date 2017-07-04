
title: 更新日志
---

## Javascript SDK

### v1.0.0 - 2017.06.22

**由于数据结构变更，自该版本起，将无法与 `v1.0.0` 之前的版本互通，为保证您的业务正常运行，建议选用新版本。**

<span class="changelog add">新增</span>

- 视频通话新增 `busy` 状态，表示对方正在通话。

### v0.5.20 - 2017.05.09

<span class="changelog optimize">优化</span>

- 优化创建媒体流的参数，参数选项由 low、low-16:9、standard、standard-16:9、high-16:9、true 更新为：360p、480p、720p、1280p、true。原有参数提示废弃，不影响使用。
- 废弃 participant 中的 streamAdded 事件，增加 stream_added 事件。
- 默认视频帧率改为 15。

<span class="changelog fix">修复</span>

- 修复因多点登录造成同时处理视频通话邀请时可能出现的未知 bug。。

### v0.5.19 - 2017.04.28

<span class="changelog add">新增</span>

- 增加本地统计。

### v0.5.18 - 2017.04.21

<span class="changelog optimize">优化</span>

- 优化 gateway 协议，离开时先发送统计信息，后发 bye
- 更新 ie safari 适用插件。
- 优化在 sync 服务器不稳定时造成数据残留的问题。

<span class="changelog fix">修复</span>

- 忽略对 peerconnection disconnected状态的关注。
- 修复在 ie safari 等插件环境下无法获取统计的问题。

### v0.5.17 - 2017.04.17

<span class="changelog optimize">优化</span>

- 优化 gateway 协议，提高套餐使用量统计准确性。

### v0.5.15 - 2017.04.14

<span class="changelog optimize">优化</span>

- 优化 gateway 协议，提高套餐使用量统计准确性。

### v0.5.13 - 2017.04.10

<span class="changelog fix">修复</span>

- 修复调用 createStream， video 选项设为 false 时报错的问题。

### v0.5.12 - 2017.03.24

<span class="changelog optimize">优化</span>

- 优化错误码结构。

<span class="changelog fix">修复</span>

- 修复 Client 中无法监听 error 事件的问题。

### v0.5.10 - 2017.03.17

<span class="changelog optimize">优化</span>

- 优化 gateway 协议。

### v0.5.8 - 2017.02.24

<span class="changelog optimize">优化</span>

- 增加 gateway 超时错误处理。
- 优化视频通话处理逻辑。

### v0.5.7 - 2017.02.17

<span class="changelog fix">修复</span>

- 修复 conference 中媒体流断开后不通知服务器的bug；

### v0.5.6 - 2017.02.06

<span class="changelog optimize">优化</span>

- 第一次建立 websocket 连接时增加失败尝试重连机制。

### v0.5.5 - 2017.01.09

<span class="changelog add">新增</span>

- conversation 增加 NAT 穿越服务器选择算法。

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
