
title: 更新日志
---

## iOS SDK

### V2.2.0 - 2016.02.06

<span class="changelog add">新增</span>

- 更详细的错误码。

<span class="changelog feature">改进</span>

- 当路径中含有非法字符时抛出异常。

<span class="changelog fix">修复</span>

- 断线重连后未重发未完成的 setValue 请求。

### V2.1.2 - 2016.01.16

<span class="changelog fix">修复</span>

- 事务操作在处理数组时失败的问题。

### V2.1.1 - 2016.01.06

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


