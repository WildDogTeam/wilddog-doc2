
title: 更新日志
---

## iOS SDK

### V2.0.5 - 2016.12.20

<span class="changelog feature">改进</span>

- 优化 Auth SDK 错误码信息，完善 WDGAuthErrors 类。

### V2.0.4 - 2016.12.07

<span class="changelog fix">修复</span>

- 修复 Auth 认证后， Sync 操作数据无权限的错误。

### V2.0.3 - 2016.11.04

<span class="changelog describe">描述</span>

- Auth 新增手机号登录、手机号发送验证码等功能。

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

- 改进 Auth 的初始化方法，与 WilddogCore SDK 对接。

<span class="changelog add">新增</span>

- 新增 +auth 方法。

<span class="changelog feature">改进</span>

- 统一 Auth 模块初始化接口。
- 改进 -authWithApp: 方法，参数改为 WDGApp 类。

### V2.0.0 - 2016.09.01

<span class="changelog describe">描述</span>

- Auth 部分全面升级，脱离 WilddogSync 可独立使用。

<span class="changelog add">新增</span>

- 新增 WDGAuth 类进行 auth 操作。
- 新增 WDGUser 类用于获取用户信息。
- 新增各种 AuthProvider 类和 AuthCredential 类用于用户认证。
- 新增 WDGUserProfileChangeRequest 类用于修改用户信息。


