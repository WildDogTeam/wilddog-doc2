
title: 更新日志
---

## Javascript SDK

### V2.5.6 - 2017.04.25

<span class="changelog feature">修复</span>

- 修复 websocket 建连前 set() 特殊字符失败的问题。
- 修复部分情况下重连失败的问题。
- 修改 typescript 中对 user.getToken() 返回值的描述。

### V2.5.1 - 2017.02.08

<span class="changelog fix">修复</span>

- 修复了 init App 后立即执行 signOut() 无效的问题。

### V2.5.1 - 2017.02.08

<span class="changelog fix">修复</span>

- 修复 token 过期自动退出登录时不触发 onAuthStateChanged 回调的问题。


### V2.4.3 - 2016.01.13

<span class="changelog add">新增</span>

- 小程序数据绑定增加回调函数，通过回调函数确定绑定是否成功。

<span class="changelog fix">修复</span>

- 修复 sync.once() 失败情况下不触发cancelCallback(失败回调函数)的问题。
- 修复 wilddog.initializeApp 相关逻辑bug，包括：异常处理逻辑错误 和 调用多个App逻辑错误 的问题。


### V2.4.1 - 2016.12.30

<span class="changelog add">新增</span>

- 新增 App 唯一标识，用于统计 Wilddog App 日活用户。


### V2.3.10 - 2016.12.20

<span class="changelog feature">改进</span>

- 规范 Auth （服务端） 错误码，支持 error.code 和 error.message ，并提供相应的错误码问文档。


### V2.3.9 - 2016.12.15

<span class="changelog add">新增</span>

- 新增对 typescript 的支持。

<span class="changelog fix">修复</span>

- 修复 sync().remove().then() 报错的问题。
- 修复 sync.ref('.info') 函数对 '.info' 节点不支持的问题。


### V2.3.8 - 2016.11.28

<span class="changelog fix">修复</span>

- 修复手机号的 credential 登录失败的问题。


### V2.3.5 - 2016.11.17

<span class="changelog fix">修复</span>

- 修复手机号认证后，信息不能及时更新的bug。


### V2.3.0 - 2016.11.10

<span class="changelog add">新增</span>

- 增加对微信小程序的支持。


### V2.2.0 - 2016.11.04

<span class="changelog describe">描述</span>

- Auth 新增手机号登录、手机号发送验证码等功能

<span class="changelog add">新增</span>

- 新增 WilddogAuthProvider 类，包含邮箱和手机号登录的凭证。
- 新增手机号登录、手机号重置密码、手机号验证用户
- 新增手机号发送相关验证码方法

<span class="changelog feature">改进</span>

- 统一 Auth 手机号和邮箱登录方式的凭证。

<span class="changelog deprecated">废弃</span>

- 废弃 EmailAuthProvider 类，用 WilddogAuthProvider 类代替

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
