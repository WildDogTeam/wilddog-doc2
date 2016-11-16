
title: 更新日志
---

## Javascript SDK

### V2.3.0 - 2016.11.10

<span class="changelog add">新增</span>

增加对微信小程序的支持。


### V2.2.0 - 2016.11.04

<span class="changelog describe">描述</span>

Auth 新增手机号登录、手机号发送验证码等功能

<span class="changelog add">新增</span>

- 新增 WilddogAuthProvider 类，包含邮箱和手机号登录的凭证。
- 新增手机号登录、手机号重置密码、手机号验证用户
- 新增手机号发送相关验证码方法

<span class="changelog feature">改进</span>

- 统一 Auth 手机号和邮箱登录方式的凭证。

<span class="changelog deprecated">废弃</span>

废弃 EmailAuthProvider 类，用 WilddogAuthProvider 类代替

### V2.1.2 - 2016.10.17

<span class="changelog fix">修复</span>

修复 EmailAuthProvider.credential() 方法生成的 Credential 不合法的 bug。



### V2.1.1 - 2016.10.17

<span class="changelog fix">修复</span>

修复 iPhone 4s, iPhone 5s 微信公众账号登录失败的 bug。



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

Wilddog SDK 全面升级，拆分为 Sync 和 Auth 两个独立的模块。

<span class="changelog feature">改进</span>

- 移除原有 Wilddog SDK 中 Auth 功能。

- Wilddog SDK 提供 Sync 与 Auth 两个模块。

  新版的使用方式请参考 [新版 Wilddog 文档](/quickstart/sync/web.html)。

</br>

---





## iOS SDK

### V2.0.3 - 2016.11.04

<span class="changelog describe">描述</span>

Auth 新增手机号登录、手机号发送验证码等功能。

<span class="changelog add">新增</span>

- 新增 WDGWilddogAuthProvider 类，包含邮箱和手机号登录的凭证。
- 新增手机号登录、手机号重置密码、手机号验证用户。
- 新增手机号发送相关验证码方法。

<span class="changelog feature">改进</span>

- 统一 Auth 手机号和邮箱登录方式的凭证。

<span class="changelog deprecated">废弃</span>

- 废弃 WDGEmailPasswordAuthProvider 类，用 WDGWilddogAuthProvider 类代替。

### V2.0.1 - 2016.09.10

<span class="changelog describe">描述</span>

改进 Auth 的初始化方法，与 WilddogCore SDK 对接。

<span class="changelog add">新增</span>

- 新增 +auth 方法。

<span class="changelog feature">改进</span>

- 统一 Auth 模块初始化接口。
- 改进 -authWithApp: 方法，参数改为 WDGApp 类。

### V2.0.0 - 2016.09.01

<span class="changelog describe">描述</span>

Auth 部分全面升级，脱离 WilddogSync 可独立使用。

<span class="changelog add">新增</span>

- 新增 WDGAuth 类进行 auth 操作。
- 新增 WDGUser 类用于获取用户信息。
- 新增各种 AuthProvider 类和 AuthCredential 类用于用户认证。
- 新增 WDGUserProfileChangeRequest 类用于修改用户信息。


</br>

---

## Android SDK

### V2.0.2 - 2016.11.04

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


### V2.0.1 - 2016.09.20

<span class="changelog describe">描述</span>

该版本优化初始化过程。只需要初始化一次WilddogApp对象就可以使用WilddogAuth中使用。

<span class="changelog add">新增</span>

- 新增WilddogOptions，WilddogApp等类用于初始化。

<span class="changelog feature">改进</span>

- 改进WilddogAuth初始化过程。将部分WilddogAuth初始化方法移除。


<span class="changelog fix">修复</span>

- WildUser获取token空指针问题。


### V2.0.0 - 2016.09.01

<span class="changelog describe">描述</span>

 该版本将 Auth SDK 从 Wilddog SDK 中分离。

<span class="changelog add">新增</span>

- 新增 WilddogAuth 对象进行 auth 操作。
- 新增 WilddogUse r对象用于获取登录后用户信息。
- 新增各种 AuthProvider 和 AuthCredential 用于认证或绑定用户。
- 新增 GetTokenResult 类用于获取 token。
- 新增 UserProfileChangeRequest 类用于修改用户信息。

</br>

---

## Server SDK

### V2.0.4 - 2016.10.17

<span class="changelog describe">描述</span>

优化 Wilddog Auth Server SDK。

<span class="changelog add">新增</span>

增加 CustomToken 的生成器中,允许有 ',' 的规则判断。



### V2.0.3 - 2016.09.06

<span class="changelog describe">描述</span>

优化 Wilddog Auth Server SDK。

<span class="changelog optimize">优化</span>

加强 Wilddog ID Token 校验功能。

### V2.0.2 - 2016.09.06

<span class="changelog describe">描述</span>

优化 Wilddog Auth Server SDK。

<span class="changelog fix">修复</span>

修复 CustomToken 的生成器中,允许有 ',' 的规则判断。

### V2.0.1 - 2016.09.01

<span class="changelog describe">描述</span>

优化Wilddog Auth Server SDK。

<span class="changelog optimize">优化</span>

对 Server SDK 进行了代码重构优化。



### V2.0.0 - 2016.08.19

<span class="changelog describe">描述</span>

新增 Wilddog Auth Server SDK 服务。

<span class="changelog add">新增</span>

- Auth2.0 版本的 customToken 生成器功能。
- Wilddog ID Token 的校验功能。

### 