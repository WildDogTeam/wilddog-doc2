
title: 更新日志
---

## iOS SDK



### v2.4.4 - 2017.01.26

<span class="changelog add">新增</span>
- 支持获取本地媒体流的音频数据，可用于语音识别



### v2.4.3 - 2017.12.29

<span class="changelog add">新增</span>
- 手机摄像头默认配置方法
- 手机闪光灯等摄像头相关设备的控制方法

<span class="changelog fix">修复</span>
- iPhoneX,iPhone8,iPadPro等新上市设备在VP8编码下，720P的时候花屏或黑屏的问题



### v2.4.2 - 2017.12.15

<span class="changelog optimize">优化</span>
- 支持在 `stream` 中设置自定义属性



### v2.4.1 - 2017.12.08

<span class="changelog optimize">优化</span>
- 根据客户端情况自动优选编解码方式
- 优化欠费信息提醒



### v2.4.0 - 2017.12.01

<span class="changelog add">新增</span>
- 新增自定义设置最大码率和最小码率
- 新增支持配置服务器中继 `relay` 类型通话

<span class="changelog optimize">优化</span>
- 切换网络之后的重连机制优化

<span class="changelog deprecated">删除</span>
- BeautyView不再建议使用


### v2.3.3 - 2017.11.28

<span class="changelog optimize">优化</span>
- 优化超时逻辑，WebRTC连接异常退出将触发超时错误。
- 优化了错误状态反馈。


### v2.3.2 - 2017.11.22

<span class="changelog fix">修复</span>
- 修复偶发的黑屏或客户端卡死的问题


### v2.3.1 - 2017.11.18

<span class="changelog optimize">优化</span>
- 优化通话建连逻辑，提高P2P连接成功率


### v2.3.0 - 2017.11.09

<span class="changelog add">新增</span>

- 新增对120p、240p的支持

<span class="changelog optimize">优化</span>

- 升级到 WebRTC M62 版本


### v2.2.2 - 2017.11.01

<span class="changelog add">新增</span>
- 新增显示一对一视频通话类型，表示当前通话类型是P2P或是Relay。


### v2.2.1 - 2017.10.20

<span class="changelog add">新增</span>
- 新增支持了模拟器调试。


### v2.2.0 - 2017.10.12

<span class="changelog optimize">优化</span>

- 产品名称修改为WilddogVideoCall


### v2.1.0 - 2017.09.19

<span class="changelog add">新增</span>

- 新增`WilddogVideoBase`包。


### v2.0.0 - 2017.08.14

自 `v2.0.0` 版本起，一对一视频通话、视频会议两大功能完成分拆。一对一视频通话主要应用于一对一视频，采用 `P2P + NAT穿透`的混合方案；视频会议主要应用于多人视频、连麦直播等场景。

由于架构调整，`v2.0.0` 无法兼容先前版本，请正在集成测试V1一对一视频通话的用户换用V2新版本进行测试。已经正式使用V1版本的用户，服务不受影响。

此更新日志将延续一对一视频通话SDK的更新。`一对一视频通话 v2.0.0` 功能如下：

- 一对一视频通话
- 视频清晰度支持360p、480p、720p
- 支持获取原始视频流接口，可用于自定义美颜滤镜、人脸识别等视频预处理业务。(例如使用Camera360sdk、TuSDK等第三方美颜滤镜库、KiwiFace人脸识别等)
- 支持本地混流录制。
- 支持视频流统计接口，可用于实时获取帧率、比特率、延迟、流量等信息。




### v1.2.0 - 2017.07.07

自v1.2.0版本起，实时一对一视频通话iOS版SDK去掉Beta标识，发布为正式版本，目前已实现的功能包括：

- 一对一视频通话
- 多人视频会议，目前最高支持6路
- 多人视频会议直播
- 视频清晰度支持360p、480p、720p
- 支持一对一视频通话获取原始视频流接口，可用于自定义美颜滤镜等(例如使用Camera360sdk、TuSDK等第三方美颜滤镜库)视频预处理业务。
- 支持一对一视频通话本地混流录制。
- 支持一对一视频通话视频流统计接口，可用于实时获取帧率、比特率、延迟、流量等信息。

### v1.2.0 Beta - 2017.06.30

<span class="changelog add">新增</span>

- 新增本地混流录制功能。

### v1.1.0 Beta - 2017.06.20

<span class="changelog add">新增</span>

- 新增 WDGBeautyVideoView，用于在配合 Camera360 美颜时达到更好的效果

### v1.0.0 Beta - 2017.05.25

<span class="changelog add">新增</span>

- 新增获取原始视频流接口，可用于自定义美颜滤镜等(例如使用Camera360、TuSDK等第三方滤镜库)视频预处理业务。
- 一对一视频通话新增视频流统计接口，可用于实时获取帧率、比特率、延迟、流量等信息。
- 一对一视频通话新增WDGVideoInviteStatusBusy状态，表示对方正在通话。

<span class="changelog optimize">优化</span>

- 优化WDGVideoConstraints类型，改用清晰度表示更直观，包括360p、480p、720p、1080p。
- 默认帧率更改为16fps，节省电量和流量。
- 一对一视频通话CPU占用降低，性能提升20%。

<span class="changelog fix">修复</span>

- 视频会议偶现画面连接失败，已修复。
- 快速重复开关摄像头导致再次开启困难，已修复

