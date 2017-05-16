
title: 更新日志
---

## Javascript SDK

### V2.5.7 - 2017.05.16

<span class="changelog feature">修复</span>

- 修复移动端挂起恢复时延迟很久才尝试重连的问题。


### V2.5.6 - 2017.04.25

<span class="changelog feature">修复</span>

- 修复 websocket 建连前 set() 特殊字符失败的问题。
- 修复部分情况下重连失败的问题。
- 修改 typescript 中对 user.getToken() 返回值的描述。

### V2.5.2 - 2017.02.06

<span class="changelog feature">修复</span>

- 修复了当 sync 受安全域名限制时不报错的问题。


### V2.5.0 - 2017.02.06

<span class="changelog add">新增</span>

- 新增 sync 错误码。

<span class="changelog feature">改进</span>

- 优化与服务端的第一次建连时间，去除多余的 request 检测。


### V2.4.4 - 2016.01.13

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
