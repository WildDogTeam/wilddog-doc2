title: Sync 更新日志
---

## iOS SDK

### V2.0.0 - 2016.09.01

**描述**

对 Wilddog SDK 全面升级，拆分为 Sync 和 Auth 两个独立的部分。其中将原有的 Wilddog SDK 更名为 WilddogSync SDK。

**改进**

- 移除原有 Wilddog SDK 中 Auth 功能。
- 将 Wilddog SDK 改名为 WilddogSync SDK。

### V2.0.1 - 2016.09.10

**描述**

将原有的 Wilddog 全部改名为 Sync, 部分类有新增和拆解。新增 WilddogCore SDK，新版 Sync 的初始化方法依赖 WilddogCore SDK。

**新增**

- 新增 WilddogCore SDK。Sync 和 Auth 的使用都需要依赖它。
- 新增 WDGSync 和 WDGServerValue 类。
- 新增 WDGApp、和 WDGOptions 类用于初始化。

**改进**

- 将所有相关 Wilddog 类名改为 Sync 相关类名。
- 统一 Sync 模块初始化接口。

**废弃**

废弃 -childByAppendingPath: 方法，用 -child: 方法代替

</br>

---


## Android SDK

### V2.0.0 - 2016.09.01

**描述**

该版本将Auth SDK 从Wilddog SDK中分离。


**改进**

将Wilddog中Auth相关代码移除。

### V2.0.1 - 2016.09.20

**描述**

该版本优化初始化过程，新增 WilddogOptions，WilddogApp 等类用于初始化。将 Wilddog 相关类改为 SyncReference，新增 WilddogSync 类用于初获取 SyncReference 对象。

**新增**

- 新增 WilddogOptions，WilddogApp 等类用于初始化。
- 新增 WilddogSync 类用于初获取S yncReference 对象。

**改进 **
- 将 Wilddog 修改为 SyncReference。
- 将 WilddogError 修改为 SyncError。

**修复**

由于 token 过期导致 WilddogSync sdk 崩溃问题。

### V2.0.1 - 2016.09.20

**描述**

该版本优化初始化过程。只需要初始化一次 WilddogApp 对象就可以使用 WilddogAuth 中使用。

**新增**

新增 WilddogOptions，WilddogApp 等类用于初始化。

**改进**

改进 WilddogAuth 初始化过程。将部分 WilddogAuth 初始化方法移除。

**修复**

WildUser 获取 token 空指针问题。

</br>

---


## c/嵌入式 SDK

### v1.0.7 - 2016.09.23

**修复**

修复 Espressif 平台下拷贝不对齐字段导致死机的 bug。

### v1.0.6 - 2016.09.03

**修复**

修复 wilddog_push 的回调中 path 不正确的 bug。

### v1.0.5 - 2016.08.04

**修复**

修复离线时新建 wilddog 和发送数据会导致内存未释放的 bug。

### v1.0.4 - 2016.07.12

**修复**

- 修复调用 auth 接口偶然不生效的问题。
- 修复最大消息队列设置不生效问题。

### v1.0.3 - 2016.06.28

**修复**

修复频繁收发数据包时心跳机制策略导致断连问题。

### v1.0.2 - 2016.06.24

**修复**

修复心跳机制不生效的 bug。

### v1.0.1 - 2016.04.26

**修复**

- 修复 esp8266 例子运行一段时间后报错的 bug。
- 修复 esp8266 文档中的一些错误。
- 修复在某些编译器下 wilddog_setTimeIncrease 编译报错的 bug。

### v1.0.0 - 2016.03.04

**修复**

修复 windows 下编译 CoAP 库出错的 bug。

**优化**

优化重连机制，重连后服务器会将订阅的数据重新推送到客户端，使用返回码 WILDDOG_ERR_RECONNECT 标识。

### v0.8.0 - 2016.01.18

**新增**

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

**优化**

- 对长连接机制进行重构，智能检测最合适的心跳时间，客户端掉线时云端数据会在重连后第一时间同步。
- wilddog_getKey 将不再返回 client 对应 key 的快照，直接返回 key 本身的地址。
- 将编译选项中加密类型 APP_SEC_TYPE 的 dtls 类型更名为 mbedtls。

**修复**

修复 tinydtls 以及 mbedtls 握手有概率失败的bug。