title: 更新日志
---

## Android SDK


### v2.4.7 - 2017.01.26

<span class="changelog add">新增</span>
- 支持获取本地媒体流的音频数据，可用于语音识别



### v2.4.6 - 2018.01.13

<span class="changelog add">新增</span>
- 新增获取相机状态的方法

<span class="changelog optimize">优化</span>
- 音频播放默认使用扬声器，插入耳机则自动切换到耳机模式



### v2.4.5 - 2018.01.04

<span class="changelog fix">修复</span>
- 修复了本地录制功能，在部分手机上没有颜色、没有声音的问题



### v2.4.4 - 2017.12.29

<span class="changelog add">新增</span>
- 手机摄像头默认配置方法
- 手机闪光灯等摄像头相关设备的控制方法

<span class="changelog optimize">优化</span>
- 在更多安卓手机上支持了H.264软解码，提高编解码兼容性



### v2.4.3 - 2017.12.15

<span class="changelog optimize">优化</span>
- 支持在 `stream` 中设置自定义属性



### v2.4.2 - 2017.12.08

<span class="changelog optimize">优化</span>
- 根据客户端情况自动优选编解码方式



### v2.4.1 - 2017.12.06

<span class="changelog optimize">优化</span>
- 优化ice重启机制



### v2.4.0 - 2017.12.01

<span class="changelog add">新增</span>
- 新增自定义设置最大码率和最小码率
- 新增支持配置服务器中继 `relay` 类型通话



### v2.3.3 - 2017.11.28

<span class="changelog optimize">优化</span>
- 优化超时逻辑，WebRTC连接异常退出将触发超时错误。
- 优化接通前的挂断逻辑，区分超时挂断和主动挂断，超时挂断触发超时错误。

<span class="changelog fix">修复</span>
- 修复初始化后立即调用call呼叫不成功的问题


### v2.3.2 - 2017.11.22

<span class="changelog fix">修复</span>

- 修复统计接口空指针异常导致的崩溃
- 修复token校验错误和token过期时反复回调onTokenError方法的错误


### v2.3.1 - 2017.11.18

<span class="changelog optimize">优化</span>

- 优化通话建连逻辑，提高P2P连接成功率
- 默认开启扬声器


### v2.3.0 - 2017.11.11

<span class="changelog add">新增</span>

- 新增对120p、240p的支持。

<span class="changelog optimize">优化</span>

- 升级到 WebRTC M62 版本。

<span class="changelog fix">修复</span>

- 修复创建 LocalStreamOption 设置完最大 fps 无法返回Builder对象bug。


### v2.2.2 - 2017.11.1

<span class="changelog add">新增</span>
- 新增显示一对一视频通话类型，表示当前通话类型是P2P或是Relay。


### v2.2.1 - 2017.10.19

<span class="changelog optimize">优化</span>

- 支持 Android SDK API Level 16 以上系统。
- 增加 vp8/vp9 动态码率支持，优化传输码率。

### v2.2.0 - 2017.10.12

<span class="changelog optimize">优化</span>

- 产品名称修改为 WilddogVideoCall。

<span class="changelog fix">修复</span>

- 修复 ICE 状态变化导致的断开连接回调频繁 bug。


### v2.1.0 - 2017.09.19

<span class="changelog add">新增</span>

- 新增 WilddogVideoInitializer 类用来初始化 SDK 和设置 token。

<span class="changelog optimize">优化</span>

- 优化 LocalStream 创建方式。


### v2.0.0 - 2017.08.14

自 `v2.0.0` 版本起，一对一视频通话、视频会议两大功能完成分拆。一对一视频通话主要应用于一对一视频，采用 `P2P + NAT穿透`的混合方案；视频会议主要应用于多人视频、连麦直播等场景。

由于架构调整，`v2.0.0` 无法兼容先前版本，请正在集成测试V1一对一视频通话的用户换用V2新版本进行测试。已经正式使用V1版本的用户，服务不受影响。

此更新日志将延续一对一视频通话SDK的更新。`一对一视频通话 v2.0.0` 功能如下：

- 一对一视频通话
- 视频清晰度支持360p、480p、720p、1080p
- 支持获取原始视频流接口，可用于自定义美颜滤镜、人脸识别等视频预处理业务。(例如使用Camera360sdk、TuSDK等第三方美颜滤镜库、KiwiFace人脸识别等)
- 支持本地混流录制。
- 支持视频流统计接口，可用于实时获取帧率、比特率、延迟、流量等信息。

### v1.2.5 - 2017.08.04

<span class="changelog optimize">优化</span>

- 优化一对一视频通话初始化错误处理。

<span class="changelog fix">修复</span>

- 修复特殊情况下视频录制导致崩溃问题


### v1.2.0 Beta - 2017.07.14

<span class="changelog add">新增</span>

- 新增本地视频混流录制功能。

### v1.1.0 Beta - 2017.06.26

<span class="changelog optimize">优化</span>

- 优化了接口设置以及内部执行逻辑;
- 优化邀请机制，提高稳定性。


### v1.0.0 Beta - 2017.05.25

<span class="changelog add">新增</span>

- 新增获取原始视频流接口，可用于自定义美颜滤镜等(例如使用Camera360、TuSDK等第三方滤镜库)视频预处理业务。
- 一对一视频通话新增视频流统计接口，可用于实时获取帧率、比特率、延迟、流量等信息。
- 一对一视频通话新增`WDGVideoInviteStatusBusy`状态，表示对方正在通话。

<span class="changelog optimize">优化</span>

- 优化`WDGVideoConstraints`类型，改用清晰度表示更直观，包括360p、480p、720p、1080p。
- 默认帧率更改为16fps，节省电量和流量。
- 一对一视频通话CPU占用降低，性能提升20%。

<span class="changelog fix">修复</span>

- 视频会议偶现画面连接失败，已修复。
- 快速重复开关摄像头导致再次开启困难，已修复

