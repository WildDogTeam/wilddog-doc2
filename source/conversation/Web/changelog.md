
title: 更新日志
---

## Javascript SDK


### v2.4.1 - 2017.12.08

<span class="changelog optimize">优化</span>
- 根据客户端情况自动优选编解码方式

<span class="changelog fix">修复</span>
- 修复了媒体流统计接口延迟信息总为0的问题


### v2.4.0 - 2017.12.01

<span class="changelog add">新增</span>
- 新增自定义设置最大码率和最小码率
- 新增支持配置服务器中继 `relay` 类型通话

<span class="changelog optimize">优化</span>
- 优化ice重启机制



### v2.3.3 - 2017.11.28

<span class="changelog optimize">优化</span>
- 优化超时逻辑，WebRTC连接异常退出将触发超时错误。
- 优化接通前的挂断逻辑，区分超时挂断和主动挂断，超时挂断触发超时错误。
- 优化重定向机制

<span class="changelog fix">修复</span>
- 修复token校验错误和token过期时反复触发token_error错误
- 修复在建立websoket前发送call()方法存在的问题



### v2.3.2 - 2017.11.18

<span class="changelog optimize">优化</span>
- 优化通话建连逻辑，提高P2P连接成功率
- 优化媒体流统计接口，适配不同浏览器下的数据

<span class="changelog fix">修复</span>
- 修复关闭摄像头偶尔失败的问题



### v2.3.1 - 2017.11.10

<span class="changelog add">新增</span>
- 新增对120p、240p的支持

<span class="changelog fix">修复</span>
- 修复发送邀请超时主动拒绝的bug



### v2.2.2 - 2017.11.01

<span class="changelog add">新增</span>
- 新增显示一对一视频通话类型，表示当前通话类型是P2P或是Relay。

### v2.2.1 - 2017.10.27

<span class="changelog add">新增</span>
- 新增了WilddogVideoCall的npm版本，方便开发者集成

<span class="changelog fix">修复</span>
- 修复了同时使用`WilddogVideoCall`和`WilddogVideoRoom`时，不能顺利初始化的问题



### v2.2.0 - 2017.10.12

<span class="changelog add">新增</span>
- 支持safari 11

<span class="changelog optimize">优化</span>

- 产品名称修改为WilddogVideoCall

<span class="changelog fix">修复</span>

- 修复wilddogvideocall Sdk初始化代码
- 修复火狐和IE浏览器一对一视频通话的bug
- 修复chrome浏览器下媒体流统计错误的bug

### v2.0.0 - 2017.08.24

自 `v2.0.0` 版本起，一对一视频通话、视频会议两大功能完成分拆。一对一视频通话主要应用于一对一视频，采用 `P2P + NAT穿透`的混合方案；视频会议主要应用于多人视频、连麦直播等场景。

由于架构调整，`v2.0.0` 无法兼容先前版本，请正在集成测试V1一对一视频通话的用户换用V2新版本进行测试。已经正式使用V1版本的用户，服务不受影响。

此更新日志将延续一对一视频通话SDK的更新。`一对一视频通话 v2.0.0` 功能如下：

- 一对一视频通话
- 视频清晰度支持360p、480p、720p
- 支持视频流统计接口，可用于实时获取帧率、比特率、延迟、流量等信息。

### v1.0.2 - 2016.07.27

<span class="changelog fix">修复</span>

- 修复邀请方取消邀请时导致的bug

<span class="changelog optimize">优化</span>

- 优化一对一视频通话处理逻辑

### v1.0.1 - 2016.06.30

<span class="changelog fix">修复</span>

- 修复邀请方多次邀请导致重复建立连接的问题

### v1.0.0 - 2017.06.22

自v1.0.0版本起，实时一对一视频通话Javascript版SDK发布为正式版本，目前已实现的功能包括：

- 一对一视频通话
- 多人视频会议，目前最高支持6路
- 多人视频会议直播
- 支持360p、480p、720p、1080p等多种清晰度