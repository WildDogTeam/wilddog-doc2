
title: 更新日志
---

## Android SDK
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

---


## C/嵌入式 SDK

### V1.1.0 - 2016.12.28
<span class="changelog add">新增</span>

- 增加在线状态查询和订阅功能。

<span class="changelog optimize">优化</span>

- 优化逻辑，当调用getValue/setValue/push/remove/addObserver等和服务端同步的 API 错误时，除了返回中携带错误信息之外，还会触发回调函数。

<span class="changelog fix">修复</span>

- 修复超时时间不准的 bug。
- 修复连接成功之前调用 goOffline 无效的 bug。

### V1.0.9 - 2016.12.20

<span class="changelog fix">修复</span>

- 修复初始化时内存分配失败可能导致内存未释放的bug。

### V1.0.8 - 2016.10.21

<span class="changelog fix">修复</span>

- 修复observer接收到错误后不能完全释放资源，需要用户手动removeObserver的bug。

### V1.0.7 - 2016.09.23

<span class="changelog fix">修复</span>

- 修复 Espressif 平台下拷贝不对齐字段导致死机的 bug。

### V1.0.6 - 2016.09.03

<span class="changelog fix">修复</span>

- 修复 wilddog_push 的回调中 path 不正确的 bug。

### V1.0.5 - 2016.08.04

<span class="changelog fix">修复</span>

- 修复离线时新建 wilddog 和发送数据会导致内存未释放的 bug。

### V1.0.4 - 2016.07.12

<span class="changelog fix">修复</span>

- 修复调用 auth 接口偶然不生效的问题。
- 修复最大消息队列设置不生效问题。

### V1.0.3 - 2016.06.28

<span class="changelog fix">修复</span>

- 修复频繁收发数据包时心跳机制策略导致断连问题。

### V1.0.2 - 2016.06.24

<span class="changelog fix">修复</span>

- 修复心跳机制不生效的 bug。

### V1.0.1 - 2016.04.26

<span class="changelog fix">修复</span>

- 修复 esp8266 例子运行一段时间后报错的 bug。
- 修复 esp8266 文档中的一些错误。
- 修复在某些编译器下 wilddog_setTimeIncrease 编译报错的 bug。

### V1.0.0 - 2016.03.04

<span class="changelog fix">修复</span>

- 修复 windows 下编译 CoAP 库出错的 bug。

<span class="changelog optimize">优化</span>

- 优化重连机制，重连后服务器会将订阅的数据重新推送到客户端，使用返回码 WILDDOG_ERR_RECONNECT 标识。

### v0.8.0 - 2016.01.18

<span class="changelog add">新增</span>

- 增加离线事件 API：
    - wilddog_goOnline, 使客户端在线；
    - wilddog_goOffline, 使客户端离线；
    - wilddog_onDisconnectSetValue, 当客户端离线时，云端会自动执行该操作；
    - wilddog_onDisconnectPush, 当客户端离线时，云端会自动执行该操作；
    - wilddog_onDisconnectRemoveValue, 当客户端离线时，云端会自动执行该操作；
    - wilddog_cancelDisconnectOperations, 取消之前所有离线操作；

- 增加 WildDog 实例操作 API：
    - wilddog_getHost, 获取Wilddog实例的host；
    - wilddog_getPath, 获取Wilddog实例的path；

<span class="changelog optimize">优化</span>

- 对长连接机制进行重构，智能检测最合适的心跳时间，客户端掉线时云端数据会在重连后第一时间同步。
- wilddog_getKey 将不再返回 client 对应 key 的快照，直接返回 key 本身的地址。
- 将编译选项中加密类型 APP_SEC_TYPE 的 dtls 类型更名为 mbedtls。

<span class="changelog fix">修复</span>

- 修复 tinydtls 以及 mbedtls 握手有概率失败的bug。
