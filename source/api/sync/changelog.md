
title: 更新日志
---

## Javascript SDK

### V2.4.3 - 2016.01.13

<span class="changelog add">新增</span>

- 小程序数据绑定增加回调函数，通过回调函数确定绑定是否成功。

<span class="changelog fix">修复</span>

- 修复 sync.once() 失败情况下不触发cancelCallback(失败回调函数)的问题。
- 修复 wilddog.initializeApp 相关逻辑bug，包括：异常处理逻辑错误 和 调用多个App逻辑错误 的问题。


### V2.4.2 - 2016.01.06

<span class="changelog feature">改进</span>

- 优化与服务端的第一次建连时间。


### V2.4.1 - 2016.12.30

<span class="changelog add">新增</span>

- 新增 App 唯一标识，用于统计 Wilddog App 日活用户。


### V2.3.9 - 2016.12.15

<span class="changelog add">新增</span>

- 新增对 typescript 的支持。

<span class="changelog fix">修复</span>

- 修复 sync().remove().then() 报错的问题。
- 修复 sync.ref('.info') 函数对 '.info' 节点不支持的问题。


### V2.3.6 - 2016.11.23

<span class="changelog add">新增</span>

- wilddog.initialize(config) 方法新增对 config.syncURL 是否合法的检查。


### V2.3.0 - 2016.11.10

<span class="changelog add">新增</span>

- 增加对微信小程序的支持。


### V2.1.2 - 2016.10.17

<span class="changelog fix">修复</span>

- 修复 EmailAuthProvider.credential() 方法生成的 Credential 不合法的 bug。



### V2.1.1 - 2016.10.17

<span class="changelog fix">修复</span>

- 修复 iPhone 4s, iPhone 5s 微信公众账号登录失败的 bug。



### V2.1.0 - 2016.09.30

<span class="changelog add">新增</span>

- 增加对 Node.js 的支持。
- 增加对 ReactNative 的支持。

<span class="changelog fix">修复</span>

- 修复 ServerValue 获取不到的 bug。
- 修复 limits_exceeded 错误不能被捕获的 bug。
- 修复微信公众号登录异常的 bug。



### V2.0.0 - 2016.09.01

<span class="changelog describe">描述</span>

- Wilddog SDK 全面升级，拆分为 Sync 和 Auth 两个独立的模块。

<span class="changelog feature">改进</span>

- 移除原有 Wilddog SDK 中 Auth 功能。

- Wilddog SDK 提供 Sync 与 Auth 两个模块。

  新版的使用方式请参考 [新版 Wilddog 文档](/quickstart/sync/web.html)。



</br>

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


</br>

---


## Android SDK

### V2.1.1 - 2016.12.30

<span class="changelog add">新增</span>

新增 App 唯一标识，用于统计 Wilddog App 日活用户。

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
