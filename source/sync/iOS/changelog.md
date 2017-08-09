
title: 更新日志
---

## iOS SDK

### V2.3.9 - 2017.08.09

<span class="changelog feature">改进</span>

- 优化创建监听时的流量与传输消耗。

<span class="changelog feature">修复</span>

- 修复在某些情况下，对“先移除监听，再添加监听”的处理顺序错误，的问题。

### V2.3.8 - 2017.07.25

<span class="changelog feature">修复</span>

- 修复可能会导致闪退的一些问题。


### V2.3.7 - 2017.07.21

<span class="changelog feature">改进</span>

- 内部优化。

### V2.3.6 - 2017.07.13

<span class="changelog fix">修复</span>

- 修复同一节点下，多个不同条件的singleEvent数据错误问题。
- 修复key为纯数字，并且是在开始监听之前就存在的数据，监听不到remove事件的问题。
- 修复setValue时值为double或float类型，本地监听的block可能会响应2次的问题。

### V2.3.5 - 2017.06.02

<span class="changelog feature">改进</span>

- 优化日志系统，修复部分错乱日志。

### V2.3.4 - 2017.06.01

<span class="changelog fix">修复</span>

- 修复当多次调用 `[WDGSync reference]` 时，`-[WDGSyncReference removeAllObserves]` 失效。

### V2.3.3 - 2017.05.13

<span class="changelog fix">修复</span>

- 设备断网后再恢复时重连失败的问题。


### V2.3.2 - 2017.04.18

<span class="changelog feature">改进</span>

- 线程安全优化。

### V2.3.1 - 2017.04.14

<span class="changelog fix">修复</span>

- 修复监听浮点型数据有可能造成回调中数据不变化的问题。

### V2.3.0 - 2017.04.11

<span class="changelog add">新增</span>

- 新增 WDGSyncErrorNonExistentNode = 26301 错误码，在空节点上设置 priority 时报此错误。

<span class="changelog feature">改进</span>

- 优化 WilddogSync 响应速度和内存占用，响应速度提高 25%。
- 优化 WilddogSync 建连策略，使得服务不可用时能快速切换服务。
- 优化 WilddogSync 重连策略，实现更合理的快速重连。

<span class="changelog fix">修复</span>

- 允许 `[WDGServerValue timestamp]` 作为优先级。
- 部分 `WDGSyncReference` 的 `sync` 和 `URL` 方法返回 nil 的问题。
- 监听数据时，如果只修改了优先级，在监听回调中数据不对的问题。
- 同时监听同一路径，但条件不同时，第二次监听先返回一次空数据的问题。
- 通过 `orderByChild` 等排序方法建立的监听，当数据对应值多次变动时出现排序错误。
- 监听节点时，当返回 `null` 节点导致 SDK Crash 问题。
- 在 32 位设备中 `[WDGServerValue timestamp]` 的数值溢出问题。
- 监听 `.info/serverTimeOffset` 结果始终为 0 的问题。
- 极个别情况下 `snapshot.children` 中缺少一条数据的问题。

### V2.2.4 - 2017.03.09

<span class="changelog add">新增</span>

- 
<span class="changelog feature">改进</span>

- 优化无网络情况下的重连策略。
- 更新头文件中的文档注释。

<span class="changelog fix">修复</span>

- [WDGSync referenceWithPath:]` 方法不能正确处理中文的问题。
- 允许 `updateChildValues:` 参数字典的 key 中包含字符 。
- 同一节点已进行过 `queryLimitedToFirst:` 监听，再建立 `queryLimitedToLast:` 监听返回相同的结果的问题。

### V2.2.3 - 2017.02.20

<span class="changelog fix">修复</span>

- 集成 bitcode

### V2.2.2 - 2017.02.16

<span class="changelog fix">修复</span>

- 监听 `.info/serverTimeOffset` 无效果的问题。

### V2.2.1 - 2017.02.13

<span class="changelog fix">修复</span>

- 事务操作始终写入成功的问题。

### V2.2.0 - 2017.02.06

<span class="changelog add">新增</span>

- 更详细的错误码。

<span class="changelog feature">改进</span>

- 当路径中含有非法字符时抛出异常。

<span class="changelog fix">修复</span>

- 断线重连后未重发未完成的 setValue 请求。

### V2.1.2 - 2017.01.16

<span class="changelog fix">修复</span>

- 事务操作在处理数组时失败的问题。

### V2.1.1 - 2017.01.06

<span class="changelog feature">改进</span>

- 提升首次启动建立连接的速度。

### V2.1.0 - 2016.12.30

<span class="changelog add">新增</span>

-  新增 App 唯一标识，用于统计 Wilddog App 日活用户。

<span class="changelog feature">改进</span>

- 提升数据监听性能。

<span class="changelog fix">修复</span>

- 修复 - [WDGSync setCallbackQueue:] 接口调用导致的 crash。

### V2.0.7 - 2016.12.09

<span class="changelog feature">改进</span>

- 降低在弱网环境下 SDK 的流量损耗。

<span class="changelog add">新增</span>

- 修复在 iPhone 5 之前的机型上监听事件偶尔失效的问题。
- 修复因为 op_repeat 错误导致的本地监听事件多次回调的问题。

### V2.0.6 - 2016.12.06

<span class="changelog fix">修复</span>

- 修复在事务方法中，节点出现汉字或者布尔值而导致写入失败的问题。

### V2.0.5 - 2016.12.02

<span class="changelog feature">改进</span>

- 加入避免 crash 机制，降低 SDK 可能发生的 crash。

### V2.0.4 - 2016.11.23
<span class="changelog fix">修复</span>

- 修复取消离线事件无效的问题。

### V2.0.3 - 2016.11.04

<span class="changelog describe">描述</span>

- 修复了 WilddogSync SDK 中事务操作出现的问题。

<span class="changelog fix">修复</span>

- 修复在事务方法中不能删除数据的问题。
- 修复在根节点使用事务方法奔溃的问题。

### V2.0.1 - 2016.09.10

<span class="changelog describe">描述</span>

- 将原有的 Wilddog 全部改名为 Sync, 部分类有新增和拆解。新增 WilddogCore SDK，新版 Sync 的初始化方法依赖 WilddogCore SDK。

<span class="changelog add">新增</span>

- 新增 WilddogCore SDK。Sync 和 Auth 的使用都需要依赖它。
- 新增 WDGSync 和 WDGServerValue 类。
- 新增 WDGApp、和 WDGOptions 类用于初始化。

<span class="changelog feature">改进</span>

- 将所有相关 Wilddog 类名改为 Sync 相关类名。
- 统一 Sync 模块初始化接口。

<span class="changelog deprecated">废弃</span>

- 废弃 -childByAppendingPath: 方法，用 -child: 方法代替

### V2.0.0 - 2016.09.01

<span class="changelog describe">描述</span>

- 对 Wilddog SDK 全面升级，拆分为 Sync 和 Auth 两个独立的部分。其中将原有的 Wilddog SDK 更名为 WilddogSync SDK。

<span class="changelog feature">改进</span>

- 移除原有 Wilddog SDK 中 Auth 功能。
- 将 Wilddog SDK 改名为 WilddogSync SDK。




