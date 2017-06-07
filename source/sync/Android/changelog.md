
title: 更新日志
---

## Android SDK

### V2.3.1 - 2017.05.27

<span class="changelog fix">修复</span>

- 修复部分 Android 7.0 系统上出现网络状态无法获取问题。

### V2.3.1 - 2017.05.27

<span class="changelog fix">修复</span>

- 修复并发请求出现的 CurrentModificationException 问题。
- 修复部分用户使用 okhttp 库导致的 ws 库冲突问题。

### V2.3.0 - 2017.04.11

<span class="changelog add">新增</span>

- 新增 ERR_NON_EXISTENT_NODE = 26301 错误码，在空节点上设置 priority 时报此错误。

<span class="changelog fix">修复</span>

- 解决更新缓存数据报错问题。
- 解决无网情况下网络请求报错问题。

<span class="changelog feature">改进</span>

- 优化 WilddogSync 建连策略，使得服务不可用时能快速切换服务。
- 优化 WilddogSync 重连策略，根据网络状态选择不同的策略，减少流量和电量的浪费。

### V2.2.0 - 2017.02.07

<span class="changelog add">新增</span>

- 新增新版错误码，废弃原有负数错误码，同时保持向下兼容。

<span class="changelog fix">修复</span>

- 修复CommonCache数据库插入数据时报错问题。

<span class="changelog feature">改进</span>

- 废弃DataSnapshot类的getValue(Class)方法。



### V2.1.1 - 2016.12.30

<span class="changelog add">新增</span>

- 新增 App 唯一标识，用于统计 Wilddog App 日活用户。

### V2.0.3 - 2016.11.08

<span class="changelog fix">修复</span>

- 特殊情况下，repo 类有一定几率会出现空指针。

### V2.0.2 - 2016.10.21

<span class="changelog fix">修复</span>

-  修复在特殊使用场景下，频繁调用 goOnline 和 goOffline 情况下导致空指针。

### V2.0.1 - 2016.09.20

<span class="changelog describe">描述</span>

- 该版本优化初始化过程。只需要初始化一次 WilddogApp 对象就可以使用 WilddogAuth 中使用。

<span class="changelog add">新增</span>

- 新增 WilddogOptions，WilddogApp 等类用于初始化。

<span class="changelog feature">改进</span>

- 改进 WilddogAuth 初始化过程。将部分 WilddogAuth 初始化方法移除。

<span class="changelog fix">修复</span>

- WildUser 获取 token 空指针问题。



### V2.0.0 - 2016.09.01

<span class="changelog describe">描述</span>

- 该版本将 Auth SDK 从 Wilddog SDK 中分离。


<span class="changelog feature">改进</span>

- 将 Wilddog 中 Auth 相关代码移除。



</br>


