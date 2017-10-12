
title: 更新日志
---

## Javascript SDK

### v2.2.0 - 2017.10.12

<span class="changelog add">新增</span>
- 支持safari 11

<span class="changelog optimize">优化</span>

- 产品名称修改为WilddogVideoCall

<span class="changelog fix">修复</span>

- 修复wilddogvideocall Sdk初始化代码
- 修复火狐和IE浏览器视频通话的bug
- 修复chrome浏览器下媒体流统计错误的bug

### v2.0.0 - 2017.08.24

自 `v2.0.0` 版本起，视频通话、视频会议两大功能完成分拆。视频通话主要应用于一对一视频，采用 `P2P + NAT穿透`的混合方案；视频会议主要应用于多人视频、连麦直播等场景。

由于架构调整，`v2.0.0` 无法兼容先前版本，请正在集成测试V1视频通话的用户换用V2新版本进行测试。已经正式使用V1版本的用户，服务不受影响。

此更新日志将延续视频通话SDK的更新。`视频通话 v2.0.0` 功能如下：

- 一对一视频通话
- 视频清晰度支持360p、480p、720p
- 支持视频流统计接口，可用于实时获取帧率、比特率、延迟、流量等信息。

### v1.0.2 - 2016.07.27

<span class="changelog fix">修复</span>

- 修复邀请方取消邀请时导致的bug

<span class="changelog optimize">优化</span>

- 优化视频通话处理逻辑

### v1.0.1 - 2016.06.30

<span class="changelog fix">修复</span>

- 修复邀请方多次邀请导致重复建立连接的问题

### v1.0.0 - 2017.06.22

自v1.0.0版本起，实时视频通话Javascript版SDK发布为正式版本，目前已实现的功能包括：

- 一对一视频通话
- 多人视频会议，目前最高支持6路
- 多人视频会议直播
- 支持360p、480p、720p、1080p等多种清晰度